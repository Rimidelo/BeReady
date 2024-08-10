window.onload = async () => {
  const firstOrderDetails = await fetchFirstOrderDetails(1);
  createFirstOrderForm(firstOrderDetails);
};

const fetchFirstOrderDetails = async (id) => {
  // fetch(`https://127.0.0.1/profile/getFirstOrderDetails/${userId}`);
  return {
    medicalProfile: {
      name: "פרופיל רפואי",
      value: 97,
      type: "number",
      validation: (value) => {
        const MEDICAL_VALUES = [97, 82, 72, 64, 45, 27, 21];
        return MEDICAL_VALUES.includes(value);
      },
    },
    ipr: {
      name: 'דפ"ר',
      value: 90,
      type: "number",
      validation: (value) => {
        const BRAIN_VALUES = [80, 70, 60, 50, 40, 30, 20, 10];
        return BRAIN_VALUES.includes(value)
      },
    },
    adaptionDiff: {
      name: 'קה"ס',
      value: 5,
      type: "number",
      validation: (value) => {
        const ADAPTION_VALUES = [5, 4, 3, 2, 1];
        return ADAPTION_VALUES.includes(value)
      },
    },
    technicalAct: {
      name: "הפעלה טכנית",
      value: 5,
      type: "number",
      validation: (value) => {
        const TECHNICAL_VALUES = [5, 4, 3, 2, 1];
        return TECHNICAL_VALUES.includes(value)
      },
    },
    manageAndOrg: {
      name: "ניהול וארגון",
      value: 5,
      type: "number",
      validation: (value) => {
        const MANAGE_VALUES = [5, 4, 3, 2, 1];
        return MANAGE_VALUES.includes(value)
      },
    },
    teamwork: {
      name: "עבודת צוות",
      value: 5,
      type: "number",
      validation: (value) => {
        const TEAM_VALUES = [5, 4, 3, 2, 1];
        return TEAM_VALUES.includes(value)
      },
    },
    command: {
      name: "פיקוד",
      value: 5,
      type: "number",
      validation: (value) => {
        const COMMAND_VALUES = [5, 4, 3, 2, 1];
        return COMMAND_VALUES.includes(value)
      },
    },
    field: {
      name: "שדה",
      value: 5,
      type: "number",
      validation: (value) => {
        const FIELD_VALUES = [5, 4, 3, 2, 1];
        return FIELD_VALUES.includes(value)
      },
    },
    humanRelations: {
      name: "יחסי אנוש",
      value: 5,
      type: "number",
      validation: (value) => {
        const HUMAN_VALUES = [5, 4, 3, 2, 1];
        return HUMAN_VALUES.includes(value)
      },
    },
    informProc: {
      name: "עיבוד מידע",
      value: 5,
      type: "number",
      validation: (value) => {
        const INFORM_VALUES = [5, 4, 3, 2, 1];
        return INFORM_VALUES.includes(value)
      },
    },
    instruction: {
      name: "הדרכה",
      value: 5,
      type: "number",
      validation: (value) => {
        const INSTRUCTION_VALUES = [5, 4, 3, 2, 1];
        return INSTRUCTION_VALUES.includes(value)
      },
    },
    frameBehave: {
      name: "התנהגות מסגרית",
      value: 5,
      type: "number",
      validation: (value) => {
        const FRAME_VALUES = [5, 4, 3, 2, 1];
        return FRAME_VALUES.includes(value)
      },
    },
    sustainAttention: {
      name: "קשב מתמשך",
      value: 5,
      type: "number",
      validation: (value) => {
        const SUSTAIN_VALUES = [5, 4, 3, 2, 1];
        return SUSTAIN_VALUES.includes(value)
      },
    },
    investAndPersist: {
      name: "השקעה והתמדה",
      value: 5,
      type: "number",
      validation: (value) => {
        const INVEST_VALUES = [5, 4, 3, 2, 1];
        return INVEST_VALUES.includes(value)
      },
    },
    spatialPer: {
      name: "תפיסה מרחבית",
      value: 5,
      type: "number",
      validation: (value) => {
        const SPATIAL_VALUES = [5, 4, 3, 2, 1];
        return SPATIAL_VALUES.includes(value)
      },
    },
  };
};

const updateFirstOrderDetails = async (id) => {
  // fetch(`https://127.0.0.1/profile/setFirstOrderDetails/${userId}`);
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
  firstOrderFieldGroupElement.classList.add("form-group"); // Use existing form-group class

  const fieldLabelElement = document.createElement("label");
  fieldLabelElement.setAttribute("for", convertToHtmlIdConvention(id));
  fieldLabelElement.classList.add("form-label"); // Use existing form-label class
  fieldLabelElement.innerText = fieldProperties.name;

  const fieldElement = document.createElement("input");
  fieldElement.type = "number";
  fieldElement.id = convertToHtmlIdConvention(id);
  fieldElement.name = id;
  fieldElement.value = fieldProperties.value; // Set the default value
  fieldElement.classList.add("form-control"); // Use existing form-control class

  firstOrderFieldGroupElement.append(fieldLabelElement, fieldElement);
  return firstOrderFieldGroupElement;
};


const createFirstOrderForm = (firstOrderDetails) => {
  const firstOrderForm = document.getElementById("first-order-form");
  Object.entries(firstOrderDetails).map(([id, props]) => {
    firstOrderForm.appendChild(createFirstOrderField(id, props));
  });
};
