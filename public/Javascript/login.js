var submitBtn = document.querySelector(".submitBtn").addEventListener('click', (e) => {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    e.preventDefault();
    console.log(username);

    fetch("https://bdayfinder-app.herokuapp.com/users/login", {
        method: "post",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    }).then(response => {
        return response.json();

    }).then(json => {
        console.log(json);
        let feedback = document.querySelector(".alert");
        if (json.status === "success") {
            feedback.textContent = "Welcome";
            feedback.classList.remove('hidden');
            let birthday = json.data.birthday;
            let token = json.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("birthday", birthday);
            window.location.href = `/${birthday}`;

            console.log("success");
        } else {
            console.log("failed");
            feedback.textContent = "Username or password is wrong, try again";
            feedback.classList.remove('hidden');
        }
    }).catch((error) => {
        console.error("error:", error);
    })
});
