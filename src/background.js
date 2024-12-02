
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

function changeBranchesHref() {
	//console.log("page loaded")

	rx = /^https:\/\/github\.com\/([a-zA-Z0-9-\.]+)\/([a-zA-Z0-9-\.]+)\/?/
	match = rx.exec(document.location)
	user = match[1]
	repo = match[2]
	//console.log(user)
	//console.log(repo)

	nodeList = document.querySelectorAll(`a[href='/${user}/${repo}/branches']`)
	//console.log(nodeList)
	//console.log(nodeList.length)

	if (nodeList.length > 0) {
		//console.log("has nodes")

		nodeList.forEach(anchor => {
			anchor.href = `${anchor.href}/all`
			//console.log(anchor.href)
		});

		console.log("branches href changed")
	}
	//else
	//{
	//	console.log('has no nodes');
	//}
}

// function that injects code to a specific tab
function injectScript0(tabId) {
	if (!flagEnabled) {
		console.log('Feature is disabled. Not injecting script.');
		return;
	}

	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: changeBranchesHref,
		}
	);
}

function changeBranchesHref1() {
	//console.log("page loaded")

	rx = /^https:\/\/dev\.azure\.com\/([a-zA-Z0-9%-\.]+)(\/_git)?\/([a-zA-Z0-9%-\.]+)/
	match = rx.exec(document.location)
	proj = match[1]
	repo = match[3]
	//console.log(proj)
	//console.log(repo)

	//href="/belcar/_git/Belcar%20New%20Architecture/branches"
	nodeList = document.querySelectorAll(`a[href='/${proj}/_git/${repo}/branches']`)
	//console.log(nodeList)
	//console.log(nodeList.length)

	if (nodeList.length > 0) {
		//console.log("has nodes")

		nodeList.forEach(anchor => {
			anchor.addEventListener('click', function (event) {
				event.preventDefault(); // prevent azure devops from handling the click
				window.location.href = anchor.href;
			});

			anchor.href = `${anchor.href}?_a=all`
			//console.log(anchor.href)
		});

		console.log("branches href changed")
	}
	//else
	//{
	//	console.log('has no nodes');
	//}

	/*
	// handle hover menu
	document.addEventListener('mouseover', function (event) {
	//document.querySelector("#__bolt-ms-vss-code-web-code-hub-group-container").addEventListener('mouseover', function (event) {
	//document.querySelector("#__bolt-ms-vss-code-web-branches-hub-text").addEventListener('mouseover', function (event) {
	//document.querySelector("#__bolt-menu-ms-vss-code-web-code-hub-group-callout").addEventListener('mouseover', function (event) {
		console.log("mouseover")
		const anchor = event.target.closest(`a[href='/${proj}/_git/${repo}/branches']`);
		if (anchor) {
			anchor.addEventListener('click', function (event1) {
				event1.preventDefault(); // prevent azure devops from handling the click
				window.location.href = anchor.href;
			});
		
			anchor.href = `${anchor.href}?_a=all`
			//console.log("hover menu branches href changed")
		}

		//if (
		//	event.target.tagName === 'A' &&
		//	event.target.getAttribute('href') === '/${proj}/_git/${repo}/branches'
		//) {
		//	event.target.href = `${event.target.href}?_a=all`
		//	console.log("Updated link to: ", event.target.href);
		//}
	});
	*/
}

// function that injects code to a specific tab
function injectScript1(tabId) {
	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: changeBranchesHref1,
		}
	);
}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

	const urlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9-\.]+\/[a-zA-Z0-9-\.]+\/?/;

	if (urlPattern.test(tab.url)) {
		//console.log('matched url');

		//if (changeInfo.url) {
		if (changeInfo.status === 'complete') {
			//console.log('injecting script');
			injectScript0(tabId);
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

	if (azureDevopsUrl.test(tab.url)) {
		//console.log('matched url');

		//if (changeInfo.url) {
		if (changeInfo.status === 'complete') {
			//console.log('injecting script');
			injectScript1(tabId);
		}

		//console.log(changeInfo);
	}
});
