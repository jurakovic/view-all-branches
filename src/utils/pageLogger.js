(function () {
    let loggingEnabled = false;

    function updateFlagValue() {
        chrome.storage.sync.get(['loggingEnabled'], (result) => {
            loggingEnabled = result.loggingEnabled || false;
        });
    }

    // Listen for storage changes to update logging state dynamically
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.loggingEnabled) {
            loggingEnabled = changes.loggingEnabled.newValue;
        }
    });

    // Call initially to load the flag state
    updateFlagValue();

    window.pageLog = function (message) {
        if (loggingEnabled) {
            const timestamp = new Date().toISOString();
            let logMessage = (typeof message === 'object') 
                ? JSON.stringify(message, null, 2) 
                : message;
            console.log(`[PAGE][${timestamp}] ${logMessage}`);
        }
    };

    console.log("Page logger initialized.");
})();
