import React, { Component } from 'react';
import './Table.css';

class Table extends Component {
    componentDidMount = () => {
        //this.handleSortData(this.state.contacts, "firstName")
    }

    handleDeleteContact = (contactId) => {
        console.log(contactId);
    }

    handleSortData = (data, sortField) => {
        console.log("sortField", sortField);

        let sortedData = [...data];
        let sortDirectionAsc = this.state.sortDirection[sortField] === "asc";
        sortedData.sort( (a, b) => {
            switch(sortField) {
                case "firstName":
                case "lastName":
                case "phone":
                    return 
                    sortDirectionAsc ? 
                        b[sortField].localeCompare(a[sortField]) :
                        a[sortField].localeCompare(b[sortField]);
                    break;
                case "age":
                    return 
                        sortDirectionAsc ?
                        b[sortField] - a[sortField] :
                        a[sortField] - b[sortField];
                    break;
                case "gender":
                    return 
                        sortDirectionAsc ?
                        ( a[sortField] == b[sortField] ? 0 : a[sortField] ? -1 : 1 ) :
                        a[sortField] == b[sortField] ? 0 : a[sortField] ? 1 : -1;
                    break;
                default:
                    break;
                
            }
            return a[sortField].localeCompare(b[sortField]);
        });

        //sortedData = sortedData.reverse();
        
        this.setState({ 
            contacts: sortedData,
            sortDirection: { 
                ...this.state.sortDirection, 
                [sortField]: this.state.sortDirection[sortField] === "asc" ? "desc" : "asc"
            }
        });
    }

    render() {
        console.log(this.state);

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
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "lastName") }>Last Name <i className="fa fa-sort-up"></i></th>
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "phone") }>Phone <i className="fa fa-sort-up"></i></th>
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "age") }>Age <i className="fa fa-sort-up"></i></th>
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "gender") }>Gender <i className="fa fa-sort-up"></i></th>
                        {/* <th>Last Name</th>
                        <th>Phone</th>
                        <th>Age</th>
                        <th>Gender</th> */}
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
        ],
        sortDirection: {
            firstName: "asc",
            lastName: null,
            phone: null,
            age: null,
            gender: null
        }
    }
}

export default Table;