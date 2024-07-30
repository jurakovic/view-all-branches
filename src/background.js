
function changeBranchesHref() {
	//console.log("page loaded")

	currentLoc = document.location.href.substring(18)
	//console.log(currentLoc)
	nodeList = document.querySelectorAll(`a[href='${currentLoc}/branches']`)
	//console.log(nodeList)

	nodeList.forEach(anchor => {
		anchor.href = `${anchor.href}/all`
		//console.log(anchor.href)
	});

	console.log("branches href changed")
}

// function that injects code to a specific tab
function injectScript(tabId) {
	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: changeBranchesHref,
		}
	);
}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

	const urlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+\/?$/;

	if (urlPattern.test(tab.url)) {
		//console.log('matched url');

		//if (changeInfo.url) {
		if (changeInfo.status === 'complete') {
			//console.log('injecting script');
			injectScript(tabId);
		}

		//console.log(changeInfo);
	}
	//else
	//{
	//	console.log('not matched url');
	//}
});
