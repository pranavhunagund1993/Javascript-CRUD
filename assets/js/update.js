// Logic to read query string from url
const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
});

console.log('params =', params.userId);

// localstorage config
let users = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];

let single = users.find((item) => item.id == params.userId);
console.log('single user = ', single);

let userForm = document.getElementById('userForm');
let userName = document.getElementById('name');
let userEmail = document.getElementById('email');
let userGender = document.getElementsByName('gender');
let selGender = '';

userName.value = single.name;
userEmail.value = single.email;

// reading data from storage and selecting the radio inputs
for(let i=0; i<userGender.length;i++) {
    if(userGender[i].value === single.gender) {
        userGender[i].checked = true;
    }
};

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
        id : single.id,
        name : userName.value,
        email : userEmail.value,
        gender : selGender
    }

    // console.log('updated user = ', data);
    updateUser(data);
});

// update the user info
function updateUser(data) {
    let index = users.findIndex((item) => item.id === data.id);
    console.log('Update user id =', index);

    // splice(index,delcount,data)
    users.splice(index,1,data);
    // users.push(data)
    localStorage.setItem('userInfo', JSON.stringify(users));
    alert('user data updated successfully');
    window.location.href = '/index.html';
}