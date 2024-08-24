document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('https://127.0.0.1/profile/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => response.json())
        .then(user => {
            if (user.Role === "cfms") {
                window.location.href = "cfmsPlan.html";
            } else if (user.Role === "manager") {
                window.location.href = "org-activities.html";
            } else {
                alert("התחברות נכשלה. אנא בדוק את הפרטים שלך.");
            }
        })
        .catch(error => console.error('Error:', error));
});
