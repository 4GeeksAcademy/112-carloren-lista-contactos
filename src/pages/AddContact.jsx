import { Link } from "react-router-dom";
import { AddContactForm } from "../components/AddContactForm.jsx";

export const AddContact = () => {

    let user = localStorage.getItem("usuario");

    return (
        <div className="container w-75 text-center mt-5">
            <h1>Añade un contacto a la agenda de {user}</h1>

            <AddContactForm />
            <Link to="/" onClick={() => localStorage.setItem("fromForm", "true")}>Volver a inicio</Link>

        </div>
    );
}; 