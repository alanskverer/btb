import React from 'react'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'; import Button from '@material-ui/core/Button';


const BackArrow = ({ goToPreviousPage }) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <Button
                style={{
                    position: 'absolute',
                    top: '90px'
                }}
                onClick={() => goToPreviousPage()}
                variant='text'
                color='default'
                endIcon={<ArrowForwardIcon />}
            >
            </Button>
            <p style={{ position: 'absolute', top: '115px', marginRight: '25px' }} >חזור</p>
        </div>

    )
}

export default BackArrow
