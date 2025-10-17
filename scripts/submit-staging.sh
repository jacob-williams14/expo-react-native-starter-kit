#!/bin/bash

# Check if platform argument is provided
if [ -z "$1" ]; then
    echo "Error: Platform argument is required"
    echo "Usage: npm run submit:staging ios|android"
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
    echo "Submitting for iOS (staging)..."
    eas submit -p ios --profile staging
elif [ "$PLATFORM" == "android" ]; then
    echo "Error: Android staging submissions are not yet automated"
    echo "Manual submission required for Android staging builds"
    exit 1
fi 