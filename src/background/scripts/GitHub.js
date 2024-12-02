
export function checkGitHub(tabId, changeInfo, tab, flagEnabled) {
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
};

function injectScriptGitHub(tabId) {
	//if (!flagEnabled) {
	//	console.log('Feature is disabled. Not injecting script.');
	//	return;
	//}

	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: changeBranchesHref,
		}
	);
}

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
