# KHRPSC Website — upgraded starter

## Run locally
Open this folder in VS Code and use Live Server, or run `python -m http.server 5500` and open `http://localhost:5500`.

## Included
- Responsive KHRPSC homepage and official logo asset
- Three.js animated justice scales and floating particles
- GSAP entrance animations plus IntersectionObserver fallback reveals
- Contact enquiry form configured for FormSubmit to `thekhrpsc@gmail.com`
- Dedicated `donate.html` QR payment page

## Required setup before production
1. **Contact email:** FormSubmit sends a one-time activation email to `thekhrpsc@gmail.com`. The recipient must open that email and activate the form before visitor submissions are delivered. FormSubmit is a third-party service; test it on the deployed HTTPS domain.
2. **Donation QR:** `config.js` is prefilled with the UPI ID supplied in this chat (`jamesj20041@pingpay`). The page generates an amount-specific QR and a UPI-app payment link. The fallback QR in `assets/khrpsc-upi-qr-fallback.png` has no fixed amount. IMPORTANT: the UPI ID and its actual beneficiary name have not been independently verified. Before publishing, KHRPSC must confirm in its own UPI/bank app that this handle belongs to an account authorized to receive donations for the committee. Donors must verify the beneficiary displayed by their UPI app before entering a UPI PIN.
3. **Payment verification:** UPI QR/deep-link payments are not automatically confirmed by this static website. The committee must verify the transaction in its bank/UPI account. For automatic payment confirmation and receipts, integrate a payment gateway such as Razorpay with a secure backend and verified webhooks. Never collect UPI PINs or OTPs on this website.
4. Replace the illustrative stock images with KHRPSC-approved photographs before launch.
5. Replace the sample `_next` URL in `index.html` with the final deployed thank-you page URL, or remove the `_next` field.
6. Confirm NGO registration, bank beneficiary details, tax-exemption eligibility, privacy policy and receipt requirements before publishing donation/tax claims.

## Contact details supplied
Samartha S Gowda · +91 9743930128 · thekhrpsc@gmail.com
#572, 1st D Main, Vinayaka Layout, Nagrabhavi, near Hanumagiri Temple, Bangalore – 560072
