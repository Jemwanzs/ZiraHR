# Video Plan

Several short clips, not one giant corporate video (scope §25).

| Clip | Length | Content | Placement |
|---|---|---|---|
| Hero Film | 20–30s | Product montage | Hero section (desktop only, autoplay-muted where perf allows; poster-only on mobile) |
| Core HR | 10–15s | Employee profile interaction | `/core-hr` page |
| Payroll | 15–20s | Payroll lifecycle (Draft→Review→Approve→Process→Disburse) | `/payroll` page + homepage Module Showcase (Payroll) |
| Leave | 10s | Request → approval | `/leave-management` page + homepage Module Showcase (Leave) |
| Attendance | 10s | Clock-in → dashboard | `/attendance-management` page |
| TiJa | 15s | Question → answer | Ask TiJa homepage section + `/ask-tija` page |

## Shared requirements (every clip)

Poster fallback (static image, same aspect ratio, shown before play/if video fails to load), lazy-loaded (not fetched until near viewport), muted autoplay only where explicitly permitted above, paused via `IntersectionObserver` when scrolled out of view, mobile gets poster + tap-to-play rather than autoplay, H.264 `.mp4` primary encode kept as small as reasonably possible without visible quality loss.

## Until real footage exists

`VideoSlot` (the video counterpart to `ScreenshotSlot`, see `screenshot-plan.md`) renders just the poster-placeholder state with a disabled/hidden play control rather than pretending a video exists — no fake/stock video substituted in the meantime.
