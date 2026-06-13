# Booking System Plan

Project: NoordTune.nl main website  
Date: 2026-06-12  
Status: architecture note only

## Current Implementation

A simple placeholder route exists:

- Dutch: `/nl/afspraak`
- English: `/en/appointment`
- Polish: `/pl/termin`

The placeholder explains that online booking is coming later and currently sends users to:

- WhatsApp: `https://wa.me/31685759600`
- Power Catalog: `https://power.noordtune.nl/`

No booking system has been implemented yet.

## Future Booking Flow

Recommended route:

- `/nl/afspraak`

Core steps:

1. Service selection
2. Customer details
3. Vehicle details
4. Preferred date/time slot
5. Optional deposit payment
6. Confirmation

## Service Selection

Initial service options:

- Auto diagnose
- Stage 1 tuning
- Stage 2 tuning
- Loganalyse
- DSG / TCU tuning
- EGR / DPF / AdBlue storing analyse
- Mobiele service
- Adviesgesprek

Each service should include:

- Estimated duration
- Starting price or "op aanvraag"
- Required vehicle information
- Whether pre-approval is required

## Customer Details

Fields:

- Name
- Email
- Phone / WhatsApp
- Preferred language
- Consent to privacy policy

## Vehicle Details

Fields:

- License plate if Dutch
- Manual make/model/engine if foreign vehicle
- Fuel type
- Transmission
- Current modifications
- Known fault codes
- Desired goal

Power Catalog integration later:

- Let users open the existing catalog.
- Do not rebuild catalog logic in the main site.
- Optionally store the catalog result URL or selected vehicle data if the catalog exposes a safe handoff later.

## Availability

Future admin-managed availability:

- Working days and opening times
- Blocked dates
- Service-specific duration
- Buffer time
- Mobile service travel buffer

Calendar options:

- Internal database first
- Optional Google Calendar sync later

## Payments

Recommended provider:

- Mollie

Possible payment models:

- Deposit only
- Full payment for diagnostics
- No payment for quote-only requests

Payment status should be stored separately from booking status.

## Notifications

Customer email:

- Booking request received
- Booking confirmed
- Payment confirmation if applicable
- Reminder before appointment

Admin notification:

- Email and/or dashboard notification
- Include customer, vehicle, service and notes

## Admin Dashboard Later

Future admin features:

- View bookings
- Confirm, reschedule, cancel
- Manage availability
- Manage service durations and prices
- Export customer/vehicle details

## Implementation Notes

Do not implement in this pass.

When implementation starts, prefer:

- Server actions or route handlers for booking submission
- Database-backed availability
- Validation with a schema library
- Rate limiting and spam protection
- Clear audit trail for payment and booking status
