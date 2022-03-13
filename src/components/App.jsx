import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';
import { useLocalStorage } from './Hooks/useLocalStorage';
import Filter from './Filter/Filter';
import s from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setfilter] = useState('');

  const contactsChange = (newName, number) => {
    const newObj = { id: nanoid(), name: newName, number: number };
    if (
      contacts.find(({ name }) => newName.toLowerCase() === name.toLowerCase())
    ) {
      return alert(`${newName} is already in contacts`);
    }
    setContacts(prevState => [...prevState, newObj]);
  };

  const filterStateChange = evt => {
    setfilter(evt.target.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const normalizedFilter = filter.toLowerCase();
  const filterContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(normalizedFilter)
  );

  return (
    <div className={s.wrapper}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm change={contactsChange} />

      <h2 className={s.title}>Contacts</h2>
      <Filter
        filter={filter}
        label="Find contacts by name"
        id={nanoid()}
        onChange={filterStateChange}
      />
      <ContactList contacts={filterContacts} onDeleteContact={deleteContact} />
    </div>
  );
};

