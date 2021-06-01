
import React, { useState } from 'react'
import { withRouter } from 'react-router'
import styles from '../Styles/bankAccountsDetails.module.css'
import Paper from '@material-ui/core/Paper';
import Stepper from '../Components/Stepper';
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import BankAccountDetails from '../Components/BankAccountDetails'
import AddIcon from '@material-ui/icons/Add';
import BackArrow from '../Components/BackArrow';
import axios from 'axios'



const BankAccountsPage = (props) => {

    let LOCAL_HOST = process.env.REACT_APP_LOCAL_HOST;
    const { match, location, history } = props;
    const companyName = location.state.companyName
    const companyNumber = location.state.companyNumber
    const userId = location.state.userId
    const [holdingPercentage, setHoldingsPercentage] = useState('10%')
    const percentageOptions = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%']
    const [accounts, setAccounts] = useState([{ id: 0 }]);
    const [alert, setAlert] = useState(false)
    const [alertMsg, setAlertMsg] = useState('')


    const showAlert = (msg) => {
        setAlert(true);
        setAlertMsg(msg);
        setTimeout(() => {
            setAlert((prevState) => !prevState);
        }, 4000);
    }




    const rowsAccountsHanlder = (sign, index) => {
        if (sign === '+') {


            let newArr = [...accounts, { id: index }];
            setAccounts(newArr);

        } else if (sign === '-') {


            let filtered = accounts.filter((o) => o.id !== index);

            for (let i = 0; i < filtered.length; i++) {
                if (filtered[i].id > index) {
                    filtered[i].id--

                }
            }


            setAccounts(filtered);
        }

    }


    const accountsChangeHandler = (id, newValue, type) => {
        accounts[id][type] = newValue;
    }

    const getAllAcoounts = () => {
        return (

            accounts.map((account, index) => (<BankAccountDetails key={index} account={account}
                removeRow={() => rowsAccountsHanlder('-', index)}
                accountsLength={accounts.length}
                updateParentArray={(id, newValue, type) => accountsChangeHandler(id, newValue, type)}

            />))
        )
    }

    const saveAccountsInDB = async () => {
        let bankAccounts = {
            holdingPercentage,
            bankAccountDTOs: accounts

        }
        for (let account of accounts) {
            if (!account.bankName || !account.bankBranchNumber || !account.accountNumber) {
                showAlert("אנא מלאו את כל השדות")
                return null

            }
        }
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }

        }

        const body = JSON.stringify(bankAccounts)
        const url = `${LOCAL_HOST}/api/user/saveBankAccounts/${userId}`

        try {

            const res = await axios.post(url, body, config);

            const nextPageObj = {
                pathname: "/loan",

            }
            history.push(nextPageObj);

        } catch (error) {
            console.log(error.response.data)
        }





    }




    return (
        <div className={styles.main}>
            <Paper className={styles.formContainer} elevation={10} style={{ borderRadius: '20px' }}>
                <div className={styles.stepperContainer}>
                    <Stepper stepNum={1} />
                </div>
                <div className={styles.headerContainer}>
                    <h3>אנא מלאו את פרטי החשבונות</h3>
                    <h3>{`של חברת "${companyName}"`}</h3>
                    <h6 style={{ marginTop: '5px' }}>{`ח.פ: ${companyNumber}`}</h6>
                </div>
                <form className={styles.form} >
                    <div className={styles.bankDetailsContainer}>
                        <div className={styles.holdingContainer}>
                            <p style={{ minWidth: '100px' }}>אחוז החזקה </p>
                            <p>|</p>
                            <Form.Control onChange={(e) => setHoldingsPercentage(e.target.value)}
                                value={holdingPercentage} as="select"
                                style={{ width: '100px', maxHeight: '6vh', marginRight: '30px', marginBottom: '10px' }}>
                                {percentageOptions.map((percentage) => <option>{percentage}</option>)}
                            </Form.Control>
                        </div>
                        {getAllAcoounts()}
                        <div className={styles.addBtnContainer}>
                            <Button
                                onClick={() => rowsAccountsHanlder('+', accounts.length)}
                                variant='primary'
                                color='primary'
                                startIcon={<AddIcon />}
                            >

                                הוסף חשבון
                        </Button>
                        </div>
                        <div className={styles.alertContainer}>
                            {alert && alertMsg}

                        </div>
                    </div>
                    <div className={styles.btnContainer}>


                        <Button variant="contained" color='primary' onClick={() => saveAccountsInDB()}>
                            לשלב הבא
  </Button>

                    </div>

                </form>



                <BackArrow goToPreviousPage={() => history.goBack()} />
            </Paper>

        </div >
    )
}

export default withRouter(BankAccountsPage)
