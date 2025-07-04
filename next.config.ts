import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // this is currently needed because cloudflare workers don't have filesystem access
  // this means we can't render code samples on the fly so for right now static export it is.
  // yay for performance I guess
  output: "export",
  images: {
    unoptimized: true, // disable image optimization for export mode
  }
};

export default nextConfig;

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
