async function getRecommendations() {
  const mood = document.getElementById("moodInput").value;
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  try {
    const res = await fetch(`https://music-recommender-api-production.up.railway.app/recommend?mood=${mood}`);
    const data = await res.json();

    if (data.error) {
      resultsDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    resultsDiv.innerHTML = data.map(song => `
      <div class="result-item">
        <strong>${song.track_name}</strong><br>
        ${song.artist_name} (${song.genre})<br>
        🎵 Valence: ${song.valence.toFixed(2)}, Energy: ${song.energy.toFixed(2)}, Danceability: ${song.danceability.toFixed(2)}
      </div>
    `).join('');
  } catch (error) {
    resultsDiv.innerHTML = "Error fetching recommendations.";
  }
}