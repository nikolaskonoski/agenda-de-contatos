import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ContactForm from './components/ContactForm.jsx';
import ContactList from "./components/ContactList.jsx";
import SearchFilter from "./components/SearchFilter.jsx";
import { v4 as uuidv4 } from "uuid";
import './App.css';

const LOCAL_STORAGE_KEY = "contact-list-app-contacts";


function App() {

  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts);
        // VERIFICA SE O QUE FOI CARREGADO É REALMENTE UM ARRAY
        if (Array.isArray(parsedContacts)) {
          setContacts(parsedContacts);
          console.log("Loaded contacts from localStorage:", parsedContacts);
        } else {
          // Se não for um array (ex: JSON.parse("null") vira null),
          // define como array vazio e limpa o localStorage inválido.
          console.warn("Data in localStorage was not an array. Resetting.", parsedContacts);
          setContacts([]);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
        }
      } else {
        // Se não houver nada, garante que seja um array vazio
        // (o useState([]) já faz isso, mas é bom ser explícito)
        setContacts([]);
      }
    } catch (error) {
      // Se houver erro ao parsear (ex: JSON malformado),
      // define como array vazio e limpa o localStorage.
      console.error("Error parsing contacts from localStorage. Resetting.", error);
      setContacts([]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    }
  }, []); // Array de dependências vazio: roda só uma vez ao montar

  // O segundo useEffect (para salvar) continua igual:
  useEffect(() => {
    // Só salva se 'contacts' for de fato um array (uma segurança extra)
    if (Array.isArray(contacts)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
      console.log("Saved contacts to localStorage:", contacts);
    }
  }, [contacts]);


  // HANDLERS
  const addContactHandler = (contactData) => {
    const newContact = { ...contactData, id: uuidv4() };
    setContacts((prevContacts) => {
      return [newContact, ...prevContacts];
    });
    console.log("Contact added with UUID:", newContact);
  };

  const searchChangeHandler = (term) => {
    setSearchTerm(term);
  };

  const deleteContactHandler = (contactId) => {
    setContacts((prevContacts) => {
      return prevContacts.filter(contact => contact.id !== contactId);
    });
  };

  const updateContactHandler = (contactId, updateData) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === contactId ? { ...updateData, id: contactId } : contact
      )
    );
  };

  // FILTERING

  const filteredContacts = Array.isArray(contacts) ? contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
  ) : [];


  // RENDER 

  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <ContactForm onAddContact={addContactHandler} />
        <hr />
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={searchChangeHandler}
        />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={deleteContactHandler}
          onUpdateContact={updateContactHandler}
        />
      </main>
    </div>
  );
}

export default App;