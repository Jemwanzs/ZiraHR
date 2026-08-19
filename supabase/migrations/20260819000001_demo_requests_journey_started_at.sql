-- Adds the visitor's personal "14 working day go-live journey" start time
-- to demo requests — set client-side the moment they click Book a Demo on
-- the homepage promo banner (see src/lib/journeyTracking.ts), sent along
-- with the form submission so the journey isn't dependent only on their
-- browser's localStorage once they've actually become a lead.
alter table public.demo_requests
  add column if not exists journey_started_at timestamptz;
