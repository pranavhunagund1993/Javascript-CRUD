// localstorage config
let users = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : [];

let results = document.getElementById('results');

// To print data from the localstorage
function printUser() {
    console.log('print user', users);
    users.forEach(item => {
        results.innerHTML += `
            <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.gender}</td>
                <td>
                    <a href="/CRUD/update.html?userId=${item.id}"><i class="fa-solid fa-pen-to-square"></i></a>
                    <a onclick = 'deleteUser(${item.id})'><i class="fa-solid fa-trash-can"></i></a>
                </td>           
            </tr>
        `;
    });
};

printUser();

// To delete the existing user
function deleteUser(id) {
    if(confirm(`Are you sure to delete an user id = ${id}?`)) {
        let index = users.findIndex((item) => item.id === id);
        if(index === null) {
            alert("user id doesn't exists");
        } else {
            users.splice(index,1);
            localStorage.setItem('userInfo', JSON.stringify(users));
            alert('user successfully deleted');
            window.location.reload();
            // window.location.hef = '/CRUD/index.html';
        }
    } else {
        return;
    }
}