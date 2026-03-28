## Overview

**YariTrip** is a modern travel booking mobile application delivering curated journeys, effortless bookings, and a refined travel experience — all from one place.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Mobile Framework | React Native CLI |
| Language | JavaScript |
| Navigation | React Navigation |
| Global State | Zustand |
| Server State | React Query |
| HTTP Client | Axios |
| Backend | Spring Boot 3.x + Spring Security |
| Auth | JWT + Google OAuth2 |

---

## 🏗️ Architecture

```
Screen → Hook → Service → apiClient
```

```
src/
├── navigation/
├── features/
│   └── [feature]/
│       ├── screens/       # UI only
│       ├── hooks/         # Business logic
│       ├── services/      # API calls
│       └── components/
├── services/
│   └── apiClient.js
├── store/
│   └── authStore.js
└── theme/
    └── colors.js
```

---

## 🚀 Installation

```bash
# Clone the repo
git clone https://github.com/sathyasoftechin/yaritrip-android.git
cd yaritrip-android

# Install dependencies
npm install

# iOS only
cd ios && pod install && cd ..

# Run on Android
npm run android

# Run on iOS
npm run ios
```

---

## 🏢 About

**YariTrip** is a product of **Sathya Softech-in** — a technology startup building intelligent software for modern businesses.

> We design scalable digital products, AI-powered solutions, and innovative technology experiences that drive business growth. Our approach combines creativity, strategy, and advanced technology to deliver meaningful results.

---


<div align="center">

© 2025 Sathya Softech-in. All rights reserved.

</div>
