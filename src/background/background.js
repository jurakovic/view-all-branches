import { log, loggingEnabled } from '../utils/logger.js';
import { injectScript } from '../utils/scripting.js';

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const customDomainConfigs = [
    { storageKey: 'gitlabCustomDomains',      script: 'background/scripts/gitlab.js',      enabledKey: 'gitlabEnabled' },
    { storageKey: 'azureDevOpsCustomDomains', script: 'background/scripts/azuredevops.js', enabledKey: 'azureDevOpsEnabled' },
];

const customPlatformMap = {};

function updateCustomPlatforms(storageKey, domains) {
    const { script, enabledKey } = customDomainConfigs.find(c => c.storageKey === storageKey);
    customPlatformMap[storageKey] = domains.map(domain => ({
        urlPattern: new RegExp(`^https://${escapeRegex(domain)}/`),
        script,
        enabledKey,
    }));
    log('Custom domains updated for ' + storageKey + ': ' + domains.join(', '));
}

function allCustomPlatforms() {
    return Object.values(customPlatformMap).flat();
}

const platforms = [
    {
        urlPattern: /^https:\/\/github\.com\/([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)\/?/,
        script: 'background/scripts/github.js',
        enabledKey: 'githubEnabled',
    },
    {
        urlPattern: /^https:\/\/dev\.azure\.com\/[a-zA-Z0-9%._-]+/,
        script: 'background/scripts/azuredevops.js',
        enabledKey: 'azureDevOpsEnabled',
    },
    {
        urlPattern: /^https:\/\/gitlab\.com\/[a-zA-Z0-9._-]+\/[a-zA-Z0-9._-]+/,
        script: 'background/scripts/gitlab.js',
        enabledKey: 'gitlabEnabled',
    },
];

const enabled = {
    githubEnabled: true,
    azureDevOpsEnabled: true,
    gitlabEnabled: true,
};

function updateFlagValues() {
    chrome.storage.sync.get(Object.keys(enabled), (result) => {
        for (const key of Object.keys(enabled)) {
            enabled[key] = result[key] ?? true;
            log(key + ' value updated: ' + enabled[key]);
        }
    });
}

updateFlagValues();

for (const { storageKey } of customDomainConfigs) {
    chrome.storage.sync.get([storageKey], (result) => {
        updateCustomPlatforms(storageKey, result[storageKey] ?? []);
    });
}

function disablePlatformInOpenTabs(enabledKey) {
    const matchingPlatforms = [...platforms, ...allCustomPlatforms()].filter(p => p.enabledKey === enabledKey);
    chrome.tabs.query({}, (tabs) => {
        for (const tab of tabs) {
            if (!tab.url) continue;
            if (matchingPlatforms.some(p => p.urlPattern.test(tab.url))) {
                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    func: () => { window.__viewAllBranchesDisabled = true; }
                }).catch(() => {});
            }
        }
    });
}

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return;
    for (const key of Object.keys(enabled)) {
        if (changes[key]) {
            enabled[key] = changes[key].newValue;
            log(key + ' value changed: ' + enabled[key]);
            if (!enabled[key]) {
                disablePlatformInOpenTabs(key);
            }
        }
    }
    for (const { storageKey } of customDomainConfigs) {
        if (changes[storageKey]) {
            updateCustomPlatforms(storageKey, changes[storageKey].newValue ?? []);
        }
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') return;
    for (const platform of [...platforms, ...allCustomPlatforms()]) {
        if (enabled[platform.enabledKey] && platform.urlPattern.test(tab.url)) {
            log('Matched ' + platform.enabledKey + ', injecting script');
            injectScript(tabId, platform.script, loggingEnabled);
        }
    }
});
