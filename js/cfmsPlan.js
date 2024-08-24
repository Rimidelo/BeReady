let planData = [];
const planListElement = document.getElementById("cfmsPlan");

window.onload = async () => {
  try {
    await fetchPlanData();
    initPlanList();
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const fetchPlanData = async () => {
  const response = await fetch(
    `http://127.0.0.1:8081/managePlan/getPlan/${
      JSON.parse(sessionStorage.getItem("LoggedInUser")).UserID
    }`
  );
  const data = await response.json();
  planData.push(...data.jobs);
};

const initPlanList = () => {
  const accordionContainer = document.createElement("div");
  accordionContainer.classList.add("accordion", "w-100");
  accordionContainer.id = "accordionExample";

  planData.forEach((job) => {
    const jobElement = createJobElement(job);
    accordionContainer.appendChild(jobElement);
  });

  planListElement.appendChild(accordionContainer);

  planData.forEach((job) => {
    initializeProgressCircle(
      `#progress-circle-${job.id}`,
      calculateJobProgress(job)
    );
  });
};

const createJobElement = (job) => {
  const jobElement = document.createElement("div");
  jobElement.classList.add("accordion-item");

  const totalActivities = job.categories.reduce(
    (count, category) => count + category.activities.length,
    0
  );
  const jobProgress = calculateJobProgress(job);

  const jobHeader = document.createElement("h2");
  jobHeader.classList.add("accordion-header");
  jobHeader.id = `heading${job.id}`;

  const jobButton = document.createElement("button");
  jobButton.classList.add("accordion-button", "d-flex", "align-items-center");
  jobButton.type = "button";
  jobButton.setAttribute("data-bs-toggle", "collapse");
  jobButton.setAttribute("data-bs-target", `#collapse${job.id}`);
  jobButton.setAttribute("aria-expanded", "true");
  jobButton.setAttribute("aria-controls", `collapse${job.id}`);

  jobButton.innerHTML = `
    <div class="d-flex align-items-center">
      <div class="progress-circle me-2" id="progress-circle-${job.id}"></div>
      <span class="badge bg-secondary mx-2">${totalActivities}</span>
    </div>
    <div class="text-end w-100">
      <div>${job.title}</div>
      <div class="text-muted">${job.dueDate}: תאריך יעד</div>
    </div>
  `;

  jobHeader.appendChild(jobButton);

  const jobCollapse = document.createElement("div");
  jobCollapse.id = `collapse${job.id}`;
  jobCollapse.classList.add("accordion-collapse", "collapse", "show");
  jobCollapse.setAttribute("aria-labelledby", `heading${job.id}`);
  jobCollapse.setAttribute("data-bs-parent", "#accordionExample");

  const jobBody = document.createElement("div");
  jobBody.classList.add("accordion-body");

  const nestedAccordion = document.createElement("div");
  nestedAccordion.classList.add("accordion", "w-100");
  nestedAccordion.id = `nestedAccordion${job.id}`;

  job.categories.forEach((category) => {
    const categoryElement = createCategoryElement(category);
    nestedAccordion.appendChild(categoryElement);
  });

  jobBody.appendChild(nestedAccordion);
  jobCollapse.appendChild(jobBody);
  jobElement.appendChild(jobHeader);
  jobElement.appendChild(jobCollapse);

  return jobElement;
};

const calculateJobProgress = (job) => {
  let totalProgress = 0;
  let totalActivities = 0;

  job.categories.forEach((category) => {
    category.activities.forEach((activity) => {
      totalProgress += activity.progress;
      totalActivities++;
    });
  });

  return totalActivities ? Math.round(totalProgress / totalActivities) : 0;
};

const createCategoryElement = (category) => {
  const categoryElement = document.createElement("div");
  categoryElement.classList.add("accordion-item");

  const categoryHeader = document.createElement("h2");
  categoryHeader.classList.add("accordion-header");
  categoryHeader.id = `nestedHeading${category.id}`;

  const categoryButton = document.createElement("button");
  categoryButton.classList.add(
    "accordion-button",
    "d-flex",
    "align-items-center",
    "collapsed",
    "rounded-4"
  );
  categoryButton.type = "button";
  categoryButton.setAttribute("data-bs-toggle", "collapse");
  categoryButton.setAttribute(
    "data-bs-target",
    `#nestedCollapse${category.id}`
  );
  categoryButton.setAttribute("aria-expanded", "false");
  categoryButton.setAttribute("aria-controls", `nestedCollapse${category.id}`);

  categoryButton.innerHTML = `
    <div class="d-flex align-items-center">
      <span class="badge bg-secondary mx-2">${category.activities.length}</span>
    </div>
    <div class="text-end w-100">
      <div>${category.title}</div>
    </div>
  `;

  categoryHeader.appendChild(categoryButton);

  const categoryCollapse = document.createElement("div");
  categoryCollapse.id = `nestedCollapse${category.id}`;
  categoryCollapse.classList.add("accordion-collapse", "collapse");
  categoryCollapse.setAttribute(
    "aria-labelledby",
    `nestedHeading${category.id}`
  );
  categoryCollapse.setAttribute(
    "data-bs-parent",
    `#nestedAccordion${category.id}`
  );

  const categoryBody = document.createElement("div");
  categoryBody.classList.add("accordion-body");

  category.activities.forEach((activity) => {
    const activityElement = createActivityElement(activity);
    categoryBody.appendChild(activityElement);
  });

  categoryCollapse.appendChild(categoryBody);
  categoryElement.appendChild(categoryHeader);
  categoryElement.appendChild(categoryCollapse);

  return categoryElement;
};

const createActivityElement = (activity) => {
  const activityElement = document.createElement("div");
  activityElement.classList.add(
    "activity-item",
    "d-flex",
    "align-items-center",
    "mb-2",
    "rounded-4"
  );

  activityElement.innerHTML = `
    <div>${activity.name}</div>
    <div class="text-muted">${activity.type}</div>
    <div class="progress-circle me-2"id="progress-circle-${activity.progress}">
    <span>${activity.progress}%</span>
    </div>
  `;

  activityElement.addEventListener("click", () => {
    if (activity.id) {
      window.location.href = `cfms-activity.html?activityId=${activity.id}`;
    } else {
      alert("Activity ID not found");
    }
  });
  return activityElement;
};

const initializeProgressCircle = (selector, progress) => {
  const element = document.querySelector(selector);
  if (element) {
    let color;
    if (progress < 30) {
      color = "#ff0000";
    } else if (progress < 70) {
      color = "#ffa500";
    } else {
      color = "#00ff00";
    }

    const progressCircle = new ProgressBar.Circle(element, {
      color: color,
      strokeWidth: 8,
      trailWidth: 4,
      trailColor: "#eee",
      text: {
        value: `${progress}%`,
        style: {
          color: "#333",
          position: "absolute",
          left: "50%",
          top: "50%",
          padding: 0,
          margin: 0,
          transform: "translate(-50%, -50%)",
          fontSize: "16px",
        },
      },
      from: { color: color, width: 4 },
      to: { color: color, width: 8 },
      step: function (state, circle) {
        circle.path.setAttribute("stroke", state.color);
        circle.path.setAttribute("stroke-width", state.width);

        const value = Math.round(circle.value() * 100);
        if (value === 0) {
          circle.setText("");
        } else {
          circle.setText(value + "%");
        }
      },
    });

    progressCircle.animate(progress / 100);
  } else {
    console.error("Container does not exist: " + selector);
  }
};
