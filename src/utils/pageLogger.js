// Runs in page context. window.__loggingEnabled is set by the extension before this is injected.
function log(message) {
    if (window.__loggingEnabled) {
        const timestamp = new Date().toISOString();
        let logMessage;
        if (typeof message === 'object') {
            try {
                logMessage = JSON.stringify(message, null, 2);
            } catch (e) {
                logMessage = `[Invalid Object: ${e.message}]`;
            }
        } else {
            logMessage = message;
        }
        console.log(`[${timestamp}] ${logMessage}`);
    }
}
