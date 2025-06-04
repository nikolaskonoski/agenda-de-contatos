import React from "react";
import Box from '@mui/material/Box';
import TextField from "@mui/material/TextField";

function SearchFilter({ searchTerm, onSearchChange }) {
    return (
        <Box sx={{ width: '100%', mb: 2 }}> {/* mb: 2 para margin-bottom */}
            <TextField
                id="search"
                label="Search Contact" // A label do MUI
                variant="outlined" // Mesmo estilo dos outros campos
                fullWidth // Ocupa toda a largura do Box pai
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Digite para buscar..." // Pode ser útil se a label não for suficiente
                InputProps={{ // Permite adicionar adornos, como um ícone de busca (passo futuro!)
                    type: 'search', // Define o tipo semântico, pode mostrar um 'x' para limpar em alguns navegadores
                }}
            />
        </Box>
    );
}

export default SearchFilter;