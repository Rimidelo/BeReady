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
  if (action === "archive") {
    const name = document.getElementById("name").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const target = document.getElementById("target").value;
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
    };

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
