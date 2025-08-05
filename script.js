async function getRecommendations() {
  const mood = document.getElementById("moodInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://ik-music-recommender-railway-production.up.railway.app/recommend?mood=${mood}`);
    const data = await res.json();

    if (data.error) {
      resultsDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    resultsDiv.innerHTML = data.recommendations.map(song => `
      <div class="result-item">
        <strong>${song.track_name}</strong><br>
        ${song.artist_name} (${song.genre})<br>
        <a class="spotify-button" href="${song.spotify_url}" target="_blank">🎧 Listen on Spotify</a>
      </div>
    `).join('');
  } catch (error) {
    resultsDiv.innerHTML = "Error fetching recommendations.";
  }
}