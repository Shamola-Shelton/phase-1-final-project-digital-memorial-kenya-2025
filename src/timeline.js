document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/events')
    .then(response => response.json())
    .then(events => {
      const timelineContainer = document.getElementById('timeline-container');
      events.sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date
      events.forEach(event => {
        const eventDiv = document.createElement('div');
        eventDiv.classList.add('timeline-event');
        eventDiv.innerHTML = `
          <h3>${event.date}</h3>
          <h4>${event.title}</h4>
          <p>${event.description}</p>
          <a href="${event.link}" target="_blank">Read More</a>
          <div class="share-buttons">
            <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(event.title)}&url=${encodeURIComponent(event.link)}" target="_blank">Share on X</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(event.link)}" target="_blank">Share on Facebook</a>
            <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(event.title)}%20${encodeURIComponent(event.link)}" target="_blank">Share on WhatsApp</a>
          </div>
        `;
        eventDiv.addEventListener('click', () => {
          eventDiv.classList.toggle('expanded');
        });
        timelineContainer.appendChild(eventDiv);
      });
    })
    .catch(error => console.error('Error fetching events:', error));
});