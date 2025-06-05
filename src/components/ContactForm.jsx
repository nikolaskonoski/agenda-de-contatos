import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

function ContactForm({
  onAddContact,
  editingContact,
  onUpdateContact,
  onCancelEdit,
}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingContact) {
      setName(editingContact.name || "");
      setPhone(editingContact.phone || "");
      setEmail(editingContact.email || "");
      setBirthday(editingContact.birthday || "");
      setErrors({});
    } else {
      setName("");
      setPhone("");
      setEmail("");
      setBirthday("");
      setErrors({});
    }
  }, [editingContact]);

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone is required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email.trim() && !emailRegex.test(email)) {
      newErrors.email = " The email format is invalid.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const contactDetails = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      birthday: birthday,
    };

    if (editingContact) {
      onUpdateContact(editingContact.id, contactDetails);
    } else {
      onAddContact(contactDetails);
    }
  };

  const handleInputChange = (setter, fieldName) => (e) => {
    setter(e.target.value);

    if (errors[fieldName]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

  const commonTextFieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
    },
    "& .MuiInputBase-input": {
      color: "black",
      fontWeight: "500",
      boxSizing: "border-box",
      fontFamily: "inherit",
    },
    "& .MuiInputBase-input:-webkit-autofill, & .MuiInputBase-input:-webkit-autofill:hover, & .MuiInputBase-input:-webkit-autofill:focus, & .MuiInputBase-input:-webkit-autofill:active":
      {
        WebkitTextFillColor: "black !important",
        caretColor: "black !important",
        WebkitBoxShadow: "0 0 0px 1000px white inset !important",
        transition: "background-color 5000s ease-in-out 0s",
        fontFamily: "inherit !important",
        fontWeight: "500 !important",
        padding: "16.5px 14px !important",
        height: "1.4375em !important",
        lineHeight: "1.4375em !important",
        boxSizing: "border-box !important",
      },
  };

  const birthdayTextFieldSx = {
    "& .MuiOutlinedInput-root": {
      backgroundColor: "white",
    },
    "& .MuiInputBase-input": {
      appearance: "none",
      WebkitAppearance: "none",
      MozAppearance: "textfield",
      color: "black",
      fontWeight: "500",
      boxSizing: "border-box",
      fontFamily: "inherit",
      padding: "26.5px 14px",
      height: "1.4375em",
      lineHeight: "1.4375em",
    },
    "& .MuiInputBase-input:-webkit-autofill, & .MuiInputBase-input:-webkit-autofill:hover, & .MuiInputBase-input:-webkit-autofill:focus, & .MuiInputBase-input:-webkit-autofill:active":
      {
        WebkitTextFillColor: "black !important",
        caretColor: "black !important",
        WebkitBoxShadow: "0 0 0px 1000px white inset !important",
        transition: "background-color 5000s ease-in-out 0s",
        fontFamily: "inherit !important",
        fontWeight: "500 !important",
        padding: "26.5px 14px !important",
        height: "1.4375em !important",
        lineHeight: "1.4375em !important",
        boxSizing: "border-box !important",
        appearance: "none",
        WebkitAppearance: "none",
        MozAppearance: "textfield",
      },
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>{editingContact ? "Edit Contact" : "CONTACT LIST"}</h2>
      <TextField
        id="name"
        name="name"
        label="Name"
        variant="outlined"
        fullWidth
        margin="normal"
        value={name}
        onChange={handleInputChange(setName, "name")}
        autoComplete="name"
        error={!!errors.name}
        helperText={errors.name || ""}
      />

      <TextField
        id="phone"
        name="phone"
        label="Phone"
        variant="outlined"
        fullWidth
        margin="normal"
        type="tel"
        value={phone}
        onChange={handleInputChange(setPhone, "phone")}
        autoComplete="tel"
        error={!!errors.phone}
        helperText={errors.phone || ""}
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
        onChange={handleInputChange(setEmail, "email")}
        autoComplete="email"
        error={!!errors.email}
        helperText={errors.email || ""}
      />

      <TextField
        id="birthday"
        name="birthday"
        label="Date of birth"
        type="date"
        fullWidth
        margin="normal"
        variant="outlined"
        value={birthday}
        onChange={(e) => {
          setBirthday(e.target.value);
          if (errors.birthday) {
            setErrors((prev) => ({ ...prev, birthday: undefined }));
          }
        }}
        error={!!errors.birthday}
        helperText={errors.birthday || ""}
        InputLabelProps={{
          shrink: true,
        }}
        sx={birthdayTextFieldSx}
      />
      <Box
        sx={{ mt: 2, mb: 2, display: "flex", gap: 1, justifyContent: "center" }}
      >
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "black",
            color: "white",
            "&:hover": { backgroundColor: "#333" },
          }}
        >
          {editingContact ? "Update Contact" : "Save Contact"}
        </Button>
        {editingContact && (
          <Button
            variant="outlined"
            onClick={onCancelEdit}
            sx={{
              backgroundColor: "black",
              color: "white",
              "&:hover": { backgroundColor: "#333" },
            }}
          >
            Cancel Edit
          </Button>
        )}
      </Box>
    </form>
  );
}

export default ContactForm;
