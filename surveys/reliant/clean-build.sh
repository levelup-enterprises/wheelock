#!/bin/bash
# Remove root build files
rm -f build/*

# Move files
cp -v build/static/css/*.css build/
cp -v build/static/js/*.js build/

# # Remove static folder
rm -r build/static/