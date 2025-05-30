import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";


function ContactForm({ onAddContact }) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [errors, SetErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};

        //Name validation
        if (!name.trim()) {
            newErrors.name = "Name is required."
        }

        //Phone validation
        if (!phone.trim()) {
            newErrors.phone = "Phone is required.";

        }

        //Email validation (only if email is not empty)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() && !emailRegex.test(email)) {
            newErrors.email = " The email format is invalid."
        }

        // Update the errors state
        SetErrors(newErrors);

        return Object.keys(newErrors).length === 0;

    };


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        const contactData = {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim(),
            id: Math.random().toString()
        };

        onAddContact(contactData);

        setName('');
        setPhone('');
        setEmail('');
        SetErrors({});
    };

    // Helper funtion to clea error whe user types
    const handleInputChange = (setter, fieldName) => (e) => {
        setter(e.target.value);

        if (errors[fieldName]) {
            SetErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[fieldName];
                return newErrors;
            });
        }
    }


    return (
        <form onSubmit={handleSubmit} noValidate>
            <h2>CONTACT LIST</h2>
            <TextField
                id="name"
                name="name" // Bom para acessibilidade e forms
                label="Nome" // A label flutuante do MUI
                variant="outlined" // Estilo do campo (outlined, filled, standard)
                fullWidth // Ocupa toda a largura disponível
                margin="normal" // Adiciona uma margem padrão (normal ou dense)
                value={name}
                onChange={handleInputChange(setName, 'name')}
                autoComplete="name"
                error={!!errors.name} // !! converte a string de erro para booleano (true se existe erro)
                helperText={errors.name || ''} // Mostra a mensagem de erro abaixo do campo

                sx={{
                    // Estilo para o estado normal do input
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                    },
                    '& .MuiInputBase-input': { 
                        color: 'black',
                        fontWeight: '500',
                    },
                    // === ESTILOS PARA AUTOFILL (WEBKIT) ===
                    '& .MuiInputBase-input:-webkit-autofill, & .MuiInputBase-input:-webkit-autofill:hover, & .MuiInputBase-input:-webkit-autofill:focus, & .MuiInputBase-input:-webkit-autofill:active': {
                        WebkitTextFillColor: 'black !important',
                        caretColor: 'black !important',
                        WebkitBoxShadow: '0 0 0px 1000px white inset !important',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                }}
            />

            <TextField
                id="phone"
                name="phone"
                label="Telefone"
                variant="outlined"
                fullWidth
                margin="normal"
                type="tel" // Define o tipo de input
                value={phone}
                onChange={handleInputChange(setPhone, 'phone')}
                autoComplete="tel"
                error={!!errors.phone}
                helperText={errors.phone || ''}
                sx={{
                    // Estilo para o estado normal do input
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                    },
                    '& .MuiInputBase-input': { // Texto digitado normalmente
                        color: 'black',
                        fontWeight: '500',
                    },
                    // === ESTILOS PARA AUTOFILL (WEBKIT) ===
                    '& .MuiInputBase-input:-webkit-autofill, & .MuiInputBase-input:-webkit-autofill:hover, & .MuiInputBase-input:-webkit-autofill:focus, & .MuiInputBase-input:-webkit-autofill:active': {
                        WebkitTextFillColor: 'black !important',
                        caretColor: 'black !important',
                        WebkitBoxShadow: '0 0 0px 1000px white inset !important',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                }}

            />

            <TextField
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                type="email"
                value={email}
                onChange={handleInputChange(setEmail, 'email')}
                autoComplete="email"
                error={!!errors.email}
                helperText={errors.email || ''}
                sx={{
                    // Estilo para o estado normal do input
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                    },
                    '& .MuiInputBase-input': { // Texto digitado normalmente
                        color: 'black',
                        fontWeight: '500',
                    },
                    // === ESTILOS PARA AUTOFILL (WEBKIT) ===
                    '& .MuiInputBase-input:-webkit-autofill, & .MuiInputBase-input:-webkit-autofill:hover, & .MuiInputBase-input:-webkit-autofill:focus, & .MuiInputBase-input:-webkit-autofill:active': {
                        WebkitTextFillColor: 'black !important',
                        caretColor: 'black !important',
                        WebkitBoxShadow: '0 0 0px 1000px white inset !important',
                        transition: 'background-color 5000s ease-in-out 0s',
                    },
                }}
            />
            <Button type="submit" variant="contained"
                sx={{
                    mt: 2,
                    mb: 2,
                    backgroundColor: 'black',
                    color: 'white',
                    '&:hover': { backgroundColor: '#333', },
                }}
            >Save Contact</Button>
        </form>
    );
}

export default ContactForm;