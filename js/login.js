document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://127.0.0.1/profile/login/${userId}')
        .then(response => response.json())
        .then(data => {
            const user = data.LoggedInUser;

            if (email && password) {
                if (user.type === "cfms") {
                    window.location.href = "cfmsPlan.html";
                } else if (user.type === "manager") {
                    window.location.href = "org-activities.html";
                }
            } else {
                alert("התחברות נכשלה. אנא בדוק את הפרטים שלך.");
            }
        })
        .catch(error => console.error('Error:', error));
});
