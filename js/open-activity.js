const openActivityModal = (activityData) => {
    const getCategoryLabel = (type) => {
        const categories = {
            Physical: "כוח וסיבולת",
            Mental: "מנטלי",
            Brain: "חשיבתי",
            Coordination: "קורדינציה",
            Leadership: "כישורי מנהיגות"
        };
        return categories[type] || '';
    };
    const getUnitLabel = (unit) => {
        const units = {
            Minutes: "דקות",
            Seconds: "שניות",
            Repetitions: "חזרות",
            Wins: "נצחונות"
        };
        return units[unit] || '';
    };
    const modalHtml = `
        <div class="modal fade" id="activity-modal" tabindex="-1" aria-labelledby="activityModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-xl">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="activityModalLabel">פרטי פעילות</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <section id="activity-col-right">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="ActivityFormName">שם הפעילות</label>
                                    <input type="text" id="ActivityFormName" class="form-control" value="${activityData.name}" disabled>
                                </div>
                                <div class="form-group">
                                    <label for="ActivityFormType">קטגוריה</label><input type="text" id="ActivityFormType" class="form-control" value="${getCategoryLabel(activityData.type)}" disabled></select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="description">תיאור הפעילות</label>
                                <textarea id="description" class="form-control" rows="3" readonly>${activityData.description || ''}</textarea>
                            </div>
                            <div class="form-group">
                                <div class="activity-row">
                                    <div class="form-check group-activity">
                                    <div class="unit-select">
                                        <label class="form-check-label">יעד:</label>
                                        <label class="form-check-label">${activityData.target.value}</label>
                                        <label class="form-check-label">${getUnitLabel(activityData.target.unit)}</label>
                                    </div>
                                    <label class="form-check-label">${activityData.frameworkType}</label>
                                </div>
                            </div>
                        </section>
                        <section id="activity-col-left">
                            <div class="col-md-6 custom-border-end">
                                <section id="file-adder">
                                    <label for="upload" class="form-label">
                                        <img src="/images/activity/file-add-icon.png" alt="file-add-icon" id="file-add-icon" />
                                            <h1 class="modal-title fs-5">שם הקובץ:</h1>
                                        </label>
                                </section>
                            </div>
                        </section>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">בטל</button>
                        <button type="submit" class="btn btn-secondary" id="add-activity-arcive">הוסף למאגר</button>
                        <button type="submit" class="btn btn-success add-activity-company" id="add-activity-company">הוסף לפעילויות שלנו</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const myModal = new bootstrap.Modal(document.getElementById('activity-modal'), {
        keyboard: true
    });

    myModal.show();

    document.getElementById('activity-modal').addEventListener('hidden.bs.modal', function (event) {
        document.getElementById('activity-modal').remove();
    });
};
