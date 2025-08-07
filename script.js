
document.getElementById("quoteForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const pickup = document.getElementById("pickup").value;
    const dropoff = document.getElementById("dropoff").value;
    const vehicleType = document.getElementById("vehicleType").value;

    const distance = Math.floor(Math.random() * 2500) + 100; // Replace with real API later
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
