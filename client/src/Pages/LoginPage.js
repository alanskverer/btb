import React, { useState } from 'react'
import styles from '../Styles/login.module.css'
import Paper from '@material-ui/core/Paper';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import { withRouter, useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';






const LoginPage = (props) => {

    let LOCAL_HOST = process.env.REACT_APP_LOCAL_HOST;
    const history = useHistory();
    const [password, setPassword] = useState(null);
    const [id, setId] = useState(null);

    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')

    const showAlert = (msg) => {
        setAlert(true);
        setAlertMsg(msg);
        setTimeout(() => {
            setAlert((prevState) => !prevState);
        }, 4000);
    }






    const login = async (e) => {
        e.preventDefault();
        try {


            const res = await axios.get(`${LOCAL_HOST}/api/user/login/${id}/${password}`);
            const nextPageObj = {
                pathname: "/personaldetails",
                state: {
                    id: id
                }
            }

            //Get current login date and store id in DB
            let date = Math.floor(Date.now() / 1000);

            try {
                const res = await axios.post(`${LOCAL_HOST}/api/user/updatelastlogindate/${id}/${date}`)
            } catch (error) {
                showAlert(error.response.data)
            }

            history.push(nextPageObj);

        } catch (error) {
            showAlert(error.response.data)
        }


    }

    return (
        <div className={styles.main}>



            <Paper className={styles.formContainer} elevation={10} style={{ borderRadius: '20px' }}>
                <div className={styles.headerContainer}>
                    <h3>כניסה לחשבון</h3>
                </div>
                <Form onSubmit={login}>
                    <Form.Group controlId="formBasicEmail">
                        <div className={styles.inputsLabelContainer}>

                            <Form.Label>תעודת זהות</Form.Label>
                        </div>
                        <div className={styles.inputsContainer}>
                            <Form.Control type='number' onChange={(e) => setId(e.target.value)} placeholder="הכנס תעודת זהות בת 9 ספרות" />

                        </div>

                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <div className={styles.inputsLabelContainer}>

                            <Form.Label >סיסמא</Form.Label>
                        </div>
                        <div className={styles.inputsContainer}>
                            <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="הכנס את סיסמתך" />

                        </div>
                        <div className={styles.alertContainer}>
                            {alert && alertMsg}

                        </div>
                    </Form.Group>
                    <div className={styles.btnContainer}>

                        <Button variant="contained" color='primary' type="submit">
                            כניסה לחשבון
  </Button>
                    </div>

                </Form>

            </Paper>


        </div >
    )
}

export default withRouter(LoginPage);

