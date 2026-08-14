/**
 * AETHERIA - Global Cities Coordinates & Timezone Database
 * Used for Ascendant, Local Mean Time, and Ephemeris calculations.
 */

export const CITIES_DATABASE = [
  { name: "New York, USA", lat: 40.7128, lng: -74.0060, tz: -5 },
  { name: "Los Angeles, USA", lat: 34.0522, lng: -118.2437, tz: -8 },
  { name: "Chicago, USA", lat: 41.8781, lng: -87.6298, tz: -6 },
  { name: "Houston, USA", lat: 29.7604, lng: -95.3698, tz: -6 },
  { name: "Miami, USA", lat: 25.7617, lng: -80.1918, tz: -5 },
  { name: "San Francisco, USA", lat: 37.7749, lng: -122.4194, tz: -8 },
  { name: "London, UK", lat: 51.5074, lng: -0.1278, tz: 0 },
  { name: "Paris, France", lat: 48.8566, lng: 2.3522, tz: 1 },
  { name: "Berlin, Germany", lat: 52.5200, lng: 13.4050, tz: 1 },
  { name: "Rome, Italy", lat: 41.9028, lng: 12.4964, tz: 1 },
  { name: "Madrid, Spain", lat: 40.4168, lng: -3.7038, tz: 1 },
  { name: "Ulm, Germany", lat: 48.4011, lng: 9.9876, tz: 1 },
  { name: "Smiljan, Croatia", lat: 44.5639, lng: 15.3189, tz: 1 },
  { name: "Kesswil, Switzerland", lat: 47.5956, lng: 9.3175, tz: 1 },
  { name: "Warsaw, Poland", lat: 52.2297, lng: 21.0122, tz: 1 },
  { name: "Vinci, Italy", lat: 43.7874, lng: 10.9262, tz: 1 },
  { name: "Mexico City, Mexico", lat: 19.4326, lng: -99.1332, tz: -6 },
  { name: "Coyoacán, Mexico City, Mexico", lat: 19.3467, lng: -99.1617, tz: -6 },
  { name: "Tokyo, Japan", lat: 35.6762, lng: 139.6503, tz: 9 },
  { name: "Sydney, Australia", lat: -33.8688, lng: 151.2093, tz: 10 },
  { name: "Melbourne, Australia", lat: -37.8136, lng: 144.9631, tz: 10 },
  { name: "Toronto, Canada", lat: 43.6532, lng: -79.3832, tz: -5 },
  { name: "Vancouver, Canada", lat: 49.2827, lng: -123.1207, tz: -8 },
  { name: "Montreal, Canada", lat: 45.5017, lng: -73.5673, tz: -5 },
  { name: "Rio de Janeiro, Brazil", lat: -22.9068, lng: -43.1729, tz: -3 },
  { name: "Sao Paulo, Brazil", lat: -23.5505, lng: -46.6333, tz: -3 },
  { name: "Buenos Aires, Argentina", lat: -34.6037, lng: -58.3816, tz: -3 },
  { name: "Cairo, Egypt", lat: 30.0444, lng: 31.2357, tz: 2 },
  { name: "Johannesburg, South Africa", lat: -26.2041, lng: 28.0473, tz: 2 },
  { name: "Cape Town, South Africa", lat: -33.9249, lng: 18.4241, tz: 2 },
  { name: "Dubai, UAE", lat: 25.2048, lng: 55.2708, tz: 4 },
  { name: "Mumbai, India", lat: 19.0760, lng: 72.8777, tz: 5.5 },
  { name: "New Delhi, India", lat: 28.6139, lng: 77.2090, tz: 5.5 },
  { name: "Singapore, Singapore", lat: 1.3521, lng: 103.8198, tz: 8 },
  { name: "Hong Kong", lat: 22.3193, lng: 114.1694, tz: 8 },
  { name: "Seoul, South Korea", lat: 37.5665, lng: 126.9780, tz: 9 },
  { name: "Amsterdam, Netherlands", lat: 52.3676, lng: 4.9041, tz: 1 },
  { name: "Stockholm, Sweden", lat: 59.3293, lng: 18.0686, tz: 1 },
  { name: "Athens, Greece", lat: 37.9838, lng: 23.7275, tz: 2 },
  { name: "Vienna, Austria", lat: 48.2082, lng: 16.3738, tz: 1 },
  { name: "Zurich, Switzerland", lat: 47.3769, lng: 8.5417, tz: 1 },
  { name: "Dublin, Ireland", lat: 53.3498, lng: -6.2603, tz: 0 },
  { name: "Lisbon, Portugal", lat: 38.7223, lng: -9.1393, tz: 0 },
  { name: "Honolulu, Hawaii, USA", lat: 21.3069, lng: -157.8583, tz: -10 },
  { name: "Auckland, New Zealand", lat: -36.8485, lng: 174.7633, tz: 12 }
];

export function findCityCoordinates(query) {
  if (!query || typeof query !== "string") return null;
  const clean = query.trim().toLowerCase();
  
  // Exact or partial match
  const match = CITIES_DATABASE.find(c => 
    c.name.toLowerCase() === clean || 
    c.name.toLowerCase().includes(clean) ||
    clean.includes(c.name.split(",")[0].toLowerCase())
  );

  if (match) return match;

  // Fallback heuristic based on generic regions
  if (clean.includes("usa") || clean.includes("united states") || clean.includes("ca") || clean.includes("ny")) {
    return { name: query, lat: 39.8283, lng: -98.5795, tz: -5 };
  }
  if (clean.includes("france") || clean.includes("paris")) {
    return { name: query, lat: 48.8566, lng: 2.3522, tz: 1 };
  }
  if (clean.includes("uk") || clean.includes("england") || clean.includes("london")) {
    return { name: query, lat: 51.5074, lng: -0.1278, tz: 0 };
  }
  if (clean.includes("germany") || clean.includes("deutschland")) {
    return { name: query, lat: 51.1657, lng: 10.4515, tz: 1 };
  }

  // Default neutral equator/prime meridian reference
  return { name: query, lat: 40.0, lng: 0.0, tz: 0 };
}
