import { Link } from "react-router-dom";
import { AddContact } from "../pages/AddContact";


export const AddContactForm = ({ user, getContactList, handleClose }) => {

    function addContactToList(event) {
        event.preventDefault();
        // console.log(event.target.fullName.value);
        fetch('https://playground.4geeks.com/contact/agendas/' + user + '/contacts', {
            method: "POST",
            body: JSON.stringify({
                "name": event.target.fullName.value,
                "phone": event.target.phone.value,
                "email": event.target.email.value,
                "address": event.target.address.value
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => {
                if (response.status === 201) {
                    getContactList()
                }

                return response.json()
            })
            .then()
            .catch()
        handleClose()
    }

    return (
        <div className="text-center m-0 container-flex d-flex flex-column">
            <form className="w-100 p-4 mx-auto d-flex flex-column text-start" onSubmit={addContactToList}>
                <div className="mb-3 ">
                    <label htmlFor="fullName" className="form-label">Nombre Completo:</label>
                    <input type="text" className="form-control" id="fullName" placeholder="Nombre y apellidos" />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección postal:</label>
                    <input type="text" className="form-control" id="address" placeholder="Calle, número, piso, puerta y CP" />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono:</label>
                    <input type="text" className="form-control" id="phone" placeholder="Fijo o Móvil" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico:</label>
                    <input type="email" className="form-control" id="email" placeholder="correo@example.com" />
                </div>
                <button type="submit" className="btn btn-primary align-self-center mx-auto">Enviar</button>
            </form>
        </div>
    );
}; 