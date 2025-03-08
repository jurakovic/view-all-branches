
// Global variable to store the flag value
let loggingEnabled = false;

// Function to update the flag value when it changes
function updateFlagValue() {
    chrome.storage.sync.get(['loggingEnabled'], (result) => {
        loggingEnabled = result.loggingEnabled || false; // Default to false if not set
        console.log('Flag value updated:', loggingEnabled);
    });
}

// Call updateFlagValue initially to load the current flag state
updateFlagValue();

export function log(message, data) {
    if (loggingEnabled) {
        const timestamp = new Date().toISOString();

        let logMessage;
        //if (typeof message === 'object') {
        //    try {
        //        logMessage = JSON.stringify(message, null, 2); // Pretty print objects
        //    } catch (e) {
        //        logMessage = `[Invalid Object: ${e.message}]`;
        //    }
        //} else {
        //    logMessage = message;
        //}

        if (data) {
            logMessage = `${message} ${JSON.stringify(data, null, 2)}`;
        } else {
            logMessage = message;
        }


        const formattedLog = `[${timestamp}] ${logMessage}`;

        console.log(formattedLog); // Log to console
    }
}
