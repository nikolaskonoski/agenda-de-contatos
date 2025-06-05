// src/App.jsx
import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import ContactForm from "./components/ContactForm.jsx";
import ContactList from "./components/ContactList.jsx"; // Vamos refatorá-lo para tabela depois
import SearchFilter from "./components/SearchFilter.jsx";
import { v4 as uuidv4 } from "uuid";
import Box from "@mui/material/Box"; // Importando Box para o layout MUI
import CssBaseline from "@mui/material/CssBaseline"; // Importando CssBaseline
import Divider from "@mui/material/Divider"; // Importando Divider
import "./App.css";

const LOCAL_STORAGE_KEY = "contact-list-app-contacts";

function App() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // 1. NOVO ESTADO: para guardar o contato que está sendo editado
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    try {
      const storedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedContacts) {
        const parsedContacts = JSON.parse(storedContacts);
        if (Array.isArray(parsedContacts)) {
          setContacts(parsedContacts);
          console.log("Loaded contacts from localStorage:", parsedContacts);
        } else {
          console.warn(
            "Data in localStorage was not an array. Resetting.",
            parsedContacts
          );
          setContacts([]);
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
        }
      } else {
        setContacts([]);
      }
    } catch (error) {
      console.error(
        "Error parsing contacts from localStorage. Resetting.",
        error
      );
      setContacts([]);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    if (Array.isArray(contacts)) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
      console.log("Saved contacts to localStorage:", contacts);
    }
  }, [contacts]);

  // HANDLERS
  const addContactHandler = (contactData) => {
    const newContact = { ...contactData, id: uuidv4() };
    setContacts((prevContacts) => [newContact, ...prevContacts]);
    console.log("Contact added with UUID:", newContact);
    setEditingContact(null); // Limpa o modo de edição ao adicionar um novo contato
  };

  const searchChangeHandler = (term) => {
    setSearchTerm(term);
  };

  const deleteContactHandler = (contactId) => {
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => contact.id !== contactId)
    );
    // Se o contato deletado era o que estava sendo editado, limpa o formulário
    if (editingContact && editingContact.id === contactId) {
      setEditingContact(null);
    }
  };

  const updateContactHandler = (contactId, updatedData) => {
    // Renomeado de updateData para updatedData
    setContacts((prevContacts) =>
      prevContacts.map(
        (contact) =>
          contact.id === contactId
            ? { ...contact, ...updatedData, id: contactId }
            : contact // Garante que o ID não seja perdido e mescla os dados
      )
    );
    setEditingContact(null); // Limpa o modo de edição após a atualização
  };

  // 2. NOVA FUNÇÃO: para iniciar o modo de edição
  const handleStartEdit = (contactToEdit) => {
    setEditingContact(contactToEdit);
    // Opcional: Fazer a página rolar para o topo onde o formulário está
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // FILTERING
  const filteredContacts = Array.isArray(contacts)
    ? contacts.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) // Corrigido para toLowerCase
      )
    : [];

  // RENDER
  return (
    <Box className="App">
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "80px",
          mb: 4,
          px: 2,
        }}
      >
        <Box sx={{ width: "100%", maxWidth: "600px", mb: 3 }}>
          <ContactForm
            onAddContact={addContactHandler}
            editingContact={editingContact} // Passa o contato que está sendo editado
            onUpdateContact={updateContactHandler} // Passa a função de atualização
            onCancelEdit={() => setEditingContact(null)} // Passa uma função para cancelar a edição
          />
        </Box>
        <Divider sx={{ width: "100%", maxWidth: "600px", my: 3 }} />

        <Box sx={{ width: "100%", maxWidth: "600px" }}>
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={searchChangeHandler}
          />
        </Box>
        <Box sx={{ width: "100%", maxWidth: "800px", mt: 2 }}>
          <ContactList
            contacts={filteredContacts}
            onDeleteContact={deleteContactHandler}
            onStartEdit={handleStartEdit} // Em vez de onUpdateContact
          />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
