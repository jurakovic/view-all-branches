import { log, loggingEnabled } from '../utils/logger.js';
import { injectScript } from '../utils/scripting.js';

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

let customGitlabPlatforms = [];

function updateCustomDomains(domains) {
    customGitlabPlatforms = domains.map(domain => ({
        urlPattern: new RegExp(`^https://${escapeRegex(domain)}/`),
        script: 'background/scripts/gitlab.js',
        enabledKey: 'gitlabEnabled',
    }));
    log('Custom GitLab domains updated: ' + domains.join(', '));
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

chrome.storage.sync.get(['gitlabCustomDomains'], (result) => {
    updateCustomDomains(result.gitlabCustomDomains ?? []);
});

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return;
    for (const key of Object.keys(enabled)) {
        if (changes[key]) {
            enabled[key] = changes[key].newValue;
            log(key + ' value changed: ' + enabled[key]);
        }
    }
    if (changes.gitlabCustomDomains) {
        updateCustomDomains(changes.gitlabCustomDomains.newValue ?? []);
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') return;
    for (const platform of [...platforms, ...customGitlabPlatforms]) {
        if (enabled[platform.enabledKey] && platform.urlPattern.test(tab.url)) {
            log('Matched ' + platform.enabledKey + ', injecting script');
            injectScript(tabId, platform.script, loggingEnabled);
        }
    }
});
