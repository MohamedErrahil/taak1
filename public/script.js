// script.js - Gecombineerde filtering en sortering
document.addEventListener('DOMContentLoaded', function() {
    // --- FILTER FUNCTIONALITEIT ---
    const filterInput = document.getElementById('filter');
    const gamesTable = document.getElementById('gamesTable');
    
    // Foutafhandeling als elementen niet bestaan
    if (!filterInput) {
        console.error('Fout: Zoekbalk met ID "filter" niet gevonden');
        return;
    }
    
    if (!gamesTable) {
        console.error('Fout: Tabel met ID "gamesTable" niet gevonden');
        return;
    }

    // "Geen resultaten" rij aanmaken
    const noResultsRow = document.createElement('tr');
    noResultsRow.innerHTML = '<td colspan="5" style="text-align:center; padding: 20px; color: #666;">Geen games gevonden</td>';
    noResultsRow.style.display = 'none';
    gamesTable.querySelector('tbody').appendChild(noResultsRow);

    // Filter functionaliteit
    filterInput.addEventListener('input', function() {
        const searchTerm = this.value.trim().toLowerCase();
        const rows = gamesTable.querySelectorAll('tbody tr:not(:last-child)');
        let hasVisibleRows = false;

        rows.forEach(row => {
            const nameCell = row.querySelector('td:nth-child(2)');
            if (!nameCell) return;

            const gameName = nameCell.textContent.toLowerCase();
            const shouldShow = gameName.includes(searchTerm);
            
            row.style.display = shouldShow ? '' : 'none';
            if (shouldShow) hasVisibleRows = true;
        });

        noResultsRow.style.display = hasVisibleRows ? 'none' : '';
    });

    // Focus op de zoekbalk bij laden
    filterInput.focus();

    // --- SORTEERFUNCTIONALITEIT ---
    let currentSort = { column: null, direction: 'asc' };

    function sortTable(columnIndex, dataType) {
        const tbody = gamesTable.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr:not(:last-child)'));

        // Bepaal sorteerrichting
        const direction = (currentSort.column === columnIndex && currentSort.direction === 'asc') ? 'desc' : 'asc';

        rows.sort((a, b) => {
            const aCell = a.cells[columnIndex].textContent.trim();
            const bCell = b.cells[columnIndex].textContent.trim();

            if (dataType === 'image') {
                const aImg = a.cells[columnIndex].querySelector('img')?.alt || '';
                const bImg = b.cells[columnIndex].querySelector('img')?.alt || '';
                return direction === 'asc' ? aImg.localeCompare(bImg) : bImg.localeCompare(aImg);
            }

            if (dataType === 'date') {
                return direction === 'asc' 
                    ? new Date(aCell) - new Date(bCell) 
                    : new Date(bCell) - new Date(aCell);
            }

            return direction === 'asc' 
                ? aCell.localeCompare(bCell) 
                : bCell.localeCompare(aCell);
        });

        // Verwijder en voeg rijen opnieuw toe
        rows.forEach(row => tbody.removeChild(row));
        rows.forEach(row => tbody.insertBefore(row, tbody.lastChild));

        // Update sort status
        currentSort = { column: columnIndex, direction };
        updateSortIndicators(columnIndex, direction);
    }

    function updateSortIndicators(columnIndex, direction) {
        const headers = document.querySelectorAll('#gamesTable th');
        headers.forEach((header, index) => {
            header.innerHTML = header.textContent.replace(/ ▼| ▲/g, '');
            if (index === columnIndex) {
                header.innerHTML += direction === 'asc' ? ' ▲' : ' ▼';
            }
        });
    }

    // Maak headers klikbaar (dit moet overeenkomen met je HTML)
    document.querySelectorAll('#gamesTable th').forEach((header, index) => {
        if (index < 4) {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                const dataTypes = ['image', 'text', 'text', 'date'];
                sortTable(index, dataTypes[index]);
            });
        }
    });

    console.log('Filter en sorteer systeem is klaar voor gebruik');
});