# 📦 Product List Manager — React Native

## Project Overview

A **React Native** mobile application for managing a product list with advanced state handling, including optimistic updates, undo/redo functionality, and background data synchronization.

The focus of this implementation is not just UI, but handling real-world complexities like async operations, race conditions, and state consistency — all adapted for a native mobile environment.

---

## Key Features

- Product list with search, filter, and sorting
- Inline category editing with optimistic updates
- Undo / Redo using patch-based history
- Simulated API with delay and failure handling
- Background data updates (price & rating)
- Conflict resolution between user actions and server updates

---

## Architecture Decisions

### State Management

Used **Zustand** for:
- Lightweight global state
- Fine-grained subscriptions
- Better control over async + history logic

### Data Flow

```
Server State (products) --> Derived State (filter/search/sort) --> UI
```

### Optimistic Updates

- UI updates immediately on user action
- API call happens in the background
- On failure → automatic rollback to previous state

### Undo / Redo Strategy

- Implemented using patch-based history
- Stores only category changes
- Efficient and memory-friendly

### Race Condition Handling

- Each update is assigned a unique `requestId`
- Only the latest response is applied
- Prevents stale updates from overriding newer ones

### Background Sync

- Polling every 5 seconds
- Updates price & rating fields
- Skips rows currently under user interaction

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React Native (with Expo) |
| Language | TypeScript |
| State Management | Zustand |
| Styling | StyleSheet / NativeWind (Tailwind for RN) |
| Navigation | React Navigation |

---

## Project Structure

```
src/
├── components/       # Reusable UI components
├── store/            # Zustand store + slices
├── hooks/            # Custom React hooks
├── services/         # API simulation layer
└── types/            # Shared TypeScript types
```

---

## Prerequisites

- Node.js >= 18
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator, or the **Expo Go** app on a physical device

---

## How to Run

```bash
# Install dependencies
npm install

# Start the Expo development server
npx expo start
```

Then press:
- `i` to open in iOS Simulator
- `a` to open in Android Emulator
- Scan the QR code with **Expo Go** to run on a physical device

---

## Running on a Physical Device

1. Install **Expo Go** from the App Store or Google Play
2. Ensure your phone and development machine are on the same Wi-Fi network
3. Scan the QR code shown in the terminal after `npx expo start`

---

## Building for Production

```bash
# Build for Android
npx expo build:android

# Build for iOS
npx expo build:ios
```

> For production builds, it is recommended to use **EAS Build**: `npx eas build`