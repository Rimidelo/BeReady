function getDayOfWeek(dateString) {
    const daysOfWeek = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
    const dateParts = dateString.split('/');
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

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    flatpickr("#date-input", { dateFormat: "d/m/Y" });
    const modalElement = document.getElementById('new-invitation-modal');
    const scheduleTransitionModalInstance = new bootstrap.Modal(modalElement);
    scheduleTransitionModalInstance.show();


    const backButton = modalElement.querySelector('.btn-secondary');
    backButton.addEventListener('click', function () {
        scheduleTransitionModalInstance.hide();
        transitionModalInstance.show();
    });


    console.log('1 ', formData);
    const scheduleForm = document.getElementById("invitation-form");
    scheduleForm.addEventListener("submit", function (event) {
        event.preventDefault();
        console.log('2 ', formData);
        handleSubmit(formData, scheduleTransitionModalInstance);
    });
}

function handleSubmit(formData, scheduleTransitionModalInstance) {
    console.log('3 ', formData);
    const scheduleFormElement = document.getElementById("invitation-form");
    const scheduleFormData = new FormData(scheduleFormElement);
    const scheduleData = {
        date: document.getElementById('date-input').value,
        time: {
            from: scheduleFormData.get("time-from"),
            to: scheduleFormData.get("time-to"),
        },
        repeat: scheduleFormData.get("activityRepeat"),
        participants: {
            maxAmount: scheduleFormData.get("activityParticipants"),
        },
    };

    scheduleData.day = getDayOfWeek(scheduleData.date);
    console.log("Schedule Data:", scheduleData);
    formData.scheduledAttributes.participants.maxAmount = scheduleData.participants.maxAmount;
    formData.scheduledAttributes.participants.actualAmount = 0;
    formData.scheduledAttributes.schedule.date = scheduleData.date;
    formData.scheduledAttributes.schedule.day = scheduleData.day;
    formData.scheduledAttributes.schedule.hours = scheduleData.time.from + ' - ' + scheduleData.time.to;
    formData.scheduledAttributes.schedule.repeat = scheduleData.repeat;
    console.log("Activity Data:", formData);
    addActivity(formData);
    scheduleTransitionModalInstance.hide();
    activityForm.reset();
}