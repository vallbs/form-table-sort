import React from 'react';

const errorControl = (props) => {
    return (
        <div className="col-5 col-sm-5">
            <small id="passwordHelpInline" className="text-muted">
                {props.errorMessage}
            </small>
        </div>
    );
}    

export default errorControl;