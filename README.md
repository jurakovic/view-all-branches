
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
- **Enable/Disable**: A simple toggle switch in the extension popup allows you to turn the feature on or off at any time.
- **Configurable Logging**: Includes a separate toggle for enabling or disabling console logging, which is useful for debugging.
- **Minimalist UI**: A clean and simple popup for managing settings.

## Installation

To install the extension locally in a Chromium-based browser (like Google Chrome or Microsoft Edge), follow these steps:

1.  **Download or Clone the Repository**:
    ```bash
    git clone https://github.com/jurakovic/view-all-branches.git
    ```
2.  **Open the Extensions Page**:
    -   In your browser, navigate to `chrome://extensions` or `edge://extensions`.
3.  **Enable Developer Mode**:
    -   Turn on the "Developer mode" toggle, which is usually located in the top-right corner of the page.
4.  **Load the Extension**:
    -   Click the "**Load unpacked**" button.
    -   Select the `src` directory from the cloned repository.

The extension icon should now appear in your browser's toolbar.

## How to Use

1.  Navigate to a repository page on either **GitHub** or **Azure DevOps**.
    -   **GitHub Example**: `https://github.com/jurakovic/view-all-branches`
    -   **Azure DevOps Example**: `https://dev.azure.com/organization/project/_git/repository`
2.  Click the extension icon in your browser's toolbar to open the settings popup.
3.  Use the toggles to:
    -   **GitHub**: Turn the automatic link modification for GitHub on or off.
    -   **Azure DevOps**: Turn the automatic link modification for Azure DevOps on or off.
    -   **Console Logs**: Turn on console logging for debugging purposes.

When the feature is enabled for desired platform, any link on the page that points to a repository's branches will be automatically updated to direct you to the "All Branches" view.
