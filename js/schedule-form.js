function getDayOfWeek(dateString) {
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const dateParts = dateString.split("/");
  const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  return daysOfWeek[date.getDay()];
}

function scheduleFormModal(formData, transitionModalInstance) {
  const modalElement = document.getElementById("new-invitation-modal");
  const scheduleTransitionModalInstance = new bootstrap.Modal(modalElement);

  modalElement.addEventListener('shown.bs.modal', () => {
    flatpickr("#date-input", { dateFormat: "d/m/Y" });
    flatpickr("#time-from", { enableTime: true, noCalendar: true, dateFormat: "H:i" });
    flatpickr("#time-to", { enableTime: true, noCalendar: true, dateFormat: "H:i" });
  });

  scheduleTransitionModalInstance.show();

  const backButton = modalElement.querySelector(".btn-secondary");
  backButton.onclick = () => {
    scheduleTransitionModalInstance.hide();
    transitionModalInstance.show();
  };

  const scheduleForm = document.getElementById("invitation-form");
  scheduleForm.onsubmit = (event) => {
    event.preventDefault();
    handleSubmit(formData, scheduleTransitionModalInstance);
  };
}

function handleSubmit(formData, scheduleTransitionModalInstance) {
  const scheduleFormElement = document.getElementById("invitation-form");
  const scheduleFormData = new FormData(scheduleFormElement);
  const scheduleData = {
    date: document.getElementById("date-input").value,
    time: {
      from: scheduleFormData.get("time-from"),
      to: scheduleFormData.get("time-to"),
    },
    repeat: scheduleFormData.get("activityRepeat"),
    participants: {
      maxAmount: scheduleFormData.get("activityParticipants"),
    },
  };

  const scheduledFormData = {
    ...formData,
    scheduledAttributes: {
      participants: {
        actualAmount: 0,
        maxAmount: 0
      },
      schedule: {
        date: "",
        day: "",
        hours: "",
        repeat: ""
      }
    }
  };

  scheduleData.day = getDayOfWeek(scheduleData.date);
  scheduledFormData.scheduledAttributes.participants.maxAmount = scheduleData.participants.maxAmount;
  scheduledFormData.scheduledAttributes.participants.actualAmount = 0;
  scheduledFormData.scheduledAttributes.schedule.date = scheduleData.date;
  scheduledFormData.scheduledAttributes.schedule.day = scheduleData.day;
  scheduledFormData.scheduledAttributes.schedule.hours = scheduleData.time.from + " - " + scheduleData.time.to;
  scheduledFormData.scheduledAttributes.schedule.repeat = scheduleData.repeat;
  addActivity(scheduledFormData);
  scheduleTransitionModalInstance.hide();
}
