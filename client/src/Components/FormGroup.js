import React from 'react'
import { Form } from 'react-bootstrap';
import styles from '../Styles/personalDetails.module.css'


const FormGroup = ({ label, type, placeholder, value, inputChangeHandler }) => {


    return (

        <Form.Group >
            <div className={styles.inputsLabelContainer}>
                <Form.Label>{label}</Form.Label>
                {label !== "טלפון" ? <p style={{ marginRight: '5px', color: 'red' }}>*</p> : null}
            </div>
            <div className={styles.inputsContainer}>
                <Form.Control required={label !== 'טלפון'} value={value ? value : ""} type={type}
                    placeholder={type === 'email' ? "name@example.com" : ''} onChange={(e) => inputChangeHandler(e)} />
            </div>

        </Form.Group>
    )
}

export default FormGroup
