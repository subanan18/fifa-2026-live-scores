/*
  FIFA 2026 Live Scores Website
  --------------------------------
  This project works out of the box with professional demo data.

  To connect a real provider:
  1) Get a football-data API key from a licensed provider.
  2) Replace fetchLiveScores() with that provider's endpoint.
  3) Never expose paid/private keys in public GitHub repos; use a small backend/proxy.
*/

const API_MODE = "demo"; // Change to "custom" after connecting your own backend endpoint.
const CUSTOM_ENDPOINT = ""; // Example: https://your-backend.com/api/worldcup/live

const demoMatches = [
  {
    competition: "FIFA World Cup 2026",
    venue: "Estadio Azteca",
    status: "LIVE",
    minute: "62'",
    home: { name: "Mexico", score: 2, flag: "🇲🇽" },
    away: { name: "South Africa", score: 1, flag: "🇿🇦" },
    events: ["12' Goal — Mexico", "44' Goal — South Africa", "58' Goal — Mexico"]
  },
  {
    competition: "Group Stage",
    venue: "BMO Field",
    status: "HT",
    minute: "Half-time",
    home: { name: "Canada", score: 0, flag: "🇨🇦" },
    away: { name: "Japan", score: 0, flag: "🇯🇵" },
    events: ["Compact first half", "Possession: Canada 52%"]
  },
  {
    competition: "Group Stage",
    venue: "SoFi Stadium",
    status: "UPCOMING",
    minute: "20:00",
    home: { name: "USA", score: "–", flag: "🇺🇸" },
    away: { name: "Germany", score: "–", flag: "🇩🇪" },
    events: ["Lineups expected 1 hour before kick-off"]
  }
];

const fixtures = [
  { match: "Mexico vs South Africa", date: "June 11, 2026", city: "Mexico City" },
  { match: "Canada vs TBD", date: "June 12, 2026", city: "Toronto" },
  { match: "USA vs TBD", date: "June 12, 2026", city: "Los Angeles" },
  { match: "Final", date: "July 19, 2026", city: "New York / New Jersey" }
];

const scoreboard = document.querySelector("#scoreboard");
const fixtureList = document.querySelector("#fixtureList");
const lastUpdated = document.querySelector("#lastUpdated");
const refreshBtn = document.querySelector("#refreshBtn");

function renderMatches(matches) {
  scoreboard.innerHTML = matches.map(match => `
    <article class="match-card">
      <div class="match-meta">
        <span>${match.competition}</span>
        <span class="status ${match.status === "LIVE" ? "live" : ""}">${match.status} • ${match.minute}</span>
      </div>
      ${teamRow(match.home)}
      ${teamRow(match.away)}
      <div class="event-list">
        <strong>${match.venue}</strong><br />
        ${match.events.map(event => `<span>• ${event}</span>`).join("<br />")}
      </div>
    </article>
  `).join("");
}

function teamRow(team) {
  return `
    <div class="team">
      <span class="flag">${team.flag}</span>
      <span class="name">${team.name}</span>
      <span class="score">${team.score}</span>
    </div>
  `;
}

function renderFixtures() {
  fixtureList.innerHTML = fixtures.map(item => `
    <div class="fixture">
      <div>
        <strong>${item.match}</strong>
        <span>${item.city}</span>
      </div>
      <span>${item.date}</span>
    </div>
  `).join("");
}

async function fetchLiveScores() {
  if (API_MODE !== "custom" || !CUSTOM_ENDPOINT) return demoMatches;

  const response = await fetch(CUSTOM_ENDPOINT);
  if (!response.ok) throw new Error("Could not load live scores");
  return response.json();
}

async function loadScores() {
  refreshBtn.disabled = true;
  refreshBtn.textContent = "Refreshing…";

  try {
    const matches = await fetchLiveScores();
    renderMatches(matches);
    lastUpdated.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
  } catch (error) {
    renderMatches(demoMatches);
    lastUpdated.textContent = "Showing demo data — connect your API in app.js";
    console.error(error);
  } finally {
    refreshBtn.disabled = false;
    refreshBtn.textContent = "Refresh now";
  }
}

refreshBtn.addEventListener("click", loadScores);
renderFixtures();
loadScores();
setInterval(loadScores, 60000);
