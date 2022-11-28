// import axios from 'axios';
import React, { useState} from 'react'
// import { useTranslation } from 'react-i18next';

function DropdownRow(props) {
    // const { t } = useTranslation();

    return (
        <option value={props.text} key={props.text}>
            {props.text}
        </option>
    )

}

export default DropdownRow 