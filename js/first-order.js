window.onload = async () => {
  const firstOrderDetails = await fetchFirstOrderDetails(1);
  createFirstOrderForm(firstOrderDetails);
  
  document.getElementById("first-order-form").onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    const firstOrderData = {};
    formData.forEach((value, key) => {
      firstOrderData[key] = value;
    });
    const isValid = validateForm(firstOrderDetails);

    if (isValid) {
      window.location.href = "profile-status.html";
      updateFirstOrderDetails(firstOrderData);
    } else {
      Swal.fire({
        icon: "error",
        title: "שגיאה",
        text: "אנא תקן את השגיאות בטופס לפני שליחה.",
        confirmButtonText: "אישור",
      });
    }
  };
};

const validateForm = (formDetails) => {
  let isValid = true;

  Object.entries(formDetails).forEach(([id, props]) => {
    const inputElement = document.getElementById(convertToHtmlIdConvention(id));
    const value = parseInt(inputElement.value, 10);

    if (!props.validation(value)) {
      isValid = false;
      inputElement.style.borderColor = "red";
    } else {
      inputElement.style.borderColor = "";
    }
  });

  return isValid;
};

const check1To5 = (value) => {
  return value >= 1 && value <= 5;
};

const fetchFirstOrderDetails = async (id) => {
  const res = await fetch(
    `${SERVER_URL}/profile/getFirstOrderDetails/${id}`
  );
  const data = await res.json();
  return {
    medicalProfile: {
      name: "פרופיל רפואי",
      value: data.medicalProfile,
      type: "number",
      validation: (value) => {
        const MEDICAL_VALUES = [97, 82, 72, 64, 45, 27, 21];
        return MEDICAL_VALUES.includes(value);
      },
    },
    IPR: {
      name: 'דפ"ר',
      value: data.IPR,
      type: "number",
      validation: (value) => {
        const BRAIN_VALUES = [90, 80, 70, 60, 50, 40, 30, 20, 10];
        return BRAIN_VALUES.includes(value);
      },
    },
    adaptionDiff: {
      name: 'קה"ס',
      value: data.adaptionDiff,
      type: "number",
      validation: check1To5,
    },
    technicalAct: {
      name: "הפעלה טכנית",
      value: data.technicalAct,
      type: "number",
      validation: check1To5,
    },
    manageAndOrg: {
      name: "ניהול וארגון",
      value: data.manageAndOrg,
      type: "number",
      validation: check1To5,
    },
    teamwork: {
      name: "עבודת צוות",
      value: data.teamwork,
      type: "number",
      validation: check1To5,
    },
    command: {
      name: "פיקוד",
      value: data.command,
      type: "number",
      validation: check1To5,
    },
    field: {
      name: "שדה",
      value: data.field,
      type: "number",
      validation: check1To5,
    },
    humanRelations: {
      name: "יחסי אנוש",
      value: data.humanRelations,
      type: "number",
      validation: check1To5,
    },
    informProc: {
      name: "עיבוד מידע",
      value: data.informProc,
      type: "number",
      validation: check1To5,
    },
    instruction: {
      name: "הדרכה",
      value: data.instruction,
      type: "number",
      validation: check1To5,
    },
    frameBehave: {
      name: "התנהגות מסגרית",
      value: data.frameBehave,
      type: "number",
      validation: check1To5,
    },
    sustainAttention: {
      name: "קשב מתמשך",
      value: data.sustainAttention,
      type: "number",
      validation: check1To5,
    },
    investAndPersist: {
      name: "השקעה והתמדה",
      value: data.investAndPersist,
      type: "number",
      validation: check1To5,
    },
    spatialPer: {
      name: "תפיסה מרחבית",
      value: data.spatialPer,
      type: "number",
      validation: check1To5,
    },
  };
};

const updateFirstOrderDetails = async (firstOrderDetails) => {
  fetch(
    `${SERVER_URL}/profile/setFirstOrderDetails/${
      JSON.parse(sessionStorage.getItem("LoggedInUser")).UserID
    }`,
    {
      method: "POST",
      body: JSON.stringify(firstOrderDetails),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
};

const convertToHtmlIdConvention = (id) =>
  id
    .split("")
    .map((letter, idx) => {
      return letter.toUpperCase() === letter
        ? `${idx !== 0 ? "-" : ""}${letter.toLowerCase()}`
        : letter;
    })
    .join("");

const createFirstOrderField = (id, fieldProperties) => {
  const firstOrderFieldGroupElement = document.createElement("div");
  firstOrderFieldGroupElement.classList.add("form-group");
  const fieldLabelElement = document.createElement("label");
  fieldLabelElement.setAttribute("for", convertToHtmlIdConvention(id));
  fieldLabelElement.classList.add("form-label");
  fieldLabelElement.innerText = fieldProperties.name;
  const fieldElement = document.createElement("input");
  fieldElement.type = "number";
  fieldElement.id = convertToHtmlIdConvention(id);
  fieldElement.name = id;
  fieldElement.value = fieldProperties.value;
  fieldElement.classList.add("form-control");

  firstOrderFieldGroupElement.append(fieldLabelElement, fieldElement);
  return firstOrderFieldGroupElement;
};

const createFirstOrderForm = (firstOrderDetails) => {
  const firstOrderForm = document.getElementById("first-order-form");
  firstOrderForm.innerHTML = "";
  Object.entries(firstOrderDetails).forEach(([id, props]) => {
    const formGroup = createFirstOrderField(id, props);
    firstOrderForm.appendChild(formGroup);
  });

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.setAttribute("id", "save-first-order-details");
  submitButton.classList.add("btn", "btn-success");
  submitButton.textContent = "שמור";
  firstOrderForm.appendChild(submitButton);
};
