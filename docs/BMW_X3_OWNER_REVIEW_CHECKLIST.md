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
- [ ] Visible license plate is accepted because it appears only in the owner-approved promotional graphic.
- [ ] No customer name is shown.
- [ ] No customer address is shown.
- [ ] No private contact data is shown.
- [ ] Customer origin is only broad country-level context.
- [ ] No certificate number, private document reference or customer-identifying certificate data is shown.

## 3. Image Review

- [ ] Current image is the owner-provided BMW X3 promotional graphic.
- [ ] Visible license plate is intentionally owner-approved for this marketing graphic.
- [ ] Image has no visible full VIN.
- [ ] Image has no visible customer name.
- [ ] Image has no visible customer address.
- [ ] Image has no private contact data.
- [ ] Image has no certificate number or private document reference.
- [ ] Final desktop/mobile visual presentation is approved.

Current website image:

```text
/images/results/bmw-x3-e83-20d-stage-1.webp
```

Current Open Graph image:

```text
/images/results/bmw-x3-e83-20d-stage-1-og.webp
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
- [ ] No full VIN is required for the public case.
- [ ] Visible plate use in the graphic is owner-approved.

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
- [ ] Owner confirms visible plate in the promotional graphic is acceptable: yes / no

## Merge Gate

Only merge after the owner confirms:

1. The content is approved in NL/EN/PL.
2. The owner-provided BMW X3 promotional graphic is visually approved.
3. Indexable publication is approved.
4. No private customer data is exposed.
5. Visible license plate use in this marketing graphic is approved.
