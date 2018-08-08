import React, { Component } from 'react';
import './Table.css';
import HeaderItem from './HeaderItem';

import axios from '../axios';
import { connect } from 'react-redux';
import * as contactActions from '../actions/contactActions';

class Table extends Component {
    componentDidMount = () => {
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
        this.props.sortContacts(data, sortField);
    }

    computeSortClasses = (sortField) => {
        if(sortField === this.props.sortField) {
            switch(this.props.sortDirectionAsc) {
                case true:
                    // return "fa fa-sort-down";
                    return "fa fa-arrow-down";
                case false:
                    return "fa fa-arrow-up";
                default:
                    return "";
            }
        } else {
            return "";
        }        
    }

    handleDeleteRecord = (recordId) => {
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

    // state = {
    //     sortField: null,
    //     sortDirectionAsc: null
    // }
}

const mapStateToProps = state => {
    return {
        contacts: state.contactReducer.contacts,
        sortField: state.contactReducer.sortField,
        sortDirectionAsc: state.contactReducer.sortDirectionAsc
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchContacts: (url) => dispatch(contactActions.fetchContacts(url)),
        deleteContact: (contactId) => dispatch(contactActions.deleteContact(contactId)),
        sortContacts: (contacts, sortField) => dispatch(contactActions.sortContactsData(contacts, sortField))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Table);