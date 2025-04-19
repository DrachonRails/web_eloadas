const apiUrl = 'https://your-api-endpoint.com';  // Cseréld ki az API URL-jére

// Helper function for AJAX request
function makeRequest(url, method, data = {}) {
    return fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
      .then(data => data)
      .catch(error => console.error('Error:', error));
}

// CREATE function
document.getElementById('createForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const height = parseInt(document.getElementById('height').value);
    const weight = parseInt(document.getElementById('weight').value);
    const code = document.getElementById('code').value;

    // Validation
    if (name === '' || height <= 0 || weight <= 0 || code === '') {
        alert('Minden mező kitöltése kötelező!');
        return;
    }

    const data = { op: 'create', name, height, weight, code };

    makeRequest(apiUrl, 'POST', data)
        .then(response => {
            alert('Adat mentése sikeres: ' + response.affectedRows);
        });
});

// READ function
document.getElementById('loadDataButton').addEventListener('click', function () {
    const code = prompt("Add meg a code-ot a lekérdezéshez:");

    const data = { op: 'read', code };

    makeRequest(apiUrl, 'POST', data)
        .then(response => {
            let output = `<p>Adatok (${response.rowCount} rekord):</p>`;
            response.list.forEach(item => {
                output += `
                    <p>ID: ${item.id} | Név: ${item.name} | Magasság: ${item.height} | Súly: ${item.weight}</p>
                `;
            });

            const heights = response.list.map(item => item.height);
            const sum = heights.reduce((acc, curr) => acc + curr, 0);
            const average = sum / heights.length;
            const maxHeight = Math.max(...heights);

            output += `
                <p>Összeg: ${sum}</p>
                <p>Átlag: ${average}</p>
                <p>Legnagyobb magasság: ${maxHeight}</p>
            `;

            document.getElementById('dataOutput').innerHTML = output;
        });
});

// UPDATE function
document.getElementById('updateForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('updateId').value);
    const name = document.getElementById('updateName').value;
    const height = parseInt(document.getElementById('updateHeight').value);
    const weight = parseInt(document.getElementById('updateWeight').value);
    const code = document.getElementById('updateCode').value;

    // Validation
    if (name === '' || height <= 0 || weight <= 0 || code === '') {
        alert('Minden mező kitöltése kötelező!');
        return;
    }

    const data = { op: 'update', id, name, height, weight, code };

    makeRequest(apiUrl, 'POST', data)
        .then(response => {
            alert('Adat módosítása sikeres: ' + response.affectedRows);
        });
});

// DELETE function
document.getElementById('deleteForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const id = parseInt(document.getElementById('deleteId').value);
    const code = document.getElementById('deleteCode').value;

    const data = { op: 'delete', id, code };

    makeRequest(apiUrl, 'POST', data)
        .then(response => {
            alert('Adat törlése sikeres: ' + response.affectedRows);
        });
});
