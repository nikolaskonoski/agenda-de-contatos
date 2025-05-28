import React from "react";
import ContactCard from "./ContactCard";

function ContactList({ contacts, onDeleteContact, onUpdateContact }) {

    const renderContactList = contacts.map((contact) => {
        return (
            <ContactCard
                key={contact.id}
                contact={contact}
                onDeleteContact={onDeleteContact}
                onUpdateContact={onUpdateContact}
            />
        );
    });

    return (
        <div className="contact-list">
            <h2>Contact List</h2>
            {contacts.length === 0 ? (
                <p>No contacts saved yet.</p>
            ) : (
                renderContactList
            )}
        </div>
    );
}

export default ContactList;
