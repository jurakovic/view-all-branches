import { log } from '../../utils/logger.js';

export function checkGitHub(tabId, changeInfo, tab, flagEnabled) {
    const urlPattern = /^https:\/\/github\.com\/([a-zA-Z0-9-_\.]+)\/([a-zA-Z0-9-_\.]+)\/?/;

    if (flagEnabled && urlPattern.test(tab.url) &&
        changeInfo.status === 'complete') {
        log('matched url, page load complete, injecting script');

        // Get the logging state and pass it to the injected script
        chrome.storage.sync.get(['loggingEnabled'], (result) => {
            injectScriptGitHub(tabId, result.loggingEnabled || false);
        });
    }
};

function injectScriptGitHub(tabId, loggingEnabled) {
    chrome.scripting.executeScript(
        {
            target: { tabId: tabId },
            function: changeBranchesHref,
            args: [loggingEnabled] // Pass loggingEnabled state as an argument
        }
    );
}

function changeBranchesHref(loggingEnabled) {
    // Helper function for logging within the page context
    const log = (message) => {
        if (loggingEnabled) {
            const timestamp = new Date().toISOString();
            let logMessage;
            if (typeof message === 'object') {
                try {
                    logMessage = JSON.stringify(message, null, 2); // Pretty print objects
                } catch (e) {
                    logMessage = `[Invalid Object: ${e.message}]`;
                }
            } else {
                logMessage = message;
            }
            const formattedLog = `[${timestamp}] ${logMessage}`;
            console.log(formattedLog);
        }
    };

    log("page loaded");

    const rx = /^https:\/\/github\.com\/([a-zA-Z0-9-_\.]+)\/([a-zA-Z0-9-_\.]+)\/?/;
    const match = rx.exec(document.location);
    if (!match) return;

    const user = match[1];
    const repo = match[2];
    log(`User: ${user}`);
    log(`Repo: ${repo}`);

    const nodeList = document.querySelectorAll(`a[href='/${user}/${repo}/branches']`);
    log(nodeList);
    log(`Found ${nodeList.length} nodes`);

    if (nodeList.length > 0) {
        log("has nodes");

        nodeList.forEach(anchor => {
            anchor.href = `${anchor.href}/all`;
            log(`Changed href to: ${anchor.href}`);
        });

        log("branches href changed");
    }
    else {
        log('has no nodes');
    }
}
