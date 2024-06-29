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

const COLLECTIVE = "קבוצתי";
const PERSONAL = "אישי";
let activityList = [];
const activityListElement = document.getElementById("activity-list");
let LoggedInUser;

window.onload = async () => {
  try {
    await readUserData();
    await readActivitiesData();
    initActivityList();
    setAddActivityBtnOnClick();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const readActivitiesData = async () =>
  fetch("./data/activities.json")
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
    createActivityContentElement(name, frameworkType, scheduledAttributes),
    createActivityButtonsElement(id, company_id)
  );
  newActivityElement.addEventListener("click", () => {
    openActivityModal(MODE_CONFIG["READ"], activity);
  });
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
  name,
  frameworkType,
  scheduledAttributes
) => {
  const activityContentElement = document.createElement("section");
  const nameElement = document.createElement("span");
  activityContentElement.classList.add("activity-content");
  nameElement.innerText = name;
  nameElement.classList.add("activity-name");
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
  if (scheduledAttributes) {
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
  if (company_id == LoggedInUser.company_id) {
    const editButtonElement = document.createElement("button");
    const deleteButtonElement = document.createElement("button");
    const editIconElement = document.createElement("img");
    const deleteIconElement = document.createElement("img");
    activityButtonsElement.classList.add("activity-buttons");
    editButtonElement.classList.add("edit-btn", "btn");
    deleteButtonElement.classList.add("delete-btn", "btn");
    addOnClickToBtn(id, editButtonElement, openEditActivity);
    addOnClickToBtn(id, deleteButtonElement, removeActivity);
    editIconElement.src = ACTIVITY_ACTIONS_ICONS["edit"];
    editIconElement.alt = "edit";
    deleteIconElement.src = ACTIVITY_ACTIONS_ICONS["delete"];
    deleteIconElement.alt = "delete";
    editButtonElement.appendChild(editIconElement);
    deleteButtonElement.appendChild(deleteIconElement);
    activityButtonsElement.append(editButtonElement, deleteButtonElement);
  }
  return activityButtonsElement;
};

const addOnClickToBtn = (id, element, onClickAction) => {
  element.onclick = () => onClickAction(id);
};

const generateId = (() => {
  let lastId = activityList[-1]?.id || -1;
  return () => ++lastId;
})();

const addActivityElement = (activityElement) => {
  activityListElement.insertBefore(
    activityElement,
    activityListElement.firstChild
  );
};

const addActivity = (newActivityData) => {
  const newActivity = {
    ...newActivityData,
    id: generateId(),
  };
  activityList.push(newActivity);
  addActivityElement(createActivityElement(newActivity));
};

const removeActivity = (id) => {
  const activityToRemoveElement = document.getElementById(
    getActivityElementId(id)
  );
  activityListElement.removeChild(activityToRemoveElement);
  delete activityList[id];
};

const editActivity = (newActivityData) => {
  activityList[newActivityData.id] = {
    ...newActivityData,
  };
  console.log(activityList);
};

const MODE_CONFIG = {
  READ: {
    title: "פרטי פעילות",
    disabled: true,
    onAddToArchive: () => console.log("read"),
    onAddToCompany: openScheduleTransitionModal,
  },
  ADD: {
    title: "יצירת פעילות חדשה",
    disabled: false,
    onAddToArchive: addActivity,
    onAddToCompany: openScheduleTransitionModal,
  },
  EDIT: {
    title: "עריכת פעילות קיימת",
    disabled: false,
    onAddToArchive: editActivity,
    onAddToCompany: openScheduleTransitionModal,
  },
};

const openEditActivity = (id) =>
  openActivityModal(MODE_CONFIG["EDIT"], activityList[id]);

const setAddActivityBtnOnClick = () => {
  const addActivityElements =
    document.getElementsByClassName("add-activity-btn");
  for (const addActivityElement of addActivityElements) {
    addActivityElement.onclick = () => openActivityModal(MODE_CONFIG["ADD"]);
  }
};
