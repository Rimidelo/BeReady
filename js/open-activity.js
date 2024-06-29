const EMPTY_FIELD = "";

const buildModalElement = (mode, activityData) => `
  <div class="modal fade" id="activity-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog  modal-dialog-centered modal-xl">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5">${mode.title}</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <form id="activity-form">
          <div class="modal-body">
            <section id="activity-col-right">
              <div class="form-row">
                <div class="form-group">
                  <label for="activity-form-name">שם הפעילות</label>
                  <input type="text" id="activity-form-name" name="name" class="form-control" required="" value="${
                    activityData?.name || EMPTY_FIELD
                  }" ${mode.disabled && "disabled"}>
                </div>
                <div class="form-group">
                  <label for="activity-form-type">קטגוריה</label>
                  <select id="activity-form-type" name="type" class="form-select" ${
                    mode.disabled && "disabled"
                  }>
                    <option value="Physical">כוח וסיבולת</option>
                    <option value="Mental">מנטלי</option>
                    <option value="Brain">חשיבתי</option>
                    <option value="Coordination">קורדינציה</option>
                    <option value="Leadership">כישורי מנהיגות</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="activity-form-description">תיאור הפעילות</label>
                <textarea id="activity-form-description" name="description" class="form-control" rows="3" ${
                  mode.disabled && "readonly"
                }>${activityData?.description || EMPTY_FIELD}</textarea>
              </div>
              <div class="form-group">
                <label for="activity-form-target">יעד</label>
                <div class="activity-row">
                  <section id="unit-select-group">
                    <input type="text" id="activity-form-target" name="target" class="form-control" required="" inputmode="numeric" value="${
                      activityData?.target.value || EMPTY_FIELD
                    }" ${mode.disabled && "disabled"} />
                    <div class="unit-select">
                      <label for="unit" class="visually-hidden">יחידת מדידה</label>
                      <select id="unit" name="unit" class="form-select" ${
                        mode.disabled && "disabled"
                      }>
                        <option value="Minutes">דקות</option>
                        <option value="Seconds">שניות</option>
                        <option value="Repetitions">חזרות</option>
                        <option value="Wins">נצחונות</option>
                      </select>
                    </div>
                  </section>
                  <div class="form-check group-activity">
                    <label class="form-check-label" for="is-group-activity">פעילות קבוצתית</label>
                    <input class="form-check-input" id="is-group-activity" name="isGroupActivity" type="checkbox" ${
                      mode.disabled && "disabled"
                    } ${
  activityData?.frameworkType == COLLECTIVE && "checked"
} />
                  </div>
                </div>
            </section>
            <section id="activity-col-left">
              <div class="col-md-6 custom-border-end">
                <section id="file-adder">
                  <label for="upload" class="form-label">
                    <img src="/images/activity/file-add-icon.png" alt="file-add-icon" id="file-add-icon" />
                    <h4>העלו קובץ</h4>
                  </label>
                  <input type="file" class="form-control" id="upload" />
                </section>
              </div>
            </section>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">בטל</button>
            <button type="submit" class="btn btn-secondary" id="add-activity-archive" data-action="onAddToArchive">${
              mode.addToArchiveText
            }</button>
            <button type="submit" class="btn btn-success add-activity-company" id="add-activity-company" data-action="onAddToCompany">הוסף לפעילויות שלנו</button>
          </div>
        </form>
      </div>
    </div>
  </div>`;

const getActivityFormData = (activityList) => {
  const activityFormElement = document.getElementById("activity-form");
  const activityFormData = new FormData(activityFormElement);

  return {
    name: activityFormData.get("name") || activityList.name,
    type: activityFormData.get("type") || activityList.type,
    description: activityFormData.get("description") || activityList.description,
    target: {
      value: activityFormData.get("target") || activityList.target.value,
      unit: activityFormData.get("unit") || activityList.target.unit,
    },
    frameworkType:
      activityFormData.get("isGroupActivity") == null
        ? activityList.frameworkType
        : activityFormData.get("isGroupActivity")
        ? COLLECTIVE
        : PERSONAL,
    company_id: LoggedInUser.company_id,
  };
};

const openActivityModal = (mode, activityData) => {
  const modalHtml = buildModalElement(mode, activityData);
  document.body.insertAdjacentHTML("beforeend", modalHtml);
  const activityForm = document.getElementById("activity-form");
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
  }

  const activityModal = new bootstrap.Modal(
    document.getElementById("activity-modal")
  );

  activityModal.show();

  activityForm.onsubmit = (event) => {
    event.preventDefault();
    const action = event.submitter.getAttribute("data-action");
    const formData = getActivityFormData(activityData);

    mode[action]?.(formData, activityModal);
    activityModal.hide();
    activityForm.reset();
  };

  document
    .getElementById("activity-modal")
    .addEventListener("hidden.bs.modal", function (event) {
      document.getElementById("activity-modal").remove();
    });
};
