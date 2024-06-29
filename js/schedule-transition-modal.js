function openScheduleTransitionModal(formData, activityModalInstance) {
    const modalEl = document.createElement('div');
    modalEl.className = 'modal fade';
    modalEl.id = 'ScheduleTransitionModal';
    modalEl.tabIndex = -1;
    modalEl.setAttribute('aria-labelledby', 'ScheduleTransitionModalLabel');
    modalEl.setAttribute('aria-hidden', 'true');
    const modalDialog = document.createElement('div');
    modalDialog.className = 'modal-dialog modal-lg';
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    const modalHeader = document.createElement('div');
    modalHeader.className = 'modal-header';
    const closeButton = document.createElement('button');
    closeButton.className = 'btn-close';
    closeButton.type = 'button';
    closeButton.setAttribute('data-bs-dismiss', 'modal');
    closeButton.setAttribute('aria-label', 'Close');
    modalHeader.appendChild(closeButton);
    const customModalBody = document.createElement('div');
    customModalBody.className = 'custom-modal-body';
    const modalQuestion = document.createElement('h1');
    modalQuestion.className = 'modal-title';
    modalQuestion.id = 'ScheduleTransitionModalLabel';
    modalQuestion.textContent = 'האם לתזמן ולהכנס ללוז?';
    customModalBody.appendChild(modalQuestion);
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
    customModalBody.appendChild(buttonContainer);
    const modalFooter = document.createElement('div');
    modalFooter.className = 'modal-footer justify-content-center';
    const backButton = document.createElement('button');
    backButton.className = 'btn btn-light button-1-copy-2';
    backButton.type = 'button';
    backButton.textContent = 'חזור';
    backButton.addEventListener('click', function () {
        const transitionModalInstance = bootstrap.Modal.getInstance(modalEl);
        transitionModalInstance.hide();
        activityModalInstance.show();
    });
    modalFooter.appendChild(backButton);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(customModalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modalEl.appendChild(modalDialog);
    document.body.appendChild(modalEl);
    const transitionModalInstance = new bootstrap.Modal(modalEl);
    transitionModalInstance.show();

    yesButton.addEventListener('click', function () {
        console.log('Yes');
        transitionModalInstance.hide();
        scheduleFormModal(formData, activityModalInstance);
    });

    noButton.addEventListener('click', function () {
        addActivity(formData);
        console.log("Add to Archive:", formData);
        activityForm.reset();
        transitionModalInstance.hide();
        scheduleFormModal(formData, transitionModalInstance);
    });
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
                                    <label for="date-input">מתאריך:</label>
                                    <input type="text" id="date-input" class="form-control">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="time-from">שעה:</label>
                                    <div class="d-flex align-items-center">
                                        <input type="text" id="time-from" class="form-control">
                                            <label class="mx-2">עד</label>
                                            <input type="text" id="time-to" class="form-control">
                                            </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="repeat-select">חזרות:</label>
                                    <select id="repeat-select" class="form-select">
                                        <option value="none">ללא חזרה</option>
                                        <option value="daily">יומי</option>
                                        <option value="weekly">שבועי</option>
                                        <option value="monthly">חודשי</option>
                                    </select>
                                </div>
                                <div class="form-group" id="participants-group">
                                    <label for="participants-input" id="participants-label">כמות משתתפים:</label>
                                    <input type="text" id="participants-input" class="form-control">
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
}