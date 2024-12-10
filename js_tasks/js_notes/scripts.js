window.onload = init;

function getLocalStorageItem(key, defaultValue = []) {
    let storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
}

function setLocalStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function modifyNotes(action, index = null, newNote = null) {
    let notes = getLocalStorageItem('notes');

    switch (action) {
        case 'add':
            notes.push(newNote);
            break;
        case 'delete':
            notes.splice(index, 1);
            break;
        case 'edit':
            notes[index] = newNote;
            break;
    }

    setLocalStorageItem('notes', notes);
    fillTable();
}

function fillTable() {
    let tableBody = document.querySelector('#notes tbody');
    let notes = getLocalStorageItem('notes');
    tableBody.innerHTML = '';

    notes.forEach((note, i) => {
        tableBody.innerHTML += `<tr><td>${i + 1}</td><td>${note}</td>
                <td>
                    <i class="fa-regular fa-pen-to-square" onclick="openEditModal(${i})"></i>
                    <i class="fa-regular fa-trash-can" onclick="modifyNotes('delete', ${i})"></i>
                </td>
            </tr>`;
    });
}

function setupFormAction() {
    let form = document.forms.note_form;
    form.elements.add.onclick = () => {
        let newNote = form.elements.note.value.trim();
        if (newNote) {
            form.reset();
            modifyNotes('add', null, newNote);
        }
    };
}

function setupModalActions() {
    let modal = document.getElementById("editModal");
    let closeModal = document.querySelector(".close");

    // Close modal only by "X" button
    closeModal.onclick = () => modal.style.display = "none";
}

function openEditModal(index) {
    let notes = getLocalStorageItem('notes');
    let editInput = document.querySelector("#edit_form input[name='edit_note']");

    editInput.value = notes[index];
    let modal = document.getElementById("editModal");
    modal.style.display = "flex";

    document.getElementById("save_edit").onclick = () => {
        let editedNote = editInput.value.trim();
        if (editedNote) {
            modifyNotes('edit', index, editedNote);
            modal.style.display = "none";
        }
    };
}

function init() {
    fillTable();
    setupFormAction();
    setupModalActions();
}
