async function saveMovie() {
  const movie = {
    title: document.getElementById('title').value,
    genre: document.getElementById('genre').value,
    duration: document.getElementById('duration').value,
    version: document.getElementById('version').value,
    category: document.getElementById('category').value,
    poster: document.getElementById('poster').value,
    trailer: document.getElementById('trailer').value,
    times: document.getElementById('times').value.split(',').map(t => t.trim())
  };

  const date = document.getElementById('date').value;

  let data;

  try {
    const res = await fetch('schedule.json');
    data = await res.json();
  } catch {
    data = { weekTitle: "Програма", days: [] };
  }

  let day = data.days.find(d => d.date === date);

  if (!day) {
    day = {
      label: "Ден",
      date: date,
      movies: []
    };
    data.days.push(day);
  }

  day.movies.push(movie);

  downloadJSON(data);
  document.getElementById('status').innerText =
    "Готово! Замени schedule.json с новия файл.";
}

function downloadJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "schedule.json";
  a.click();
}
