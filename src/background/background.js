import { checkGitHub } from './scripts/github.js';
import { checkAzureDevOps } from './scripts/azuredevops.js';

// Global variable to store the flag value
let flagEnabled = false;

// Function to update the flag value when it changes
function updateFlagValue() {
    chrome.storage.sync.get(['flagEnabled'], (result) => {
        flagEnabled = result.flagEnabled || false; // Default to false if not set
        console.log('Flag value updated:', flagEnabled);
    });
}

// Call updateFlagValue initially to load the current flag state
updateFlagValue();

// Listen for changes in the storage to update the flag dynamically
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.flagEnabled) {
        flagEnabled = changes.flagEnabled.newValue;
        console.log('Flag value changed:', flagEnabled);
    }
});

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    checkGitHub(tabId, changeInfo, tab, flagEnabled);
    checkAzureDevOps(tabId, changeInfo, tab, flagEnabled);
});
