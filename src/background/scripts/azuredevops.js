import { log } from '../../utils/logger.js';
import { injectScript } from '../../utils/scripting.js';

export function checkAzureDevOps(tabId, changeInfo, tab, isEnabled, loggingEnabled) {
    const urlPattern = /^https:\/\/dev\.azure\.com\/[a-zA-Z0-9%._-]+/;

    if (isEnabled && urlPattern.test(tab.url) &&
        changeInfo.status === 'complete') {
        log('Matched Azure DevOps URL, page load complete, injecting script');
        injectScript(tabId, 'background/scripts/azuredevopsPage.js', loggingEnabled);
    }
};
