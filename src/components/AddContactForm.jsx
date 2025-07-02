import { useState } from "react";

export const AddContactForm = () => {

    const [name, setName] = useState("")                                //
    const [phone, setPhone] = useState("")                              //variables necesarias para el tratamiento de datos del formulario
    const [email, setEmail] = useState("")                              //
    const [address, setAddress] = useState("")                          //

    const [respuesta, setRespuesta] = useState("")                      // servirá para mostrar un mensaje al completar la adición


    //-------------------AÑADIR CONTACTO--------------------

    function addContactToList(event) {
        event.preventDefault();
        let user = localStorage.getItem("usuario");

        fetch('https://playground.4geeks.com/contact/agendas/' + user + '/contacts', {
            method: "POST",
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
            .then((response) => {
                if (response.status === 201) {
                    setRespuesta(
                        <p>El contacto ha sido añadido correctamente a {user}</p>   //mostramos el mensaje satisfactorio
                    )
                    setName("")                                         //
                    setAddress("")                                      //devolvemos el formulario a vacío
                    setPhone("")                                        //
                    setEmail("")                                        //
                }

                return response.json()
            })
            .then()
            .catch()
    }

    return (                                                            //en cada input guardamos el valor en sus correspondientes variables y se muestran
        <div className="text-center m-0 container-flex d-flex flex-column">
            <form className="w-100 p-4 mx-auto d-flex flex-column text-start" onSubmit={addContactToList}>
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
                <button type="submit" className="btn btn-primary align-self-center mx-auto">Enviar</button>
            </form>
            {respuesta}
        </div>
    );
}; 