# QR → Book → Pay (MVP)

Minimal one-page booking:
- QR passes `?store=` and `?store_id=`
- User picks service + fills details
- Redirects to Stripe Payment Link for payment

## Setup
1) Create **three Stripe Payment Links** for $50 / $75 / $125.
2) Edit `script.js` and replace the three placeholder URLs in `STRIPE`.
3) Commit and push. Enable GitHub Pages to get a live URL.
4) Print QR codes like:
   https://<YOUR_PAGES_URL>/?store=Oak%20Harbor%20Thrift&store_id=OHT001
