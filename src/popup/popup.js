const cbxGitHub = document.getElementById('cbxGitHub');
const cbxAzureDevOps = document.getElementById('cbxAzureDevOps');
const cbxLogging = document.getElementById('cbxLogging');

// Load the saved state from storage when the popup opens
chrome.storage.sync.get(['githubEnabled', 'azureDevOpsEnabled', 'loggingEnabled'], (result) => {
    cbxGitHub.checked = result.githubEnabled ?? true; // Default to true
    cbxAzureDevOps.checked = result.azureDevOpsEnabled ?? true; // Default to true
    cbxLogging.checked = result.loggingEnabled ?? true; // Default to true
});

// Save the state whenever the cbx is clicked
cbxGitHub.addEventListener('change', () => {
    chrome.storage.sync.set({ githubEnabled: cbxGitHub.checked }, () => {
        console.log('githubEnabled state saved:', cbxGitHub.checked);
    });
});

cbxAzureDevOps.addEventListener('change', () => {
    chrome.storage.sync.set({ azureDevOpsEnabled: cbxAzureDevOps.checked }, () => {
        console.log('azureDevOpsEnabled state saved:', cbxAzureDevOps.checked);
    });
});

cbxLogging.addEventListener('change', () => {
    chrome.storage.sync.set({ loggingEnabled: cbxLogging.checked }, () => {
        console.log('loggingEnabled state saved:', cbxLogging.checked);
    });
});
