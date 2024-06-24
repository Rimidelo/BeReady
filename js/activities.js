const ACTIVITY_ACTIONS_ICONS = {
  edit: "images/activity/buttons/edit-icon.png",
  delete: "images/activity/buttons/delete-icon.png",
};
const TYPE_ICONS = {
  Physical: "images/activity/types/weight-icon.png",
  Brain: "images/activity/types/brain-icon.png",
};
const COLLECTIVE = "קבוצתי";
let activityList = [];
const activityListElement = document.getElementById("activity-list");

window.onload = () => {
  readActivitiesData()
    .then(() => console.log(activityList))
    .then(initActivityList);
};

const readActivitiesData = async () =>
  fetch("./data/activities.json")
    .then((response) => response.json())
    .then((data) => (activityList = data));

const initActivityList = () => {
  for (const activity of activityList) {
    addActivityElement(createActivityElement(activity));
  }
};

const createActivityElement = ({
  id,
  type,
  name,
  frameworkType,
  scheduledAttributes,
}) => {
  const newActivityElement = document.createElement("li");
  newActivityElement.id = `activity-${id}`;
  newActivityElement.classList.add("activity");
  newActivityElement.append(
    createActivityTypeIcon(type),
    createActivityContentElement(name, frameworkType, scheduledAttributes),
    createActivityButtonsElement()
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
  if (frameworkType == COLLECTIVE) {
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

const createActivityButtonsElement = () => {
  const activityButtonsElement = document.createElement("section");
  const editButtonElement = document.createElement("button");
  const deleteButtonElement = document.createElement("button");
  const editIconElement = document.createElement("img");
  const deleteIconElement = document.createElement("img");
  activityButtonsElement.classList.add("activity-buttons");
  editButtonElement.classList.add("edit-btn");
  deleteButtonElement.classList.add("delete-btn");
  editIconElement.src = ACTIVITY_ACTIONS_ICONS["edit"];
  editIconElement.alt = "edit";
  deleteIconElement.src = ACTIVITY_ACTIONS_ICONS["delete"];
  deleteIconElement.alt = "delete";
  editButtonElement.appendChild(editIconElement);
  deleteButtonElement.appendChild(deleteIconElement);
  activityButtonsElement.append(editButtonElement, deleteButtonElement);
  return activityButtonsElement;
};

const generateId = (() => {
  let lastId = activityList[-1]?.id || -1;
  return () => ++lastId;
})();

const addActivityElement = (activityElement) => {
  activityListElement.appendChild(activityElement);
};

const addActivity = ({ type, name, frameworkType, scheduledAttributes }) => {
  const newActivity = {
    id: generateId(),
    type,
    name,
    frameworkType,
    scheduledAttributes,
  };
  activityList.push(newActivity);
  addActivityElement(createActivityElement(newActivity));
};

const removeActivity = (id) => {
  const activityToRemoveElement = document.getElementById(id);
  activityListElement.removeChild(activityToRemoveElement);
};

const editActivity = (id) => {};
