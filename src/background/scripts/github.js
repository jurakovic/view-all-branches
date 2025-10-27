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

    log("Page loaded, setting up link observer.");

    const rx = /^https:\/\/github\.com\/([a-zA-Z0-9-_\.]+)\/([a-zA-Z0-9-_\.]+)\/?/;
    const match = rx.exec(document.location);
    if (!match) return;

    const user = match[1];
    const repo = match[2];
    log(`User: ${user}`);
    log(`Repo: ${repo}`);
    const branchesHref = `/${user}/${repo}/branches`;

    // This function finds and updates the branch links
    const updateBranchLinks = () => {
        // Select links that have the exact href and have not been updated yet
        const nodeList = document.querySelectorAll(`a[href='${branchesHref}']`);

        if (nodeList.length > 0) {
            log(`Found and updated ${nodeList.length} new branch link(s).`);

            nodeList.forEach(anchor => {
                // Prevent GitHub's SPA routing from interfering
                anchor.addEventListener('click', function (event) {
                    event.preventDefault();
                    window.location.href = anchor.href;
                });

                // Update the href to point to the "All" branches tab
                anchor.href = `${anchor.href}/all`;

                // Apply styles for debugging
                //anchor.style.color = 'red';
                //anchor.style.fontWeight = 'bold';
            });
        }
    };

    // Create an observer to watch for DOM changes
    const observer = new MutationObserver((mutations) => {
        // We can debounce this if it becomes a performance issue, but for now, it's fine.
        updateBranchLinks();
    });

    // Start observing the whole document for additions of new nodes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // Run it once initially for any links that are already on the page
    updateBranchLinks();
}
