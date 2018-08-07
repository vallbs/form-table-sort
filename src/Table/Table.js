import React, { Component } from 'react';
import './Table.css';
import HeaderItem from './HeaderItem';

import axios from '../axios';
import { connect } from 'react-redux';
import * as contactActions from '../actions/contactActions';

class Table extends Component {
    componentDidMount = () => {
        // let contacts = null;
        // axios.get("/contacts.json")
        //     .then(response => {
        //         const data = response.data;
        //         contacts = Object.keys(data).map(key => {
        //             return {
        //                 ...data[key],
        //                 id: key
        //             }
        //         });

        //         this.setState({ contacts });
        //     })
        //     .catch(error => console.log(error));
        this.props.fetchContacts("/contacts");
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
                        ? ( a[sortField] === b[sortField] ? 0 : a[sortField] ? -1 : 1 )
                        : a[sortField] === b[sortField] ? 0 : a[sortField] ? 1 : -1;
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

    handleDeleteRecord = (recordId) => {
        // axios.delete("/contacts/" + recordId + ".json")
        //     .then(response => {
        //         let records = [...this.state.contacts];
        //         records = records.filter(record => {
        //             return record.id !== recordId;
        //         });

        //         this.setState({ contacts: records});
        //     })
        //     .catch(error => console.log(error)); 
        this.props.deleteContact(recordId);
    }

    render() {

        let contacts = <p>loading</p>
        // if(this.state.contacts) {
        if(this.props.contacts) {
            // contacts = this.state.contacts.map(contact => {
            contacts = this.props.contacts.map(contact => {
                return (
                    <tr key={ contact.id }>
                        <td>{ contact.firstName }</td>
                        <td>{ contact.lastName }</td>
                        <td>{ contact.phone }</td>
                        <td>{ contact.age }</td>
                        <td>{ "" + contact.gender }</td>
                        <td 
                            onClick={ recordId => this.handleDeleteRecord(contact.id) }
                            className="DeleteRecord">                            
                            <i className="fa fa-trash"></i> delete
                        </td>
                    </tr>
                );
            });
        }
        return (
            <div className="Table col-sm-10 col-md-10"> 
                <table className="table table-bordered table-sm table-responsive">
                <thead>
                    <tr>
                        <HeaderItem 
                            label="First Name"
                            sortData={ (data, sortField) => this.handleSortData(this.props.contacts, "firstName") }
                            classes = { this.computeSortClasses("firstName") }
                        />
                        <HeaderItem 
                            label="Last Name"
                            sortData={ (data, sortField) => this.handleSortData(this.props.contacts, "lastName") }
                            classes = { this.computeSortClasses("lastName") }
                        />
                        <HeaderItem 
                            label="Phone"
                            sortData={ (data, sortField) => this.handleSortData(this.props.contacts, "phone") }
                            classes = { this.computeSortClasses("phone") }
                        />
                        <HeaderItem 
                            label="Age"
                            sortData={ (data, sortField) => this.handleSortData(this.props.contacts, "age") }
                            classes = { this.computeSortClasses("age") }
                        />
                        <HeaderItem 
                            label="Gender"
                            sortData={ (data, sortField) => this.handleSortData(this.props.contacts, "gender") }
                            classes = { this.computeSortClasses("gender") }
                        />
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
        // contacts: [
        //     {firstName: "Dima", lastName: "Severniuk", phone: "093 277-44-62", age: 27, gender: true, id: "3"},
        //     {firstName: "Roma", lastName: "Dombrovskii", phone: "093 657-23-46", age: 26, gender: true, id: "5"},
        //     {firstName: "Julia", lastName: "Voronich", phone: "096 123-45-67", age: 25, gender: false, id: "1"},
        //     {firstName: "Kolia", lastName: "Dombrovskii", phone: "093 657-23-46", age: 26, gender: true, id: "4"},
        //     {firstName: "Ivan", lastName: "Voronich", phone: "096 123-45-67", age: 25, gender: false, id: "2"}
        // ],
        sortField: null,
        sortDirectionAsc: null
    }
}

const mapStateToProps = state => {
    return {
        contacts: state.contactReducer.contacts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchContacts: (url) => dispatch(contactActions.fetchContacts(url)),
        deleteContact: (contactId) => dispatch(contactActions.deleteContact(contactId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);