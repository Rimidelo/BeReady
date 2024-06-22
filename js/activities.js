const activityList = [
  {
    id: 0,
  },
  {
    id: 1,
  },
  {
    id: 2,
  },
];
const activityListElement = document.getElementById("activity-list");

window.onload = () => {
  initActivityList();
};

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
};

const generateId = (() => {
  let lastId = activityList[-1]?.id || -1;
  return () => ++lastId;
})();

const createActivity = ({ type, name, frameworkType, scheduledAttributes }) => {
  return 2;
};

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
