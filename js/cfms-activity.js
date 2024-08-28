let activityRecords = [];
const loggedInUserID = JSON.parse(
  sessionStorage.getItem("LoggedInUser")
).UserID;
let activityId;
window.onload = function () {
  const urlParams = new URLSearchParams(window.location.search);
  activityId = urlParams.get("activityId");

  if (activityId && loggedInUserID) {
    fetchActivityAndUserRecords(activityId, loggedInUserID);
  } else {
    console.error("No activity ID or user ID available.");
  }
};

function fetchActivityAndUserRecords(activityId, userId) {
  fetch(
    `${SERVER_URL}/managePlan/getUserActivity/${userId}?activityID=${activityId}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      displayActivityDetails(data.activityDetails[0]);
      displayUserActivityRecords(data.userRecords);
      activityRecords = data.userRecords;
    })
    .catch((error) => {
      console.error("Error fetching activity or user records:", error);
    });
}

function displayActivityDetails(activityDetails) {
  document.querySelector(
    "h1"
  ).textContent = `${activityDetails.name}`;
  document.querySelector("#activity_target h2").innerHTML = `
        <span class="goal-button"></span>המטרה: ${activityDetails.targetValue} ${activityDetails.targetUnit}
    `;
  const ctx = document.getElementById("activityChart").getContext("2d");
  const config = {
    type: "line",
    data: activityDetails.chartData,
    options: {
      scales: {
        y: { beginAtZero: true },
      },
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          onClick: null,
          labels: {
            usePointStyle: true,
            pointStyle: "circle",
            padding: 20,
            boxWidth: 0,
          },
        },
        datalabels: {
          color: "green",
          anchor: "end",
          align: "top",
          formatter: function (value, context) {
            return value;
          },
        },
      },
    },
    plugins: [ChartDataLabels],
  };
  const activityChart = new Chart(ctx, config);
}

function displayUserActivityRecords(userRecords) {
  const tableBody = document.querySelector("#activityTable tbody");
  tableBody.innerHTML = "";

  userRecords.forEach((record) => {
    const row = document.createElement("tr");
    row.id = `record-${record.date}`;
    row.innerHTML = `
            <td>${record.date}</td>
            <td>${record.result}</td>
            <td>
                <button class="btn btn-secondary record-view-btn btn-icon"></button>
                <button class="btn btn-warning record-edit-btn btn-icon"></button>
                <button class="btn btn-danger record-delete-btn btn-icon"></button>
            </td>
        `;
    tableBody.appendChild(row);
  });
}

document
  .querySelector("#add_record .btn.add-activity-btn")
  .addEventListener("click", () => {
    openActivityModal("ADD", { userId: loggedInUserID, activityId });
  });
const getRecordOfClick = (target) => {
  const row = target.closest("tr");
  return {
    userId: loggedInUserID,
    activityId,
    ...activityRecords.find((r) => `record-${r.date}` === row.id),
  };
};
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("record-edit-btn")) {
    openActivityModal("EDIT", getRecordOfClick(event.target));
  } else if (event.target.classList.contains("record-view-btn")) {
    openActivityModal("VIEW", getRecordOfClick(event.target));
  } else if (event.target.classList.contains("record-delete-btn")) {
    getRecordOfClick(event.target);
    deleteActivityRecord(getRecordOfClick(event.target));
  }
});
