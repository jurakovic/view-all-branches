    // Get references to the checkbox
const checkbox = document.getElementById('myFlagCheckbox');
const cbxLogging = document.getElementById('cbxLogging');

// Load the saved state from storage when the popup opens
chrome.storage.sync.get(['flagEnabled', 'loggingEnabled'], (result) => {
    checkbox.checked = result.flagEnabled || false; // Default to false
    cbxLogging.checked = result.loggingEnabled || false; // Default to false
});

// Save the state whenever the checkbox is clicked
checkbox.addEventListener('change', () => {
    chrome.storage.sync.set({ flagEnabled: checkbox.checked }, () => {
        console.log('Flag state saved:', checkbox.checked);
    });
});

cbxLogging.addEventListener('change', () => {
    chrome.storage.sync.set({ loggingEnabled: cbxLogging.checked }, () => {
        console.log('Logging state saved:', cbxLogging.checked);
    });
});
