import { Link } from "react-router-dom";
import { AddContactForm } from "../components/AddContactForm.jsx";

export const AddContact = () => {

    let user = localStorage.getItem("usuario");                         //traemos el nombre del usuario desde localStorage...

    return (
        <div className="container w-75 text-center mt-5">
            <h1>Añade un contacto a la agenda de {user}</h1>            {/*... para mostrarlo aquí y que veamos a qué usuario añadiremos el contacto */}

            <AddContactForm />
            <Link to="/" onClick={() => localStorage.setItem("fromForm", "true")}>Volver a inicio</Link>
        </div>                                                          //↑↑↑ en enlace para volver a incio declaramos una propiedad en localStorage...
    );                                                                  //... para que Home pueda leerla y devolver el usuario en el que ya estábamos
}; 