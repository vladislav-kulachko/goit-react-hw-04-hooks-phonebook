import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import s from "./App.module.scss";
import ContactForm from "./components/Form/ContactForm";
import ContactFilter from "./components/Filter/ContactFilter";
import ContactList from "./components/List/ContactList";

export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem("contacts")) ?? []
  );
  const [filter, setFilter] = useState("");

  useEffect(
    (s) =>
      contacts !== s &&
      localStorage.setItem("contacts", JSON.stringify(contacts)),
    [contacts]
  );

  const onSubmit = ( name, number ) => {
    if (contacts.find((contact) => contact.number === number)) {
      alert("Этот номер уже есть в списке");
    } else if (contacts.find((contact) => contact.name === name)) {
      alert("Это имя уже есть в списке");
    } else
      setContacts((s) => [{ id: uuidv4(), name: name, number: number }, ...s]);
  };

  const handlerFindContact = (e) => {
    setFilter(e.target.value);
  };
  const handlerDelContact = (e) => {
    setContacts((s) => s.filter((contact) => contact.id !== e.target.id));
  };

  return (
    <section className={s.container}>
      <h1 className={s.title}>Phonebook</h1>
      <ContactForm onSubmit={onSubmit}></ContactForm>
      <section className={s.contactsSection}>
        <h2 className={s.titleList}>Contacts list</h2>
        <ContactFilter
          filterValue={filter}
          handlerFindContact={handlerFindContact}
        ></ContactFilter>
        <ContactList
          filter={filter}
          contacts={contacts}
          handlerDelContact={handlerDelContact}
        ></ContactList>
      </section>
    </section>
  );
}
