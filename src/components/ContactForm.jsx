import React, { useState } from "react";

function ContactForm() {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (event) => {
        event.preventDefautl();
        console.log({ name, phone, email });

        setName('');
        setPhone('');
        setEmail('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add yours Contacts</h2>
            <div>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" placeholder="Enter name:" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <label htmlFor="phone">Phone:</label>
                <input type="tel" id="phone" placeholder="Enter phone:" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div>
                <label htmlFor="email">Phone:</label>
                <input type="email" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <button type="submit">Save Contact</button>
            </div>
        </form>
    );
}

export default ContactForm;