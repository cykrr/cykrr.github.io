#!/bin/bash
set -euo pipefail

# Build the static site locally.
npm run build

# Publish to the cPanel/LiteSpeed host that actually serves krr.cl.
# Preserve server-managed files that are not part of the Astro build.
rsync -az --delete \
    --exclude=.htaccess \
    --exclude=cgi-bin \
    --exclude=.well-known \
    --exclude=.ftpquota \
    --exclude=.user.ini \
    dist/ floreria:domains/krr.cl/public_html/

echo "Deployed to https://krr.cl/"
