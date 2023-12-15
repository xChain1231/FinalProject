var users = JSON.parse(localStorage.getItem('users')) || [];

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    
    if (username === "admin" && password === "admin") {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('userManagementSections').style.display = 'block';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});

document.getElementById('logoutButton').addEventListener('click', function() {
    document.getElementById('loginSection').style.display = 'block';
    document.getElementById('userManagementSections').style.display = 'none';
    clearFormFields('registerForm');
    clearFormFields('modifyForm');
    clearFormFields('deleteForm');
});

document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var newUserId = parseInt(document.getElementById('regID').value);

    var idExists = users.some(user => user.id === newUserId);
    if (idExists) {
        alert('El ID ya está en uso. Por favor, elige otro ID.');
        return;
    }

    var newUser = {
        id: newUserId,
        firstName: document.getElementById('regFirstName').value,
        lastName: document.getElementById('regLastName').value,
        phone: document.getElementById('regPhone').value
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Usuario registrado con éxito');
    clearFormFields('registerForm');
    displayAllUsers();
});

document.getElementById('modifyForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userId = parseInt(document.getElementById('modUserId').value);
    var userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users[userIndex].firstName = document.getElementById('modFirstName').value || users[userIndex].firstName;
        users[userIndex].lastName = document.getElementById('modLastName').value || users[userIndex].lastName;
        users[userIndex].phone = document.getElementById('modPhone').value || users[userIndex].phone;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuario modificado con éxito');
        clearFormFields('modifyForm');
    } else {
        alert('Usuario no encontrado');
    }
    displayAllUsers();
});

document.getElementById('deleteForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var userId = parseInt(document.getElementById('delUserId').value);
    var userIndex = users.findIndex(user => user.id === userId);
    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Usuario eliminado con éxito');
        clearFormFields('deleteForm');
    } else {
        alert('Usuario no encontrado');
    }
    displayAllUsers();
});

function showSection(sectionId) {
    var sections = document.querySelectorAll('.section');
    sections.forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
    if (sectionId === 'listSection') {
        displayAllUsers();
    }
}

function displayAllUsers() {
    var usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    users.forEach(user => {
        var userDiv = document.createElement('div');
        userDiv.textContent = `ID: ${user.id}, Nombre: ${user.firstName}, Apellido: ${user.lastName}, Teléfono: ${user.phone}`;
        usersList.appendChild(userDiv);
    });
}

function clearFormFields(formId) {
    var form = document.getElementById(formId);
    Array.from(form.elements).forEach(input => {
        if (input.type !== 'submit') input.value = '';
    });
}
