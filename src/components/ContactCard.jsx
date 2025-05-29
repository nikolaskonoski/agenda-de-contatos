import React, { useState } from "react";
import Button from '@mui/material/Button';
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
                    <Button variant="contained" color="primary" onClick={handleSaveClick} sx={{ mr: 1 }}>Save</Button>
                    <Button variant="outlined" onClick={handleCancelClick}>Cancel</Button>
                </div>
            ) : (
                <>
                    <div>
                        <h4>{name}</h4>
                        {phone && <p>Phone: {phone}</p>}
                        {email && <p>Email: {email}</p>}
                    </div>
                    <div className="buttons-container">
                        <Button variant="outlined" size="small" onClick={handleEditClick} sx={{ mr: 1 }}>Edit</Button>
                        <Button variant="outlined" size="small" color="error" onClick={handleDeleteClick}>Delete</Button>
                    </div>
                </>
            )}
        </div>
    );
}

export default ContactCard;