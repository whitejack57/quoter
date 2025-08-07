
document.getElementById("quoteForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const pickup = document.getElementById("pickup").value;
    const dropoff = document.getElementById("dropoff").value;
    const vehicleType = document.getElementById("vehicleType").value;

    const service = new google.maps.DistanceMatrixService();
service.getDistanceMatrix(
  {
    origins: [pickup],
    destinations: [dropoff],
    travelMode: 'DRIVING',
    unitSystem: google.maps.UnitSystem.IMPERIAL
  },
  function(response, status) {
    if (status === 'OK') {
      const distanceInMiles = response.rows[0].elements[0].distance.value / 1609.34;
      let baseRate = 0;

      if (distanceInMiles <= 500) baseRate = 1.25;
      else if (distanceInMiles <= 1000) baseRate = 1.00;
      else if (distanceInMiles <= 2000) baseRate = 0.85;
      else baseRate = 0.70;

      let multiplier = 1;
      if (vehicleType === "suv") multiplier = 1.15;
      else if (vehicleType === "truck") multiplier = 1.25;

      const quote = Math.round(distanceInMiles * baseRate * multiplier);
      document.getElementById("result").innerText = `Estimated Quote: $${quote} for ${distanceInMiles.toFixed(0)} miles.`;
    } else {
      document.getElementById("result").innerText = "Error calculating distance.";
    }
  }
);
    
    let baseRate = 0;

    if (distance <= 500) baseRate = 1.25;
    else if (distance <= 1000) baseRate = 1.00;
    else if (distance <= 2000) baseRate = 0.85;
    else baseRate = 0.70;

    let multiplier = 1;
    if (vehicleType === "suv") multiplier = 1.15;
    else if (vehicleType === "truck") multiplier = 1.25;

    const quote = Math.round(distance * baseRate * multiplier);

    document.getElementById("result").innerText = `Estimated Quote: $${quote} for ~${distance} miles.`;
});
