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

function ContactList({ contacts, onDeleteContact, onStartEdit }) {
  return (
    <Box className="contact-list-container" sx={{ width: "100%", mt: 2 }}>
      <Typography
        component="h2"
        sx={{
          display: "block",
          fontSize: "1.5em",
          fontWeight: "bold",
          fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
          color: "black",
          mt: 2,
          mb: 2,
          alignSelf: "flex-start",
        }}
      >
        {" "}
        SAVED CONTACTS
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
