import { useEffect, useState } from "react";
import { Cards } from "../components/Cards.jsx";
import { Link } from "react-router-dom";


export const Home = () => {
	const [contactList, setContactList] = useState([])
	const [usuario, setUsuario] = useState("")
	const [usuarioAnterior, setUsuarioAnterior] = useState("")
	const [render, setRender] = useState("")

	function getContactList() {
		fetch('https://playground.4geeks.com/contact/agendas/' + usuario + '/contacts', { method: "GET" }) //busca info en la url
			.then((response) => {
				if (response.status === 404) {
					if (confirm("El usuario " + usuario + " no extiste. ¿Quieres crearlo?")) {
						createUser()
					} else {
						setUsuario(usuarioAnterior)
					}
				}
				return response.json()

			}) 			// promete que si llega la info la guardo en un formato, en este caso json (no es una extensión, es formato de datos) para poder interpretarla y crear una clase
			.then((data) => Array.isArray(data.contacts) ? setContactList(data.contacts) : console.log("No hay usuario"))  	//promete que si se formatea bien lo guarda en un espacio, en este caso data, y lo procesa, en ese caso, hace un console.log
			.catch() 			//si algo sale mal, avisa
	}
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

	function changeUser(event) {
		if (event.key === "Enter") {
			setUsuarioAnterior(usuario)
			setUsuario(event.target.value === "" ? usuario : event.target.value.toLowerCase())
			event.target.value = ""
		}
	}

	function deleteUser(user) {
		fetch('https://playground.4geeks.com/contact/agendas/' + user, { method: "DELETE" })
			.then((response) => {
				if (confirm("¿Quieres borrar el usuario " + usuario + "?")) {
					if (response.status === 204) {
						setUsuario(usuarioAnterior)
					}
				}

			})
			.then()
			.catch()

	}

	useEffect(() => {
		//código que queremos que se ejecute al cargar el componente
		if (usuario != "") {
			getContactList()
		}
	}, [usuario])

	useEffect(() => {
		//código que queremos que se ejecute al cargar el componente
		if (contactList != []) {
			setRender(
				<div className="container text-end mt-5 w-75">
					<Cards usuario={usuario} contactList={contactList} getContactList={() => getContactList()} />
				</div>
			)
		}
	}, [contactList])

	return (
		<div className="container text-center mt-5 w-75">
			<input type="text" className="shadow-lg rounded p-2 my-3 mx-auto" placeholder="Usuario" onKeyDown={changeUser} />
			<h1 className="mb-3">{usuario === "" ? "Escriba el usuario de la agenda" : "Lista de contactos de " + usuario + ":"}</h1>
			<Link to="/add-contact" className={usuario === "" ? "btn btn-info me-0 align-self-end hide" : "btn btn-info me-0 align-self-end"}>Añadir Contacto</Link>  {/* Basta con poner una clase de botón en la etiqueta link, no hace falta añadir etiqueta botón */}

			{render}
			<button className={usuario === "" ? "btn btn-danger me-0 hide align-self-end" : "btn btn-danger me-0 align-self-end"} onClick={() => deleteUser(usuario)}>Eliminar usuario</button>

		</div>
	);
}; 