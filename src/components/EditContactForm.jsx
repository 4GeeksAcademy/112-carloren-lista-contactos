import { useState } from "react";

export const EditContactForm = ({ user, contact, getContactList, handleClose }) => {

    const [name, setName] = useState(contact.name)                      //
    const [phone, setPhone] = useState(contact.phone)                   //guardamos en variables las propiedades del objeto contacto...
    const [email, setEmail] = useState(contact.email)                   //...para poder mostrarlas en el formulario
    const [address, setAddress] = useState(contact.address)             //

    
    //-------------------EDITAR CONTACTO--------------------

    async function editContactFromList(event) {
        event.preventDefault();
        try {
            let response = await fetch('https://playground.4geeks.com/contact/agendas/' + user + '/contacts/' + contact.id, {
                method: "PUT",
                body: JSON.stringify({
                    "name": name,
                    "phone": phone,
                    "email": email,
                    "address": address
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            if (response.ok) {
                getContactList()
                handleClose()

            }

            return response.json()

        } catch { }
    }

    return (                                                            //en cada input mostramos el valor que tenía el contacto a través de las variables para facilitar la edición
        <div className="text-center m-0 container-flex d-flex flex-column">
            <form className="w-100 p-4 mx-auto d-flex flex-column text-start" onSubmit={editContactFromList}>
                <div className="mb-3 ">
                    <label htmlFor="fullName" className="form-label">Nombre Completo:</label>
                    <input type="text" className="form-control" id="fullName" placeholder="Nombre y apellidos" value={name} onChange={(event) => setName(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Dirección postal:</label>
                    <input type="text" className="form-control" id="address" placeholder="Calle, número, piso, puerta y CP" value={address} onChange={(event) => setAddress(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Teléfono:</label>
                    <input type="text" className="form-control" id="phone" placeholder="Fijo o Móvil" value={phone} onChange={(event) => setPhone(event.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Correo electrónico:</label>
                    <input type="email" className="form-control" id="email" placeholder="correo@example.com" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
                <div className="d-flex">
                    <button type="submit" className="btn btn-info align-self-center mx-auto">Confirmar</button>
                    <button className="btn btn-danger align-self-center mx-auto" onClick={handleClose}>Cancelar</button>
                </div>
            </form>
        </div>
    );
}; 