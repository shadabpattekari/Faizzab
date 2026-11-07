#!/usr/bin/env bash
# Publishes CI screenshots to the "qa-screenshots" branch (review only; never deployed).
# Pushes made with GITHUB_TOKEN do not start new workflow runs.
set -euo pipefail
SRC="$1"; DEST="$2"
work=$(mktemp -d)
cd "$work"
git init -q
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git remote add origin "https://x-access-token:${GITHUB_TOKEN}@github.com/${GITHUB_REPOSITORY}.git"
if git fetch -q --depth 1 origin qa-screenshots 2>/dev/null; then
  git checkout -q -b qa-screenshots FETCH_HEAD
else
  git checkout -q --orphan qa-screenshots
fi
rm -rf "$DEST" && mkdir -p "$DEST" && cp "$SRC"/* "$DEST"/
git add -A
git commit -qm "Screenshots: $DEST" || exit 0
git push -q origin qa-screenshots
echo "Published to qa-screenshots/$DEST"
