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

/* fetch("http://localhost:3000/users/loginTrue", {  // http://localhost:3000/users/loginTrue
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
    }); */

// PRIMUS LIVE
primus = Primus.connect("http://localhost:3000", {
    reconnect: {
        max: Infinity // Number: The max delay before we try to reconnect.
        , min: 500 // Number: The minimum delay before we try reconnect.
        , retries: 10 // Number: How many times we should try to reconnect.
    }
});

primus.on('data', (json) => {
    if (json.action === "addChat") {
        appendChat(json.data);
    }
})

/*add todo by enter*/
let input = document.querySelector(".chatInput");
input.addEventListener("keyup", e => {
    if (e.keyCode === 13) {
        // on enter
        let text = input.value;
        fetch("http://localhost:3000/api/v1/chats", {
            method: "post",
            'headers': {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({
                "text": text
            })
        })
            .then(result => {
                return result.json();
            }).then(json => {
                input.value = "";
                input.focus();

                primus.write({
                    "action": "addChat",
                    "data": json
                });
                //appendChat(json);

            }).catch(err => {
                console.log(err)
            })
    }
});

let appendChat = (json) => {
    let chat = `<div class="chat">
    <input data-id="${json.data.chat._id}" type="checkbox">  
    <div>${json.data.chat.text}</div>
    <a href="#" data-id="${json.data.chat._id}">delete</a>
</div>`;
    document.querySelector(".newChat").insertAdjacentHTML('beforebegin', chat);
}

fetch("http://localhost:3000/api/v1/chats", {
    'headers': {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    console.log("wrong")
    window.location.href = "login.html";
});
