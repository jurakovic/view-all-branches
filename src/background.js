
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
function injectScript(tabId) {
	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: changeBranchesHref,
		}
	);
}


function removeOverflowHidden() {
	//console.log("page loaded")

	setTimeout(() => { 
		body = document.getElementsByTagName('body')[0];
		console.log(body.style);
		body.style.overflow = "";

		html = document.getElementsByTagName('html')[0];
		console.log(html.style);
		html.style.overflow = "";
	}, 1000);
}

// function that injects code to a specific tab
function injectScript2(tabId) {
	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: removeOverflowHidden,
		}
	);
}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

	const githubUrl = /^https:\/\/github\.com\/[a-zA-Z0-9-\.]+\/[a-zA-Z0-9-\.]+\/?/;

	if (githubUrl.test(tab.url)) {
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

	const arsUrl = /^https:\/\/arstechnica\.com/;

	if (arsUrl.test(tab.url)) {
		console.log('matched ars url');

		//if (changeInfo.url) {
		if (changeInfo.status === 'complete') {
			//console.log('injecting script');
			injectScript2(tabId);
		}

		//console.log(changeInfo);
	}
});
