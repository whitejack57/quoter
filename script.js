document.getElementById("getQuote").addEventListener("click", function () {
  const pickup = document.getElementById("pickup").value;
  const dropoff = document.getElementById("dropoff").value;
  const vehicleType = document.getElementById("vehicle").value;

  const vehicleMultiplier = {
    "Standard Car": 1,
    "Large SUV": 1.25,
    "Pickup Truck": 1.3,
    "Luxury": 1.5
  };

  const ratePerMile = 0.85;
  const minQuote = 500;

  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickup}&destinations=${dropoff}&key=AIzaSyAnRp1BXgPb2ayK2V8Hg00CqaYVjs1h_uw`;

  fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`)
    .then(res => res.json())
    .then(data => {
      const distanceMeters = data.rows[0].elements[0].distance.value;
      const distanceMiles = distanceMeters / 1609.34;

      const baseQuote = distanceMiles * ratePerMile;
      const multiplier = vehicleMultiplier[vehicleType] || 1;
      const finalQuote = Math.max(minQuote, Math.round(baseQuote * multiplier));

      document.getElementById("quoteOutput").innerHTML =
        `Estimated Quote: <strong>$${finalQuote}</strong> for <strong>${Math.round(distanceMiles)} miles</strong>.`;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("quoteOutput").innerHTML = "Error fetching quote.";
    });
});
