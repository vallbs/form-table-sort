import React, { Component } from 'react';

import ErrorControl from './ErrorControl';

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
            //console.log(currentValue, fieldsValid[currentValue]);
            return accum && fieldsValid[currentValue];
        }, true);

        console.log(formIsValid);

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
                    <div className={ this.formValidationClass(this.state.fieldsValid.firstNameValid, "form-group row") } >
                        <label htmlFor="firstName" className="col-form-label col-2 col-sm-2">First Name: </label>
                        <div className="col-sm-4">
                            <input 
                                type="text" 
                                className="form-control col-5 col-sm-5" 
                                name="firstName"
                                value={ this.state.firstName }
                                onChange={ e => this.handleInputChange(e)} />
                        </div>                        
                        <ErrorControl errorMessage={this.state.formErrors.firstNameError} />
                    </div>
                    <div className={ this.formValidationClass(this.state.fieldsValid.lastNameValid, "form-group row") }>
                        <label htmlFor="lastName" className="col-form-label col-2 col-sm-2">Last Name: </label>
                        <div className="col-sm-4">
                            <input 
                                type="text" 
                                className="form-control col-5 col-sm-5" 
                                name="lastName"
                                value={ this.state.lastName }
                                onChange={ e => this.handleInputChange(e)} />
                        </div>
                        <ErrorControl errorMessage={this.state.formErrors.lastNameError} />
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={ !this.state.formIsValid } >Create Person</button>
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