let list = JSON.parse(localStorage.getItem("mylist")) || [];

const form = document.querySelector("form");
const ulPeoples = document.querySelector("ul");
const searchInput = document.querySelector('#search');

searchInput.addEventListener('keyup', (e) => listing(e.target.value));

listing();

form.addEventListener('submit', function (e) {
    e.preventDefault();

    /*Validation of inputs */
    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    const phoneRegex = /^(?=(?:.*\d){8,11})[\d\s()+-]{8,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameRegex.test(this.name.value)) {
        alert("Invalid name. Only letters and spaces are allowed.");
        return;
    }

    if (!phoneRegex.test(this.phone.value)) {
        alert("Invalid phone number. Only digits (8 to 15 characters) are allowed.");
        return;
    }

    if (!emailRegex.test(this.email.value)) {
        alert("Invalid email format.");
        return;
    }

    const newPeople = {
        name: this.name.value,
        phone: this.phone.value,
        email: this.email.value
    };

    const idValue = this.id.value;

    if (idValue !== "" && !isNaN(idValue)) {
        list[parseInt(idValue)] = newPeople;
    } else {
        list.push(newPeople);
    }

    this.id.value = ""; // Clear the hidden input field
    this.reset(); // Clears the form fields

    saveContact(); // Saves to local storage
    listing(); // Updates the contact list on screen

});
function listing(filter = '') {
    ulPeoples.innerHTML = "";

    list.forEach((item, key) => {
        if (item.name.toUpperCase().includes(filter.toUpperCase()) || filter === "") {
            const line = document.createElement('li');
            line.innerHTML = `
              <span>Name: ${item.name}</span>
              <span>Phone: ${item.phone}</span>
              <span>Email: ${item.email}</span>
            `;

            const btnDelete = document.createElement('button');
            btnDelete.textContent = "Delete";
            btnDelete.classList.add('delete-button');
            btnDelete.addEventListener('click', () => deleteContact(key));

            const btnEdit = document.createElement('button');
            btnEdit.textContent = "Edit";
            btnEdit.classList.add('edit-button');
            btnEdit.addEventListener('click', () => editContact(key));

            line.appendChild(btnDelete);
            line.appendChild(btnEdit);

            ulPeoples.appendChild(line);
        }
    });
}

function deleteContact(id) {
    if (confirm("Are you sure you want to delete this contact?")) {
        form.reset();
        list.splice(id, 1);
        saveContact();
        listing();
        alert("Contact deleted successfully.");
    }
};


function saveContact() {
    localStorage.setItem("mylist", JSON.stringify(list));
};

function editContact(id) {
    form.id.value = id;
    form.name.value = list[id].name;
    form.phone.value = list[id].phone;
    form.email.value = list[id].email;
};

