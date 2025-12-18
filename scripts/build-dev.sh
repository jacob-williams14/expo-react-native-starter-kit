#!/bin/bash

# Check if platform argument is provided
if [ -z "$1" ]; then
    echo "Error: Platform argument is required"
    echo "Usage: npm run build:dev ios|android"
    exit 1
fi

PLATFORM=$1

# Validate platform argument
if [ "$PLATFORM" != "ios" ] && [ "$PLATFORM" != "android" ]; then
    echo "Error: Invalid platform '$PLATFORM'"
    echo "Valid platforms: ios, android"
    exit 1
fi

# Handle platform-specific logic
if [ "$PLATFORM" == "ios" ]; then
    echo "Building for iOS (dev)..."
    eas build -p ios --profile dev
elif [ "$PLATFORM" == "android" ]; then
    echo "Building for Android (dev)..."
    eas build -p android --profile dev
fi