import axios from "axios";

const apiKey = "YOUR_API_KEY";
const waypoints = ["Vadodara", "Mumbai"]; // Add more stops if needed
const origin = "Surat";
const destination = "Matheran";

async function getBusRoute(from: string, to: string, stops: string[]) {
  const waypointStr = stops.join("|"); // Convert array to Google API format
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${from}&destination=${to}&waypoints=${waypointStr}&mode=transit&transit_mode=bus&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    console.log(`Route from ${from} to ${to} via ${stops.join(", ")}:`, response.data.routes);
  } catch (error) {
    console.error("Error fetching route:", error);
  }
}

async function getRoundTrip() {
  await getBusRoute(origin, destination, waypoints); // Outbound trip
  await getBusRoute(destination, origin, waypoints.reverse()); // Return trip
}

getRoundTrip()