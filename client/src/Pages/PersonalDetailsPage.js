import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router'
import styles from '../Styles/personalDetails.module.css'
import Paper from '@material-ui/core/Paper';
import Stepper from '../Components/Stepper';
import Button from '@material-ui/core/Button';
import FormGroup from '../Components/FormGroup';
import axios from 'axios';




const PersonalDetailsPage = (props) => {
    let LOCAL_HOST = process.env.REACT_APP_LOCAL_HOST;
    const { location } = props;
    const userId = location.state.id
    const history = useHistory()
    const [companyName, setCompanyName] = useState(null)
    const [companyNumber, setCompanyNumber] = useState(null)
    const [email, setEmail] = useState(null)
    const [firstName, setFirstName] = useState(null)
    const [lastName, setLastName] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [personId, setPersonId] = useState(null)
    const [dateOfBirth, setDateOfBirth] = useState('1.1.1993')

    useEffect(() => {

        getUserInfo()

    }, [])

    const getUserInfo = async () => {

        try {
            const res = await axios.get(`${LOCAL_HOST}/api/user/getuserinfo/${userId}`);
            setUserInfo(res.data)



        } catch (error) {

            console.log(error.response.data)
        }



    }

    const setUserInfo = (userInfo) => {
        for (let key in userInfo) {
            if (userInfo[key]) {
                switch (key) {
                    case 'email':
                        setEmail(userInfo[key])
                        break;
                    case 'companyName':
                        setCompanyName(userInfo[key])
                        break;
                    case 'companyNumber':
                        setCompanyNumber(userInfo[key])
                        break;
                    case 'firstName':
                        setFirstName(userInfo[key])
                        break;
                    case 'lastName':
                        setLastName(userInfo[key])
                        break;
                    case 'phoneNumber':
                        setPhoneNumber(userInfo[key])
                        break;
                    case 'personId':
                        setPersonId(userInfo[key])
                        break;

                    default:
                        break;
                }

            }
        }

    }
    const submitHandler = async (e) => {
        e.preventDefault();

        //PARSE DATE FROM STRING TO UNIX TIME
        let unixDateOfBirth = Date.parse(dateOfBirth);

        // REMOVE LAST 3 NUMBERS TO MAKE IT IN SECOND FORMAT
        unixDateOfBirth = (unixDateOfBirth - (unixDateOfBirth % 1000)) / 1000;
        let userDetails = {

            firstName,
            lastName,
            email,
            phoneNumber,
            companyName,
            companyNumber,
            dateOfBirth: unixDateOfBirth

        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }

        }

        const body = JSON.stringify(userDetails)
        console.log(body)
        const url = `${LOCAL_HOST}/api/user/updateUserDetails/${userId}`

        try {

            const res = await axios.put(url, body, config);
            console.log(res.data)

        } catch (error) {
            console.log(error.response.data)
        }



        const nextPageObj = {
            pathname: "/bankaccounts",
            state: {
                companyName,
                companyNumber,
                userId
            }
        }
        history.push(nextPageObj);

    }

    const inputChangeHandler = (e, type) => {
        let newValue = e.target.value

        switch (type) {

            case "firstName":
                setFirstName(newValue)
                break;

            case "lastName":
                setLastName(newValue)
                break;

            case "personId":
                setPersonId(newValue)
                break;

            case "email":
                setEmail(newValue)
                break;
            case "companyName":
                setCompanyName(newValue)
                break;
            case "phoneNumber":
                setPhoneNumber(newValue)
                break;
            case "companyNumber":
                setCompanyNumber(newValue)
                break;
            case "dateOfBirth":
                setDateOfBirth(newValue)
                break;
            default:
                break;
        }
    }

    return (


        <div className={styles.main}>
            <Paper className={styles.formContainer} elevation={10} style={{ borderRadius: '20px' }}>
                <div className={styles.stepperContainer}>
                    <Stepper stepNum={0} />

                </div>
                <div className={styles.headerContainer}>
                    <h3>אנא השלימו את הפרטים הבאים</h3>
                </div>
                <form className={styles.form} onSubmit={submitHandler} >
                    <FormGroup label='שם פרטי' type='text' value={firstName} inputChangeHandler={(e) => inputChangeHandler(e, "firstName")} />
                    <FormGroup label='שם משפחה' type='text' value={lastName} inputChangeHandler={(e) => inputChangeHandler(e, "lastName")} />
                    <FormGroup label='תעודת זהות' type='number' value={personId} inputChangeHandler={(e) => inputChangeHandler(e, "personId")} />
                    <FormGroup label='תאריך לידה' type='date' value={dateOfBirth} inputChangeHandler={(e) => inputChangeHandler(e, "dateOfBirth")} />
                    <FormGroup label='דואר אלקטרוני' type='email' value={email} inputChangeHandler={(e) => inputChangeHandler(e, "email")} />
                    <FormGroup label='טלפון' type='number' value={phoneNumber} inputChangeHandler={(e) => inputChangeHandler(e, "phoneNumber")} />
                    <FormGroup label='שם העסק' type='text' value={companyName} inputChangeHandler={(e) => inputChangeHandler(e, "companyName")} />
                    <FormGroup label='ח.פ/שותפות/עמותה' type='text' value={companyNumber} inputChangeHandler={(e) => inputChangeHandler(e, "companyNumber")} />

                    <div className={styles.btnContainer}>

                        <Button variant="contained" color='primary' type="submit">
                            לשלב הבא
  </Button>
                    </div>
                </form>




            </Paper>

        </div>


    )
}

export default withRouter(PersonalDetailsPage);

