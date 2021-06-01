import React, { useState } from 'react'
import { withRouter } from 'react-router'
import styles from '../Styles/loan.module.css'
import Paper from '@material-ui/core/Paper';
import Stepper from '../Components/Stepper';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import BackArrow from '../Components/BackArrow';
import Slider from '@material-ui/core/Slider';
import swal from 'sweetalert';


const LoanDetailsPage = (props) => {
    const { history } = props;
    const [loanAmountString, setLoanAmountString] = useState(null)
    const [loanAmount, setLoanAmount] = useState(null)
    const [loanPeriodOfTime, setLoanPeriodOfTime] = useState(4)

    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')

    const showAlert = (msg) => {
        setAlert(true);
        setAlertMsg(msg);
        setTimeout(() => {
            setAlert((prevState) => !prevState);
        }, 4000);
    }


    const handleChange = (value) => {


        //Parse it to string so we can display it with commas
        const formattedValue = (Number(value.replace(/\D/g, '')) || '').toLocaleString();
        setLoanAmountString(formattedValue)


        //Set original loan amount for further calculations and storage
        let valueArr = formattedValue.split(',');
        setLoanAmount(parseInt(valueArr.join('')));




    };

    const handleSliderChange = (event, newValue) => {
        setLoanPeriodOfTime(newValue)
    };

    const done = () => {
        if (loanAmount < 100000 || loanAmount > 1000000) {
            showAlert("על סכום ההלוואה להיות בטווח של 100,000 - 1,000,000")
            console.log("object")
            return null
        }
        swal("בקשתך להלוואה התקבלה!", "הבקשה תטופל בהקדם האפשרי", "success")
            .then(() => goBackToLoginPage())
    }

    const goBackToLoginPage = () => {
        const nextPageObj = {
            pathname: "/",
        }
        history.push(nextPageObj);
    }

    return (
        <div className={styles.main}>

            <Paper className={styles.formContainer} elevation={10} style={{ borderRadius: '20px', height: 'fit-content' }}>

                <div className={styles.stepperContainer}>
                    <Stepper stepNum={2} />


                    <div className={styles.headerContainer}>
                        <h3>אנא מלאו את הפרטים הבאים</h3>
                    </div>
                    <div className={styles.smallHeaderContainer}>

                        <h6>סכום הלוואה המבוקש:</h6>

                    </div>

                    <div className={styles.detailsContainer}>


                        <div className={styles.pMobile}>

                        </div>




                        <Form.Control value={loanAmountString}
                            type="text"
                            placeholder="1,000,000 - 100,000 &#8362;"
                            className={styles.formControl}

                            onChange={(e) => handleChange(e.target.value)}
                        />
                    </div>
                    <div className={styles.smallHeaderContainer}>

                        <h6>משך זמן הלוואה:</h6>
                    </div>
                    <div className={styles.sliderContainer}>
                        <h6 style={{ marginLeft: '10px' }}>4 שנים</h6>
                        <Slider
                            defaultValue={4}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            step={0.5}
                            marks={true}
                            min={4}
                            max={8}
                            onChange={handleSliderChange} />
                        <h6 style={{ marginRight: '10px' }} >8 שנים</h6>

                    </div>

                </div>
                <div className={styles.alertContainer}>
                    {alert && alertMsg}

                </div>
                <BackArrow goToPreviousPage={() => history.goBack()} />
                <div className={styles.btnContainer}>

                    <Button variant="contained" color='primary' onClick={() => done()}>
                        הגש בקשה
</Button>
                </div>
            </Paper>
        </div >
    )
}

export default withRouter(LoanDetailsPage)
