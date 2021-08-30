// PRIMUS LIVE
primus = Primus.connect("https://bdayfinder-app.herokuapp.com", {
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
});

/*redirect if there isn't a token*/
if (!localStorage.getItem('token')) {
    window.location.href = "login.html";
}

/*add todo by enter*/
let input = document.querySelector("#chatInput");
input.addEventListener("keydown", e => {
    if (e.keyCode === 13) {
        // on enter
        let text = input.value;
        let birthday = localStorage.getItem('birthday');
        fetch(`https://bdayfinder-app.herokuapp.com/api/v1/chats`, {
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
        e.preventDefault();
    }

});

/*fetch(`http://localhost:3000/api/v1/chats`, {
    method: "get",
    'headers': {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
}).then(result => {
    return result.json();
}).then(json => {
    json.data.chats.forEach(chats => {
        let newChat = `<div class="chat"> 
        <div class="chatText">${json.data.chats.text}</div>
        <div class="chatUsername">${json.data.chats.username}</div>
        </div>`;
        document.querySelector(".newChat").insertAdjacentHTML('afterend', newChat);
    })
}).catch(err => {
    console.log(err)
})*/

let appendChat = (json) => {
    let chat = `<div class="chat"> 
        <div class="chat__text">${json.data.chats.text}</div>
        <div class="chat__username">${json.data.chats.username}</div>
        </div>`;
    document.querySelector(".newChat").insertAdjacentHTML('afterend', chat);
}

fetch("https://bdayfinder-app.herokuapp.com/api/v1/chats", {
    'headers': {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token")
    }
}).then(result => {
    return result.json();
}).then(json => {
    console.log(json);
}).catch(err => {
    console.log(err)
    window.location.href = "login.html";
});

document.querySelector(".logoutClick").addEventListener("click", e => {
    localStorage.removeItem("token");
    window.location.href = "login.html";
    e.preventDefault();
});
