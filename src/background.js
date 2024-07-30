//src: https://stackoverflow.com/a/67729185

// function that injects code to a specific tab
function injectScript(tabId) {
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            files: ['content.js'],
        }
    );
}

// adds a listener to tab change
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

    if (tab.url?.startsWith("edge://")) return undefined;

    // check for a URL in the changeInfo parameter (url is only added when it is changed)
    //if (changeInfo.url) {
    if (changeInfo.status === 'complete') {
        injectScript(tabId);
    }

    console.log(changeInfo);
});
