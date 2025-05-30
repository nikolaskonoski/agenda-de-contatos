import React, { useState } from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
/*import './ContactCard.css';*/

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

        <Card sx={{ mb: 2, backgroundColor: isEditing ? '#f0f0f0' : 'transparent' }}>
            <CardContent>
                {isEditing ? (
                    <Box component="div" className="edit-form" >
                        <TextField
                            label="Nome"
                            variant="standard"
                            fullWidth
                            size="small"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            label="Telefone"
                            variant="standard"
                            fullWidth
                            size="small"
                            value={editedPhone}
                            onChange={(e) => setEditedPhone(e.target.value)}
                            sx={{ mb: 1 }}
                        />
                        <TextField
                            label="Email"
                            variant="standard"
                            fullWidth
                            size="small"
                            value={editedEmail}
                            onChange={(e) => setEditedEmail(e.target.value)}
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="contained" onClick={handleSaveClick}
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#333', },
                                    alignSelf: 'center'
                                }}
                            >
                                Save
                            </Button>
                            <Button variant="outlined" onClick={handleCancelClick}
                                sx={{
                                    mt: 2,
                                    mb: 2,
                                    backgroundColor: 'black',
                                    color: 'white',
                                    '&:hover': { backgroundColor: '#333', },
                                    alignSelf: 'center'
                                }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                ) : (

                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ alignSelf: 'flex-start', mb: 1 }}>
                            <Typography variant="h5" component="div">
                                {name}
                            </Typography>
                            {phone && (
                                <Typography variant="body1" color="text.secondary"  sx={{ fontSize: '1.3rem', mt: 0.5 }}>
                                    Telefone: {phone}
                                </Typography>
                            )}
                            {email && (
                                <Typography variant="body1" color="text.secondary"  sx={{ fontSize: '1.3rem', mt: 0.5 }}>
                                    Email: {email}
                                </Typography>
                            )}
                        </Box>
                        <Box sx={{ alignSelf: 'center' }}>
                            <IconButton aria-label="edit" size="small" onClick={handleEditClick} sx={{ mr: 0.5 }}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton aria-label="delete" size="small" color="error" onClick={handleDeleteClick}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>

    );
}

export default ContactCard;