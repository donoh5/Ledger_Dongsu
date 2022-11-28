import React, { useState } from 'react'

import DropdownRow from './DropdownRow';

function Dropdown(props) {
    const handleChange = (e) => {
        const { name, value } = e.target;

        props.setText({
            ...props.transaction,
            [name]: value,
        });
    };

    const content = function () {
        return props.content.map(function (res, i) {
            return (<DropdownRow text={res} />)
        }
        )
    }

    return (

        <select class="relative w-auto h-auto hover:bg-gray-100 text-gray-700 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:bg-white" name={props.name} value={props.text} onChange={handleChange} >
            {content()}
        </select>

    )
}

export default Dropdown