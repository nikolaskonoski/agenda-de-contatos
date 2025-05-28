import React, { useState } from "react";


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
            <h2>Add your Contacts</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Enter name:" value={name} onChange={handleInputChange(setName, 'name')} autoComplete="name" className={errors.name ? 'input-error' : ''} />
                {errors.name && <p className="error-message">{errors.name}</p>}
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" placeholder="Enter phone:" value={phone} onChange={handleInputChange(setPhone, 'phone')} autoComplete="tel" className={errors.phone ? 'input-error' : ''} />
                {errors.phone && <p className="error-message">{errors.phone}</p>}
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Enter email" value={email} onChange={handleInputChange(setEmail, 'email')} autoComplete="email" className={errors.email ? 'input-eror' : ''} />
                {errors.email && <p className="error-message">{errors.email}</p>}
            </div>
            <div>
                <button type="submit">Save Contact</button>
            </div>
        </form>
    );
}

export default ContactForm;