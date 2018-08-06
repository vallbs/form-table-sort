import React, { Component } from 'react';

class Form extends Component {
    handleInputChange = e => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div className="container">
                <form className="personForm">
                    <div className="form-group row">
                        <label htmlFor="firstName" className="col-form-label col-2 col-sm-2">First Name: </label>
                        <div className="col-sm-4">
                            <input 
                                type="text" 
                                className="form-control col-5 col-sm-5" 
                                name="firstName"
                                value={ this.state.firstName }
                                onChange={ e => this.handleInputChange(e)} />
                        </div>
                        <div className="col-5 col-sm-5">
                        <small id="passwordHelpInline" className="text-muted">
                            Must be 8-20 characters long.
                        </small>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label htmlFor="lastName" className="col-form-label col-2 col-sm-2">Last Name: </label>
                        <div className="col-sm-4">
                            <input 
                                type="text" 
                                className="form-control col-5 col-sm-5" 
                                name="lastName"
                                value={ this.state.lastName }
                                onChange={ e => this.handleInputChange(e)} />
                        </div>
                        <div className="col-5 col-sm-5">
                        <small id="passwordHelpInline" className="text-muted">
                            Must be 8-20 characters long.
                        </small>
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary">Create Person</button>
                </form>
            </div>
        );
    }

    state = {
        firstName: "",
        lastName: "",
        gender: "",
        age: 0
    }
}

export default Form;