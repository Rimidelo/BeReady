import { SERVER_URL } from "./constants.js";

const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));

if (loggedInUser) {
  const profilePicUrl = `${SERVER_URL}/assets/profile-pics/${loggedInUser.UserID}-profile-pic.png`;
  const instituteLogoUrl = `${SERVER_URL}/assets/institute-pics/${loggedInUser.InstituteID}-logo.png`;

  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.src = profilePicUrl;
  }

  const companyLogo = document.getElementById("company-logo");
  if (companyLogo) {
    companyLogo.src = instituteLogoUrl;
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
