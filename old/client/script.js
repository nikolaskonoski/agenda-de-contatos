let list = localStorage.getItem("mylist");

const form = document.querySelector("form");
const ulPeoples = document.querySelector("ul");

// Adiciona o evento de keyup para o campo de pesquisa
document.querySelector('#search').addEventListener('keyup', (e) => listing(e.target.value));

if (list) {
    list = JSON.parse(list);
} else {
    list = [];
}

listing();

// Here we handle the form, apply default behavior, and create a new JSON object
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents the form from submitting



    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    const phoneRegex = /^[\d\s()+-]{8,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let newPeople = {};

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

    newPeople.name = this.name.value;
    newPeople.phone = this.phone.value;
    newPeople.email = this.email.value;

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



/* Aqui fizemos a função listar, que renderiza os contatos na tela, e também fizemos o tratamento do filtro de pesquisa */
/* A função listar percorre o array de contatos e renderiza na tela, se o filtro for vazio, renderiza todos os contatos, indexof procura o nome buscado, percorrendo o array e fazendo uma validação*/

function listing(filter = '') {
    ulPeoples.innerHTML = "";
    list.forEach((item, key) => {
        if (item.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0 || filter == "") {

            const line = document.createElement('li');

            let s = `<button OnClick="deleteContact(${key})">Delete</button> 
                    <button onClick="editContact(${key})">Edit</button>`

            line.innerHTML = line.innerHTML = `Name: ${item.name} | Phone: ${item.phone} | Email: ${item.email} ${s}`;
            ulPeoples.appendChild(line);
        }
    });


}

function deleteContact(id) {
    form.reset(); // Clear the form fields
    list.splice(id, 1);
    saveContact();
    listing();
    alert("Contact deleted successfully");
}

function saveContact() {
    localStorage.setItem("mylist", JSON.stringify(list));
}

function editContact(id) {
    form.id.value = id;
    form.name.value = list[id].name;
    form.phone.value = list[id].phone;
    form.email.value = list[id].email;
}



