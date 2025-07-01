import { AddContactForm } from "../components/AddContactForm.jsx";

export const AddContact = () => {


    return (
        <div className="text-center mt-5">
            <h1>Añade un contacto</h1>

            <AddContactForm />
            <Link to="/">Volver a inicio</Link>

        </div>
    );
}; 