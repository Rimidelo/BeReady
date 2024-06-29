function getDayOfWeek(dateString) {
  const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
  const dateParts = dateString.split("/");
  const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);
  return daysOfWeek[date.getDay()];
}
function scheduleFormModal(formData, transitionModalInstance) {
  const modalHTML = `
    <div class="modal fade" id="new-invitation-modal" tabindex="-1" aria-labelledby="invitationModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered modal-xl">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="invitationModalLabel">תזמון</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form id="invitation-form">
                    <div class="modal-body">
                        <section id="activity-col-right">
                            <div class="form-row" >
                                <div class="form-group col-md-6" id="form-row-schedule">
                                    <label for="date-input">תאריך:</label>
                                    <input type="text" id="date-input" name="ActivityDate" class="form-control">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="time-from">שעה:</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" id="time-from" name="time-from" class="form-control">
                                            <label class="mx-2">עד</label>
                                            <input type="text" id="time-to" name="time-to" class="form-control">
                                            </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="repeat-select">חזרות:</label>
                                    <select id="repeat-select" name="activityRepeat" class="form-select">
                                        <option value="none">ללא חזרה</option>
                                        <option value="daily">יומי</option>
                                        <option value="weekly">שבועי</option>
                                        <option value="monthly">חודשי</option>
                                    </select>
                                </div>
                                <div class="form-group" id="participants-group">
                                    <label for="participants-input" id="participants-label">כמות משתתפים:</label>
                                    <input type="text" id="participants-input" name="activityParticipants" class="form-control">
                                </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" >חזור</button>
                        <button type="submit" class="btn btn-success">תזמן</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    `;

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  flatpickr("#date-input", { dateFormat: "d/m/Y" });
  flatpickr("#time-from", { enableTime: true, noCalendar: true, dateFormat: "H:i" });
  flatpickr("#time-to", { enableTime: true, noCalendar: true, dateFormat: "H:i" });
  const modalElement = document.getElementById("new-invitation-modal");
  const scheduleTransitionModalInstance = new bootstrap.Modal(modalElement);
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
  const activityForm = document.getElementById("activity-form");
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
