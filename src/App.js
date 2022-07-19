import ReactGA from 'react-ga';
import './App.css';
import InputForm from './components/InputForm';



function App() {

  const TRACKING_ID = "G-G6CNVXNVTF"
  ReactGA.initialize(TRACKING_ID);
  ReactGA.pageview(window.location.pathname + window.location.search);  
  return (
    <div className="App">
      <InputForm/>
    </div>
  );
}

export default App;
