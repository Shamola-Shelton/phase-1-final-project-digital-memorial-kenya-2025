document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('submit-tribute');
  const victimSelect = document.getElementById('victim-id');
  const confirmation = document.getElementById('tribute-confirmation');
  const previewBtn = document.getElementById('preview-btn');
  const previewDiv = document.getElementById('tribute-preview');
  const tributesGrid = document.getElementById('tributes-grid');

  let victimsData = [];

  // Fetch victims and tributes
  Promise.all([
    fetch('https://phase-1-final-project-digital-memorial-pt0z.onrender.com/victims').then(res => res.json()),
    fetch('https://phase-1-final-project-digital-memorial-pt0z.onrender.com/tributes').then(res => res.json())
  ])
    .then(([victims, tributes]) => {
      victimsData = victims;

      // Populate victim dropdown
      victims.forEach(victim => {
        const option = document.createElement('option');
        option.value = victim.id;
        option.textContent = victim.name;
        victimSelect.appendChild(option);
      });

      // Render all tributes
      renderTributes(tributes);
    })
    .catch(error => console.error('Error fetching data:', error));

  // Render tributes
  function renderTributes(tributes) {
    tributesGrid.innerHTML = '';
    if (tributes.length === 0) {
      tributesGrid.innerHTML = '<p>No tributes submitted yet.</p>';
      return;
    }
    tributes.forEach(tribute => {
      const victim = victimsData.find(v => v.id === tribute.victimId);
      const tributeCard = document.createElement('div');
      tributeCard.classList.add('tribute-card');
      tributeCard.innerHTML = `
        <h3>Tribute to ${victim ? victim.name : 'Unknown'}</h3>
        <p class="tribute-message">"${tribute.message}"</p>
        <p>— ${tribute.author}</p>
        <p>Status: ${tribute.approved ? 'Approved' : 'Pending'}</p>
        <button class="edit-btn" data-id="${tribute.id}">Edit</button>
        <button class="delete-btn" data-id="${tribute.id}">Delete</button>
      `;
      tributesGrid.appendChild(tributeCard);
    });

    // Add event listeners for edit and delete buttons
    document.querySelectorAll('.edit-btn').forEach(btn => {
      btn.addEventListener('click', () => editTribute(btn.dataset.id));
    });
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', () => deleteTribute(btn.dataset.id));
    });
  }

  // Preview tribute
  previewBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value || 'Anonymous';
    const message = document.getElementById('message').value;
    const victimId = victimSelect.value;
    const victim = victimsData.find(v => v.id == victimId);
    previewDiv.innerHTML = `
      <h3>Tribute to ${victim ? victim.name : 'Unknown'}</h3>
      <p>"${message}"</p>
      <p>— ${name}</p>
    `;
  });

  // Handle form submission (Create)
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const victimId = victimSelect.value;
    const name = document.getElementById('name').value || 'Anonymous';
    const message = document.getElementById('message').value;

    const formData = {
      victimId: parseInt(victimId),
      author: name,
      message: message,
      approved: false
    };

    fetch('http://localhost:3000/tributes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(() => {
        confirmation.textContent = 'Tribute submitted successfully.';
        confirmation.style.color = '#444';
        form.reset();
        previewDiv.innerHTML = '';
        // Refresh tributes list
        fetch('http://localhost:3000/tributes')
          .then(res => res.json())
          .then(tributes => renderTributes(tributes))
          .catch(error => console.error('Error refreshing tributes:', error));
      })
      .catch(error => {
        console.error('Error submitting tribute:', error);
        confirmation.textContent = 'Error submitting tribute. Please try again.';
        confirmation.style.color = '#d33';
      });
  });

  // Edit tribute
  function editTribute(id) {
    const tributeCard = document.querySelector(`.tribute-card button[data-id="${id}"]`).parentElement;
    const message = tributeCard.querySelector('.tribute-message').textContent.slice(1, -1); // Remove quotes
    const author = tributeCard.querySelector('p:nth-child(3)').textContent.slice(2); // Remove "— "
    const victimId = victimsData.find(v => v.name === tributeCard.querySelector('h3').textContent.replace('Tribute to ', '')).id;

    // Replace card content with edit form
    tributeCard.innerHTML = `
      <form class="edit-tribute-form">
        <label for="edit-name-${id}">Your Name (Optional):</label>
        <input type="text" id="edit-name-${id}" value="${author}">
        <label for="edit-message-${id}">Tribute Message:</label>
        <textarea id="edit-message-${id}">${message}</textarea>
        <button type="submit" data-id="${id}">Save</button>
        <button type="button" class="cancel-edit" data-id="${id}">Cancel</button>
      </form>
    `;

    // Handle edit form submission
    tributeCard.querySelector('.edit-tribute-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const updatedName = document.getElementById(`edit-name-${id}`).value || 'Anonymous';
      const updatedMessage = document.getElementById(`edit-message-${id}`).value;

      fetch(`http://localhost:3000/tributes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          victimId: victimId,
          author: updatedName,
          message: updatedMessage,
          approved: false
        })
      })
        .then(response => response.json())
        .then(() => {
          confirmation.textContent = 'Tribute updated successfully.';
          confirmation.style.color = '#444';
          fetch('http://localhost:3000/tributes')
            .then(res => res.json())
            .then(tributes => renderTributes(tributes))
            .catch(error => console.error('Error refreshing tributes:', error));
        })
        .catch(error => {
          console.error('Error updating tribute:', error);
          confirmation.textContent = 'Error updating tribute. Please try again.';
          confirmation.style.color = '#d33';
        });
    });

    // Handle cancel edit
    tributeCard.querySelector('.cancel-edit').addEventListener('click', () => {
      fetch('http://localhost:3000/tributes')
        .then(res => res.json())
        .then(tributes => renderTributes(tributes))
        .catch(error => console.error('Error refreshing tributes:', error));
    });
  }

  // Delete tribute
  function deleteTribute(id) {
    if (confirm('Are you sure you want to delete this tribute?')) {
      fetch(`http://localhost:3000/tributes/${id}`, {
        method: 'DELETE'
      })
        .then(() => {
          confirmation.textContent = 'Tribute deleted successfully.';
          confirmation.style.color = '#444';
          fetch('http://localhost:3000/tributes')
            .then(res => res.json())
            .then(tributes => renderTributes(tributes))
            .catch(error => console.error('Error refreshing tributes:', error));
        })
        .catch(error => {
          console.error('Error deleting tribute:', error);
          confirmation.textContent = 'Error deleting tribute. Please try again.';
          confirmation.style.color = '#d33';
        });
    }
  }
});