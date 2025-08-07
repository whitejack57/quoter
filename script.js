document.getElementById("getQuote").addEventListener("click", function () {
  const pickup = document.getElementById("pickup").value.trim();
  const dropoff = document.getElementById("dropoff").value.trim();
  const vehicleType = document.getElementById("vehicle").value;

  const vehicleMultiplier = {
    "Standard Car": 1,
    "Large SUV": 1.25,
    "Pickup Truck": 1.3,
    "Luxury": 1.5
  };

  const ratePerMile = 0.85;
  const minQuote = 500;

  if (!pickup || !dropoff) {
    document.getElementById("quoteOutput").innerHTML = "Please enter both ZIP codes.";
    return;
  }

  const apiKey = "AIzaSyAnRp1BXgPb2ayK2V8Hg00CqaYVjs1h_uw";
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${pickup}&destinations=${dropoff}&key=${apiKey}`;

  fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`)
    .then(response => response.json())
    .then(data => {
      const parsedData = JSON.parse(data.contents);

      if (parsedData.rows[0].elements[0].status !== "OK") {
        throw new Error("Invalid ZIP codes or no route found.");
      }

      const distanceMeters = parsedData.rows[0].elements[0].distance.value;
      const distanceMiles = distanceMeters / 1609.34;

      const baseQuote = distanceMiles * ratePerMile;
      const multiplier = vehicleMultiplier[vehicleType] || 1;
      const finalQuote = Math.max(minQuote, Math.round(baseQuote * multiplier));

      document.getElementById("quoteOutput").innerHTML = `
        Estimated Quote: <strong>$${finalQuote}</strong> for <strong>${Math.round(distanceMiles)} miles</strong>.
      `;
    })
    .catch(err => {
      console.error(err);
      document.getElementById("quoteOutput").innerHTML = "Error fetching quote. Please check ZIP codes.";
    });
});
