import { ToastContainer } from 'react-toastify';
import './App.css';
import Credit from './Components/Credit';

function App() {
  return (
    <div className="App">
      <Credit />
      <ToastContainer
        position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

    </div>
  );
}

export default App;
