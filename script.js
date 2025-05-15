

const supabase = createClient(
  'https://gijdcdwwiackgybicjao.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpamRjZHd3aWFja2d5YmljamFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDcwNTg3MzMsImV4cCI6MjA2MjYzNDczM30.DKCptg8GhAfTa8WFc2sskfcbGXM5eoHv-ATKDnDWaxs'
);


// Aqui fizemos a conexão com o banco de dados, e fizemos a função de carregar os contatos
let list = [];

async function loadContacts() {
    const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('id', { ascending: true });
    if (error) {
        alert("Error loading contacts" + error.message);
        return;
    }
    list = data;
    listing();

}

const form = document.querySelector("form");
const ulPeoples = document.querySelector("ul");

// Here we handle the form, apply default behavior, and create a new JSON object
form.addEventListener('submit', async function (e) {
    e.preventDefault(); // Prevents the form from submitting



    const nameRegex = /^[A-Za-zÀ-ÿ\s]+$/;
    const phoneRegex = /^[\d\s()+-]{8,20}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!nameRegex.test(form.name.value)) {
        alert("Invalid name. Only letters and spaces are allowed.");
        return;
    }

    if (!phoneRegex.test(form.phone.value)) {
        alert("Invalid phone number. Only digits (8 to 15 characters) are allowed.");
        return;
    }

    if (!emailRegex.test(form.email.value)) {
        alert("Invalid email format.");
        return;
    }

    const newPeople = {
        name: form.name.value,
        phone: form.phone.value,
        email: form.email.value
    };

    const id = form.id.value;

    if (id) {
        // Edit existing contact
        const { error } = await supabase
            .from('contacts')
            .update(newPeople)
            .eq('id', id);

        if (error) {
            alert("Error updating contact" + error.message);
            return;
        }
    } else {
        // Add new contact
        const { error } = await supabase
            .from('contacts')
            .insert([newPeople]);

        if (error) {
            alert("Error adding contact" + error.message);
            return;
        }
    }
    form.reset(); // Clear the form fields
    form.id.value = ""; // Clear the hidden input field
    await loadContacts(); // Update the contact list
});

// Filter of Search in real time 
document.querySelector('#search').addEventListener('keyup', (e) => {
    listing(e.target.value);
});




/* Aqui fizemos a função listar, que renderiza os contatos na tela, e também fizemos o tratamento do filtro de pesquisa */
/* A função listar percorre o array de contatos e renderiza na tela, se o filtro for vazio, renderiza todos os contatos, indexof procura o nome buscado, percorrendo o array e fazendo uma validação*/

async function listing(filter = '') {
    ulPeoples.innerHTML = "";

    const { data, error } = await supabase
        .from('contacts')
        .select('*');

    if (error) {
        console.error('Error fetching contacts:', error);
        alert('Failed to load contacts');
        return;
    }

    list = data;

    list.forEach((item) => {
        if (item.name.toUpperCase().indexOf(filter.toUpperCase()) >= 0 || filter === '') {
            const line = document.createElement("li");
            let s = `
                <button class="delete-btn" onclick="deleteContact(${item.id})">Delete</button> 
                <button clas="editbtn" onclick="editContact(${item.id})">Edit</button>
                `;
            line.innerHTML = `<strong>${item.name}</strong> - ${item.phone} - ${item.email} ${s}`;
            ulPeoples.appendChild(line);
        }
    });
};

async function deleteContact(id) {
    const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id);

    if (error) {
        alert("Error deleting contact" + error.message);
        return;
    }

    loadContacts();
    alert("Contact deleted successfully");
}

function saveContact() {
    localStorage.setItem("mylist", JSON.stringify(list));
}

function editContact(id) {
    const contact = list.find(c => c.id === id);

    if (!contact) {
        alert("Contact not found");
        return;
    }

    form.id.value = contact.id;
    form.name.value = contact.name;
    form.phone.value = contact.phone;
    form.email.value = contact.email;
}

// Start loading form Supabase
loadContacts();


