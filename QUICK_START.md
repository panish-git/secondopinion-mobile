# Quick Start: Generate APK

## Fast Track (5 Steps)

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Build Web App
```bash
pnpm run export
```

### 3. Add Android Platform
```bash
npx cap add android
```

### 4. Open in Android Studio
```bash
npx cap open android
```

### 5. Build APK
In Android Studio:
- Wait for sync to finish
- Click **Build** → **Build Bundle(s) / APK(s)** → **Build APK(s)**
- Find APK at: `android/app/build/outputs/apk/debug/app-debug.apk`

## Transfer to Phone
- Copy APK file to your phone
- Open file and tap Install
- Allow installation from unknown sources if prompted

Done! Your app is installed.

## Need Help?
See full instructions in `BUILD_ANDROID_APK.md`
