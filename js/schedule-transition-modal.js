function openScheduleTransitionModal(formData, activityModalInstance) {
  if (formData.frameworkType === PERSONAL) {
    addActivity(formData);
    activityModalInstance.hide();
    const transitionModalInstance = bootstrap.Modal.getInstance(document.getElementById('ScheduleTransitionModal'));
    transitionModalInstance.hide();
    return;
  }

  const transitionModalElement = document.getElementById('ScheduleTransitionModal');
  const transitionModalInstance = new bootstrap.Modal(transitionModalElement);
  transitionModalInstance.show();

  const yesButton = document.getElementById('yesButton');
  const noButton = document.getElementById('noButton');
  const backButton = document.getElementById('backButton');

  yesButton.onclick = () => {
    transitionModalInstance.hide();
    scheduleFormModal(formData, activityModalInstance);
  };

  noButton.onclick = () => {
    addActivity(formData);
    transitionModalInstance.hide();
  };

  backButton.onclick = () => {
    transitionModalInstance.hide();
    activityModalInstance.show();
  };
}
