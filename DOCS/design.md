# Technical Specification: SubbyView

## 1. Introduction
SubbyView is a mobile app that lets deaf and hard-of-hearing users read captions when none are otherwise provided — at a cinema screening, in a car, at a live event, etc. It is a standalone caption reader: there is no audio or video playback in the app. The user imports a subtitle file and starts a manual stopwatch in sync with the real-world source (the movie, the radio, the speaker), and the app displays whichever caption line matches the stopwatch's current time. The app focuses on simplicity, background operation, and easy resyncing when drift occurs.

## 2. Core Features
### 2.1 Subtitle Support & Parsing
- **Supported Formats**: `.srt`, `.vtt`, `.ass`, `.ssa`, and other common subtitle formats.
- **Parser Implementation**: A robust parser capable of converting various subtitle formats into a standardized internal timestamped event model.

### 2.2 File Management
- **Import Mechanism**: Users can browse local storage to select a subtitle file via the system document picker (Storage Access Framework on Android — no runtime storage permission required).
- **Single File Focus**: The app pairs with exactly one subtitle file at a time; importing a new one replaces the current session.

### 2.3 Stopwatch Engine
- **Playback Controls**: Play, Pause, and Stop control a stopwatch, not a media player — there is no underlying audio/video track.
- **Progress Tracking**: A visual progress bar representing the stopwatch's position relative to the subtitle file's total duration (derived from the last cue's end time).
- **Time Synchronization**: The subtitle text shown is whichever cue's time window contains the stopwatch's current time.
- **Resync Controls**: Because the stopwatch can drift from the real-world source over time, the user can jump forward/back to the previous or next caption line to correct drift ("tap-to-resync").

### 2.4 Background Execution & Notifications
- **Background Service**: The app must keep the stopwatch running (and captions viewable) when minimized or when the screen is off, e.g. phone in a pocket during a screening.
- **Notification Controller**:
    - A persistent notification in the system tray showing the current caption line.
    - Interactive controls (Play/Pause/Stop) directly within the notification area.

## 3. User Interface (UI) Requirements
### 3.1 Main Screen
- **Text Display Area**: Large, readable area for the current subtitle line.
- **Playback Controls**: Centered Play/Pause button.
- **Progress Bar**: Seekable bar showing elapsed and total time.
- **Resync Buttons**: Previous-line / Next-line controls near the progress bar.
- **Responsive Design**: The UI must adapt seamlessly to both Portrait and Landscape orientations.

### 3.2 Navigation & Menus
- Minimalist approach: Focus on the caption display. Use a simple menu for importing a new subtitle file / settings.

## 4. Technical Stack (Proposed)
- **Framework**: React Native (for cross-platform Android/iOS compatibility).
- **Language**: Typescript -> No Javascript except compiling
- **State Management**: Redux Toolkit.
- **Local Storage**: Accessing the device's file system via the system document picker.

## 5. Functional Requirements
| ID | Requirement | Description |
|:---|:------------|:------------|
| FR-01 | File Import | User can select a subtitle file from the device storage. |
| FR-02 | Parsing | The app parses the selected subtitle file into time-based segments. |
| FR-03 | Synchronization | Subtitle text updates automatically as the stopwatch's time progresses. |
| FR-04 | Background Operation | The stopwatch keeps running and captions stay viewable when the user switches to another app or the screen locks. |
| FR-05 | Notification Control | Users can control the stopwatch (play/pause/stop) via the system notification bar. |
| FR-06 | Orientation Change | The UI layout must resize/redraw correctly on rotation. |
| FR-07 | Resync | User can jump to the previous/next caption line to correct drift between the stopwatch and the real-world source. |

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
