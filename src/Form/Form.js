import React, { Component } from 'react';

import ErrorControl from './ErrorControl';
import FormControl from './FormControl';

class Form extends Component {
    handleInputChange = e => {
        this.validateField(e.target.name, e.target.value);
        this.setState({ [e.target.name]: e.target.value });
    }

    validateField = (fieldName, fieldValue) => {
        let formErrors = this.state.formErrors;
        let fieldsValid = this.state.fieldsValid;
        let firstNameValid = this.state.firstNameValid;
        let lastNameValid = this.state.lastNameValid;

        switch(fieldName) {
            case "firstName":
                fieldsValid.firstNameValid = fieldValue.length >= 3 && fieldValue.length <= 20;
                formErrors.firstNameError = fieldsValid.firstNameValid ? "" : "First Name must be 3-20 characters long";
                break;
            case "lastName":
                fieldsValid.lastNameValid = fieldValue.length >= 5 && fieldValue.length < 20;
                formErrors.lastNameError = fieldsValid.lastNameValid ? "" : "Last Name must be 5-20 characters long";
                break;
            default:
                break;
        }

        const formIsValid = Object.keys(fieldsValid).reduce( (accum, currentValue) => {
            return accum && fieldsValid[currentValue];
        }, true);

        this.setState({
            fieldsValid,            
            formErrors,
            formIsValid
        });
    }

    formValidationClass = (validationIndicator, initialClassName) => {
        const validationClassName = ( validationIndicator ) ? "has-success" : "has-warning";
        const finalClassName = initialClassName + " " + validationClassName;
        return finalClassName;
    }

    render() {
        return (
            <div className="container">
                <form className="personForm">
                    <FormControl 
                        validationClassName={ this.formValidationClass(this.state.fieldsValid.firstNameValid, "form-group row") }
                        fieldName="firstName"
                        label="First Name"
                        inputType="text"
                        fieldValue={ this.state.firstName }
                        fieldChanged={ e => this.handleInputChange(e)} 
                        errorMessage={ this.state.formErrors.firstNameError }/>
                    
                    <FormControl 
                        validationClassName={ this.formValidationClass(this.state.fieldsValid.lastNameValid, "form-group row") }
                        fieldName="lastName"
                        label="Last Name"
                        inputType="text"
                        fieldValue={ this.state.lastName }
                        fieldChanged={ e => this.handleInputChange(e)} 
                        errorMessage={ this.state.formErrors.lastNameError }/>

                    <button type="submit" className="btn btn-primary" disabled={ !this.state.formIsValid } >
                        Create Person
                    </button>
                </form>
            </div>
        );
    }

    state = {
        firstName: "",
        lastName: "",
        gender: "",
        age: 0,
        fieldsValid: { firstNameValid: false, lastNameValid: false },
        formErrors: { firstNameError: "", lastNameError: ""},
        formIsValid: false
    }
}

export default Form;