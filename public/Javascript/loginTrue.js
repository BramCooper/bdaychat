/* fetch("http://localhost:3000/users/index.html", {  // http://localhost:3000/users/loginTrue
    'headers': {
        // "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem('token'),
    }
})
    .then((result) => {
        return result.json();
    })
    .then(json => {
        console.log(json);
    })
    .catch((error) => {
        console.log("rip");
    }); */

fetch("http://localhost:3000/users/loginTrue", {  // http://localhost:3000/users/loginTrue
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
    },
}).then((response) => {
    return response.json();
})
    .then((result) => {
        if (result.status === "succes") {
        } else {
            console.log("failed");
        }
    })
    .catch((error) => {
        window.location.href = "login";
    });