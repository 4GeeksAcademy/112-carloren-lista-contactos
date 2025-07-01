export const Cards = ({ usuario, contactList, getContactList }) => {

    function deleteContact(id) {
        fetch('https://playground.4geeks.com/contact/agendas/' + usuario + '/contacts/' + id, { method: "DELETE" })
            .then((response) => {
                if (response.status === 204) {
                    getContactList()
                }
            })
            .then()
            .catch()

    }

    return (
        <div className="d-flex flex-column text-center">
            {contactList.map((item, index) => (
                <div key={index} className="card my-2" >
                    < div className="d-flex" >
                        <img style={{ maxHeight: "200px" }} src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" className="img-fluid rounded-circle m-2 " alt="..." />
                        <div className="card-body text-start">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text"><i className="fa-solid fa-location-dot"></i>&nbsp;&nbsp;&nbsp;{item.address}</p>
                            <p className="card-text"><i className="fa-solid fa-phone"></i>&nbsp;&nbsp;&nbsp;{item.phone}</p>
                            <p className="card-text"><i className="fa-solid fa-envelope"></i>&nbsp;&nbsp;&nbsp;{item.email}</p>
                        </div>
                        <div className="card-body text-end">
                            <p><i className="crossButton btn fa-solid fa-pencil"></i></p>
                            <p><i className="crossButton btn fa-solid fa-trash" onClick={() => deleteContact(item.id)}></i></p>
                        </div>
                    </div >
                </div >
            ))
            }
        </div >
    );
};