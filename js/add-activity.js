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

  const action = activityForm.getAttribute("data-action");
  const name = document.getElementById("ActivityFormName").value;
  const type = document.getElementById("ActivityFormType").value;
  const description = document.getElementById("description").value;
  const target = document.getElementById("activityTarget").value;
  const unit = document.getElementById("unit").value;
  const isGroupActivity = document.getElementById("groupActivity").checked;
  const upload = document.getElementById("upload").files[0];

  const formData = {
    name: name,
    type: type,
    description: description,
    target: {
      value: target,
      unit: unit,
    },
    frameworkType: isGroupActivity ? COLLECTIVE : PERSONAL,
    company_id: LoggedInUser.company_id,
  };
  let myModalEl = document.getElementById("add-activity-modal");
  let activityModalInstance = bootstrap.Modal.getInstance(myModalEl);
  if (action === "archive") {
    addActivity(formData);
    console.log("Add to Archive:", formData);
    activityModalInstance.hide();
    activityForm.reset();
  } else if (action === "company") {
    console.log("Adding to company...");
    activityModalInstance.hide();
    if (isGroupActivity === true) {
      openScheduleTransitionModal(formData, activityModalInstance);
    }
  }
});


