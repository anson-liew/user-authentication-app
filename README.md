# Welcome to my user-authentication-app 👋

A simple React Native authentication app built with **TypeScript**, **React Navigation**, **Context API**, and **AsyncStorage**.  
This project demonstrates a basic **login / signup flow**, form validation, persistent authentication state, and reusable UI components.

---

## 📱 Features

### Authentication

- User **Signup** with name, email, and password
- User **Login** with email and password
- **Logout** functionality
- Authentication state managed globally using **React Context**
- User session persisted using **AsyncStorage**

### Navigation

- Implemented using **@react-navigation/native** and **native stack navigator**
- Automatically switches between:
  - Auth screens (Login / Signup)
  - App screen (Home)
- Prevents navigating back after login/logout using `replace`

### Form Validation

- Required field validation
- Email format validation (`@gmail.com`)
- Password length validation (minimum 6 characters)
- Inline error messages displayed below inputs

### UI / UX

- Reusable custom components:
  - `Button` (with loading spinner)
  - `FormInput` (with password visibility toggle)
  - `TextRedirect`
- Loading indicator during login and signup
- Success notifications using **react-native-toast-message**
- Keyboard-aware layout for better mobile UX

---

## Tech Stack

- **React Native**
- **TypeScript**
- **React Navigation (Native Stack)**
- **Context API**
- **AsyncStorage**
- **Expo Vector Icons**
- **Tailwind-style utility classes (via global.css)**

---

## 📂 Project Structure

user-authentication-app
├── components # Reusable UI components
│ ├── Button.tsx
│ ├── FormInput.tsx
│ └── TextRedirect.tsx
├── contexts
│ └── AuthContext.tsx # Authentication logic & state
├── screens
│ ├── LoginScreen.tsx
│ ├── SignupScreen.tsx
│ └── HomeScreen.tsx
├── App.tsx # App entry & navigation
└── global.css

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- QR Code to scan in physical device via Expo Go
- Android Emulator
- iOS Simulator

---

## How it works

On app launch, a splash screen is displayed briefly before navigating to the Login screen for unauthenticated users.

If the user does not have an account, they can tap “Go to Signup” to navigate to the Signup screen using React Navigation (Native Stack Navigator).

Signup Flow

On the Signup screen, the user is required to enter name, email, and password.
Each input field includes its own validation logic:

Name: displays “Name is required” if empty

Email: displays “Email is required” and validates the format using a regular expression that requires the email to end with @gmail.com

Password: displays “Password is required” and “Password must be at least 6 characters” if invalid

For better user experience, a password visibility toggle (eye icon) is provided, allowing users to show or hide the password input.

After all fields pass validation, tapping the Signup button triggers a loading spinner animation for 3 seconds. Upon successful registration, a toast notification with the message “Signup successfully” is shown, and the user is redirected to the Home screen.

Login Flow

The Login screen follows the same validation logic as the Signup screen.
If the entered credentials match a registered user, a loading spinner is displayed before navigating to the Home screen and showing a success toast message.

Home Screen & Logout

The Home screen displays the currently logged-in user’s name and email.
A Logout button is provided, which clears the authentication state and redirects the user back to the Login screen.

Authentication State Management

Authentication is handled using React Context (AuthContext).
On app launch, the app checks AsyncStorage for an existing authenticated user:

If a user is found, the app automatically navigates to the Home screen

If no user is found, the app remains on the Login screen

User credentials are stored locally in AsyncStorage to simulate persistent login for returning users.
