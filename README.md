# Vitamin Tracker

A mobile vitamin and supplement tracking app built with **React Native and Expo**. It helps users check in on how they're feeling and view personalized results about their possible vitamin deficiencies.

## 🛠️ Tech Stack

### Frontend

* React Native
* Expo
* Expo Router
* TypeScript
* JavaScript
* React

### Backend

* Node.js
* Express

### Development Tools

* npm
* Git / GitHub
* VS Code

## 📁 Project Structure

```text
vitamin-tracker/
├── app/                    # Application screens and Expo Router routes
│   ├── (tabs)/             # Main tab-based screens
│   ├── results.tsx         # Results screen
│   └── _layout.tsx         # Root navigation layout
├── backend/                # Node.js backend
│   ├── server.js
│   ├── package.json
│   └── .gitignore
├── components/             # Reusable React Native components
├── constants/              # App constants and theme colors
├── hooks/                  # Custom React hooks
├── utils/                  # Utility functions and local storage helpers
├── assets/                 # Images and fonts
├── app.json                # Expo configuration
├── package.json            # Frontend dependencies and scripts
└── tsconfig.json           # TypeScript configuration
```

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

* [Node.js](https://nodejs.org/)
* npm
* Expo-compatible development environment
* Expo Go, Android Studio, or an iOS simulator if you want to run the mobile app

### 1. Clone the repository

```bash
git clone https://github.com/NafisaSalsabil/vitamin-tracker.git
cd vitamin-tracker
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Start the Expo development server

```bash
npx expo start
```

From the Expo CLI, you can open the application using:

* Expo Go
* Android emulator
* iOS simulator
* Development build

## 🔐 Environment Variables

This project may use environment variables for configuration and API credentials.

Create a local `.env` file when required:

```env
YOUR_VARIABLE_NAME=your_value
```

**Never commit `.env` files or API keys to GitHub.**

The repository's `.gitignore` is configured to exclude environment files.

## 🖥️ Running the Backend

Navigate to the backend directory:

```bash
cd backend
npm install
```

Then start the backend using the appropriate script defined in `backend/package.json`.

```bash
npm start
```

If the backend requires environment variables, configure them locally before starting the server.

## 🧪 Development

The main application screens are located inside the `app/` directory.

With Expo running, changes to the source code can be reflected in the development application through Expo's development workflow.

Useful commands:

```bash
# Install dependencies
npm install

# Start Expo
npx expo start

# Start with a cleared cache
npx expo start -c
```

## 🔒 Privacy & Security

Vitamin Tracker may handle personal health-related information entered by users. Do not commit private user information, API credentials, authentication tokens, or other secrets to the repository.

Environment variables should be stored locally and excluded from version control.

## 📌 Project Status

🚧 **In development**

This project is actively being developed and may continue to receive improvements to its interface, tracking functionality, backend integration, and user experience.

## 👩‍💻 Author

**Nafisa Salsabil**

GitHub: [NafisaSalsabil](https://github.com/NafisaSalsabil)


