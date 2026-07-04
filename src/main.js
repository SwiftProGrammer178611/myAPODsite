import './style.css'

const API_KEY = import.meta.env.VITE_NASA_API_KEY;

document.querySelector('#app').innerHTML = `
  <div class="dashboard">
    <header>
      <h1>Cosmic Explorer</h1>
      <p class="subtitle"> NASA Astronomy Picture of the Day</p>
    </header>
    <div class="controls">
      <input type="date" id="date-picker" max = "${new Date().toISOString().split('T')[0]}"/>
    </div>
    <div id = "apod-content">
      <div class = "loading">Loading cosmic data...</div>
    </div>
  </div>
`;
const contentContainer = document.querySelector("#apod-content");
const datePicker = document.querySelector("#date-picker");

async function fetchAPOD(date='') {
  contentContainer.innerHTML = `<div class="loading">traveling through space-time...</div>`;
  try {
    const url  = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${date ? `&date=${date}` : ''}`;

    const response = await fetch(url)
    
    if(!response.ok) throw new Error('Failed to fetch from NASA');
    const data = await response.json();
    renderAPOD(data);
  } catch (error) {
    contentContainer.innerHTML = `<div class="error"><p> Uh oh! the cosmos are tangled. Try another date.</p></div>`;
  }
}

function renderAPOD(data) {
  const mediaHTML = data.media_type === 'video'
  ? '<iframe src="${data.url}" frameborder="0" allowfullscreen></iframe>'
  : `<img src="${data.url}" alt="${data.title}"/>`;
  contentContainer.innerHTML = `
    <div class="apod-card">
      <div class = "media-contianer">
        ${mediaHTML}
      </div>
      <div class="content">
        <h2>${data.title}</h2>
        <span class="date">${data.date}</span>
        <p class="explanation">${data.explanation}</p>
      </div>
    </div>
  `;
}

datePicker.addEventListener('change', (e) => {
  fetchAPOD(e.target.value);
});

fetchAPOD();