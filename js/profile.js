const loggedInUser = JSON.parse(sessionStorage.getItem("LoggedInUser"));

if (loggedInUser) {
  const profilePicUrl = `${SERVER_URL}/assets/profile-pics/${loggedInUser.UserID}-profile-pic.png`;

  const profileImg = document.getElementById("profile-img");
  if (profileImg) {
    profileImg.src = profilePicUrl;
  }
}