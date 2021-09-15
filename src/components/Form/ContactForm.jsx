import { useState } from "react";
import s from "./ContactForm.module.scss";

export default function ContactForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const handlerContactAdd = (e) => {
    switch (e.target.name) {
      case "name":
        setName(e.target.value);
        break;
      case "number":
        setNumber(e.target.value);
        break;
      default:
    }
  };
  const handlerSubmitFormClick = (e) => {
    if (name !== "" && number !== "") {
      e.preventDefault();
      onSubmit(name, number);
      setName("");
      setNumber("");
    }
  };
  const handlerSubmitFormEnter = (e) => {
    if (e.key === "Enter" && name !== "" && number !== "") {
      e.preventDefault();
      onSubmit(name, number);
      setName("");
      setNumber("");
    }
  };

  return (
    <form
      className={s.form}
      onSubmit={handlerSubmitFormClick}
      onKeyPress={handlerSubmitFormEnter}
    >
      <label className={s.label}>
        Name
        <input
          className={s.input}
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
          required
          value={name}
          onChange={handlerContactAdd}
        />
      </label>
      <label className={s.label}>
        Number
        <input
          className={s.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
          required
          value={number}
          onChange={handlerContactAdd}
        />
      </label>
      <button className={s.button} type="submit">
        Add Contact
      </button>
    </form>
  );
}
