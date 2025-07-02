import { useEffect, useState } from "react";
import { Cards } from "../components/Cards.jsx";
import { Link } from "react-router-dom";


export const Home = () => {
	const [contactList, setContactList] = useState([])
	const [usuario, setUsuario] = useState(localStorage.getItem("fromForm") === "true" ? (localStorage.getItem("usuario") != null ? localStorage.getItem("usuario") : "") : "")
	//El formulario de añadir pone "fromForm" y aquí se contempla ↑ para recargar el mismo usuario en el que estábamos y aquí ↑ se protege por si el usuario fuera nulo

	const [usuarioAnterior, setUsuarioAnterior] = useState("")
	const [render, setRender] = useState("")

	setTimeout(() => localStorage.removeItem("fromForm"), 1000) //se elimina "fromForm" para que al recargar empiece de verdad de cero

	
	//-------------------CARGAR LISTA DE CONTACTOS--------------------

	function getContactList() {
		fetch('https://playground.4geeks.com/contact/agendas/' + usuario + '/contacts', { method: "GET" })
			.then((response) => {
				if (response.status === 404) {
					if (confirm("El usuario " + usuario + " no extiste. ¿Quieres crearlo?")) { 	//abre una alerta si el usuario no existe pidiendo confirmación...
						createUser()															//...esto evita que se creen constantemente usuarios sin quererlo
					} else {
						setUsuario(usuarioAnterior)												//Vuelve a mostrar el usuario que había antes de escribir el nuevo
					}
				}
				return response.json()

			})
			.then((data) => Array.isArray(data.contacts) ? setContactList(data.contacts) : console.log("No hay usuario"))
			.catch()
	}


	//-------------------CREAR USUARIO--------------------

	function createUser() {
		fetch('https://playground.4geeks.com/contact/agendas/' + usuario, {
			method: "POST"
		})
			.then((response) => {
				if (response.status === 201) {
					getContactList()
				}
				return response.json()
			})
			.then()
			.catch()
	}


	//-------------------CAMBIAR USUARIO--------------------

	function changeUser(event) {
		if (event.key === "Enter") {
			setUsuarioAnterior(usuario)
			setUsuario(event.target.value === "" ? usuario : event.target.value.toLowerCase())
			event.target.value = ""
		}
	}


	//-------------------BORRAR USUARIO--------------------

	function deleteUser(user) {
		if (confirm("¿Quieres borrar el usuario " + usuario + "?")) {
			fetch('https://playground.4geeks.com/contact/agendas/' + user, { method: "DELETE" })
				.then((response) => {

					if (response.status === 204) {
						setUsuario(usuarioAnterior)
					}
				}

				)
				.then()
				.catch()
		}
	}

	useEffect(() => {								//cuando cambia el usuario, recargamos la lista y guardamos el usuario en LocalStorage para poder acceder a él desde otra página
		if (usuario != "") {
			getContactList()
			localStorage.setItem("usuario", usuario)
		}
	}, [usuario])

	useEffect(() => {								//cuando se carga una lista, se renderiza
		if (contactList != []) {
			setRender(
				<div className="container text-end w-75">
					<Cards usuario={usuario} contactList={contactList} getContactList={() => getContactList()} />
				</div>								// ↑↑ le pasamos las variables correspondientes que necesita el componente
			)
		}
	}, [contactList])

	return (
		<div className="container text-center mt-5 w-75">
			<input type="text" className="shadow-lg rounded p-2 my-3 mx-auto" placeholder="Usuario" onKeyDown={changeUser} />
			<h1 className="mb-3">{usuario === "" ? "Escriba el usuario de la agenda" : "Lista de contactos de " + usuario + ":"}</h1>
			<Link to="/add-contact" className={usuario === "" ? "btn btn-info hide my-2" : "btn btn-info my-2"}>Añadir Contacto</Link>

			{render}

			<button className={usuario === "" ? "btn btn-danger hide my-2" : "btn btn-danger my-2"} onClick={() => deleteUser(usuario)}>Eliminar usuario</button>
		</div>
	);
};
