
# View All Branches

**View All Branches** is a browser extension that enhances your workflow on GitHub and Azure DevOps by automatically modifying the "Branches" link to take you directly to the "All Branches" page.

## Description

When navigating a repository on GitHub or Azure DevOps, users often need to access the "All Branches" view to see a complete list of branches. By default, clicking the "Branches" link takes you to a filtered view (like "Overview" or "Mine"), requiring an additional click to reach the full list. This extension streamlines that process by redirecting the "Branches" link to the comprehensive "All Branches" view, saving you time and effort.

The extension is lightweight, configurable, and can be enabled or disabled at any time through a simple popup interface.

## Motivation

Most of the time, I want to see the complete branch list rather than a subset filtered by some criteria. I found the default filtered views on GitHub to be more of a hindrance than a help. Since GitHub does not provide a built-in option to change this default behavior, I created this extension to automatically redirect to the "All Branches" view.

I've been using this extension personally for quite some time to streamline my daily workflow. Eventually, I expanded it to support Azure DevOps as well, and decided to make it publicly available for other developers who maybe share the same preference.

## Features

- **Multi-Platform Support**: Works seamlessly on both GitHub and Azure DevOps.
- **Automatic Link Modification**: Automatically changes branch links to point to the "All Branches" view on both platforms.
- **Dynamic Content Support**: Uses a `MutationObserver` to detect and update links that are loaded dynamically, such as the branches dropdown in GitHub and header navigation in Azure DevOps.
- **Configurable Settings**: Enable/disable functionality per platform through the popup interface.
- **Debug Logging**: Optional console logging for troubleshooting.
- **Minimalist UI**: A clean and simple popup for managing settings.

## Installation

To install the extension locally in a Chromium-based browser (like Google Chrome or Microsoft Edge), follow these steps:

1. Clone this repository:
   ```bash
   git clone https://github.com/jurakovic/view-all-branches.git
   ```
2. In your browser, navigate to `chrome://extensions` or `edge://extensions`
3. Enable "Developer mode" in the top right
4. Click "Load unpacked" and select the `src` folder from this repository

> See more details [here](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked).

## Roadmap

- Add support for additional platforms (e.g., GitLab, Bitbucket).
- Publish the extension to the Chrome Web Store and Microsoft Edge Add-ons for easier installation.
- Port the extension to Firefox and other browsers.

## License

MIT
