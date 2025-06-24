document.addEventListener('DOMContentLoaded', displayResources);

function displayResources() {
    const resources = [
        { name: "Kenya National Commission on Human Rights (KNCHR)", link: "https://www.knchr.org/" },
        { name: "Amnesty International Kenya", link: "https://www.amnestykenya.org/" },
        { name: "Protest Safety Guide (PDF)", link: "https://example.com/safety-guide.pdf" },
        { name: "Legal Aid Kenya", link: "https://legalaidkenya.org/" }
    ];

    const container = document.getElementById('resources');
    resources.forEach(res => {
        const resLink = document.createElement('p');
        resLink.innerHTML = `<a href="${res.link}" target="_blank">${res.name}</a>`;
        container.appendChild(resLink);
    });
}
