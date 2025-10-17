#!/bin/bash

# Get the most recently merged branch name
MERGED_BRANCH=$(gh pr list -s merged -L 5 --json headRefName,mergedAt | jq -r 'sort_by(.mergedAt) | reverse | .[0].headRefName')
echo "Most recently merged branch: $MERGED_BRANCH"

# Check if corresponding eas branch exists
BRANCH_EXISTS=$(eas branch:list --json --non-interactive | jq -r --arg branch "$MERGED_BRANCH" '.[] | select(.name == $branch)')

if [ ! -z "$BRANCH_EXISTS" ]; then
    echo "Found EAS branch: $MERGED_BRANCH"
    echo "Deleting EAS branch: $MERGED_BRANCH"
    eas branch:delete "$MERGED_BRANCH" --non-interactive
else
    echo "No EAS branch found for: $MERGED_BRANCH"
fi
