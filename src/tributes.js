document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('submit-tribute');
  const victimSelect = document.getElementById('victim-id');
  const confirmation = document.getElementById('tribute-confirmation');

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

  // Handle form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const victimId = victimSelect.value;
    const name = document.getElementById('name').value || 'Anonymous';
    const message = document.getElementById('message').value;

    fetch('http://localhost:3000/tributes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ victimId: parseInt(victimId), author: name, message, approved: false })
    })
      .then(response => response.json())
      .then(() => {
        confirmation.textContent = 'Tribute submitted for moderation. Thank you.';
        confirmation.style.color = '#444';
        form.reset();
      })
      .catch(error => {
        console.error('Error submitting tribute:', error);
        confirmation.textContent = 'Error submitting tribute. Please try again.';
        confirmation.style.color = '#d33';
      });
  });
});