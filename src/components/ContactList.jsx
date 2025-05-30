import React from "react";
import ContactCard from "./ContactCard";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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
        <Box
            className="contact-list"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
            }}
        >

            <Typography component="h2"
                sx={{
                    mb: 2,
                    mt: 2,
                    alignSelf: 'center',
                    color: 'black',
                    display: 'block',
                    fontSize: '1.5em',
                    fontWeight: 'bold',
                    fontFamily: 'system-ui, Avenir, Helvetica, Arial, sans-serif',
                    color: 'black',
                    mt: 2,
                    mb: 2,

                }}
            >
                SAVED CONTACTS
            </Typography>
            {contacts.length === 0 ? (
                <Typography variant="body1" color="text.secondary">
                    No contacts added.
                </Typography>
            ) : (
                renderContactList
            )}
        </Box>

    );
}

export default ContactList;
