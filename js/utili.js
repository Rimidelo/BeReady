const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));

if (loggedInUser) {
  const profilePicUrl = `${SERVER_URL}/assets/profile-pics/${loggedInUser.UserID}-profile-pic.png`;
  const instituteLogoUrl = `${SERVER_URL}/assets/institute-pics/${loggedInUser.InstituteID}-logo.png`;

  const instituteLogo = document.getElementById("institute-logo");
  if (instituteLogo) {
    const companyLogo = document.createElement("img");
    companyLogo.alt = "Company Logo";
    companyLogo.src = instituteLogoUrl;
    instituteLogo.appendChild(companyLogo);
  }
  const userInfoSection = document.getElementById("user_info");
  if (userInfoSection) {
    const profileLink = document.createElement("a");
    profileLink.href = "profile-status.html";
    const profileImg = document.createElement("img");
    profileImg.id = "profile-img";
    profileImg.alt = "User Avatar";
    profileImg.src = profilePicUrl;
    profileImg.classList.add("clientCompany-sign");
    profileLink.appendChild(profileImg);
    userInfoSection.insertBefore(profileLink, userInfoSection.firstChild);
  }
  const userGreeting = document.getElementById("user-greeting");
  if (userGreeting) {
    userGreeting.innerText = `שלום, ${loggedInUser.FirstName}!`;
  }

  const userRole = document.getElementById("user-role");
  if (userRole) {
    userRole.innerText =
      loggedInUser.Role === "manager" ? "מנהל מערכת" : 'מלש"ב';
  }
} else {
  window.location.href = "index.html";
}

document
  .getElementById("hamburger-menu")
  .addEventListener("click", function () {
    const sidebar = document.getElementById("sidebar");
    sidebar.classList.toggle("active");
  });

const generateManagerSidebar = (currentPage) => `
  <ul class="nav flex-column">
    <li class="nav-item">
      <a class="nav-link ${currentPage === 'org-activities.html' ? 'active' : ''}" href="org-activities.html">
        <span class="icon-placeholder">
          <img src="images/sidebar/my-activitires-icon.png" alt="my-activitires-icon Icon" class="icon-img">
        </span> הפעילויות שלנו
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link ${currentPage === 'activity-archive.html' ? 'active' : ''}" href="activity-archive.html">
        <span class="icon-placeholder">
          <img src="images/sidebar/all-activitires-icon.png" alt="all-activitires-icon Icon" class="icon-img">
        </span> מאגר פעילויות
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link ${currentPage === 'calendar.html' ? 'active' : ''}" href="#">
        <span class="icon-placeholder">
          <img src="images/sidebar/calender.svg" alt="calender Icon" class="icon-img">
        </span> יומן
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link ${currentPage === 'members.html' ? 'active' : ''}" href="#">
        <span class="icon-placeholder">
          <img src="images/sidebar/members.png" alt="Members Icon" class="icon-img">
        </span> חניכים
      </a>
    </li>
  </ul>
`;

const generateCfmsSidebar = (currentPage) => `
  <ul class="nav flex-column">
    <li class="nav-item">
      <a class="nav-link ${currentPage === 'cfmsPlan.html' ? 'active' : ''}" href="cfmsPlan.html">
        <span class="icon-placeholder">
          <img src="images/sidebar/check-list.png" alt="my-activitires-icon Icon" class="icon-img">
        </span> התוכנית שלי
      </a>
    </li>
     <li class="nav-item">
      <a class="nav-link ${currentPage === 'cfms-roles.html' ? 'active' : ''}" href="#">
        <span class="icon-placeholder">
          <img src="images/sidebar/soldier.png" alt="all-roles-icon" class="icon-img">
        </span> התפקידים שלי
      </a>
    </li>
    <li class="nav-item">
      <a class="nav-link ${currentPage === 'cfms-select-activities.html' ? 'active' : ''}" href="cfms-select-activities.html">
        <span class="icon-placeholder">
          <img src="images/sidebar/soldier.png" alt="all-activities-icon" class="icon-img">
        </span> הפעילויות שלי
      </a>
    </li>
  </ul>
`;

const initializeSidebar = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));
  const sidebarElement = document.getElementById("sidebar");
  const currentPage = window.location.pathname.split('/').pop();
  if (loggedInUser) {
    if (loggedInUser.Role === "manager") {
      sidebarElement.innerHTML = generateManagerSidebar(currentPage);
    } else if (loggedInUser.Role === "cfms") {
      sidebarElement.innerHTML = generateCfmsSidebar(currentPage);
    }
  } else {
    window.location.href = "index.html";
  }
};

initializeSidebar();

