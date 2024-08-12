document.getElementById('first-order-details').addEventListener('click', function () {
    window.location.href = 'profile-first-order-details.html';
});

window.onload = () => {
    fetch('../data/user.json')
        .then(response => response.json())
        .then(data => {
            const user = data.LoggedInUser;
            updateProfilePicture(user.profile_pic);
        })
        .catch(error => console.error('Error fetching user data:', error));
};

function updateProfilePicture(profilePicUrl) {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.src = profilePicUrl;
    }
}

