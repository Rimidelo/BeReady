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
      validation: () => {},
    },
    adaptionDiff: {
      name: 'קה"ס',
      value: 5,
      type: "number",
      validation: () => {},
    },
    technicalAct: {
      name: "הפעלה טכנית",
      value: 5,
      type: "number",
      validation: () => {},
    },
    manageAndOrg: {
      name: "ניהול וארגון",
      value: 5,
      type: "number",
      validation: () => {},
    },
    teamwork: {
      name: "עבודת צוות",
      value: 5,
      type: "number",
      validation: () => {},
    },
    command: {
      name: "פיקוד",
      value: 5,
      type: "number",
      validation: () => {},
    },
    field: {
      name: "שדה",
      value: 5,
      type: "number",
      validation: () => {},
    },
    humanRelations: {
      name: "יחסי אנוש",
      value: 5,
      type: "number",
      validation: () => {},
    },
    informProc: {
      name: "עיבוד מידע",
      value: 5,
      type: "number",
      validation: () => {},
    },
    instruction: {
      name: "הדרכה",
      value: 5,
      type: "number",
      validation: () => {},
    },
    frameBehave: {
      name: "התנהגות מסגרית",
      value: 5,
      type: "number",
      validation: () => {},
    },
    sustainAttention: {
      name: "קשב מתמשך",
      value: 5,
      type: "number",
      validation: () => {},
    },
    investAndPersist: {
      name: "השקעה והתמדה",
      value: 5,
      type: "number",
      validation: () => {},
    },
    spatialPer: {
      name: "תפיסה מרחבית",
      value: 5,
      type: "number",
      validation: () => {},
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
  const firstOrderFieldGroupElement = document.createDocumentFragment();
  const fieldLabelElement = document.createElement("label");
  fieldLabelElement.setAttribute("for", convertToHtmlIdConvention(id));
  fieldLabelElement.innerText = fieldProperties.name;
  const fieldElement = document.createElement("input");
  fieldElement.type = "number";
  fieldElement.id = convertToHtmlIdConvention(id);
  fieldElement.name = id;
  firstOrderFieldGroupElement.append(fieldLabelElement, fieldElement);
  return firstOrderFieldGroupElement;
};

const createFirstOrderForm = (firstOrderDetails) => {
  const firstOrderForm = document.getElementById("first-order-form");
  Object.entries(firstOrderDetails).map(([id, props]) => {
    firstOrderForm.appendChild(createFirstOrderField(id, props));
  });
};
