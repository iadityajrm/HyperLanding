import { NextResponse } from "next/server";

export async function GET() {
  const script = `#!/bin/sh
# Exit immediately if any command fails
set -e

echo "Downloading Hyper..."
curl -L -o /tmp/hyper-mac.dmg https://github.com/iadityajrm/HyperLanding/releases/latest/download/hyper-mac.dmg

echo "Installing Hyper..."
# Mount the DMG
hdiutil attach /tmp/hyper-mac.dmg -nobrowse -quiet

# Copy the app to Applications folder
cp -R /Volumes/Hyper/Hyper.app /Applications/

echo "Cleaning up..."
# Unmount DMG
hdiutil detach /Volumes/Hyper -quiet

# Remove temporary file
rm /tmp/hyper-mac.dmg

echo "Hyper installed successfully."
`;

  return new NextResponse(script, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
    },
  });
}
