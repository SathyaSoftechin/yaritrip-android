# YariTrip – Android Setup and Build Guide

This is a quick guide to run the app locally, update the backend IP, and generate debug and release APKs.

---

## Prerequisites

Make sure the following are installed:

* Node.js (v18 or above)
* Java JDK 17
* Android Studio with SDK and emulator
* An Android device or emulator

---

## Setup

Clone the repository and install dependencies:

```
git clone <repo-url>
cd yaritrip-android
npm install
```

---

## Update API IP

Before running the app, update the backend URL.

Open:

```
src/api/apiClient.js
```

Find the base URL:

```js
baseURL: "http://192.168.x.x:5000"
```

Replace it with your local machine IP:

```js
baseURL: "http://YOUR_IP:PORT"
```

Example:

```
http://192.168.1.5:5000
```

Make sure:

* The backend server is running
* Your phone/emulator is on the same network

---

## Running the App (Debug)

Start Metro:

```
npx react-native start
```

In another terminal:

```
npx react-native run-android
```

The app should install and open automatically.

---

## Debug APK

To generate a debug APK:

```
cd android
gradlew assembleDebug
```

Output:

```
android/app/build/outputs/apk/debug/app-debug.apk
```

---

## Release APK

### Keystore (one-time setup)

Generate a keystore:

```
keytool -genkeypair -v -storetype PKCS12 -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
```

Place the file inside:

```
android/app/
```

---

### Add credentials

Open:

```
android/gradle.properties
```

Add:

```
MYAPP_UPLOAD_STORE_FILE=my-release-key.keystore
MYAPP_UPLOAD_KEY_ALIAS=my-key-alias
MYAPP_UPLOAD_STORE_PASSWORD=yourpassword
MYAPP_UPLOAD_KEY_PASSWORD=yourpassword
```

---

### Build release APK

```
cd android
gradlew assembleRelease
```

Output:

```
android/app/build/outputs/apk/release/app-release.apk
```

---

## After Code Changes

* For development, just reload the app in debug mode
* For release builds, run:

```
gradlew assembleRelease
```

---

## Common Issues

App shows "check your connection":

* Verify API IP is correct
* Backend is running
* Device and backend are on the same network

Build issues:

```
cd android
gradlew clean
```
