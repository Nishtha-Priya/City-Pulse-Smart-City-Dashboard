// Initial map setup
// Use your city's coordinates here (example: New Delhi)
const map = L.map("cityMap").setView([28.451061, 77.583967], 20);

// 🚨 IMPORTANT: Fix hidden page rendering issue
setTimeout(() => {
  map.invalidateSize();
}, 400);

// Tile layer (OpenStreetMap)
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  maxZoom: 25,
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

// Example data points: you can replace with your real locations
const locations = [
  {
    name: "Wellness Centre",
    type: "health",
    coords: [28.450874, 77.584241],
    description: "Emergency, OPD, 24x7 services"
  },
  {
    name: "German Hangar",
    type: "recreation",
    coords: [28.449218, 77.582962],
    description: "Convocations, DJ Night and Badminton-?"
  },
  {
    name: "Hatchery",
    type: "office",
    coords: [28.450255, 77.584135],
    description: "IT offices and startups"
  },
  {
    name: "B Block Pharmacy",
    type: "health",
    coords: [28.449753, 77.584733],
    description: "For all medicinal needs"
  },
  {
    name: "Gobble Mess",
    type: "food",
    coords: [28.450629, 77.586349],
    description: "Eat at your own risk"
  },
  {
    name: "Quench",
    type: "food",
    coords: [28.450667, 77.586873],
    description: "Peri Peri Fries!"
  },
  {
    name: "BU Basiks",
    type: "mall",
    coords: [28.451443, 77.585309],
    description: "From prints to "
  }
];

// Optional: custom red circular icon to match your UI
const redIcon = L.divIcon({
  html: '<div style="width:16px;height:16px;border-radius:50%;border:3px solid #ff0000;background:#300;"></div>',
  className: "",     // remove default leaflet-icon class
  iconSize: [16, 16]
});

// Add markers with popups
locations.forEach((loc) => {
  L.marker(loc.coords, { icon: redIcon })
    .addTo(map)
    .bindPopup(
      `<b>${loc.name}</b><br/><small>${loc.type.toUpperCase()}</small><br/>${loc.description}`
    );
});
