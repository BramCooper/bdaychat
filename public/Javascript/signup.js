document.getElementById("submitBtn").addEventListener("click", (e) => {
    e.preventDefault();

    let firstName = document.querySelector('#firstName').value;
    let lastName = document.querySelector('#lastName').value;
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let password = document.querySelector('#password').value;

    console.log(firstName, lastName, username, email, password);

    fetch('http://localhost:3000/users/signup', {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            username: username,
            email: email,
            password: password
        })
    }).then(response => {
        return response.json();

    }).then(json => {
        if (json.status === "success") {
            console.log("gelukt!");

            let token = json.data.token;
            localStorage.setItem("token", token);
            window.location.href = "index.html";

        }
        /*else {
            console.log("failed");}*/

    })
        .catch((error) => {
            console.error("Error:", error);
        });
});