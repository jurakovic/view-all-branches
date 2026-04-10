// Runs in page context. log() is provided by pageLogger.js, injected before this script.
(() => {

log("Page loaded, setting up link observer.");

window.__viewAllBranchesDisabled = false;

// This function finds and updates the branch links
const updateBranchLinks = () => {
    if (window.__viewAllBranchesDisabled) {
        observer.disconnect();
        return;
    }

    const nodeList = document.querySelectorAll(`a[href$='/-/branches']`);

    if (nodeList.length > 0) {
        log(`Found and updated ${nodeList.length} new branch link(s).`);

        nodeList.forEach(anchor => {
            // Prevent GitLab's SPA routing from interfering
            anchor.addEventListener('click', function (event) {
                event.preventDefault();
                window.location.href = anchor.href;
            });

            // Update the href to point to the "All" branches view
            anchor.href = `${anchor.href}/all`;
        });

        observer.disconnect();
    }
};

// Create an observer to watch for DOM changes
const observer = new MutationObserver(() => {
    updateBranchLinks();
});

// Start observing the whole document for additions of new nodes
observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Run it once initially for any links that are already on the page
updateBranchLinks();

})();
