document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/victims')
    .then(response => response.json())
    .then(victims => {
      const victimGrid = document.getElementById('victim-grid');
      victims.forEach(victim => {
        const card = document.createElement('div');
        card.classList.add('victim-card');
        card.innerHTML = `
          <img src="${victim.photo}" alt="${victim.name}">
          <h3>${victim.name}</h3>
          <p>Age: ${victim.age}</p>
          <p>${victim.story}</p>
          <div class="tribute-list" id="tributes-${victim.id}"></div>
          <div class="share-buttons">
            <a href="https://twitter.com/intent/tweet?text=In%20memory%20of%20${encodeURIComponent(victim.name)}&url=${encodeURIComponent(window.location.href)}" target="_blank">Share on X</a>
            <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank">Share on Facebook</a>
            <a href="https://api.whatsapp.com/send?text=In%20memory%20of%20${encodeURIComponent(victim.name)}%20${encodeURIComponent(window.location.href)}" target="_blank">Share on WhatsApp</a>
          </div>
        `;
        victimGrid.appendChild(card);

        // Fetch tributes for this victim
        fetch(`http://localhost:3000/tributes?victimId=${victim.id}&approved=true`)
          .then(response => response.json())
          .then(tributes => {
            const tributeList = document.getElementById(`tributes-${victim.id}`);
            tributes.forEach(tribute => {
              const p = document.createElement('p');
              p.innerHTML = `<strong>${tribute.author || 'Anonymous'}:</strong> ${tribute.message}`;
              tributeList.appendChild(p);
            });
          });
      });
    })
    .catch(error => console.error('Error fetching victims:', error));
});