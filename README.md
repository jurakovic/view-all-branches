
# View All Branches

**View All Branches** is a browser extension that enhances your workflow on GitHub and Azure DevOps by automatically modifying the "Branches" link to take you directly to the "All Branches" page.

## Description

When navigating a repository on GitHub, clicking the "Branches" link typically shows you an overview page with only a subset of active branches. This extension streamlines that process by changing the link's destination to the comprehensive `/branches/all` view, saving you a click every time.

Similarly, on Azure DevOps, the extension modifies "Branches" links to navigate directly to the "All" tab, bypassing the default "Mine" view. This works for the current repository as well as for other repositories linked in the header navigation.

The extension is lightweight, configurable, and can be enabled or disabled at any time through a simple popup interface.

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
