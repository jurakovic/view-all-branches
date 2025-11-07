import { checkGitHub } from './scripts/github.js';
import { checkAzureDevOps } from './scripts/azuredevops.js';

// Global variable to store the flag value
let githubEnabled = true;
let azureDevOpsEnabled = true;

// Function to update the flag value when it changes
function updateFlagValue() {
    chrome.storage.sync.get(['githubEnabled', 'azureDevOpsEnabled'], (result) => {
        githubEnabled = result.githubEnabled ?? true; // Default to true if not set
        azureDevOpsEnabled = result.azureDevOpsEnabled ?? true; // Default to true if not set
        console.log('githubEnabled value updated:', githubEnabled);
        console.log('azureDevOpsEnabled value updated:', azureDevOpsEnabled);
    });
}

// Call updateFlagValue initially to load the current flag state
updateFlagValue();

// Listen for changes in the storage to update the flag dynamically
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.githubEnabled) {
        githubEnabled = changes.githubEnabled.newValue;
        console.log('githubEnabled value changed:', githubEnabled);
    }
    if (areaName === 'sync' && changes.azureDevOpsEnabled) {
        azureDevOpsEnabled = changes.azureDevOpsEnabled.newValue;
        console.log('azureDevOpsEnabled value changed:', azureDevOpsEnabled);
    }
});

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    checkGitHub(tabId, changeInfo, tab, githubEnabled);
    checkAzureDevOps(tabId, changeInfo, tab, azureDevOpsEnabled);
});
