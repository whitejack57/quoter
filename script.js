
function calculateDistance(fromZip, toZip) {
  const apiKey = "YOUR_GOOGLE_API_KEY"; // Replace with your real key
  const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${fromZip}&destinations=${toZip}&units=imperial&key=${apiKey}`;

  return fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status === "OK" && data.rows[0].elements[0].status === "OK") {
        const distanceText = data.rows[0].elements[0].distance.text;
        const distanceMiles = parseFloat(distanceText.replace(/[^0-9.]/g, ''));
        return distanceMiles;
      } else {
        throw new Error("Unable to get distance from Google Maps API.");
      }
    });
}

function getRatePerMile(distance) {
  if (distance <= 500) return 1.5;
  if (distance <= 1000) return 1.1;
  if (distance <= 2000) return 0.95;
  return 0.85;
}

function getVehicleMultiplier(type) {
  switch (type.toLowerCase()) {
    case "suv":
      return 1.15;
    case "truck":
    case "large suv":
      return 1.25;
    default:
      return 1;
  }
}

document.getElementById("quote-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const pickupZip = document.getElementById("pickup").value.trim();
  const dropoffZip = document.getElementById("dropoff").value.trim();
  const vehicleType = document.getElementById("vehicle-type").value;

  if (!pickupZip || !dropoffZip) {
    alert("Please enter both ZIP codes.");
    return;
  }

  calculateDistance(pickupZip, dropoffZip)
    .then(distance => {
      const rate = getRatePerMile(distance);
      const multiplier = getVehicleMultiplier(vehicleType);
      let quote = distance * rate * multiplier;
      quote = Math.max(500, Math.round(quote)); // Ensure $500 minimum

      document.getElementById("result").innerHTML = `Estimated Quote: <strong>$${quote}</strong> for ~${Math.round(distance)} miles.`;
    })
    .catch(error => {
      console.error(error);
      document.getElementById("result").innerHTML = "Error calculating quote. Please check ZIP codes.";
    });
});
