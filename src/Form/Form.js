import React, { Component } from 'react';

import ErrorControl from './ErrorControl';
import FormControl from './FormControl';
import './Form.css';

class Form extends Component {
    handleInputChange = e => {
        const fieldName = e.target.name;
        const fieldValue = e.target.value;
        if(fieldName === "gender") {
            this.setState({
                gender: e.target.checked
            })
        } else {
            this.validateField(fieldName, fieldValue);
            this.setState({ [fieldName]: fieldValue });
        }
        
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
            case "age":
                fieldsValid.ageValid = fieldValue >= 18;
                formErrors.ageError = fieldsValid.ageValid ? "" : "Age must be 18+";
                break;
            case "phone":
                const phoneRegEx = /^\(?([0-9]{3})\)?[ ]?([0-9]{3})[-]?([0-9]{2})[-]?([0-9]{2})$/;
                fieldsValid.phoneValid = fieldValue.match(phoneRegEx);
                formErrors.phoneError = fieldsValid.phoneValid ? "" : "Phone format must be: XXX XXX-XX-XX";
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
            // <div className="container">
            <div className="Form">
                <form className="personForm">
                    <FormControl 
                        validationClassName={ this.formValidationClass(this.state.fieldsValid.firstNameValid, "form-group row") }
                        fieldName="firstName"
                        label="First Name"
                        inputType="text"
                        fieldValue={ this.state.firstName }
                        fieldChanged={ e => this.handleInputChange(e)} 
                        errorMessage={ this.state.formErrors.firstNameError }
                        inputPlaceholder="3-20 characters long"/>
                    
                    <FormControl 
                        validationClassName={ this.formValidationClass(this.state.fieldsValid.lastNameValid, "form-group row") }
                        fieldName="lastName"
                        label="Last Name"
                        inputType="text"
                        fieldValue={ this.state.lastName }
                        fieldChanged={ e => this.handleInputChange(e)} 
                        errorMessage={ this.state.formErrors.lastNameError }
                        inputPlaceholder="5-20 characters long"/>
                    
                    <FormControl 
                        validationClassName={ this.formValidationClass(this.state.fieldsValid.phoneValid, "form-group row") }
                        fieldName="phone"
                        label="Phone"
                        inputType="text"
                        fieldValue={ this.state.phone }
                        fieldChanged={ e => this.handleInputChange(e)} 
                        errorMessage={ this.state.formErrors.phoneError }
                        inputPlaceholder="XXX XXX-XX-XX format"/>
                    
                    <FormControl 
                        validationClassName={ this.formValidationClass(this.state.fieldsValid.ageValid, "form-group row") }
                        fieldName="age"
                        label="Age"
                        inputType="number"
                        fieldValue={ this.state.age }
                        fieldChanged={ e => this.handleInputChange(e)} 
                        errorMessage={ this.state.formErrors.ageError }/>

                    <FormControl 
                        validationClassName="form-group row"
                        fieldName="gender"
                        label="Gender"
                        inputType="checkbox"
                        fieldChanged={ e => this.handleInputChange(e)}/>

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
        phone: "",
        age: null,
        gender: false,
        age: 0,
        fieldsValid: { 
            firstNameValid: false, 
            lastNameValid: false, 
            phoneValid: false,
            ageValid: false,
            // genderValid: false
        },
        formErrors: { 
            firstNameError: "", 
            lastNameError: "", 
            phoneError: "",
            ageError: "",
            // genderError: ""
        },
        formIsValid: false
    }
}

export default Form;