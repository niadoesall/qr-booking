// 1) read query params from QR, prefill store + store_id
const params = new URLSearchParams(location.search);
const store = params.get("store") || "";
const storeId = params.get("store_id") || "";

document.getElementById("store").value = store;
document.getElementById("store_id").value = storeId;

// 2) replace THESE with your real Stripe Payment Links
const STRIPE = {
  delivery:       "https://buy.stripe.com/test_8x228kcXNaojeZsaQ33Nm00",
  delivery_haul:  "https://buy.stripe.com/test_3cI28kf5V1RNcRk3nB3Nm01",
};

const form = document.getElementById("booking-form");
const errorBox = document.getElementById("error");
const submitBtn = document.getElementById("submit");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorBox.hidden = true;

  // minimal validation
  const requiredIds = ["date","time","name","phone","email","address"];
  for (const id of requiredIds) {
    if (!document.getElementById(id).value.trim()) {
      error("Please complete all required fields.");
      return;
    }
  }

  // 3) choose the correct Stripe link
  const service = document.getElementById("service").value;
  const stripeUrl = STRIPE[service];
  if (!stripeUrl) { error("Payment link missing. Please contact support."); return; }

  // 4) enrich stripe link with context (email + client reference)
  const email = document.getElementById("email").value.trim();
  const ref = `${storeId || "NA"}-${Date.now()}`;

  const url = new URL(stripeUrl);
  url.searchParams.set("prefill_email", email);
  url.searchParams.set("client_reference_id", ref);

  // 5) (optional) later we’ll POST the full form to your server/webhook before redirect
  submitBtn.disabled = true;
  window.location.href = url.toString();
});

function error(msg){
  errorBox.textContent = msg;
  errorBox.hidden = false;
}
