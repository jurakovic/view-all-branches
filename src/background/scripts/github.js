import { log } from '../../utils/logger.js';

export function checkGitHub(tabId, changeInfo, tab, flagEnabled) {
    const urlPattern = /^https:\/\/github\.com\/([a-zA-Z0-9-_\.]+)\/([a-zA-Z0-9-_\.]+)\/?/;

    if (flagEnabled && urlPattern.test(tab.url) &&
        changeInfo.status === 'complete') {
        log('matched url, page load complete, injecting script');
        injectScriptGitHub(tabId);
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
    console.log("page loaded")

    const rx = /^https:\/\/github\.com\/([a-zA-Z0-9-_\.]+)\/([a-zA-Z0-9-_\.]+)\/?/
    const match = rx.exec(document.location)
    if (!match) return;

    const user = match[1]
    const repo = match[2]
    console.log(user)
    console.log(repo)

    const nodeList = document.querySelectorAll(`a[href='/${user}/${repo}/branches']`)
    console.log(nodeList)
    console.log(nodeList.length)

    if (nodeList.length > 0) {
        console.log("has nodes")

        nodeList.forEach(anchor => {
            anchor.href = `${anchor.href}/all`
            console.log(anchor.href)
        });

        console.log("branches href changed")
    }
    else {
        console.log('has no nodes');
    }
}
