export async function injectScript(tabId, file, loggingEnabled) {
    await chrome.scripting.executeScript({
        target: { tabId },
        func: (val) => { window.__loggingEnabled = val; },
        args: [loggingEnabled]
    });
    chrome.scripting.executeScript({
        target: { tabId },
        files: ['utils/pageLogger.js', file]
    });
}
