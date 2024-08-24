const getActivityFormData = (activityList) => {
  const activityFormElement = document.getElementById("activity-form");
  const activityFormData = new FormData(activityFormElement);

  return {
    ...activityList,
    name: activityFormData.get("name") || activityList.name,
    type: activityFormData.get("type") || activityList.type,
    description:
      activityFormData.get("description") || activityList?.description,
    target: {
      value: activityFormData.get("target") || activityList.target.value,
      unit: activityFormData.get("unit") || activityList.target.unit,
    },
    frameworkType: !!activityFormData.get("isGroupActivity")
      ? COLLECTIVE
      : activityList
        ? activityList.frameworkType
        : PERSONAL,
        InstituteID: LoggedInUser.InstituteID,
  };
};

const openActivityModal = (mode, activityData) => {
  const activityForm = document.getElementById("activity-form");
  if (!activityData) {
    activityForm.reset();
    document.getElementById("is-group-activity").checked = false;
  }
  document.getElementById("activity-modal-title").textContent = mode.title;
  const addFileIconElement = document.getElementById("file-add-icon");
  const uploadElement = document.getElementById("upload");

  addFileIconElement.onclick = () => {
    uploadElement.click();
  };
  document.querySelector('label[for="upload"]').onclick = () =>
    document.getElementById("upload").click();
  if (activityData) {
    document.querySelector(
      `option[value=${activityData.type}]`
    ).selected = true;
    document.querySelector(
      `option[value=${activityData.target.unit}]`
    ).selected = true;
    document.getElementById("activity-form-name").value = activityData.name || EMPTY_FIELD;
    document.getElementById("activity-form-description").value = activityData.description || EMPTY_FIELD;
    document.getElementById("activity-form-target").value = activityData.target.value || EMPTY_FIELD;
    document.getElementById("is-group-activity").checked = activityData.frameworkType == COLLECTIVE;
  }
  if (mode.disabled) {
    activityForm.querySelectorAll("input, textarea, select").forEach(el => {
      el.disabled = true;
    });
  } else {
    activityForm.querySelectorAll("input, textarea, select").forEach(el => {
      el.disabled = false;
    });
  }
  const activityModal = new bootstrap.Modal(document.getElementById("activity-modal"));
  activityModal.show();
  activityForm.onsubmit = (event) => {
    event.preventDefault();
    const action = event.submitter.getAttribute("data-action");
    const formData = getActivityFormData(activityData);

    mode[action]?.(formData, activityModal);
    activityModal.hide();
    activityForm.reset();
  };
  document.getElementById("activity-modal").addEventListener("hidden.bs.modal", function () {
    const modalElement = document.getElementById("activity-modal");
    modalElement.querySelectorAll("input, textarea, select").forEach(el => {
      el.disabled = false;
    });
  });
};
