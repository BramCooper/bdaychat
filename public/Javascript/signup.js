document.getElementById("submitBtn").addEventListener("click", (e) => {
    e.preventDefault();

    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let username = document.querySelector('#username').value;
    let birthday = document.querySelector('#birthday').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            birthday: birthday,
            email: email,
            password: password
        })
    }).then(response => {
        return response.json();

    }).then(json => {
        if (json.status === "success") {
            let token = json.data.token;
            let birthday = json.data.birthday;
            localStorage.setItem("token", token);
            localStorage.setItem("birthday", birthday);
            window.location.href = `/${birthday}`;

        }
    })
        .catch((error) => {
            console.error("Error:", error);
        });
});