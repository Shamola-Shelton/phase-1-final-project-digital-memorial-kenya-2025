document.addEventListener('DOMContentLoaded', displayTimeline);

function displayTimeline() {
    fetch('http://localhost:3000/events')
        .then(res => res.json())
        .then(events => {
            const timeline = document.getElementById('timeline');
            timeline.innerHTML = '';
            events.forEach(event => {
                const eventCard = document.createElement('div');
                eventCard.className = 'event-card';
                eventCard.innerHTML = `
                    <h3>${event.date} - ${event.title}</h3>
                    <p>${event.description}</p>
                    <a href="${event.link}" target="_blank">Read more</a>
                `;
                timeline.appendChild(eventCard);
            });
        })
        .catch(err => console.error('Error loading timeline:', err));
}
