import React from 'react'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import { makeStyles } from '@material-ui/core'


const useStyles = makeStyles({
    logo: {
        maxWidth: 240,

    },
});




const MyNav = () => {
    const classes = useStyles()

    return (
        <div>
            <AppBar
                position='absolute'
                elevation={2}
                color="inherit"
            >
                <Toolbar>
                    <img src="https://www.btbisrael.co.il/wp-content/uploads/2020/09/BTB-logos-02-e1601472710351.png" alt="logo" className={classes.logo} />
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default MyNav
