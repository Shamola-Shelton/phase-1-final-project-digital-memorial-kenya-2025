document.addEventListener('DOMContentLoaded', () => {
  const victimGrid = document.getElementById('victim-grid');
  const searchBar = document.getElementById('search-bar');
  const modal = document.getElementById('victim-modal');
  const modalImage = document.getElementById('modal-image');
  const modalName = document.getElementById('modal-name');
  const modalAge = document.getElementById('modal-age');
  const modalStory = document.getElementById('modal-story');
  const modalTributes = document.getElementById('modal-tributes');
  const modalClose = document.querySelector('.modal-close');

  let victimsData = [];
  let tributesData = [];

  Promise.all([
    fetch('https://phase-1-final-project-digital-memorial-pt0z.onrender.com/victims').then(res => res.json()),
    fetch('https://phase-1-final-project-digital-memorial-pt0z.onrender.com/tributes').then(res => res.json())
  ])
    .then(([victims, tributes]) => {
      victimsData = victims;
      tributesData = tributes;
      renderVictims(victimsData);
    })
    .catch(error => console.error('Error fetching data:', error));

  function renderVictims(victims) {
    victimGrid.innerHTML = '';
    victims.forEach(victim => {
      const victimCard = document.createElement('div');
      victimCard.classList.add('victim-card');
      victimCard.innerHTML = `
        <img src="${victim.photo}" alt="Photo of ${victim.name}" onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">
        <h3>${victim.name}</h3>
        <p>Age: ${victim.age ?? 'Unknown'}</p>
        <p>${victim.story.substring(0, 100)}...</p>
        <button class="read-more" data-id="${victim.id}">Read More</button>
        <div class="share-buttons">
          <a href="https://twitter.com/intent/tweet?text=${encodeURIComponent(victim.name)}'s story&url=${encodeURIComponent(window.location.href)}" target="_blank" aria-label="Share on Twitter">Share on X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" aria-label="Share on Facebook">Share on Facebook</a>
          <a href="https://api.whatsapp.com/send?text=${encodeURIComponent(victim.name)}'s story ${encodeURIComponent(window.location.href)}" target="_blank" aria-label="Share on WhatsApp">Share on WhatsApp</a>
        </div>
      `;
      victimGrid.appendChild(victimCard);
    });

    document.querySelectorAll('.read-more').forEach(button => {
      button.addEventListener('click', () => {
        const victimId = button.getAttribute('data-id');
        const victim = victimsData.find(v => v.id == victimId);
        if (!victim) return;
        modalImage.src = victim.photo;
        modalImage.alt = `Photo of ${victim.name}`;
        modalName.textContent = victim.name;
        modalAge.textContent = `Age: ${victim.age ?? 'Unknown'}`;
        modalStory.textContent = victim.story;
        modalTributes.innerHTML = '';
        const tributes = tributesData.filter(t => t.victimId == victimId && t.approved);
        tributes.forEach(tribute => {
          const tributeDiv = document.createElement('div');
          tributeDiv.classList.add('tribute');
          tributeDiv.innerHTML = `<p>"${tribute.message}" - ${tribute.author}</p>`;
          modalTributes.appendChild(tributeDiv);
        });
        modal.style.display = 'block';
      });
    });
  }

  searchBar.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredVictims = victimsData.filter(victim =>
      victim.name?.toLowerCase().includes(searchTerm)
    );
    renderVictims(filteredVictims);
  });

  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
