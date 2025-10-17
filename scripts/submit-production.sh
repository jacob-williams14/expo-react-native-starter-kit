#!/bin/bash

# Check if platform argument is provided
if [ -z "$1" ]; then
    echo "Error: Platform argument is required"
    echo "Usage: npm run submit:production ios|android"
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
    echo "Submitting for iOS (production)..."
    eas submit -p ios --profile production
elif [ "$PLATFORM" == "android" ]; then
    echo "Submitting for Android (production)..."
    eas submit -p android --profile production
    exit 1
fi 