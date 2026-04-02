import { log, loggingEnabled } from '../utils/logger.js';
import { injectScript } from '../utils/scripting.js';

const platforms = [
    {
        urlPattern: /^https:\/\/github\.com\/([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)\/?/,
        script: 'background/scripts/githubPage.js',
        enabledKey: 'githubEnabled',
    },
    {
        urlPattern: /^https:\/\/dev\.azure\.com\/[a-zA-Z0-9%._-]+/,
        script: 'background/scripts/azuredevopsPage.js',
        enabledKey: 'azureDevOpsEnabled',
    },
];

const enabled = {
    githubEnabled: true,
    azureDevOpsEnabled: true,
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

chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName !== 'sync') return;
    for (const key of Object.keys(enabled)) {
        if (changes[key]) {
            enabled[key] = changes[key].newValue;
            log(key + ' value changed: ' + enabled[key]);
        }
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status !== 'complete') return;
    for (const platform of platforms) {
        if (enabled[platform.enabledKey] && platform.urlPattern.test(tab.url)) {
            log('Matched ' + platform.enabledKey + ', injecting script');
            injectScript(tabId, platform.script, loggingEnabled);
        }
    }
});
