# 💻 CashFlow System - Windows Application Installation Setup Guide

This guide explains how to install, build, and run **CashFlow (Full-Stack Expense Management System)** as a Windows application.

---

## ⚡ Option 1: 1-Click Windows Automated Setup (Recommended)

To set up and install CashFlow automatically on any Windows system with Node.js:

1. Double-click **`Setup-CashFlow-Windows.bat`** (or `Install-CashFlow-Windows.bat`) in the application folder.
2. The setup wizard will automatically:
   - Check Node.js & npm runtime availability.
   - Install backend and frontend dependencies.
   - Compile the React production static bundle (`frontend/dist`).
   - Generate **Desktop** & **Start Menu** shortcuts named **`CashFlow System.lnk`**.
   - Offer 1-click immediate launching!

---

## 🚀 Running the Installed Windows Application

After running the setup script once:
- **Desktop Shortcut**: Double-click **`CashFlow System`** on your Desktop.
- **Start Menu**: Open Windows Start Menu, search for **`CashFlow System`**, and press Enter.

The launcher starts the Express + SQLite backend server silently in the background and opens CashFlow in your default browser at `http://localhost:5000`.

---

## 🖥️ Option 2: Standalone Windows Executable Installer (.exe Setup Wizard)

If you want to package CashFlow into a single standalone `.exe` setup installer file for distribution to other Windows PCs:

### Using Electron Builder (NSIS Setup Installer):
```cmd
npm run dist:win
```
- This compiles a standalone Windows installation wizard: **`dist-electron/CashFlow System Setup 1.0.0.exe`**.
- Running this `.exe` opens a standard Windows setup wizard (Directory selection, Desktop shortcut creation, Start Menu group, Control Panel uninstaller).

### Using Inno Setup Compiler:
1. Install [Inno Setup](https://jrsoftware.org/isinfo.php).
2. Open **`CashFlow-Setup.iss`** in Inno Setup Compiler.
3. Click **Compile** to generate **`dist-installer/CashFlow_Setup_v1.0.0.exe`**.

---

## 🗑️ Option 3: Uninstalling the Windows Application

To clean up shortcuts and build files from your Windows system:

1. Double-click **`Uninstall-CashFlow-Windows.bat`** (or run `npm run uninstall:windows`).
2. This removes Desktop and Start Menu shortcuts and cleans built assets.
3. **Note**: Your SQLite user database located at `backend/expenses.db` is safely preserved!

---

## 📁 System Architecture Overview

- **Backend API**: Node.js + Express + SQLite3 (`http://localhost:5000`)
- **Database Engine**: Embedded SQLite3 database file at `backend/expenses.db`
- **Frontend App**: React 18 + Vite + TailwindCSS + Lucide Icons + Recharts
- **Launcher & Setup Files**:
  - `Setup-CashFlow-Windows.bat` (Main Windows Setup Wizard)
  - `Uninstall-CashFlow-Windows.bat` (Application Cleanup Utility)
  - `Start-CashFlow-Desktop.vbs` (Silent Background Launcher)
  - `create_shortcut.vbs` (Desktop & Start Menu Shortcut Generator)
  - `electron-main.js` (Native Electron Window Wrapper)
  - `CashFlow-Setup.iss` (Inno Setup GUI Installer Script)
