# Facebook Result Import Template

Status: manual workflow template only
No Meta/Facebook API sync is implemented yet.

## Purpose

The owner often posts real workshop updates on Facebook with a vehicle photo, short modification description, Stage/service and power result. These posts can later become NoordTune customer results, but they must first be reviewed, edited and approved.

Facebook-style posts should not become SEO blog articles automatically.

## What To Provide For Each Post

Use this checklist when sending a Facebook post for conversion into a customer result.

### Source

- Facebook post URL
- Post date
- Original post text
- Whether the post should link back to Facebook

### Vehicle

- Make
- Model
- Generation
- Engine
- Year if known
- Fuel type
- Transmission
- ECU if known
- TCU if known

### Service

- Service type
- Stage or category
- Short description of what was done
- Technical notes
- Recommendations after tuning

### Power And Torque

- Stock power
- Stock torque
- Tuned power
- Tuned torque
- Power gain
- Torque gain
- Whether the figures come from a certificate, report or measured data

### Images

- Image files or local paths
- Whether images are owner/customer-approved for website use
- Whether license plates are visible
- Whether visible plates are approved
- Whether a person, address, full VIN or private document is visible
- Preferred main image
- Suggested alt text

### Privacy And Approval

- Customer approval: yes/no
- Plate visibility approval: yes/no
- Certificate/report available: yes/no
- Certificate number should be public: no by default
- Customer name should be public: no by default
- Full VIN should be public: never
- Customer address/private details should be public: never

### Language Notes

- Dutch wording notes
- English wording notes
- Polish wording notes
- Any details that should not be translated literally

## Publication Rules

Imported posts must start as:

- `source: "facebook"`
- `status: "draft"`
- `indexable: false`
- `customerApproved: false` unless explicitly approved

A result can become public only after:

- owner/admin review
- enough unique content
- approved images
- privacy check
- localized copy review
- vehicle-specific disclaimer

## Example JSON

See:

```text
data/facebook-result-import.example.json
```
