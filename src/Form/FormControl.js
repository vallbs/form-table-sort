import React from 'react';
import ErrorControl from './ErrorControl';

const formControl = (props) => {
    return (
        <div className={ props.validationClassName } >
            <label htmlFor={ props.fieldName } className="col-form-label col-2 col-sm-2">{props.label}: </label>
            <div className="col-sm-4">
                <input 
                    type={ props.inputType }
                    className="form-control col-5 col-sm-5" 
                    name={ props.fieldName }
                    value={ props.fieldValue }
                    onChange={ props.fieldChanged } />
            </div>                        
            <ErrorControl errorMessage={ props.errorMessage } />
        </div>
    );

}

export default formControl;