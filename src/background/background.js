import { checkGitHub } from './scripts/GitHub.js';
import { checkAzureDevOps } from './scripts/AzureDevOps.js';
import { log } from '../../utils/logger.js';

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
	checkAzureDevOps(tabId, changeInfo, tab, flagEnabled);
	checkGitHub(tabId, changeInfo, tab, flagEnabled);
});

chrome.runtime.onMessage.addListener((message, sender) => {
	//log(message.message);
	//log(message.message, message.data);

	if (message.data) {
        log(message.message, message.data);
    } else {
        log(message.message);
    }

});
