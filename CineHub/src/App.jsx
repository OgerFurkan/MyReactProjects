import './App.css'
import RouterConfig from './config/RouterConfig'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import { Flip, ToastContainer } from 'react-toastify';

function App() {

  return (
    <>
      <Header/>
      <RouterConfig/>
      <Footer/>
      <ToastContainer
        autoClose={2500}
        hideProgressBar={true}
        closeOnClick={true}
        draggable={true}
        transition={Flip}
      />
    </>        
  )
}

export default App
