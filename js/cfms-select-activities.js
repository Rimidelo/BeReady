const GET_ACTIVITIES_URL = `${SERVER_URL}/managePlan/getActivites`;
let selectedActivities = [];
let planData = [];

const activitySelectionElement = document.getElementById(
  "accordionActivitySelection"
);

window.onload = async () => {
  try {
    await fetchActivities();
    renderActivitySelection();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const fetchActivities = async () => {
  const response = await fetch(GET_ACTIVITIES_URL);
  const data = await response.json();
  planData.push(...data.jobs);
};
const renderActivitySelection = () => {
  planData.forEach((job) => {
    job.activities.forEach((activity) => {
      const activityElement = createActivityElement(activity);
      activitySelectionElement.appendChild(activityElement);
    });
  });
};

const createActivityElement = (activity) => {
  const activityElement = document.createElement("div");
  activityElement.classList.add("cfms-activity-card");

  const title = document.createElement("span");
  title.classList.add("cfms-activity-title");
  title.textContent = activity.name;

  const type = document.createElement("span");
  type.classList.add("cfms-activity-type");
  type.textContent = activity.type;

  const infoButton = document.createElement("button");
  infoButton.classList.add("btn-icon", "info-button");

  activityElement.appendChild(title);
  activityElement.appendChild(type);
  activityElement.appendChild(infoButton);

  activityElement.addEventListener("click", function () {
    this.classList.toggle("selected");
    if (this.classList.contains("selected")) {
      selectedActivities.push(activity.name);
    } else {
      selectedActivities = selectedActivities.filter(
        (name) => name !== activity.name
      );
    }
  });

  return activityElement;
};

document
  .getElementById("updateActivitiesButton")
  .addEventListener("click", () => {
    console.log("Selected activities:", selectedActivities);
    const updateSuccessModal = new bootstrap.Modal(
      document.getElementById("updateSuccessModal")
    );
    updateSuccessModal.show();
    document.querySelector(".save-icon-btn").addEventListener("click", () => {
      updateSuccessModal.hide();
    });
  });
