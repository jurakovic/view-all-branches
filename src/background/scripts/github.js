import { log } from '../../utils/logger.js';
import { injectScript } from '../../utils/scripting.js';

export function checkGitHub(tabId, changeInfo, tab, isEnabled, loggingEnabled) {
    const urlPattern = /^https:\/\/github\.com\/([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)\/?/;

    if (isEnabled && urlPattern.test(tab.url) &&
        changeInfo.status === 'complete') {
        log('Matched GitHub URL, page load complete, injecting script');
        injectScript(tabId, 'background/scripts/githubPage.js', loggingEnabled);
    }
};
