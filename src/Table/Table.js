import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
    handleDeleteContact = (contactId) => {
        console.log(contactId);
    }

    render() {
        let contacts = <p>loading</p>
        if(this.state.contacts) {
            contacts = this.state.contacts.map(contact => {
                return (
                    <tr key={ contact.phone }>
                        <td>{ contact.firstName }</td>
                        <td>{ contact.lastName }</td>
                        <td>{ contact.phone }</td>
                        <td>{ contact.age }</td>
                        <td>{ "" + contact.gender }</td>
                        <th >
                            <button onClick={ contactId => this.handleDeleteContact(contact.id) }>delete</button>
                        </th>
                    </tr>
                );
            });
        }
        return (
            <div className="Table col-sm-10 col-md-10"> 
                <table className="table table-bordered table-hover table-sm table-responsive ">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Gender</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    { contacts }
                </tbody>
                </table>
            </div>
        );
    }

    state = {
        contacts: [
            {firstName: "Dima", lastName: "Severniuk", phone: "093 277-44-62", age: 27, gender: true, id: "1"},
            {firstName: "Roma", lastName: "Dombrovskii", phone: "093 657-23-46", age: 26, gender: true, id: "2"},
            {firstName: "Julia", lastName: "Voronich", phone: "096 123-45-67", age: 25, gender: false, id: "3"}
        ]
    }
}

export default Table;