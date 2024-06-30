const MY_ACTIVITIES_PAGE_TITLE = "BeReady";
const ACTIVITY_ACTIONS_ICONS = {
  edit: "images/activity/buttons/edit-icon.png",
  delete: "images/activity/buttons/delete-icon.png",
};
const TYPE_ICONS = {
  Physical: "images/activity/types/weight-icon.png",
  Brain: "images/activity/types/brain-icon.png",
  Mental: "images/activity/types/mental-icon.png",
  Coordination: "images/activity/types/coordination-icon.png",
  Leadership: "images/activity/types/leadership-icon.png",
};

const ACTIVITY_DATA_URL_BY_PAGE = {
  "BeReady": "./data/activities.json",
  "BeReady - Activity archive": "./data/activityArchive.json",
}

const COLLECTIVE = "קבוצתי";
const PERSONAL = "אישי";
let activityList = [];
const activityListElement = document.getElementById("activity-list");
let LoggedInUser;
let generateId;

window.onload = async () => {
  try {
    await readUserData();
    await readActivitiesData();
    generateId = createIdGenerator();
    initActivityList();
    setAddActivityBtnOnClick();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const readActivitiesData = async () =>
  fetch(ACTIVITY_DATA_URL_BY_PAGE[document.title])
    .then((response) => response.json())
    .then(({ activities }) => activityList.push(...activities));

const readUserData = async () =>
  fetch("./data/user.json")
    .then((response) => response.json())
    .then((data) => {
      LoggedInUser = data.LoggedInUser;
    });

const initActivityList = () => {
  for (const activity of activityList) {
    addActivityElement(createActivityElement(activity));
  }
};

const getActivityElementId = (id) => `activity-${id}`;

const createActivityElement = (activity) => {
  const { id, type, name, frameworkType, scheduledAttributes, company_id } =
    activity;
  const newActivityElement = document.createElement("li");
  newActivityElement.id = getActivityElementId(id);
  newActivityElement.classList.add("activity");
  newActivityElement.append(
    createActivityTypeIcon(type),
    createActivityContentElement(
      activity,
      name,
      frameworkType,
      scheduledAttributes
    ),
    createActivityButtonsElement(id, company_id)
  );
  return newActivityElement;
};

const createActivityTypeIcon = (type) => {
  const iconFrameElement = document.createElement("span");
  const iconElement = document.createElement("img");
  iconFrameElement.classList.add("activity-type-icon");
  iconElement.src = TYPE_ICONS[type];
  iconElement.alt = type;
  iconFrameElement.appendChild(iconElement);
  return iconFrameElement;
};

const createActivityContentElement = (
  activity,
  name,
  frameworkType,
  scheduledAttributes
) => {
  const activityContentElement = document.createElement("section");
  const nameElement = document.createElement("span");
  activityContentElement.classList.add("activity-content");
  nameElement.innerText = name;
  nameElement.classList.add("activity-name");
  nameElement.onclick = () => openActivityModal(MODE_CONFIG["READ"], activity);
  activityContentElement.append(
    nameElement,
    createActivityDetailsElement(frameworkType, scheduledAttributes)
  );
  return activityContentElement;
};

const createActivityDetailsElement = (frameworkType, scheduledAttributes) => {
  const activityDetailsElement = document.createElement("section");
  const frameworkTypeElement = document.createElement("span");
  activityDetailsElement.classList.add("activity-details");
  frameworkTypeElement.innerText = frameworkType;
  frameworkTypeElement.classList.add("activity-framework-type");
  activityDetailsElement.appendChild(frameworkTypeElement);

  if (scheduledAttributes && document.title == MY_ACTIVITIES_PAGE_TITLE) {
    const { actualAmount, maxAmount } = scheduledAttributes.participants;
    const { date, day, hours } = scheduledAttributes.schedule;
    const participantsAmountElement = document.createElement("span");
    const dateElement = document.createElement("span");
    const dayElement = document.createElement("span");
    const hourElement = document.createElement("span");
    participantsAmountElement.classList.add("activity-participants-amount");
    participantsAmountElement.innerText = `${actualAmount}/${maxAmount}`;
    dateElement.classList.add("activity-date");
    dateElement.innerText = date;
    dayElement.classList.add("activity-day");
    dayElement.innerText = day;
    hourElement.classList.add("activity-hour");
    hourElement.innerText = hours;
    activityDetailsElement.appendChild(participantsAmountElement);
    activityDetailsElement.appendChild(dateElement);
    activityDetailsElement.appendChild(dayElement);
    activityDetailsElement.appendChild(hourElement);
  }
  return activityDetailsElement;
};

const createActivityButtonsElement = (id, company_id) => {
  const activityButtonsElement = document.createElement("section");
  if (company_id == LoggedInUser.company_id || document.title == MY_ACTIVITIES_PAGE_TITLE) {
    isArchivePage() && createActivityEditBtn(id, activityButtonsElement);
    createActivityDeleteBtn(id, activityButtonsElement);
  }
  return activityButtonsElement;
};

const isArchivePage = () => document.title == "BeReady - Activity archive";

const createActivityEditBtn = (id, activityButtonsElement) => {
  const editButtonElement = document.createElement("button");
  const editIconElement = document.createElement("img");
  editButtonElement.classList.add("edit-btn", "btn");
  addOnClickToBtn(id, editButtonElement, openEditActivity);
  editIconElement.src = ACTIVITY_ACTIONS_ICONS["edit"];
  editIconElement.alt = "edit";
  editButtonElement.appendChild(editIconElement);
  activityButtonsElement.appendChild(editButtonElement);
}

const createActivityDeleteBtn = (id, activityButtonsElement) => {
  const deleteButtonElement = document.createElement("button");
  const deleteIconElement = document.createElement("img");
  deleteButtonElement.classList.add("delete-btn", "btn");
  addOnClickToBtn(id, deleteButtonElement, removeActivity);
  deleteIconElement.src = ACTIVITY_ACTIONS_ICONS["delete"];
  deleteIconElement.alt = "delete";
  deleteButtonElement.appendChild(deleteIconElement);
  activityButtonsElement.appendChild(deleteButtonElement);
};

const addOnClickToBtn = (id, element, onClickAction) => {
  element.onclick = () => onClickAction(id);
};

const createIdGenerator = () => {
  let lastId = activityList[activityList.length - 1]?.id || -1;
  return () => ++lastId;
};

const addActivityElement = (activityElement) => {
  activityListElement.insertBefore(
    activityElement,
    activityListElement.firstChild
  );
};

const getActivityIndexInList = (id) => {
  return id;
  for (let i = 0; i < activityList.length; i++) {
    if (activityList[i]?.id == id) {
      console.log("i", i, "id", id);
      return i;
    }
  }
};

const addActivity = (newActivityData) => {
  const newActivity = {
    ...newActivityData,
    id: generateId(),
  };
  activityList.push(newActivity);
  addActivityElement(createActivityElement(newActivity));
  // Simulate POST request
  console.log("POST /activities");
  console.log("Request body:", newActivity);
};

const removeActivity = (id) => {
  const activityToRemoveElement = document.getElementById(
    getActivityElementId(id)
  );
  activityListElement.removeChild(activityToRemoveElement);
  console.log(`DELETE /activities/${id}`);
  delete activityList[getActivityIndexInList(id)];
};

const editActivity = (newActivityData) => {
  const activityToEditElement = document.getElementById(
    getActivityElementId(newActivityData.id)
  );
  activityList[getActivityIndexInList(newActivityData.id)] = {
    ...newActivityData,
  };
  activityListElement.replaceChild(
    createActivityElement(newActivityData),
    activityToEditElement
  );
  console.log(`POST /activities/${newActivityData.id}`);
};

const MODE_CONFIG = {
  READ: {
    title: "פרטי פעילות",
    addToArchiveText: "הוסף למאגר",
    disabled: true,
    onAddToCompany: openScheduleTransitionModal,
  },
  ADD: {
    title: "יצירת פעילות חדשה",
    addToArchiveText: "הוסף למאגר",
    disabled: false,
    onAddToArchive: addActivity,
    onAddToCompany: openScheduleTransitionModal,
  },
  EDIT: {
    title: "עריכת פעילות קיימת",
    addToArchiveText: "עדכן למאגר",
    disabled: false,
    onAddToArchive: editActivity,
    onAddToCompany: openScheduleTransitionModal,
  },
};

const openEditActivity = (id) => {
  openActivityModal(
    MODE_CONFIG["EDIT"],
    activityList[getActivityIndexInList(id)]
  );
};

const setAddActivityBtnOnClick = () => {
  const addActivityElements =
    document.getElementsByClassName("add-activity-btn");
  for (const addActivityElement of addActivityElements) {
    addActivityElement.onclick = () => openActivityModal(MODE_CONFIG["ADD"]);
  }
};
