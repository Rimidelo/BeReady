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
  if (window.location.pathname === "/pages/first-order-details.html") {
    if (loggedInUser.Role === "manager") {
      const personaluQestLink = document.getElementById("personal-quest");
      personaluQestLink.style.display = "hidden";
      const firstOrderDetails = document.getElementById("first-order-details");
      firstOrderDetails.style.display = "hidden";
    };
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
