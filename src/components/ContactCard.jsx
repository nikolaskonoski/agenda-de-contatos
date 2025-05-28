import React, { useState } from "react";
import "./ContactCard.css";

function ContactCard({ contact, onDeleteContact, onUpdateContact }) {
    const { id, name, phone, email } = contact;

const [isEditing, setIsEditing] = useState(false);

const [editedName, setEditedName] = useState(name || '');
const [editedPhone, setEditedPhone] = useState(phone || '');
const [editedEmail, setEditedEmail] = useState(email || '');

const handleEditClick = () => {
    setIsEditing(true);

}

const handleCancelClick = () => {
    setIsEditing(false);

    setEditedName(name);
    setEditedPhone(phone || '');
    setEditedEmail(email || '');
};

const handleSaveClick = () => {
    const updateData = {
        name: editedName,
        phone: editedPhone,
        email: editedEmail
    };
    onUpdateContact(id, updateData);
    setIsEditing(false);
}

    const handleDeleteClick = () => {
        onDeleteContact(id);
    };

    return (
        <div className="contact-card">
            {isEditing ? (
                <div className="edit-form">
                    <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    />
                    <input
                        type="tel"
                        value={editedPhone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                    />
                    <input
                    type="email"
                    value={editedEmail}
                    onChange={(e) => setEditedEmail(e.target.value)}
                    />
                    <button onClick={handleSaveClick} className="save-button">Save</button>
                    <button onClick={handleCancelClick} className="cancel-button">Cancel</button>
                </div>
            ) : (
                <>
                <div>
                    <h4>{name}</h4>
                    {phone && <p>Phone: {phone}</p>}
                    {email && <p>Email: {email}</p>}
                </div>
                <div className="buttons-container">
                    <button onClick={handleEditClick} className="edit-button">Edit</button>
                    <button onClick={handleDeleteClick} className="delete-button">Delete</button>
                </div>
                </>
            )}
        </div>
    );
}

export default ContactCard;