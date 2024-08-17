const PLAN_DATA_URL = "https://127.0.0.1/managePlan/changePlan/${userId}";
let selectedActivities = [];
let planData = [];

const activitySelectionElement = document.getElementById("accordionActivitySelection");

window.onload = async () => {
    try {
        await fetchPlanData();
        renderActivitySelection();
    } catch (error) {
        console.error("An error occurred:", error);
    }
};

const fetchPlanData = async () => {
    const response = await fetch(PLAN_DATA_URL);
    const data = await response.json();
    planData.push(...data.jobs);
};
const renderActivitySelection = () => {
    planData.forEach(job => {
        job.categories.forEach(category => {
            const categoryElement = createCategoryElement(category);
            activitySelectionElement.appendChild(categoryElement);
        });
    });
};

const createCategoryElement = (category) => {
    const categoryElement = document.createElement("div");
    categoryElement.classList.add("accordion-item");

    const categoryHeader = document.createElement("h2");
    categoryHeader.classList.add("accordion-header");
    categoryHeader.id = `heading${category.id}`;

    const categoryButton = document.createElement("button");
    categoryButton.classList.add("accordion-button", "d-flex", "align-items-center", "collapsed", "rounded-4");
    categoryButton.type = "button";
    categoryButton.setAttribute("data-bs-toggle", "collapse");
    categoryButton.setAttribute("data-bs-target", `#collapse${category.id}`);
    categoryButton.setAttribute("aria-expanded", "false");
    categoryButton.setAttribute("aria-controls", `collapse${category.id}`);

    categoryButton.innerHTML = `
    <div class="d-flex align-items-center">
      <span class="badge bg-secondary mx-2">${category.activities.length}</span>
    </div>
    <div class="text-end w-100">
      <div>${category.title}</div>
    </div>
  `;

    categoryHeader.appendChild(categoryButton);
    categoryElement.appendChild(categoryHeader);

    const categoryCollapse = document.createElement("div");
    categoryCollapse.id = `collapse${category.id}`;
    categoryCollapse.classList.add("accordion-collapse", "collapse");
    categoryCollapse.setAttribute("aria-labelledby", `heading${category.id}`);
    categoryCollapse.setAttribute("data-bs-parent", "#accordionActivitySelection");

    const categoryBody = document.createElement("div");
    categoryBody.classList.add("accordion-body");

    category.activities.forEach(activity => {
        const activityElement = createActivityElement(activity);
        categoryBody.appendChild(activityElement);
    });

    categoryCollapse.appendChild(categoryBody);
    categoryElement.appendChild(categoryCollapse);

    return categoryElement;
};

const createActivityElement = (activity) => {
    const activityElement = document.createElement("div");
    activityElement.classList.add("cfms-activity-card");

    const title = document.createElement("span");
    title.classList.add("cfms-activity-title");
    title.textContent = activity.name;

    const type = document.createElement("span");
    type.classList.add("cfms-activity-type");
    type.textContent = activity.type;

    const infoButton = document.createElement("button");
    infoButton.classList.add("btn-icon", "info-button");


    activityElement.appendChild(title);
    activityElement.appendChild(type);
    activityElement.appendChild(infoButton);

    activityElement.addEventListener('click', function () {
        this.classList.toggle('selected');
        if (this.classList.contains('selected')) {
            selectedActivities.push(activity.name);
        } else {
            selectedActivities = selectedActivities.filter(name => name !== activity.name);
        }
    });

    return activityElement;
};

document.getElementById("updateActivitiesButton").addEventListener("click", () => {
    console.log("Selected activities:", selectedActivities);
    const updateSuccessModal = new bootstrap.Modal(document.getElementById('updateSuccessModal'));
    updateSuccessModal.show();
    document.querySelector('.save-icon-btn').addEventListener('click', () => {
        updateSuccessModal.hide();
    });
});
