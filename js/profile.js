const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));

if (loggedInUser) {
  const profilePicUrl = `${SERVER_URL}/assets/profile-pics/${loggedInUser.UserID}-profile-pic.png`;

  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.src = profilePicUrl;
  }
};

if(loggedInUser.Role === "manager"){
  const personaluQestLink = document.getElementById("personal-quest");
  personaluQestLink.style.display = "none";
  const firstOrderDetails = document.getElementById("first-order-details");
  firstOrderDetails.style.display = "none";
};