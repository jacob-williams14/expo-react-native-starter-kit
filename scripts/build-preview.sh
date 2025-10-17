#!/bin/bash

# Check if platform argument is provided
if [ -z "$1" ]; then
    echo "Error: Platform argument is required"
    echo "Usage: npm run build:preview ios|android"
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
    echo "Building for iOS (preview)..."
    eas build -p ios --profile preview
elif [ "$PLATFORM" == "android" ]; then
    echo "Building for Android (preview)..."
    eas build -p android --profile preview
fi 