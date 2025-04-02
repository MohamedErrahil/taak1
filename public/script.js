document.addEventListener('DOMContentLoaded', () => {
    const filterInput = document.getElementById('filter');
    const gamesTable = document.getElementById('gamesTable').getElementsByTagName('tbody')[0];

    fetch('/games')
        .then(response => response.json())
        .then(data => {
            gamesTable.innerHTML = ''; // Leegmaken voordat data wordt geladen

            data.forEach(game => {
                const row = gamesTable.insertRow();
                row.insertCell(0).textContent = game.name;
                row.insertCell(1).textContent = game.genre;
                row.insertCell(2).textContent = game.releaseDate;

                // "Details"-link met afbeelding
                const detailCell = row.insertCell(3);
                const detailLink = document.createElement('a');
                detailLink.href = `/details/${game.id}`;
                detailLink.textContent = 'Details';
                detailLink.target = "_blank"; // Opent in een nieuw tabblad
                detailCell.appendChild(detailLink);
            });
        });

    filterInput.addEventListener('input', () => {
        const filterValue = filterInput.value.toLowerCase();
        Array.from(gamesTable.rows).forEach(row => {
            const nameCell = row.cells[0].textContent.toLowerCase();
            row.style.display = nameCell.includes(filterValue) ? '' : 'none';
        });
    });
});
