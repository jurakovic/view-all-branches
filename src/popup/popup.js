
const cbxGitHub = document.getElementById('cbxGitHub');
const cbxLogging = document.getElementById('cbxLogging');

// Load the saved state from storage when the popup opens
chrome.storage.sync.get(['flagEnabled', 'loggingEnabled'], (result) => {
    cbxGitHub.checked = result.flagEnabled || false; // Default to false
    cbxLogging.checked = result.loggingEnabled || false; // Default to false
});

// Save the state whenever the cbxGitHub is clicked
cbxGitHub.addEventListener('change', () => {
    chrome.storage.sync.set({ flagEnabled: cbxGitHub.checked }, () => {
        console.log('Flag state saved:', cbxGitHub.checked);
    });
});

cbxLogging.addEventListener('change', () => {
    chrome.storage.sync.set({ loggingEnabled: cbxLogging.checked }, () => {
        console.log('Logging state saved:', cbxLogging.checked);
    });
});
