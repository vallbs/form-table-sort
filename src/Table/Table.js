import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
    handleDeleteContact = (contactId) => {
        console.log(contactId);
    }

    handleSortData = (data, sortField) => {
        console.log("data", data);

        let sortedData = [...data];
        sortedData.sort( (a, b) => {
            return a.firstName.localeCompare(b.firstName);
        });

        //console.log("sortedData", sortedData);
        this.setState({ contacts: sortedData });
    }

    render() {
        let contacts = <p>loading</p>
        if(this.state.contacts) {
            contacts = this.state.contacts.map(contact => {
                return (
                    <tr key={ contact.id }>
                        <td>{ contact.firstName }</td>
                        <td>{ contact.lastName }</td>
                        <td>{ contact.phone }</td>
                        <td>{ contact.age }</td>
                        <td>{ "" + contact.gender }</td>
                        <th >
                            <i className="fa fa-trash"></i>
                            {/* <button onClick={ contactId => this.handleDeleteContact(contact.id) }>delete</button> */}
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
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "firstName") }>First Name <i className="fa fa-sort-up"></i></th>
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
            {firstName: "Dima", lastName: "Severniuk", phone: "093 277-44-62", age: 27, gender: true, id: "3"},
            {firstName: "Roma", lastName: "Dombrovskii", phone: "093 657-23-46", age: 26, gender: true, id: "5"},
            {firstName: "Julia", lastName: "Voronich", phone: "096 123-45-67", age: 25, gender: false, id: "1"},
            {firstName: "Kolia", lastName: "Dombrovskii", phone: "093 657-23-46", age: 26, gender: true, id: "4"},
            {firstName: "Ivan", lastName: "Voronich", phone: "096 123-45-67", age: 25, gender: false, id: "2"}
        ]
    }
}

export default Table;