let activityRecords = [];
let currentEditIndex = -1;

const activityRecordModal = new bootstrap.Modal(document.getElementById('activityRecordModal'));

document.querySelector('#add_record .btn.add-activity-btn').addEventListener('click', () => {
    openActivityModal('ADD');
});

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('record-edit-btn')) {
        const index = Array.from(event.target.closest('tbody').children).indexOf(event.target.closest('tr'));
        currentEditIndex = index;
        openActivityModal('EDIT', activityRecords[index]);
    } else if (event.target.classList.contains('record-view-btn')) {
        const index = Array.from(event.target.closest('tbody').children).indexOf(event.target.closest('tr'));
        openActivityModal('VIEW', activityRecords[index]);
    } else if (event.target.classList.contains('record-delete-btn')) {
        const index = Array.from(event.target.closest('tbody').children).indexOf(event.target.closest('tr'));
        deleteActivityRecord(index);
    }
});

function openActivityModal(mode, record = {}) {
    const form = document.getElementById('activityRecordForm');

    if (mode === 'ADD') {
        form.reset();
        currentEditIndex = -1;
    } else {
        document.getElementById('dateInput').value = record.date;
        document.getElementById('resultInput').value = record.result;
        document.getElementById('feedbackInput').value = record.feedback;
    }

    if (mode === 'VIEW') {
        form.querySelectorAll('input, textarea').forEach(input => input.disabled = true);
    } else {
        form.querySelectorAll('input, textarea').forEach(input => input.disabled = false);
    }

    activityRecordModal.show();
}

function saveActivityRecord(event) {
    event.preventDefault();

    const newRecord = {
        date: document.getElementById('dateInput').value,
        result: document.getElementById('resultInput').value,
        feedback: document.getElementById('feedbackInput').value,
    };

    if (currentEditIndex === -1) {
        activityRecords.push(newRecord);
        addRecordToTable(newRecord);
    } else {
        activityRecords[currentEditIndex] = newRecord;
        updateRecordInTable(currentEditIndex, newRecord);
    }

    const modalElement = document.getElementById('activityRecordModal');
    const modalInstance = bootstrap.Modal.getInstance(modalElement);
    modalInstance.hide();

    document.getElementById('activityRecordForm').reset();
    currentEditIndex = -1;
}


function addRecordToTable(record) {
    const tableBody = document.querySelector('#activityTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${record.date}</td>
        <td>${record.result}</td>
        <td>
            <button class="btn record-btn-secondary record-view-btn btn-icon"></button>
            <button class="btn record-btn-warning record-edit-btn btn-icon"></button>
            <button class="btn record-btn-danger record-delete-btn btn-icon"></button>
        </td>
    `;

    tableBody.appendChild(newRow);

    newRow.querySelector('.record-view-btn').addEventListener('click', () => openActivityModal('VIEW', record));
    newRow.querySelector('.record-edit-btn').addEventListener('click', () => openActivityModal('EDIT', record));
    newRow.querySelector('.record-delete-btn').addEventListener('click', deleteRecord);
}

function updateRecordInTable(index, record) {
    const tableRows = document.querySelectorAll('#activityTable tbody tr');
    const row = tableRows[index];

    row.cells[0].textContent = record.date;
    row.cells[1].textContent = record.result;
}

function deleteRecord(event) {
    const button = event.target;
    const row = button.closest('tr');
    const index = Array.from(row.parentNode.children).indexOf(row);

    deleteActivityRecord(index);
}

function deleteActivityRecord(index) {
    activityRecords.splice(index, 1);
    document.querySelectorAll('#activityTable tbody tr')[index].remove();
}

document.getElementById('activityRecordForm').addEventListener('submit', saveActivityRecord);
