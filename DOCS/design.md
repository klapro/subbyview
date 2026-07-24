# Technical Specification: SubbyView

## 1. Introduction
SubbyView is a mobile application designed to allow users to view and synchronize subtitle files (.srt, .vtt, .ass, .ssa, etc.) with an audio/video track. The app focuses on simplicity, background playback capabilities, and ease of file importing.

## 2. Core Features
### 2.1 Subtitle Support & Parsing
- **Supported Formats**: `.srt`, `.vtt`, `.ass`, `.ssa`, and other common subtitle formats.
- **Parser Implementation**: A robust parser capable of converting various subtitle formats into a standardized internal timestamped event model.

### 2.2 File Management
- **Import Mechanism**: Users can browse local storage to select subtitle files.
- **Permissions**: The app will request `READ_EXTERNAL_STORAGE` (or equivalent modern scoped storage permissions) to access files.
- **File Pairing**: Ability to associate a subtitle file with an audio or video track.

### 2.3 Playback Engine
- **Playback Controls**: Play, Pause, and Stop functionality.
- **Progress Tracking**: A visual progress bar representing the current position in the track/subtitle timeline.
- **Time Synchronization**: Precise rendering of subtitle text based on the current playback timestamp.

### 2.4 Background Execution & Notifications
- **Background Service**: The app must maintain a foreground service to ensure playback continues when the app is minimized.
- **Notification Controller**:
    - A persistent notification in the system tray showing the currently active track/file.
    - Interactive controls (Stop/Pause) directly within the notification area.

## 3. User Interface (UI) Requirements
### 3.1 Main Player Screen
- **Text Display Area**: Large, readable area for subtitle text.
- **Playback Controls**: Centered Play/Pause button.
- **Progress Bar**: Seekable bar showing elapsed and total time.
- **Responsive Design**: The UI must adapt seamlessly to both Portrait and Landscape orientations.

### 3.2 Navigation & Menus
- Minimalist approach: Focus on the player. Use a simple menu for file imports/settings.

## 4. Technical Stack (Proposed)
- **Framework**: React Native (for cross-platform Android/iOS compatibility).
- **Language**: Typescript -> No Javascript except compiling
- **State Management**: Provider, Bloc, or Redux to handle playback state and subtitle synchronization.
- **Local Storage**: Accessing the device's file system via platform channels.

## 5. Functional Requirements
| ID | Requirement | Description |
|:---|:------------|:------------|
| FR-01 | File Import | User can select a file from the device storage. |
| FR-02 | Parsing | The app parses the selected subtitle file into time-based segments. |
| FR-03 | Synchronization | Subtitle text updates automatically as the playback time progresses. |
| FR-04 | Background Play | Audio/Track continues playing when the user switches to another app. |
| FR-05 | Notification Control | Users can stop playback via the system notification bar. |
| FR-06 | Orientation Change | The UI layout must resize/redraw correctly on rotation. |

## 7. Development and Testing

This section describes how to run, test, and debug SubbyView on various platforms.

### 7.1 Prerequisites

- **Android Studio** (for Android Emulator)
- **ADB (Android Debug Bridge)** installed and in your PATH
- A physical Android device with **USB Debugging** enabled (found in Developer Options)
- (Optional) iOS Simulator (if developing for iOS on macOS)

### 7.2 Testing via Android Emulator

1. Open **Android Studio**.
2. Launch the **Device Manager**.
3. Start a running emulator (AVD).
4. Once the emulator is running, connect it to your development environment (e.g., run `flutter run` or `npm run android`).

### 7.3 Testing on Physical Android Device via USB

1. Enable **Developer Options** on your phone:
   - Go to **Settings** > **About Phone**.
   - Tap **Build Number** 7 times until it says "You are now a developer!".
2. Enable **USB Debugging**:
   - Go to **Settings** > **System** > **Developer Options**.
   - Toggle **USB Debugging** to **ON**.
3. Connect your device to your computer via USB cable.
4. Verify connection:
   - Run `adb devices` in your terminal.
   - You should see your device listed under the connected devices section.

### 7.4 Using ADB Shell for Testing

You can use `adb shell` to interact with the app's files and environment directly on the device:

- **Check logs**: Use `adb logcat` to view real-time logs from the application.
- **Push files**: Use `adb push <local_path> <remote_path>` to move subtitle files onto the device for testing.
- **Execute commands**: Use `adb shell <command>` to run shell commands on the device (e.g., checking storage or permissions).
