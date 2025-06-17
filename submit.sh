#!/bin/bash
# Build to dist
npm run build

# Switch to master in a temp directory
git worktree add temp-deploy-dir master
cp -r dist/* temp-deploy-dir/
cd temp-deploy-dir
git add .
git commit -m "Deploy"
git push origin master
cd ..
rm -rf temp-deploy-dir

