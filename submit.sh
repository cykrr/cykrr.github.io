#!/bin/bash
set -e

# Build the static site locally.
npm run build

# Publish the generated site to the dedicated deployment branch.
git worktree add temp-deploy-dir gh-pages
rsync -a --delete --exclude=.git dist/ temp-deploy-dir/
(
    cd temp-deploy-dir
    git add -A
    if ! git diff --cached --quiet; then
        git commit -m "Deploy"
    fi
    git push origin gh-pages
)
git worktree remove temp-deploy-dir

