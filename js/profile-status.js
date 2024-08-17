document.getElementById('first-order-details').addEventListener('click', function () {
    window.location.href = 'profile-first-order-details.html';
});

window.onload = () => {
    fetch('../data/user.json')
        .then(response => response.json())
        .then(data => {
            const user = data.LoggedInUser;
            updateProfilePicture(user.profile_pic);
            if (user.type === 'manager') {
                const personalQuestionnaire = document.getElementById('personal-quest');
                const firstOrderDetails = document.getElementById('first-order-details');

                if (personalQuestionnaire) {
                    personalQuestionnaire.style.display = 'none';
                }

                if (firstOrderDetails) {
                    firstOrderDetails.style.display = 'none';
                }
            }
        })
        .catch(error => console.error('Error fetching user data:', error));
};

function updateProfilePicture(profilePicUrl) {
    const profileImg = document.querySelector('.profile-img');
    if (profileImg) {
        profileImg.src = profilePicUrl;
    }
}

document.getElementById("log-out").addEventListener("click", function () {
    sessionStorage.clear();
    window.location.href = "index.html";
});
