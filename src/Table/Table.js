import React, { Component } from 'react';
import './Table.css';
import HeaderItem from './HeaderItem';

class Table extends Component {
    componentDidMount = () => {
        //this.handleSortData(this.state.contacts, "firstName")
    }

    handleDeleteContact = (contactId) => {
        console.log(contactId);
    }

    changeSortSettings = (sortField) => {
        this.setState({
            sortField,
            sortDirectionAsc: ( sortField === this.state.sortField ) ? false : true
        });
    }

    handleSortData = (data, sortField) => {
        let sortedData = [...data];
        let sortDirectionAsc = ( this.state.sortField === sortField ) 
            ? ( this.state.sortDirectionAsc === null ) 
                ? true
                : !this.state.sortDirectionAsc
            : true;

        sortedData.sort( (a,b) => {
            switch(sortField) {
                case "firstName":
                case "lastName":
                case "phone":
                    return sortDirectionAsc
                        ? a[sortField].localeCompare(b[sortField])
                        : b[sortField].localeCompare(a[sortField]);
                case "age":
                    return sortDirectionAsc
                        ? a[sortField] - b[sortField] 
                        : b[sortField] - a[sortField];
                case "gender":
                    return sortDirectionAsc
                        ? ( a[sortField] == b[sortField] ? 0 : a[sortField] ? -1 : 1 )
                        : a[sortField] == b[sortField] ? 0 : a[sortField] ? 1 : -1;
            }
            
        });
        
        this.setState( {
            contacts: sortedData,
            sortField,
            sortDirectionAsc
        } )
    }

    computeSortClasses = (sortField) => {
        if(sortField === this.state.sortField) {
            switch(this.state.sortDirectionAsc) {
                case true:
                    return "fa fa-sort-down";
                case false:
                    return "fa fa-sort-up";
                default:
                    return "";
            }
        } else {
            return "";
        }        
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
                        <td className="DeleteRecord">
                            
                            <i className="fa fa-trash"></i> delete
                            {/* <button onClick={ contactId => this.handleDeleteContact(contact.id) }>delete</button> */}
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div className="Table col-sm-10 col-md-10"> 
                <table className="table table-bordered table-sm table-responsive ">
                <thead>
                    <tr>
                        <HeaderItem 
                            label="First Name"
                            sortData={ (data, sortField) => this.handleSortData(this.state.contacts, "firstName") }
                            classes = { this.computeSortClasses("firstName") }
                        />
                        <HeaderItem 
                            label="Last Name"
                            sortData={ (data, sortField) => this.handleSortData(this.state.contacts, "lastName") }
                            classes = { this.computeSortClasses("lastName") }
                        />
                        <HeaderItem 
                            label="Phone"
                            sortData={ (data, sortField) => this.handleSortData(this.state.contacts, "phone") }
                            classes = { this.computeSortClasses("phone") }
                        />
                        <HeaderItem 
                            label="Age"
                            sortData={ (data, sortField) => this.handleSortData(this.state.contacts, "age") }
                            classes = { this.computeSortClasses("age") }
                        />
                        <HeaderItem 
                            label="Gender"
                            sortData={ (data, sortField) => this.handleSortData(this.state.contacts, "gender") }
                            classes = { this.computeSortClasses("gender") }
                        />
                        {/* <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "firstName") }>First Name <i className={ this.computeSortClasses("firstName") }></i></th>
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "lastName") }>Last Name <i className={ this.computeSortClasses("lastName") }></i></th>
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "phone") }>Phone <i className={ this.computeSortClasses("phone") }></i></th>
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "age") }>Age <i className={ this.computeSortClasses("age") }></i></th>
                        <th onClick={ (data, sortField) => this.handleSortData(this.state.contacts, "gender") }>Gender <i className={ this.computeSortClasses("gender") }></i></th> */}
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
        sortField: null,
        sortDirectionAsc: null
    }
}

export default Table;