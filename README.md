![Expo, Expo!](https://github.com/user-attachments/assets/2cb9d90a-4c88-48d5-bdfe-1ad53c77b0c5)

# Expo, Expo! 🍔

[![Tests](https://github.com/imdevan/expo-expo/actions/workflows/test.yml/badge.svg)](https://github.com/imdevan/expo-expo/actions/workflows/test.yml)
[![codecov](https://codecov.io/gh/imdevan/expo-expo/graph/badge.svg)](https://codecov.io/gh/imdevan/expo-expo)

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

The goal of this project is jump start Expo app development with all the bells and whistles that I personally would want to see in a production web-first React Native app.

Inspired primarily by [Next Launch](https://github.com/imdevan/next-launch), [Take Out](https://tamagui.dev/takeout), and [Next-js-Boilerplate](https://github.com/ixartz/Next-js-Boilerplate/tree/main).

I've considered [Expo Boilerplate](https://github.com/Milvasoft/expo-boilerplate) and [React-Native-Boilerplate](https://github.com/thecodingmachine/react-native-boilerplate). But for various reasons neither of those met my specific needs or DX interests.

Please consider using this boilerplate for you next React Native / React Native Web project if the features on [The Roadmap](#-roadmap-) seem interesting to you.

## Get started

1. Install dependencies

   ```bash
   yarn
   ```

2. Start the app

   ```bash
   yarn expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## 🥡 What's in the Box? 🥡

- [x] Out of the box Expo project
- [x] Connect to supabase
- [x] Authentication + auth page
- [x] Jest config
- [x] Unit tests
- [x] Playwright config
- [x] End-to-end testing
- [x] Localization
- [x] Github workflow
- [x] Prettier + Linter Configs
- [x] Final-Form integration
- [x] Zod form validation
- [x] Tailwind + Native support
- [x] Moti animations
- [x] Next.js wrapper for web deployments
- [x] Husky pre-push config
- [x] Auto-format on Save
- [x] Dark Mode Toggle
- [x] Easy tailwind typography config

## 🚧 Roadmap 🚧

This project is just getting started and I plan to be actively readding features to
this boilerplate as I use it to develop my next projects.

[Please feel free to drop a pull request or open an issue if you'd like to contribute!](https://github.com/imdevan/expo-expo/issues/new/choose)

- [x] Version 0 including features listed above 👆
- [ ] Easier app theme configs
- [ ] Abstract supabase service to be used easily with any backend
- [ ] Basic settings page
- [ ] Easy deploy to web, android, and ios
