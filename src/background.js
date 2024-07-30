//src: https://stackoverflow.com/a/67729185

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

    if (tab.url?.startsWith("edge://")) return undefined;
    if (!tab.url?.startsWith("https://github.com")) return undefined;

    // check for a URL in the changeInfo parameter (url is only added when it is changed)
    //if (changeInfo.url) {
    if (changeInfo.status === 'complete') {
        injectScript(tabId);
    }

    //console.log(changeInfo);
});

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
