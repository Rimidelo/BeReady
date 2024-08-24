import { SERVER_URL } from "./constants.js";

let activityRecords = [];
let currentEditRecord = null;

const activityRecordModal = new bootstrap.Modal(
  document.getElementById("activityRecordModal")
);

document
  .querySelector("#add_record .btn.add-activity-btn")
  .addEventListener("click", () => {
    openActivityModal("ADD");
  });

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("record-edit-btn")) {
    const row = event.target.closest("tr");
    const record = activityRecords.find(
      (r) => r.recordDate === row.dataset.recordDate
    );
    currentEditRecord = record;
    openActivityModal("EDIT", record);
  } else if (event.target.classList.contains("record-view-btn")) {
    const row = event.target.closest("tr");
    const record = activityRecords.find(
      (r) => r.recordDate === row.dataset.recordDate
    );
    openActivityModal("VIEW", record);
  } else if (event.target.classList.contains("record-delete-btn")) {
    const row = event.target.closest("tr");
    const record = activityRecords.find(
      (r) => r.recordDate === row.dataset.recordDate
    );
    deleteActivityRecord(record);
  }
});

function openActivityModal(mode, record = {}) {
  const form = document.getElementById("activityRecordForm");

  if (mode === "ADD") {
    form.reset();
    currentEditRecord = null;
  } else {
    document.getElementById("dateInput").value = record.recordDate;
    document.getElementById("resultInput").value = record.result;
    document.getElementById("feedbackInput").value = record.feedback;
  }

  form
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.disabled = mode === "VIEW"));

  activityRecordModal.show();
}

function saveActivityRecord(event) {
  event.preventDefault();

  const newRecord = {
    userId: currentEditRecord ? currentEditRecord.userId : 2,
    activityId: currentEditRecord ? currentEditRecord.activityId : 1,
    recordDate: document.getElementById("dateInput").value,
    result: document.getElementById("resultInput").value,
    feedback: document.getElementById("feedbackInput").value,
  };

  if (!currentEditRecord) {
    activityRecords.push(newRecord);
    addRecordToTable(newRecord);
  } else {
    activityRecords = activityRecords.map((record) =>
      record.recordDate === currentEditRecord.recordDate ? newRecord : record
    );
    updateRecordInTable(newRecord);
  }
  fetch(`${SERVER_URL}/userActivityRecords/setRecord`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newRecord),
  })
    .then((response) => response.json())
    .then((data) => console.log("Record added successfully:", data))
    .catch((error) => console.error("Error adding record:", error));

  activityRecordModal.hide();
  document.getElementById("activityRecordForm").reset();
  currentEditRecord = null;
}

function addRecordToTable(record) {
  const tableBody = document.querySelector("#activityTable tbody");
  const newRow = document.createElement("tr");
  newRow.dataset.recordDate = record.recordDate;
  newRow.innerHTML = `
        <td>${record.recordDate}</td>
        <td>${record.result}</td>
        <td>
            <button class="btn btn-secondary record-view-btn btn-icon"></button>
            <button class="btn btn-warning record-edit-btn btn-icon"></button>
            <button class="btn btn-danger record-delete-btn btn-icon"></button>
        </td>
    `;
  tableBody.appendChild(newRow);
}

function updateRecordInTable(updatedRecord) {
  const row = document.querySelector(
    `tr[data-record-date='${updatedRecord.recordDate}']`
  );
  row.cells[0].textContent = updatedRecord.recordDate;
  row.cells[1].textContent = updatedRecord.result;
}

function deleteActivityRecord(record) {
  activityRecords = activityRecords.filter(
    (r) => r.recordDate !== record.recordDate
  );
  document
    .querySelector(`tr[data-record-date='${record.recordDate}']`)
    .remove();

  fetch(`${SERVER_URL}/userActivityRecords/deleteRecord`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: record.userId,
      activityId: record.activityId,
      recordDate: record.recordDate,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Record deleted successfully:", data))
    .catch((error) => console.error("Error deleting record:", error));
}

document
  .getElementById("activityRecordForm")
  .addEventListener("submit", saveActivityRecord);
