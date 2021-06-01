import React, { useState, useEffect } from 'react'
import styles from '../Styles/bankAccount.module.css'
import { Form } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const BankAccountDetails = ({ account, removeRow, updateParentArray }) => {


    useEffect(() => {
        setBankName(account.bankName)
        setBankBranchNumber(account.bankBranchNumber)
        setAccountNumber(account.accountNumber)
    }, [account])
    const [bankName, setBankName] = useState(account.bankName)
    const [bankBranchNumber, setBankBranchNumber] = useState(account.bankBranchNumber)
    const [accountNumber, setAccountNumber] = useState(account.accountNumber)


    const inputChangeHandler = (e, type) => {
        let newValue = e.target.value

        switch (type) {

            case "bankBranchNumber":
                setBankBranchNumber(newValue)
                updateParentArray(account.id, newValue, "bankBranchNumber")
                break;

            case "bankName":
                setBankName(newValue)
                updateParentArray(account.id, newValue, "bankName")
                break;

            case "accountNumber":
                setAccountNumber(newValue)
                updateParentArray(account.id, newValue, "accountNumber")
                break;

            default:
                break;
        }
    }




    const bankNames = ['בחר', 'דיסקונט', 'לאומי', 'מזרחי טפחות', 'בנק הפועלים']
    return (
        <div className={styles.main}>



            <div className={styles.detailsContainer}>

                <div className={styles.pMobile}>
                    {account.id >= 1 ? <p > בנק</p> : null}

                </div>
                {account.id === 0 ? <p >בנק</p> : null}

                <Form.Control onChange={(e) => inputChangeHandler(e, "bankName")}
                    className={styles.formControl}
                    value={bankName}
                    as="select"
                >
                    {bankNames.map((bank) => <option>{bank}</option>)}
                </Form.Control>
            </div>


            <div className={styles.detailsContainer}>


                <div className={styles.pMobile}>
                    {account.id >= 1 ? <p > סניף</p> : null}

                </div>                {account.id === 0 ? <p >סניף</p> : null}


                <Form.Control value={bankBranchNumber}
                    type="number" placeholder="הזן מספר סניף"
                    className={styles.formControl}
                    onChange={(e) => inputChangeHandler(e, "bankBranchNumber")}
                />
            </div>


            <div className={styles.detailsContainer}>
                <div className={styles.pMobile}>
                    {account.id >= 1 ? <p > חשבון</p> : null}

                </div>

                {account.id === 0 ? <p >חשבון</p> : null}


                <Form.Control value={accountNumber}
                    type="number"
                    placeholder="הזן מספר חשבון"
                    className={styles.formControl}
                    onChange={(e) => inputChangeHandler(e, "accountNumber")}


                />


            </div>

            <div className={styles.trash}>

                <Button
                    style={account.id === 0 ? { marginTop: '40px' } : null}
                    onClick={() => removeRow()}
                    variant='text'
                    color='default'
                    startIcon={<DeleteIcon />}
                >

                    הסר
      </Button>


            </div>
            <div className={styles.trashMobile}>

                <Button
                    style={account.id === 0 ? { marginTop: '40px' } : null}
                    onClick={() => removeRow()}
                    variant='text'
                    color='default'
                    startIcon={<DeleteIcon />}
                >

                    הסר
      </Button>

            </div>

        </div >
    )

}

export default BankAccountDetails
