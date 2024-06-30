function openScheduleTransitionModal(formData, activityModalInstance) {
  if (formData.frameworkType === PERSONAL) {
    addActivity(formData);
    activityModalInstance.hide();
    transitionModalInstance.hide();
    return;
  }
  const modalEl = document.createElement("div");
  modalEl.className = "modal fade";
  modalEl.id = "ScheduleTransitionModal";
  modalEl.tabIndex = -1;
  modalEl.setAttribute("aria-labelledby", "ScheduleTransitionModalLabel");
  modalEl.setAttribute("aria-hidden", "true");
  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-lg";
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";
  const closeButton = document.createElement("button");
  closeButton.className = "btn-close";
  closeButton.type = "button";
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");
  modalHeader.appendChild(closeButton);
  const customModalBody = document.createElement("div");
  customModalBody.className = "custom-modal-body";
  const modalQuestion = document.createElement("h1");
  modalQuestion.className = "modal-title";
  modalQuestion.id = "ScheduleTransitionModalLabel";
  modalQuestion.textContent = "האם לתזמן ולהכנס ללוז?";
  customModalBody.appendChild(modalQuestion);
  const buttonContainer = document.createElement("div");
  buttonContainer.className = "d-flex justify-content-center my-4";
  const yesButton = document.createElement("button");
  yesButton.className = "btn btn-light mx-2 custom-button";
  yesButton.textContent = "כן";
  const noButton = document.createElement("button");
  noButton.className = "btn btn-light mx-2 custom-button";
  noButton.textContent = "לא";
  buttonContainer.appendChild(yesButton);
  buttonContainer.appendChild(noButton);
  customModalBody.appendChild(buttonContainer);
  const modalFooter = document.createElement("div");
  modalFooter.className = "modal-footer justify-content-center";
  const backButton = document.createElement("button");
  backButton.className = "btn btn-light button-1-copy-2";
  backButton.type = "button";
  backButton.textContent = "חזור";
  backButton.onclick = () => {
    const transitionModalInstance = bootstrap.Modal.getInstance(modalEl);
    transitionModalInstance.hide();
    activityModalInstance.show();
  };
  modalFooter.appendChild(backButton);
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(customModalBody);
  modalContent.appendChild(modalFooter);
  modalDialog.appendChild(modalContent);
  modalEl.appendChild(modalDialog);
  document.body.appendChild(modalEl);
  const transitionModalInstance = new bootstrap.Modal(modalEl);
  transitionModalInstance.show();

  yesButton.onclick = () => {
    transitionModalInstance.hide();
    scheduleFormModal(formData, activityModalInstance);
  };

  noButton.onclick = () => {
    addActivity(formData);
    transitionModalInstance.hide();
  };
}
