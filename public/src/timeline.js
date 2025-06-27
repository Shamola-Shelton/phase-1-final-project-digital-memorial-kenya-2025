document.addEventListener('DOMContentLoaded', () => {
  const timelineContainer = document.getElementById('timeline-container');
  const eventFilter = document.getElementById('event-filter');
  let eventsData = [];
  let victimsData = [];

  Promise.all([
    fetch('http://localhost:3000/events').then(res => res.json()),
    fetch('http://localhost:3000/victims').then(res => res.json())
  ])
    .then(([events, victims]) => {
      eventsData = events.sort((a, b) => new Date(a.date) - new Date(b.date));
      victimsData = victims;
      renderTimeline(eventsData);
      initMap(eventsData);
    })
    .catch(error => console.error('Error loading timeline data:', error));

  function renderTimeline(events) {
    timelineContainer.innerHTML = '';
    events.forEach(event => {
      let imageSrc = event.image || 'https://via.placeholder.com/300x200?text=Protest+Event';
      let imageAlt = event.title || 'Protest Event Image';

      // Optional override for special victim-linked visuals
      if (event.date === '2024-06-20') {
        const rex = victimsData.find(v => v.name === 'Rex Masai');
        if (rex && rex.photo) {
          imageSrc = rex.photo;
          imageAlt = `Photo of ${rex.name}`;
        }
      } else if (event.date === '2024-06-25') {
        const eric = victimsData.find(v => v.name === 'Eric Shieni');
        if (eric && eric.photo) {
          imageSrc = eric.photo;
          imageAlt = `Photo of ${eric.name}`;
        }
      }

      const div = document.createElement('div');
      div.classList.add('timeline-event');
      div.innerHTML = `
        <img src="${imageSrc}" alt="${imageAlt}" onerror="this.src='https://via.placeholder.com/300x200?text=No+Image'">
        <h3>${event.date}</h3>
        <h4>${event.title}</h4>
        <p>${event.description.substring(0, 100)}...</p>
        <a href="${event.link}" target="_blank" class="read-more">Read More</a>
        <div class="share-buttons">
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(event.link)}" target="_blank">Share on X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(event.link)}" target="_blank">Share on Facebook</a>
          <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(event.title)}%20${encodeURIComponent(event.link)}" target="_blank">Share on WhatsApp</a>
        </div>
      `;
      timelineContainer.appendChild(div);
    });
  }

  eventFilter.addEventListener('change', (e) => {
    const type = e.target.value;
    const filtered = type === 'all' ? eventsData : eventsData.filter(e => e.type === type);
    renderTimeline(filtered);
  });
});
