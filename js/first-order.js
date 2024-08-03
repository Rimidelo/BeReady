const FIRST_ORDER_FIELDS = {
  medicalProfile: {
    name: "פרופיל רפואי",
    type: "number",
    validation: (value) => {
      const MEDICAL_VALUES = [97, 82, 72, 64, 45, 27, 21];
      return MEDICAL_VALUES.includes(value);
    },
  },
  ipr: {
    name: 'דפ"ר',
    type: "number",
    validation: () => {},
  },
  adaptionDiff: {
    name: 'קה"ס',
    type: "number",
    validation: () => {},
  },
  technicalAct: {
    name: "הפעלה טכנית",
    type: "number",
    validation: () => {},
  },
  manageAndOrg: {
    name: "ניהול וארגון",
    type: "number",
    validation: () => {},
  },
  teamwork: {
    name: "עבודת צוות",
    type: "number",
    validation: () => {},
  },
  command: {
    name: "פיקוד",
    type: "number",
    validation: () => {},
  },
  field: {
    name: "שדה",
    type: "number",
    validation: () => {},
  },
  humanRelations: {
    name: "יחסי אנוש",
    type: "number",
    validation: () => {},
  },
  informProc: {
    name: "עיבוד מידע",
    type: "number",
    validation: () => {},
  },
  instruction: {
    name: "הדרכה",
    type: "number",
    validation: () => {},
  },
  frameBehave: {
    name: "התנהגות מסגרית",
    type: "number",
    validation: () => {},
  },
  sustainAttention: {
    name: "קשב מתמשך",
    type: "number",
    validation: () => {},
  },
  investAndPersist: {
    name: "השקעה והתמדה",
    type: "number",
    validation: () => {},
  },
  spatialPer: {
    name: "תפיסה מרחבית",
    type: "number",
    validation: () => {},
  },
};

window.onload = async () => {
  await fetchFirstOrderDetails(1);
  createFirstOrderForm();
};

const fetchFirstOrderDetails = async (id) => {};

const updateFirstOrderDetails = async (id) => {};

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

const createFirstOrderForm = () => {
  const firstOrderForm = document.getElementById("first-order-form");
  Object.entries(FIRST_ORDER_FIELDS).map(([id, props]) => {
    firstOrderForm.appendChild(createFirstOrderField(id, props));
  });
};
