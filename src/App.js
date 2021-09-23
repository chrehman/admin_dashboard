import './App.css';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import ResponsiveDrawer from './Views/Dashboard/index';
import { BrowserRouter as Router, } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  listItemText: {
    fontFamily: "Montserrat",
  }
});

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div >
          <ResponsiveDrawer />
          <ToastContainer />
        </div>
      </ThemeProvider>
    </Router>

  );
}

export default App;
