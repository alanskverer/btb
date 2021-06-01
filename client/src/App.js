import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage';
import './App.css';
import MyNav from './Components/MyNav';
import PersonalDetailsPage from './Pages/PersonalDetailsPage';
import BankAccountsPage from './Pages/BankAccountsPage';
import LoanDetailsPage from './Pages/LoanDetailsPage';
import 'bootstrap/dist/css/bootstrap.min.css';




import { createMuiTheme, ThemeProvider } from '@material-ui/core'

const theme = createMuiTheme({

  direction: 'rtl',
})

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <MyNav />
          <Switch>
            <Route exact path="/" >
              <LoginPage />
            </Route>
            <Route path="/personaldetails" >
              <PersonalDetailsPage />
            </Route>
            <Route path="/bankaccounts" >
              <BankAccountsPage />
            </Route>
            <Route path="/loan" >
              <LoanDetailsPage />
            </Route>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;