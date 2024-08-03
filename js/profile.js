window.onload = async () => {
  const profileStatus = await fetchProfileStatus(userId);
  const profileImgSrc = await fetchProfileImage(userId);
  initProfileStatusPage(profileStatus);
  addProfileImgElement(profileImgSrc);
};

const createStatusIcon = (isFilled) => {
  const statusIcon = document.createElement("img");
  statusIcon.src = isFilled ? "images/status/check.png" : "images/status/X.png";
  statusIcon.alt = isFilled ? "check mark" : "X mark";
  return statusIcon;
};

const createProfileStatusItem = (profileStatusItem) => {
  const { id, name, isFilled } = profileStatusItem;
  const newProfileStatusItemElement = document.createElement("li");
  newProfileStatusItemElement.id = getActivityElementId(`${id}-status`);
  newProfileStatusItemElement.classList.add("profileStatusItem");
  newProfileStatusItemElement.innerText = name;
  newProfileStatusItemElement.appendChild(createStatusIcon(isFilled));
  return newProfileStatusItemElement;
};

const addProfileImgElement = (imgSrc) => {
  const profileImgSectionElement = document.getElementById(
    "profile-img-section"
  );
  const profileImgElement = document.createElement("img");
  profileImgElement.src = imgSrc;
  profileImgElement.alt = "profile image";
  profileImgSectionElement.appendChild(profileImgElement);
};

const initProfileStatusPage = (profileStatus) => {
  const profileDetailsSectionElement = document.getElementById(
    "profile-details-section"
  );
  Object.entries(profileStatus).map(([, props]) => {
    profileDetailsSectionElement.appendChild(createProfileStatusItem(props));
  });
};

const fetchProfileStatus = async (userId) => {
  // fetch(`https://127.0.0.1/profile/getProfileStatus/${userId}`);
  return {
    PERSONAL_DETAILS: {
      id: "personal-details",
      name: "פרטים אישיים",
      isFilled: true,
    },
    PREFERENCES: {
      id: "preferences",
      name: "שאלון אישי",
      isFilled: true,
    },
    FIRST_ORDER_DETAILS: {
      id: "first-order-details",
      name: "נתוני צו ראשון",
      isFilled: false,
    },
  };
};

const fetchProfileImage = async (userId) => {
  // fetch(`https://127.0.0.1/profile/getProfileImage/${userId}`);
  return "";
};
