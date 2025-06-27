document.addEventListener('DOMContentLoaded', () => {
  const timelineContainer = document.getElementById('timeline-container');
  const eventFilter = document.getElementById('event-filter');
  let eventsData = [];

  // Fetch events
  fetch('http://localhost:3000/events')
    .then(response => response.json())
    .then(events => {
      eventsData = events.sort((a, b) => new Date(a.date) - new Date(b.date));
      renderTimeline(eventsData);
      initMap(eventsData);
    })
    .catch(error => console.error('Error fetching events:', error));

  // Render timeline
  function renderTimeline(events) {
    timelineContainer.innerHTML = '';
    events.forEach(event => {
      const eventDiv = document.createElement('div');
      eventDiv.classList.add('timeline-event');
      eventDiv.innerHTML = `
        <h3>${event.date}</h3>
        <h4>${event.title}</h4>
        <p>${event.description}</p>
        <blockquote>${event.quote || 'No eyewitness quote available'}</blockquote>
        <a href="${event.link}" target="_blank">Read More</a>
        <div class="share-buttons">
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(event.link)}" target="_blank" aria-label="Share on Twitter">Share on X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(event.link)}" target="_blank" aria-label="Share on Facebook">Share on Facebook</a>
          <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(event.title)}%20${encodeURIComponent(event.link)}" target="_blank" aria-label="Share on WhatsApp">Share on WhatsApp</a>
        </div>
      `;
      timelineContainer.appendChild(eventDiv);
    });
  }

  // Filter events
  eventFilter.addEventListener('change', (e) => {
    const filter = e.target.value;
    const filteredEvents = filter === 'all' ? eventsData : eventsData.filter(event => event.type === filter);
    renderTimeline(filteredEvents);
  });

  // Google Maps integration (replace YOUR_API_KEY with actual key)
  window.initMap = function() {
    const map = new google.maps.Map(document.getElementById('map-view'), {
      zoom: 6,
      center: { lat: -1.2921, lng: 36.8219 } // Nairobi
    });
    eventsData.forEach(event => {
      if (event.location) {
        new google.maps.Marker({
          position: event.location,
          map: map,
          title: event.title
        });
      }
    });
  };
});