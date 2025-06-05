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
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const RenderCardRow = ({ label, value }) => {
  if (value === null || value === undefined || value === "") return null;
  return (
    <Box sx={{ display: "flex", mb: 0.5, alignItems: "flex-start" }}>
      <Typography
        variant="subtitle2"
        sx={{
          fontWeight: "bold",
          width: "100px",
          minWidth: "100px",
          mr: 1,
          flexShrink: 0,
        }}
      >
        {label}:
      </Typography>
      <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
        {value}
      </Typography>
    </Box>
  );
};

function ContactList({ contacts, onDeleteContact, onStartEdit }) {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box className="contact-list-container" sx={{ width: "100%", mt: 2 }}>
      <Typography ></Typography>

      {contacts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          No contacts added yet.
        </Typography>
      ) : isSmallScreen ? (
        // 3. RENDERIZAÇÃO PARA TELAS PEQUENAS (MODO CARD)
        <Box>
          {contacts.map((contact) => (
            <Paper key={contact.id} sx={{ p: 2, mb: 2 }} elevation={2}>
              <RenderCardRow label="Name" value={contact.name} />
              <RenderCardRow label="Phone" value={contact.phone} />
              <RenderCardRow label="Email" value={contact.email} />
              <RenderCardRow
                label="Birthday"
                value={
                  contact.birthday
                    ? new Date(
                        contact.birthday + "T00:00:00"
                      ).toLocaleDateString("pt-BR")
                    : "N/A"
                }
              />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 1,
                  pt: 1,
                  borderTop: "1px solid #eee",
                }}
              >
                <IconButton
                  aria-label="edit contact"
                  size="small"
                  onClick={() => onStartEdit(contact)}
                  sx={{ mr: 0.5 }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  aria-label="delete contact"
                  size="small"
                  color="error"
                  onClick={() => onDeleteContact(contact.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        // 4. RENDERIZAÇÃO PARA TELAS GRANDES (MODO TABELA - código existente)
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
                      sx={{ mr: 0.5 }}
                    >
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton
                      aria-label="delete contact"
                      size="small"
                      color="error"
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
