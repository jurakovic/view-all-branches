import { log } from '../../utils/logger.js';

export function checkGitHub(tabId, changeInfo, tab, flagEnabled) {
	const urlPattern = /^https:\/\/github\.com\/[a-zA-Z0-9-\.]+\/[a-zA-Z0-9-\.]+\/?/;

	if (flagEnabled && urlPattern.test(tab.url)) {
		log('matched url');

		if (changeInfo.status === 'complete') {
			log('injecting script');
			injectScriptGitHub(tabId);
		}

		log(changeInfo);
	}
};

function injectScriptGitHub(tabId) {
	//chrome.scripting.executeScript({
	//	target: { tabId: tabId },
	//	files: ["utils/pageLogger.js"]
	//});
	chrome.scripting.executeScript({
		target: { tabId: tabId },
		func: () => {
			const script = document.createElement("script");
			script.src = chrome.runtime.getURL("utils/pageLogger.js");
			script.onload = () => script.remove(); // Cleanup after loading
			document.head.appendChild(script);
		}
	});
	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: changeBranchesHref,
		}
	);
}

function changeBranchesHref() {
	//function log(message, data) {
	//	chrome.runtime.sendMessage({ type: "log", level: "info", message });
	//	//chrome.runtime.sendMessage({
	//	//	type: "log",
	//	//	level: "info",
	//	//	message: message,
	//	//	data: data // Send additional data as an object
	//	//	//message: typeof message === "string" ? message : "[OBJECT LOG]",
	//	//	//data: typeof message === "object" ? message : null
	//	//});
	//}

	window.pageLog("page loaded")

	rx = /^https:\/\/github\.com\/([a-zA-Z0-9-\.]+)\/([a-zA-Z0-9-\.]+)\/?/
	match = rx.exec(document.location)
	user = match[1]
	repo = match[2]
	window.pageLog(user)
	window.pageLog(repo)

	nodeList = document.querySelectorAll(`a[href='/${user}/${repo}/branches']`)
	console.log(nodeList)
	window.pageLog(nodeList)
	//log("asd", nodeList)
	window.pageLog("asd", JSON.stringify(nodeList, null, 2))
	window.pageLog(nodeList.length)

	if (nodeList.length > 0) {
		window.pageLog("has nodes")

		nodeList.forEach(anchor => {
			anchor.href = `${anchor.href}/all`
			window.pageLog(anchor.href)
		});

		window.pageLog("branches href changed")
	}
	else
	{
		window.pageLog('has no nodes');
	}
}
