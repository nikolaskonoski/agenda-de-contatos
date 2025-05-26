import React from "react";
import Header from "./components/Header";
import './App.css';
import ContactForm from './components/ContactForm.jsx';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <ContactForm/>
      </main>
    </div>
  );
}

export default App;