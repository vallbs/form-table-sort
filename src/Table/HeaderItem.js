import React from 'react';

const headerItem = props => {
    return (
        <th 
            onClick={ props.sortData }>
            { props.label }
            <i className={ props.classes}></i>
        </th>
    );
}

export default headerItem;