const GET_ACTIVITIES_URL = `${SERVER_URL}/managePlan/getAllActivities`;
const GET_USER_ACTIVITIES_URL = `${SERVER_URL}/managePlan/getUserActivities`;
const UPDATE_USER_ACTIVITIES_URL = `${SERVER_URL}/managePlan/updateUserActivities`;
let selectedActivities = [];
let userRegisteredActivities = [];
const loggedInUserID = JSON.parse(sessionStorage.getItem("LoggedInUser")).UserID;
const activitySelectionElement = document.getElementById("accordionActivitySelection");

window.onload = async () => {
  try {
    const activities = await fetchActivities();
    userRegisteredActivities = await fetchUserActivities(loggedInUserID);
    renderActivitySelection(activities);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const fetchActivities = async () => {
  const response = await fetch(GET_ACTIVITIES_URL);
  const data = await response.json();

  if (!data.activities) {
    throw new Error('No activities found');
  }

  return data.activities;
};

const fetchUserActivities = async (userID) => {
  const response = await fetch(`${GET_USER_ACTIVITIES_URL}/${userID}`);
  const data = await response.json();

  if (!data.activities) {
    return [];
  }

  return data.activities.map((activity) => activity.ActivityID);
};

const renderActivitySelection = (activities) => {
  activities.forEach((activity) => {
    const activityElement = createActivityElement(activity);
    activitySelectionElement.appendChild(activityElement);
  });
};

const createActivityElement = (activity) => {
  const activityElement = document.createElement("div");
  activityElement.classList.add("cfms-activity-card", "mb-3", "p-3", "bg-light", "rounded", "shadow-sm");

  const title = document.createElement("h5");
  title.classList.add("cfms-activity-title", "mb-2", "text-right");
  title.textContent = activity.name;

  const type = document.createElement("p");
  type.classList.add("cfms-activity-type", "text-muted", "text-right");
  type.textContent = `סוג הפעילות: ${hebrewActivityType[activity.type] || activity.type}`;

  const selectButton = document.createElement("button");
  selectButton.classList.add("btn", "btn-primary", "mt-3");
  selectButton.style.width = "100px";
  selectButton.textContent = "בחר";
  if (userRegisteredActivities.includes(activity.id)) {
    activityElement.classList.add("selected");
    selectedActivities.push(activity.id);
    selectButton.textContent = "נבחר";
    selectButton.classList.replace("btn-primary", "btn-success");
  }

  selectButton.addEventListener("click", function () {
    activityElement.classList.toggle("selected");
    if (activityElement.classList.contains("selected")) {
      selectedActivities.push(activity.id);
      selectButton.textContent = "נבחר";
      selectButton.classList.replace("btn-primary", "btn-success");
    } else {
      selectedActivities = selectedActivities.filter((id) => id !== activity.id);
      selectButton.textContent = "בחר";
      selectButton.classList.replace("btn-success", "btn-primary");
    }
  });

  activityElement.appendChild(title);
  activityElement.appendChild(type);
  activityElement.appendChild(selectButton);

  return activityElement;
};

document.getElementById("updateActivitiesButton").addEventListener("click", async () => {
  try {
    const response = await fetch(`${UPDATE_USER_ACTIVITIES_URL}/${loggedInUserID}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ selectedActivities }),
    });
    if (response.ok) {
      Swal.fire({
        icon: "success",
        title: "שמור בהצלחה",
        text: "הפעילויות נשמרו בהצלחה.",
        confirmButtonText: "אישור"
      });
    }
  } catch (error) {
    console.error("Error updating activities:", error);
  }
});


const hebrewActivityType = {
  Physical: "כוח וסיבולת",
  Brain: "חשיבתי",
  Mental: "מנטלי",
  Coordination: "קורדינציה",
  Leadership: "כישורי מנהיגות"
};
