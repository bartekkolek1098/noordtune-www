# BMW X3 Owner Review Checklist

Branch: `feature/publish-bmw-x3-result`  
PR: https://github.com/bartekkolek1098/noordtune-www/pull/3  
Case: BMW X3 E83 2.0d Stage 1

Use this checklist before approving the PR for merge to `main`.

## 1. Content Review

- [ ] Dutch copy sounds professional.
- [ ] English copy sounds professional.
- [ ] Polish copy sounds professional and uses proper Polish diacritics.
- [ ] No exaggerated performance promises are made.
- [ ] Vehicle-specific disclaimer is visible.
- [ ] The page does not guarantee identical gains for other vehicles.
- [ ] The case explains that the software was tailored to this specific vehicle.
- [ ] The customer origin is only described broadly as Poland.

## 2. Privacy Review

- [ ] No full VIN is shown.
- [ ] No license plate is shown.
- [ ] No customer name is shown.
- [ ] No customer address is shown.
- [ ] No private contact data is shown.
- [ ] Customer origin is only broad country-level context.
- [ ] No certificate number, private document reference or customer-identifying certificate data is shown.

## 3. Image Review

- [ ] Current image is a placeholder.
- [ ] Placeholder has no visible plate.
- [ ] Placeholder has no visible VIN.
- [ ] Placeholder has no visible person or private customer details.
- [ ] TODO exists to replace it with owner-approved BMW X3 photos later.
- [ ] If real BMW photos are added later, plates must be blurred or not visible.
- [ ] If real BMW photos are added later, no private background details should identify the customer.

Current placeholder:

```text
/images/sections/tuning-laptop-b2.webp
```

## 4. Technical Review

- [ ] Vehicle: BMW X3 E83 2.0d.
- [ ] Engine: N47.
- [ ] ECU: Bosch EDC17.
- [ ] Service: Stage 1 / custom ECU remap.
- [ ] Stock: 177 hp / 350 Nm.
- [ ] Tuned: 214 hp / 420 Nm.
- [ ] Gain: +37 hp / +70 Nm.
- [ ] Certificate delivered to customer.
- [ ] Recommendations after tuning delivered to customer.
- [ ] No full VIN or license plate is required for the public case.

## 5. SEO Review

- [ ] Dutch route exists: `/nl/resultaten/bmw-x3-e83-20d-stage-1`.
- [ ] English route exists: `/en/results/bmw-x3-e83-20d-stage-1`.
- [ ] Polish route exists: `/pl/rezultaty/bmw-x3-e83-20d-stage-1`.
- [ ] Sitemap includes the BMW X3 routes.
- [ ] Metadata exists.
- [ ] Canonical URL exists.
- [ ] Open Graph metadata exists.
- [ ] Article JSON-LD / vehicle-related JSON-LD exists.
- [ ] Demo result detail pages remain excluded.
- [ ] Demo result detail pages still return 404.

## 6. Decision

- [ ] Owner approved for merge: yes / no
- [ ] Owner wants to replace image before merge: yes / no
- [ ] Owner approves indexable publication: yes / no
- [ ] Owner confirms all visible result data is correct: yes / no
- [ ] Owner confirms privacy is acceptable: yes / no

## Merge Gate

Only merge after the owner confirms:

1. The content is approved in NL/EN/PL.
2. The placeholder image is acceptable or replaced safely.
3. Indexable publication is approved.
4. No private customer data is exposed.
