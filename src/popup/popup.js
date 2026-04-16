const cbxGitHub = document.getElementById('cbxGitHub');
const cbxAzureDevOps = document.getElementById('cbxAzureDevOps');
const cbxGitLab = document.getElementById('cbxGitLab');
const cbxLogging = document.getElementById('cbxLogging');
const txtDomain = document.getElementById('txtDomain');
const btnAddDomain = document.getElementById('btnAddDomain');
const domainList = document.getElementById('domainList');
const txtAzureDevOpsDomain = document.getElementById('txtAzureDevOpsDomain');
const btnAddAzureDevOpsDomain = document.getElementById('btnAddAzureDevOpsDomain');
const azureDevOpsDomainList = document.getElementById('azureDevOpsDomainList');

// Load the saved state from storage when the popup opens
chrome.storage.sync.get(['githubEnabled', 'azureDevOpsEnabled', 'gitlabEnabled', 'loggingEnabled', 'gitlabCustomDomains', 'azureDevOpsCustomDomains'], (result) => {
    cbxGitHub.checked = result.githubEnabled ?? true; // Default to true
    cbxAzureDevOps.checked = result.azureDevOpsEnabled ?? true; // Default to true
    cbxGitLab.checked = result.gitlabEnabled ?? true; // Default to true
    cbxLogging.checked = result.loggingEnabled ?? true; // Default to true
    gitlab.render(result.gitlabCustomDomains ?? []);
    azureDevOps.render(result.azureDevOpsCustomDomains ?? []);
});

function createDomainManager(storageKey, inputEl, listEl) {
    function render(domains) {
        listEl.innerHTML = '';
        domains.forEach(domain => {
            const item = document.createElement('div');
            item.className = 'domain-item';
            const label = document.createElement('span');
            label.textContent = domain;
            const btn = document.createElement('button');
            btn.className = 'remove-btn';
            btn.textContent = '×';
            btn.addEventListener('click', () => remove(domain));
            item.appendChild(label);
            item.appendChild(btn);
            listEl.appendChild(item);
        });
    }

    function add() {
        let domain = inputEl.value.trim().toLowerCase();
        domain = domain.replace(/^https?:\/\//, '').replace(/\/.*$/, '');
        if (!domain) return;

        // Save to storage before requesting permission — the permission dialog closes the popup,
        // which destroys the JS context before any callback inside permissions.request can run.
        chrome.storage.sync.get([storageKey], (result) => {
            const domains = result[storageKey] ?? [];
            if (domains.includes(domain)) return;
            domains.push(domain);
            chrome.storage.sync.set({ [storageKey]: domains }, () => {
                render(domains);
                inputEl.value = '';
            });
        });

        // Request permission after storage is initiated (still synchronous in the user gesture).
        // The popup will close when the dialog appears; the domain is already saved above.
        chrome.permissions.request({ origins: [`https://${domain}/*`] });
    }

    function remove(domain) {
        chrome.permissions.remove({ origins: [`https://${domain}/*`] }, () => {
            chrome.storage.sync.get([storageKey], (result) => {
                const domains = (result[storageKey] ?? []).filter(d => d !== domain);
                chrome.storage.sync.set({ [storageKey]: domains }, () => {
                    render(domains);
                });
            });
        });
    }

    inputEl.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') add();
    });

    return { render, add };
}

const gitlab = createDomainManager('gitlabCustomDomains', txtDomain, domainList);
const azureDevOps = createDomainManager('azureDevOpsCustomDomains', txtAzureDevOpsDomain, azureDevOpsDomainList);

btnAddDomain.addEventListener('click', gitlab.add);
btnAddAzureDevOpsDomain.addEventListener('click', azureDevOps.add);

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

cbxGitLab.addEventListener('change', () => {
    chrome.storage.sync.set({ gitlabEnabled: cbxGitLab.checked }, () => {
        console.log('gitlabEnabled state saved:', cbxGitLab.checked);
    });
});

cbxLogging.addEventListener('change', () => {
    chrome.storage.sync.set({ loggingEnabled: cbxLogging.checked }, () => {
        console.log('loggingEnabled state saved:', cbxLogging.checked);
    });
});
