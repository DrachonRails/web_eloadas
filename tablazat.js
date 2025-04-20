let data = [
    { id: 1, name: "Kiss Béla", email: "bela.kiss@example.com", number: 25 },
    { id: 2, name: "Nagy Anna", email: "anna.nagy@example.com", number: 88 },
    { id: 3, name: "Szabó István", email: "istvan.szabo@example.com", number: 15 },
    { id: 4, name: "Horváth Zsófia", email: "zsofia.horvath@example.com", number: 50 }
];

let editItemId = null;

function renderTable() {
    const tableBody = document.querySelector("#dataTable tbody");
    tableBody.innerHTML = "";
    data.forEach(item => {
        const row = tableBody.insertRow();
        row.insertCell().textContent = item.id;
        row.insertCell().textContent = item.name;
        row.insertCell().textContent = item.email;
        row.insertCell().textContent = item.number;
        const actionsCell = row.insertCell();
        const editButton = document.createElement("button");
        editButton.textContent = "Szerkesztés";
        editButton.classList.add("edit-btn");
        editButton.onclick = () => editItem(item.id);
        actionsCell.appendChild(editButton);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Törlés";
        deleteButton.classList.add("delete-btn");
        deleteButton.onclick = () => deleteItem(item.id);
        actionsCell.appendChild(deleteButton);
    });
}

function sortTable(columnIndex) {
    const isAscending = document.querySelectorAll("th")[columnIndex].classList.toggle("asc");
    data.sort((a, b) => {
        const valA = Object.values(a)[columnIndex];
        const valB = Object.values(b)[columnIndex];
        if (typeof valA === "string") {
            return isAscending ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
        return isAscending ? valA - valB : valB - valA;
    });
    renderTable();
}

function filterTable(columnIndex) {
    const input = document.querySelectorAll(".mySearch")[columnIndex];
    const filter = input.value.toUpperCase();
    const rows = document.querySelector("#dataTable tbody").rows;
    for (let i = 0; i < rows.length; i++) {
        const cell = rows[i].cells[columnIndex];
        if (cell && cell.textContent.toUpperCase().indexOf(filter) > -1) {
            rows[i].style.display = "";
        } else {
            rows[i].style.display = "none";
        }
    }
}

function validateField(fieldId, rules) {
    const field = document.getElementById(fieldId);
    const errorDiv = document.getElementById(fieldId + "Error");
    errorDiv.textContent = "";
    let isValid = true;

    if (rules.required && !field.value.trim()) {
        errorDiv.textContent = "A mező kitöltése kötelező.";
        isValid = false;
    }

    if (rules.minlength && field.value.length < rules.minlength) {
        errorDiv.textContent = `Minimum ${rules.minlength} karakter szükséges.`;
        isValid = false;
    }

    if (rules.maxlength && field.value.length > rules.maxlength) {
        errorDiv.textContent = `Maximum ${rules.maxlength} karakter megengedett.`;
        isValid = false;
    }

    if (rules.email && field.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        errorDiv.textContent = "Érvényes email formátum szükséges.";
        isValid = false;
    }

    if (rules.min && rules.max && field.value.trim()) {
        const numValue = parseInt(field.value);
        if (isNaN(numValue) || numValue < rules.min || numValue > rules.max) {
            errorDiv.textContent = `A szám értéke ${rules.min} és ${rules.max} között kell legyen.`;
            isValid = false;
        }
    }

    return isValid;
}

function validateForm() {
    const isNameValid = validateField("name", { required: true, minlength: 2, maxlength: 50 });
    const isEmailValid = validateField("email", { required: true, email: true });
    const isNumberValid = validateField("number", { required: true, min: 10, max: 99 });
    return isNameValid && isEmailValid && isNumberValid;
}

function saveData() {
    if (validateForm()) {
        const idInput = document.getElementById("id");
        const nameInput = document.getElementById("name");
        const emailInput = document.getElementById("email");
        const numberInput = document.getElementById("number");

        const newItem = {
            id: editItemId !== null ? editItemId : data.length + 1,
            name: nameInput.value.trim(),
            email: emailInput.value.trim(),
            number: parseInt(numberInput.value)
        };

        if (editItemId !== null) {
            const index = data.findIndex(item => item.id === editItemId);
            if (index !== -1) {
                data[index] = newItem;
            }
            editItemId = null;
        } else {
            data.push(newItem);
        }

        resetForm();
        renderTable();
    }
}

function editItem(id) {
    const itemToEdit = data.find(item => item.id === id);
    if (itemToEdit) {
        editItemId = id;
        document.getElementById("id").value = itemToEdit.id;
        document.getElementById("name").value = itemToEdit.name;
        document.getElementById("email").value = itemToEdit.email;
        document.getElementById("number").value = itemToEdit.number;
    }
}

function deleteItem(id) {
    if (confirm("Biztosan törölni szeretnéd ezt az elemet?")) {
        data = data.filter(item => item.id !== id);
        renderTable();
    }
}

function resetForm() {
    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("number").value = "";
    document.querySelectorAll(".error").forEach(error => error.textContent = "");
    editItemId = null;
}

//renderTable(); // Kezdeti táblázat megjelenítése

document.addEventListener("DOMContentLoaded", () => {
    renderTable();
});