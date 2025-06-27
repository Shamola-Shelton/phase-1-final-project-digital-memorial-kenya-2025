document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('submit-tribute');
  const victimSelect = document.getElementById('victim-id');
  const confirmation = document.getElementById('tribute-confirmation');
  const previewBtn = document.getElementById('preview-btn');
  const previewDiv = document.getElementById('tribute-preview');

  // Populate victim dropdown
  fetch('http://localhost:3000/victims')
    .then(response => response.json())
    .then(victims => {
      victims.forEach(victim => {
        const option = document.createElement('option');
        option.value = victim.id;
        option.textContent = victim.name;
        victimSelect.appendChild(option);
      });
    })
    .catch(error => console.error('Error fetching victims:', error));

  // Preview tribute
  previewBtn.addEventListener('click', () => {
    const name = document.getElementById('name').value || 'Anonymous';
    const message = document.getElementById('message').value;
    const image = document.getElementById('image').files[0];
    previewDiv.innerHTML = `
      <h3>${name}</h3>
      <p>${message}</p>
      ${image ? `<img src="${URL.createObjectURL(image)}" alt="Tribute image" loading="lazy">` : ''}
    `;
  });

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const victimId = victimSelect.value;
    const name = document.getElementById('name').value || 'Anonymous';
    const message = document.getElementById('message').value;
    const image = document.getElementById('image').files[0];

    const formData = new FormData();
    formData.append('victimId', parseInt(victimId));
    formData.append('author', name);
    formData.append('message', message);
    formData.append('approved', false);
    if (image) formData.append('image', image);

    fetch('http://localhost:3000/tributes', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(() => {
        confirmation.textContent = 'Tribute submitted for moderation. Thank you.';
        confirmation.style.color = '#444';
        form.reset();
        previewDiv.innerHTML = '';
      })
      .catch(error => {
        console.error('Error submitting tribute:', error);
        confirmation.textContent = 'Error submitting tribute. Please try again.';
        confirmation.style.color = '#d33';
      });
  });
});