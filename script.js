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

/* Aqui fizemos o tratamento do formulário, aplicando um comportamento padrão, criamos um novo objeto JSON */
form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission
    let newPeople = {};
    newPeople.name = this.name.value;
    newPeople.phone = this.phone.value;
    newPeople.email = this.email.value;
    if (this.id.value !== "" && this.id.value >= 0) {
        list[this.id.value] = newPeople;
    } else {
        list.push(newPeople);
    }

    this.reset(); // Clear the form fields

    saveLS(); // Save to local storage

    listing();

});

/* Aqui fizemos a função listar, que renderiza os contatos na tela, e também fizemos o tratamento do filtro de pesquisa */
/* A função listar percorre o array de contatos e renderiza na tela, se o filtro for vazio, renderiza todos os contatos, indexof procura o nome buscado, percorrendo o array e fazendo uma validação*/

function listing(filter = '') {
    ulPeoples.innerHTML = "";
    list.forEach((item, key) => {
        if (item.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0 || filter == "") {

            line = document.createElement('li');

            let s = `<button OnClick="deleted(${key})">Delete</button> 
                    <button onClick="edit(${key})">Edit</button>`

            line.innerHTML = "Name:" + item.name + "Phone:" + item.phone + "Email:" + item.email + s;
            ulPeoples.appendChild(line);
        }
    });


}

function deleted(id) {
    form.reset(); // Clear the form fields
    list.splice(id, 1);
    saveLS();
    listing();
    alert("Contact deleted successfully");
}

function saveLS() {
    localStorage.setItem("mylist", JSON.stringify(list));
}

function edit(id) {
    form.id.value = id;
    form.name.value = list[id].name;
    form.phone.value = list[id].phone;
    form.email.value = list[id].email;
}



