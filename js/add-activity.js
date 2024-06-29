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
      openScheduleTransitionModal(activityModalInstance);
    }
  }
});

function openScheduleTransitionModal(activityModalInstance) {
  // Create modal element
  const modalEl = document.createElement('div');
  modalEl.className = 'modal fade';
  modalEl.id = 'ScheduleTransitionModal';
  modalEl.tabIndex = -1;
  modalEl.setAttribute('aria-labelledby', 'ScheduleTransitionModalLabel');
  modalEl.setAttribute('aria-hidden', 'true');

  // Create modal dialog
  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog modal-lg';

  // Create modal content
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create modal header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  const closeButton = document.createElement('button');
  closeButton.className = 'btn-close';
  closeButton.type = 'button';
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');

  modalHeader.appendChild(closeButton);

  // Create modal body
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body text-center';

  const modalQuestion = document.createElement('h1');
  modalQuestion.className = 'modal-title';
  modalQuestion.id = 'ScheduleTransitionModalLabel';
  modalQuestion.textContent = 'האם לתזמן ולהכנס ללוז?';

  modalBody.appendChild(modalQuestion);

  const buttonContainer = document.createElement('div');
  buttonContainer.className = 'd-flex justify-content-center my-4';

  const yesButton = document.createElement('button');
  yesButton.className = 'btn btn-light mx-2 custom-button';
  yesButton.textContent = 'כן';

  const noButton = document.createElement('button');
  noButton.className = 'btn btn-light mx-2 custom-button';
  noButton.textContent = 'לא';

  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);

  modalBody.appendChild(buttonContainer);

  // Create modal footer
  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer justify-content-center';

  const backButton = document.createElement('button');
  backButton.className = 'btn btn-light';
  backButton.type = 'button';
  backButton.textContent = 'חזור';

  // Add event listener to return to the previous modal
  backButton.addEventListener('click', function () {
    const transitionModalInstance = bootstrap.Modal.getInstance(modalEl);
    transitionModalInstance.hide();
    activityModalInstance.show();
  });

  modalFooter.appendChild(backButton);

  // Assemble modal
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modalEl.appendChild(modalDialog);

  // Append modal to body
  document.body.appendChild(modalEl);

  const modalInstance = new bootstrap.Modal(modalEl);
  modalInstance.show();
}

