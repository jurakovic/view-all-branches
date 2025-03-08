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
	chrome.scripting.executeScript(
		{
			target: { tabId: tabId },
			function: changeBranchesHref,
		}
	);
}

function changeBranchesHref() {
	function log(message, data) {
		//chrome.runtime.sendMessage({ type: "log", level: "info", message });
		chrome.runtime.sendMessage({
			type: "log",
			level: "info",
			message: message,
			data: data // Send additional data as an object
			//message: typeof message === "string" ? message : "[OBJECT LOG]",
			//data: typeof message === "object" ? message : null
		});
	}

	log("page loaded")

	rx = /^https:\/\/github\.com\/([a-zA-Z0-9-\.]+)\/([a-zA-Z0-9-\.]+)\/?/
	match = rx.exec(document.location)
	user = match[1]
	repo = match[2]
	log(user)
	log(repo)

	nodeList = document.querySelectorAll(`a[href='/${user}/${repo}/branches']`)
	console.log(nodeList)
	log(nodeList)
	//log("asd", nodeList)
	log("asd", JSON.stringify(nodeList, null, 2))
	log(nodeList.length)

	if (nodeList.length > 0) {
		log("has nodes")

		nodeList.forEach(anchor => {
			anchor.href = `${anchor.href}/all`
			log(anchor.href)
		});

		log("branches href changed")
	}
	else
	{
		log('has no nodes');
	}
}
