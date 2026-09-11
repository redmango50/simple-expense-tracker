# Installation Guide

## Prerequisites

### 1. Visual Studio Code
* Download the installer from the [Official VS Code Website](https://code.visualstudio.com/).
* Run the installer and follow the on-screen prompts.
* Open VS Code to ensure it launches correctly.

#### Installing Extensions
* Navigate to the Extensions tab by pressing <kbd>Ctrl</kbd> + <kbd>Shift</kbd> + <kbd>X</kbd> (or <kbd>⌘</kbd> + <kbd>⇧</kbd> + <kbd>X</kbd> on Mac).
* Search for **Live Server** by *Ritwick Dey* and click **Install**.
* Search for **Deno** by *Denoland* and click **Install**.

### 2. Deno Runtime
* Download the runtime from the [Official Deno Website](https://docs.deno.com/runtime/getting_started/installation/).
* Verify the installation by running `deno --version` in your terminal.
* Ensure your installed version is `2.9.6` or above.

---

## Getting the Project

You can either clone the project using Git (recommended) or download it directly.

### Option A: Using Git (Recommended)
If you do not have Git installed, download it from the [Official Git Website](https://git-scm.com).

```bash
# Clone this repository
git clone https://github.com/redmango50/simple-expense-tracker

# Navigate into the project directory
cd simple-expense-tracker
```

### Option B: Direct Download
1.Click the green **Code** button at the top of this GitHub page.
2.Select **Download ZIP**.
3.Extract the ZIP file and open the extracted folder in VS Code.

## Starting The Application

Before you begin, ensure you are in the project's root directory.

### Starting Frontend
 
1  Navigate into the `client` folder.
2. Open `index.html` inside VS Code.
3. Click **Go Live** in the VS Code status bar.

## Starting Backend

1. Open a new terminal <kbd>Ctrl</kbd> + <kbd>J</kbd> (or <kbd>⌘</kbd> + <kbd>J</kbd> on Mac)
2. Navigate to the server folder:
   ```bash
   cd server
   ```
3. Start the server:
   ```bash
   deno task run
   ```


* **Backend:** Look for `Server running on port 9000` in the terminal.
* **Frontend:** Your browser will open the app automatically.%

Setup complete. The application is ready.