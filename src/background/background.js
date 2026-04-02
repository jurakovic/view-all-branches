import { checkGitHub } from './scripts/github.js';
import { checkAzureDevOps } from './scripts/azuredevops.js';
import { log } from '../utils/logger.js';

// Global variable to store the flag value
let githubEnabled = true;
let azureDevOpsEnabled = true;
let loggingEnabled = true;

// Function to update the flag value when it changes
function updateFlagValue() {
    chrome.storage.sync.get(['githubEnabled', 'azureDevOpsEnabled', 'loggingEnabled'], (result) => {
        githubEnabled = result.githubEnabled ?? true; // Default to true if not set
        azureDevOpsEnabled = result.azureDevOpsEnabled ?? true; // Default to true if not set
        loggingEnabled = result.loggingEnabled ?? true; // Default to true if not set
        log('githubEnabled value updated: ' + githubEnabled);
        log('azureDevOpsEnabled value updated: ' + azureDevOpsEnabled);
        log('loggingEnabled value updated: ' + loggingEnabled);
    });
}

// Call updateFlagValue initially to load the current flag state
updateFlagValue();

// Listen for changes in the storage to update the flag dynamically
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.githubEnabled) {
        githubEnabled = changes.githubEnabled.newValue;
        log('githubEnabled value changed: ' + githubEnabled);
    }
    if (areaName === 'sync' && changes.azureDevOpsEnabled) {
        azureDevOpsEnabled = changes.azureDevOpsEnabled.newValue;
        log('azureDevOpsEnabled value changed: ' + azureDevOpsEnabled);
    }
    if (areaName === 'sync' && changes.loggingEnabled) {
        loggingEnabled = changes.loggingEnabled.newValue;
        log('loggingEnabled value changed: ' + loggingEnabled);
    }
});

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    checkGitHub(tabId, changeInfo, tab, githubEnabled, loggingEnabled);
    checkAzureDevOps(tabId, changeInfo, tab, azureDevOpsEnabled, loggingEnabled);
});
