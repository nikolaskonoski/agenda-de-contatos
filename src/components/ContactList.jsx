// src/components/ContactList.jsx
import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper"; // Usado para dar um estilo de "folha de papel" ao container da tabela
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// O componente agora recebe 'contacts', 'onDeleteContact', e 'onStartEdit' como props.
// 'onStartEdit' será chamada quando o botão de editar de uma linha for clicado.
function ContactList({ contacts, onDeleteContact, onStartEdit }) {
  return (
    <Box
      className="contact-list-container" // Você pode manter esta classe para estilos CSS específicos, se tiver.
      sx={{ width: "100%", mt: 2 }} // Margem no topo para dar espaço após o filtro de busca.
    >
      <Typography
        component="h2" // Renderiza semanticamente como um <h2>
        sx={{
          display: "block",
          fontSize: "1.5em", // Tamanho da fonte como um h2 padrão de navegador
          fontWeight: "bold", // Peso da fonte como um h2 padrão de navegador
          fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif", // Família da fonte conforme solicitado
          color: "black", // Cor escura para o texto (do seu index.css)
          mt: 2, // Margem no topo
          mb: 2, // Margem na base
          alignSelf: "flex-start", // Alinha o título à esquerda (considerando o Box pai em App.jsx)
        }}
      >
        {" "}
        Saved Contacts
      </Typography>
      {contacts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          No contacts added yet.
        </Typography>
      ) : (
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 700 }} aria-label="contact table">
            <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Phone</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Birthday</TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow
                  key={contact.id}
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    "&:hover": { backgroundColor: "action.hover" },
                  }}
                >
                  <TableCell component="th" scope="row">
                    {contact.name}
                  </TableCell>
                  <TableCell>{contact.phone}</TableCell>
                  <TableCell>{contact.email}</TableCell>
                  <TableCell>
                    {contact.birthday
                      ? new Date(
                          contact.birthday + "T00:00:00"
                        ).toLocaleDateString("pt-BR")
                      : "N/A"}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit contact"
                      size="small"
                      onClick={() => onStartEdit(contact)}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete contact"
                      size="small"
                      color="error" // Deixa o ícone de deletar vermelho
                      onClick={() => onDeleteContact(contact.id)}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default ContactList;
