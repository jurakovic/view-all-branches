export function injectScript(tabId, fn, loggingEnabled) {
    chrome.scripting.executeScript({
        target: { tabId: tabId },
        function: fn,
        args: [loggingEnabled]
    });
}
