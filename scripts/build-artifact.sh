#!/bin/bash

# Check if platform argument is provided
if [ -z "$1" ]; then
    echo "Error: Platform argument is required"
    echo "Usage: npm run build:artifact ios|android"
    exit 1
fi

PLATFORM=$1

# Validate platform argument
if [ "$PLATFORM" != "ios" ] && [ "$PLATFORM" != "android" ]; then
    echo "Error: Invalid platform '$PLATFORM'"
    echo "Valid platforms: ios, android"
    exit 1
fi

echo "Building for $PLATFORM..."
eas build -p "$PLATFORM" --profile artifact --local