#!/bin/bash

# Check if platform argument is provided
if [ -z "$1" ]; then
    echo "Error: Platform argument is required"
    echo "Usage: npm run submit:preview ios|android"
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
    echo "Submitting for iOS (preview)..."
    eas submit -p ios --profile preview
elif [ "$PLATFORM" == "android" ]; then
    echo "Error: Android preview submissions are not yet automated"
    echo "Manual installation on physical device required for Android development builds"
    exit 1
fi