window.onload = () => {
  const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));

  if (loggedInUser) {
    const roleTranslations = {
      manager: "מנהל מערכת",
      cfms: "מלש\"ב"
    };
    const profileImg = document.getElementById('profile-img');
    if (loggedInUser.UserID && profileImg) {
      profileImg.src = `assets/profile-pics/${loggedInUser.UserID}-profile-pic.png`;
    } else {
      profileImg.style.display = 'none';
    }
    const companyLogo = document.getElementById('company-logo');
    if (loggedInUser.InstituteID && companyLogo) {
      companyLogo.src = `assets/institute-pics/${loggedInUser.InstituteID}-logo.png`;
    }
    const userGreeting = document.getElementById('user-greeting');
    if (userGreeting) {
      userGreeting.innerText = `שלום, ${loggedInUser.FirstName}!`;
    }
    const userRole = document.getElementById('user-role');
    if (userRole) {
      userRole.innerText = roleTranslations[loggedInUser.Role] || loggedInUser.Role;
    }
  } else {
    window.location.href = 'index.html';
  }
};




document.getElementById('hamburger-menu').addEventListener('click', function () {
  const sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('active');
});

