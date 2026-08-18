/**
 * Slot id -> real asset path. Empty until you drop real SoftHR screenshots
 * into /public/screenshots (see docs/08-assets/screenshot-plan.md). Every
 * slot without an entry here renders through ScreenshotSlot's labeled
 * placeholder instead of a broken image or a fabricated screenshot.
 *
 * To promote a slot: add its real path here. No other code changes needed.
 */
export const MEDIA_MANIFEST: Record<string, string> = {
  // Real product UI captured from PayeKenya (payekenya.xyz) — a separate,
  // differently-themed HR/payroll tool by the same builder, not SoftHR
  // itself. Used here deliberately (real screens over illustrated
  // placeholders) despite the visual style mismatch with SoftHR's own
  // cream/teal palette — swap for genuine SoftHR-branded screenshots once
  // those exist.
  "moduleShowcase.payroll": "/screenshots/module-showcase-payroll.png",
  "moduleShowcase.coreHr": "/screenshots/module-showcase-core-hr.png",
};

export function resolveMediaSlot(slot: string): string | undefined {
  return MEDIA_MANIFEST[slot];
}
