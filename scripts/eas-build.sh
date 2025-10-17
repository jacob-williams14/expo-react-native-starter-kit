#!/bin/bash

# Print the current fingerprints
echo "Current Android fingerprint: $ANDROID_FINGERPRINT"
echo "Current iOS fingerprint: $IOS_FINGERPRINT"

# Log any builds that match the current fingerprint for each platform
IOS_BUILD_INFO=$(eas build:list --platform ios --buildProfile staging --fingerprint-hash $IOS_FINGERPRINT --limit 1 --json --non-interactive)
ANDROID_BUILD_INFO=$(eas build:list --platform android --buildProfile staging --fingerprint-hash $ANDROID_FINGERPRINT --limit 1 --json --non-interactive)

echo "iOS Build Info (raw JSON):"
echo "$IOS_BUILD_INFO" | jq '.'
echo "Android Build Info (raw JSON):"
echo "$ANDROID_BUILD_INFO" | jq '.'

# Check if builds exist by counting the number of builds in the JSON array
IOS_BUILD_COUNT=$(echo "$IOS_BUILD_INFO" | jq '. | length')
ANDROID_BUILD_COUNT=$(echo "$ANDROID_BUILD_INFO" | jq '. | length')

echo "iOS Build Count: $IOS_BUILD_COUNT"
echo "Android Build Count: $ANDROID_BUILD_COUNT"

# If there are no builds that match the current fingerprint, create new ones
if [ "$IOS_BUILD_COUNT" = "0" ] || [ "$ANDROID_BUILD_COUNT" = "0" ]; then
    echo "No builds found that match the current fingerprint, creating new builds"

    if [ "$IOS_BUILD_COUNT" = "0" ]; then
        echo "Creating new iOS staging build..."
        eas build --profile staging --platform ios --non-interactive
        echo "Creating new iOS development build..."
        eas build --profile preview --platform ios --non-interactive
    fi

    if [ "$ANDROID_BUILD_COUNT" = "0" ]; then
        echo "Creating new Android staging build..."
        eas build --profile staging --platform android --non-interactive
        echo "Creating new Android development build..."
        eas build --profile preview --platform android --non-interactive
    fi
else
    echo "Existing builds found for all platforms and profiles, no new builds needed"
fi
