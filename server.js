// Backend: Node.js server
// Save this as `server.js`
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const PORT = 3000;

// App metadata
const appName = "KISANSAHAY";
const credits = "Developed by ABHISHEK DHERU";

// Endpoint to fetch real-time agriculture data (mocked API call for now)
const fetchRealTimeData = async () => {
  // Replace with a real API endpoint if available
  return {
    "Punjab": {
      policies: "Minimum Support Price (MSP) for wheat and rice, subsidies for irrigation.",
      methods: "Crop rotation, advanced irrigation techniques, mechanized farming."
    },
    "Maharashtra": {
      policies: "Crop insurance schemes, subsidies for horticulture, drought relief programs.",
      methods: "Drip irrigation, organic farming, rainwater harvesting."
    },
    "Tamil Nadu": {
      policies: "Farm mechanization scheme, micro-irrigation subsidies, free electricity for farmers.",
      methods: "Integrated farming, use of hybrid seeds, System of Rice Intensification (SRI)."
    },
    "Rajasthan": {
      policies: "Subsidies for desert agriculture, rainwater conservation programs.",
      methods: "Rainwater harvesting, use of drought-resistant crops, drip irrigation."
    },
    // Add real-time data for all 26 states here
  };
};

app.use(cors());

// Endpoint to fetch agriculture policies by state
app.get('/api/policies/:state', async (req, res) => {
  const state = req.params.state;
  const agricultureData = await fetchRealTimeData();
  const data = agricultureData[state]?.policies;
  if (data) {
    res.json({ success: true, policies: data });
  } else {
    res.json({ success: false, message: "State not found." });
  }
});

// Endpoint to fetch farming methods by state
app.get('/api/methods/:state', async (req, res) => {
  const state = req.params.state;
  const agricultureData = await fetchRealTimeData();
  const data = agricultureData[state]?.methods;
  if (data) {
    res.json({ success: true, methods: data });
  } else {
    res.json({ success: false, message: "State not found." });
  }
});

// Metadata endpoint
app.get('/api/metadata', (req, res) => {
  res.json({ appName, credits });
});

app.listen(PORT, () => {
  console.log(`${appName} is running on http://localhost:${PORT}`);
});

// Serve the app name and navigation links on a web page
app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to ${appName}</h1>
    <p>${credits}</p>
    <nav>
      <a href="/policies">View Policies by State</a> |
      <a href="/methods">View Farming Methods by State</a>
    </nav>
  `);
});

// Page for policies by state
app.get('/policies', async (req, res) => {
  const agricultureData = await fetchRealTimeData();
  let html = `<h1>Policies by State</h1><ul>`;
  for (const state in agricultureData) {
    html += `<li><a href="/api/policies/${state}">${state}</a></li>`;
  }
  html += `</ul><a href="/">Back to Home</a>`;
  res.send(html);
});

// Page for farming methods by state
app.get('/methods', async (req, res) => {
  const agricultureData = await fetchRealTimeData();
  let html = `<h1>Farming Methods by State</h1><ul>`;
  for (const state in agricultureData) {
    html += `<li><a href="/api/methods/${state}">${state}</a></li>`;
  }
  html += `</ul><a href="/">Back to Home</a>`;
  res.send(html);
});
