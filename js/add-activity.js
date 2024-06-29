const addFileIconElement = document.getElementById("file-add-icon");
const uploadElement = document.getElementById("upload");
addFileIconElement.onclick = () => {
  uploadElement.click();
};

document
  .querySelector('label[for="upload"]')
  .addEventListener("click", function () {
    document.getElementById("upload").click();
  });

const activityForm = document.getElementById("activity-form");
const addToArchiveButton = document.getElementById("add-activity-arcive");
const addToCompanyButton = document.getElementById("add-activity-company");

addToArchiveButton.addEventListener("click", function () {
  activityForm.setAttribute("data-action", "archive");
});

addToCompanyButton.addEventListener("click", function () {
  activityForm.setAttribute("data-action", "company");
});

activityForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const activityFormElement = document.getElementById("activity-form");
  const activityFormData = new FormData(activityFormElement);
  const action = activityForm.getAttribute("data-action");
  
  const formData = {
    name: activityFormData.get("name"),
    type: activityFormData.get("type"),
    description: activityFormData.get("description"),
    target: {
      value: activityFormData.get("target"),
      unit: activityFormData.get("unit"),
    },
    frameworkType: activityFormData.get("isGroupActivity") ? COLLECTIVE : PERSONAL,
  };

  if (action === "archive") {
    addActivity(formData);
    console.log("Add to Archive:", formData);
    let myModalEl = document.getElementById("add-activity-modal");
    let modalInstance = bootstrap.Modal.getInstance(myModalEl);
    modalInstance.hide();
    activityForm.reset();
  } else if (action === "company") {
    console.log("Adding to company...");
  }
});
