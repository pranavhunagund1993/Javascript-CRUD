// DOM Elements
let userForm = document.getElementById('userForm');
let userName = document.getElementById('name');
let userEmail = document.getElementById('email');
let userGender = document.getElementsByName('gender');
let selGender = '';

// localstorage config
let users = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];

// To generate random id
const genRanId = () => {
    let randId = Math.floor(Math.random() * 10000);
    return randId;
}

// form submit Handler
userForm.addEventListener('submit', function (e) {
    e.preventDefault();     /* To avoid page refresh */

    // To pick value from selected radio input
    for(let i=0; i<userGender.length; i++) {
        if(userGender[i].checked) {
            selGender = userGender[i].value;
        }
    }

    // object
    let data = {
        id : genRanId(),
        name : userName.value,
        email : userEmail.value,
        gender : selGender
    }

    console.log('new user = ', data);
    createUser(data);
});

// To create new user
function createUser(user) {
    let exUser = users.find((item) => item.email === user.email);
    console.log('exUser = ', exUser);

    if(exUser) {
        alert('user email already registered');
    } else {
        // save
        users.push(user);
        localStorage.setItem("userInfo", JSON.stringify(users));
        alert('new user created successfully');
        window.location.href = "/index.html";
    }
};

