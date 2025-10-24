
# View All Branches

**View All Branches** is a browser extension that enhances your workflow on GitHub by automatically modifying the "Branches" link to take you directly to the "All Branches" page.

## Description

When navigating a repository on GitHub, clicking the "Branches" link typically shows you an overview page with only a subset of active branches. To see all branches, you must click another link. This extension streamlines that process by changing the initial link's destination to the comprehensive "All Branches" view, saving you a click every time.

The extension is lightweight, configurable, and can be enabled or disabled at any time through a simple popup interface.

## Features

- **Automatic Link Modification**: Automatically changes the branches link on GitHub repository pages to point to the `/branches/all` view.
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

1.  Navigate to any repository page on GitHub (e.g., `https://github.com/owner/repo`).
2.  Click the extension icon in your browser's toolbar to open the settings popup.
3.  Use the toggles to:
    -   **Enable href update**: Turn the automatic link modification on or off.
    -   **Enable logging**: Turn on console logging for debugging purposes.

When the feature is enabled, any link on the page that points to the repository's branches will be automatically updated to direct you to the "All Branches" view.
