const activityRecordModal = new bootstrap.Modal(
  document.getElementById("activityRecordModal")
);

function openActivityModal(mode, record = {}) {
  const form = document.getElementById("activityRecordForm");

  if (mode === "ADD") {
    form.reset();
  } else {
    document.getElementById("dateInput").value = record.date;
    document.getElementById("resultInput").value = record.result;
    document.getElementById("feedbackInput").value = record.feedback;
  }

  form
    .querySelectorAll("input, textarea")
    .forEach((input) => (input.disabled = mode === "VIEW"));

  activityRecordModal.show();
  document.getElementById("activityRecordForm").onsubmit = (event) =>
    saveActivityRecord(mode, record, event);
}

function saveActivityRecord(mode, record, event) {
  event.preventDefault();
  const formData = new FormData(event.target);

  const activityRecordData = {};
  formData.forEach((value, key) => {
    activityRecordData[key] = value;
  });

  const newRecord = {
    userId: record.userId,
    activityId: record.activityId,
    date: activityRecordData.date,
    result: activityRecordData.result,
    feedback: activityRecordData.feedback,
  };
  if (mode == "ADD") {
    activityRecords.push(newRecord);
    addRecordToTable(newRecord);
  } else {
    activityRecords = activityRecords.map((currRecord) =>
      currRecord.date === record.date ? newRecord : currRecord
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
}

function addRecordToTable(record) {
  const tableBody = document.querySelector("#activityTable tbody");
  const newRow = document.createElement("tr");
  newRow.dataset.date = record.date;
  newRow.innerHTML = `
        <td>${record.date}</td>
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
  const row = document.getElementById(`record-${updatedRecord.date}`);
  row.cells[0].textContent = updatedRecord.date;
  row.cells[1].textContent = updatedRecord.result;
}

function deleteActivityRecord(record) {
  activityRecords = activityRecords.filter((r) => r.date !== record.date);
  document.getElementById(`record-${record.date}`).remove();

  fetch(`${SERVER_URL}/userActivityRecords/deleteRecord`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId: record.userId,
      activityId: record.activityId,
      date: record.date,
    }),
  })
    .then((response) => response.json())
    .then((data) => console.log("Record deleted successfully:", data))
    .catch((error) => console.error("Error deleting record:", error));
}
