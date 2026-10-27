# Coverage Monitor

**Status:** prototype (retired direction, kept as a case study)

## What it is

A one-screen demo of the insurance-monitoring idea Herada explored before its
current direction. It checks a clinic's upcoming schedule against each health
plan's rules and lists the visits likely to end in a denial, a delay or a
surprise bill, with the next step and the last day that step can still work.

## Data

Synthetic only. Patients, clinicians, health plans and plan rules are invented
and live inside `public/index.html`. Nothing connects to a real system.

## How it works

- `SERVICES`, `PLANS` and `VISITS` hold the sample data. Visit dates are stored
  as days from today, so the demo never looks out of date.
- `evaluate(visit)` runs each visit through the rules (prior authorization
  timing, authorization expiry, frequency limits, referral and step-therapy
  requirements, eligibility, network status) and returns the flags.
- Flags are computed, not hard-coded: change a visit or a plan rule and the
  queue changes with it.

## What I learned

_To write: what clinics said in discovery, what made this hard to sell, and why
Herada moved on._
