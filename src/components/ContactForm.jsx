import React, { useState } from "react";


function ContactForm({onAddContact}) {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!name || !phone) {
            alert("Name and phone number are required.")
            return;
        }

        const contactData = {
            name: name,
            phone: phone,
            email: email,

            id: Math.random().toString()
        };

        onAddContact(contactData);

        setName('');
        setPhone('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add your Contacts</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Enter name:" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name"/>
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" placeholder="Enter phone:" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel"/>
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email"/>
            </div>
            <div>
                <button type="submit">Save Contact</button>
            </div>
        </form>
    );
}

export default ContactForm;