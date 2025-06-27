document.addEventListener('DOMContentLoaded', () => {
  const victimGrid = document.getElementById('victim-grid');
  const searchBar = document.getElementById('search-bar');
  const modal = document.getElementById('victim-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalPhoto = document.getElementById('modal-photo');
  const modalStory = document.getElementById('modal-story');
  const lightCandleBtn = document.getElementById('light-candle');
  const candleCountSpan = document.getElementById('candle-count');
  const closeModal = document.querySelector('.modal-close');

  let victimsData = [];

  // Fetch victims
  fetch('http://localhost:3000/victims')
    .then(response => response.json())
    .then(victims => {
      victimsData = victims;
      renderVictims(victims);
    })
    .catch(error => console.error('Error fetching victims:', error));

  // Render victim cards
  function renderVictims(victims) {
    victimGrid.innerHTML = '';
    victims.forEach(victim => {
      const card = document.createElement('div');
      card.classList.add('victim-card');
      card.innerHTML = `
        <img src="${victim.photo}" alt="${victim.name}" loading="lazy">
        <h3>${victim.name}</h3>
        <p>Age: ${victim.age}</p>
        <p>${victim.story}</p>
        <div class="tribute-list" id="tributes-${victim.id}"></div>
        <div class="share-buttons">
          <a href="https://twitter.com/intent/tweet?text=In%20memory%20of%20${encodeURIComponent(victim.name)}&url=${encodeURIComponent(window.location.href)}" target="_blank" aria-label="Share on Twitter">Share on X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}" target="_blank" aria-label="Share on Facebook">Share on Facebook</a>
          <a href="https://api.whatsapp.com/send?text=In%20memory%20of%20${encodeURIComponent(victim.name)}%20${encodeURIComponent(window.location.href)}" target="_blank" aria-label="Share on WhatsApp">Share on WhatsApp</a>
        </div>
      `;
      card.addEventListener('click', () => openModal(victim));
      victimGrid.appendChild(card);

      // Fetch tributes
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
  }

  // Search functionality
  searchBar.addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredVictims = victimsData.filter(victim => victim.name.toLowerCase().includes(query));
    renderVictims(filteredVictims);
  });

  // Modal functionality
  function openModal(victim) {
    modalTitle.textContent = victim.name;
    modalPhoto.src = victim.photo;
    modalPhoto.alt = victim.name;
    modalStory.textContent = `${victim.story} - Age: ${victim.age}`;
    candleCountSpan.textContent = `${victim.candles || 0} candles lit`;
    modal.style.display = 'block';
    lightCandleBtn.onclick = () => {
      victim.candles = (victim.candles || 0) + 1;
      candleCountSpan.textContent = `${victim.candles} candles lit`;
    };
  }

  closeModal.addEventListener('click', () => modal.style.display = 'none');
  window.addEventListener('click', (e) => {
    if (e.target === modal) modal.style.display = 'none';
  });
});