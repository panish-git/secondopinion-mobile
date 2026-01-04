# Building Android APK for SecondOpinion.com

This guide will help you generate an Android APK file from the Next.js web application.

## Prerequisites

Before you begin, install the following:

1. **Node.js** (v18 or higher)
   - Download from: https://nodejs.org/

2. **pnpm** (Package Manager)
   ```bash
   npm install -g pnpm
   ```

3. **Android Studio** (for Android SDK)
   - Download from: https://developer.android.com/studio
   - During installation, make sure to install:
     - Android SDK
     - Android SDK Platform-Tools
     - Android SDK Build-Tools

4. **Java Development Kit (JDK 17)**
   - Download from: https://www.oracle.com/java/technologies/downloads/

## Step-by-Step Build Instructions

### Step 1: Install Dependencies

```bash
pnpm install
```

This will install all Node.js dependencies including Capacitor.

### Step 2: Build the Next.js Application

```bash
pnpm run export
```

This creates a static export in the `out` directory.

### Step 3: Initialize Capacitor Android Platform

```bash
npx cap add android
```

This creates the `android` folder with the native Android project.

### Step 4: Sync Web Assets to Android

```bash
npx cap sync android
```

This copies the built web assets to the Android project.

### Step 5: Open in Android Studio

```bash
npx cap open android
```

This opens the project in Android Studio.

### Step 6: Build APK in Android Studio

1. **Wait for Gradle sync to complete** (first time may take several minutes)

2. **Select Build Variant:**
   - Click `Build` menu → `Select Build Variant`
   - Choose `release` or `debug`

3. **Build APK:**
   - Click `Build` menu → `Build Bundle(s) / APK(s)` → `Build APK(s)`
   - Wait for build to complete

4. **Locate APK:**
   - APK will be in: `android/app/build/outputs/apk/debug/app-debug.apk`
   - Or for release: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### Step 7: Install APK on Device

**Method 1: USB Connection**
```bash
adb install android/app/build/outputs/apk/debug/app-debug.apk
```

**Method 2: Transfer File**
- Copy APK to phone via USB, email, or cloud storage
- Open the APK file on phone
- Allow "Install from Unknown Sources" if prompted
- Install the app

## Alternative: Build APK via Command Line

### For Debug APK (Unsigned)
```bash
cd android
./gradlew assembleDebug
```
Output: `android/app/build/outputs/apk/debug/app-debug.apk`

### For Release APK (Unsigned)
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release-unsigned.apk`

### For Signed Release APK

1. **Generate Keystore** (one-time setup):
```bash
keytool -genkey -v -keystore secondopinion.keystore -alias secondopinion -keyalg RSA -keysize 2048 -validity 10000
```

2. **Configure Signing** in `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file("../../secondopinion.keystore")
            storePassword "your-password"
            keyAlias "secondopinion"
            keyPassword "your-password"
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

3. **Build Signed APK:**
```bash
cd android
./gradlew assembleRelease
```
Output: `android/app/build/outputs/apk/release/app-release.apk`

## Quick Build Script

For convenience, you can use:

```bash
pnpm run cap:build
```

This runs `next build` and `cap sync` in one command.

## Troubleshooting

### Error: "ANDROID_HOME not set"
- Set environment variable:
  - **Windows:** `setx ANDROID_HOME "C:\Users\YourName\AppData\Local\Android\Sdk"`
  - **Mac/Linux:** Add to `~/.bashrc` or `~/.zshrc`:
    ```bash
    export ANDROID_HOME=$HOME/Library/Android/sdk
    export PATH=$PATH:$ANDROID_HOME/platform-tools
    ```

### Error: "Gradle build failed"
- Check Java version: `java -version` (should be 17)
- Clean Gradle cache: `cd android && ./gradlew clean`

### Error: "Module not found"
- Re-run: `pnpm install`
- Re-sync: `npx cap sync android`

### App crashes on launch
- Check console logs: `adb logcat`
- Verify `webDir: 'out'` in `capacitor.config.ts` matches build output

## App Configuration

Edit `capacitor.config.ts` to customize:
- `appId`: Bundle identifier (e.g., `com.yourcompany.app`)
- `appName`: Display name on device
- Splash screen colors and duration

Edit `android/app/src/main/res/values/strings.xml` for app name:
```xml
<string name="app_name">SecondOpinion</string>
```

## Updating the App

When you make changes:

```bash
pnpm run export           # Rebuild web app
npx cap sync android      # Sync changes to Android
npx cap open android      # Rebuild APK in Android Studio
```

## File Size Optimization

To reduce APK size:
1. Use release build (automatically minified)
2. Remove unused dependencies from `package.json`
3. Optimize images in the `public` folder
4. Enable ProGuard in `android/app/build.gradle`

## Next Steps

- **App Icons:** Replace default icons in `android/app/src/main/res/mipmap-*`
- **Splash Screen:** Customize in `android/app/src/main/res/drawable/splash.png`
- **Permissions:** Edit `android/app/src/main/AndroidManifest.xml`
- **Google Play:** Follow Android's signing and publishing guidelines

## Support

For issues:
- Capacitor Docs: https://capacitorjs.com/docs
- Next.js Static Export: https://nextjs.org/docs/app/building-your-application/deploying/static-exports
- Android Studio: https://developer.android.com/studio/intro
