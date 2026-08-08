/**
 * Slot id -> real asset path. Empty until you drop real ZiraHR screenshots
 * into /public/screenshots (see docs/08-assets/screenshot-plan.md). Every
 * slot without an entry here renders through ScreenshotSlot's labeled
 * placeholder instead of a broken image or a fabricated screenshot.
 *
 * To promote a slot: add its real path here. No other code changes needed.
 */
export const MEDIA_MANIFEST: Record<string, string> = {};

export function resolveMediaSlot(slot: string): string | undefined {
  return MEDIA_MANIFEST[slot];
}
