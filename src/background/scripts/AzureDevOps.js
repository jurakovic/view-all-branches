
export function checkAzureDevOps(tabId, changeInfo, tab, flagEnabled) {
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
};

function injectScriptAzureDevOps(tabId) {
	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: changeBranchesHref1,
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
