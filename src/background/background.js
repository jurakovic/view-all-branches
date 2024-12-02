import { injectScriptGitHub } from './scripts/injectScriptGitHub.js';
import { injectScriptAzureDevOps } from './scripts/injectScriptAzureDevOps.js';

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

	const urlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9-\.]+\/[a-zA-Z0-9-\.]+\/?/;

	if (flagEnabled && urlPattern.test(tab.url)) {
		//console.log('matched url');

		//if (changeInfo.url) {
		if (changeInfo.status === 'complete') {
			//console.log('injecting script');
			injectScriptGitHub(tabId);
		}

		//console.log(changeInfo);
	}
	//else
	//{
	//	console.log('not matched url');
	//}

	//https://dev.azure.com/belcar/_git/Belcar%20New%20Architecture/branches
	//const azureDevopsUrl = /^https:\/\/dev\.azure\.com\/[a-zA-Z0-9%-\.]+\/_git\/[a-zA-Z0-9%-\.]+\/branches$/;
	const azureDevopsUrl = /^https:\/\/dev\.azure\.com\/[a-zA-Z0-9%-\.]+/;

	if (flagEnabled && azureDevopsUrl.test(tab.url)) {
		//console.log('matched url');

		//if (changeInfo.url) {
		if (changeInfo.status === 'complete') {
			//console.log('injecting script');
			injectScriptAzureDevOps(tabId);
		}

		//console.log(changeInfo);
	}
});
