document.addEventListener('DOMContentLoaded', main);

function main() {
    displayVictims();
    addTributeListener();
}

function displayVictims() {
    fetch('http://localhost:3000/victims')
        .then(res => res.json())
        .then(victims => {
            const wall = document.getElementById('memorial-wall');
            wall.innerHTML = '';
            victims.forEach(victim => {
                const card = document.createElement('div');
                card.className = 'victim-card';
                card.innerHTML = `
                    <img src="${victim.photo}" alt="${victim.name}" />
                    <h3>${victim.name}</h3>
                    <p>Age: ${victim.age}</p>
                    <p>${victim.story}</p>
                `;
                wall.appendChild(card);
            });
        });
}

function addTributeListener() {
    const form = document.getElementById('new-tribute-form');
    form.addEventListener('submit', event => {
        event.preventDefault();
        const author = document.getElementById('author').value || 'Anonymous';
        const message = document.getElementById('message').value;

        fetch('http://localhost:3000/tributes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                author,
                message,
                approved: false // for moderation
            })
        })
        .then(() => {
            alert('Thank you for your tribute. It will be displayed after approval.');
            form.reset();
        });
    });
}
