// Global variable to store the flag value
let loggingEnabled = true;

// Function to update the flag value when it changes
function updateFlagValue() {
    chrome.storage.sync.get(['loggingEnabled'], (result) => {
        loggingEnabled = result.loggingEnabled ?? true; // Default to true if not set
    });
}

// Call updateFlagValue initially to load the current flag state
updateFlagValue();

// Listen for changes in the storage to update the flag dynamically
chrome.storage.onChanged.addListener((changes, areaName) => {
    if (areaName === 'sync' && changes.loggingEnabled) {
        loggingEnabled = changes.loggingEnabled.newValue;
    }
});

export function log(message) {
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

        console.log(formattedLog); // Log to console
    }
}
