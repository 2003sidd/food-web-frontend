import './App.css'
import Header from './component/Header/header'
import Footer from './component/Footear/footer'
import { Outlet } from 'react-router-dom'
function App() {
  return (
    <>

     <div className="min-h-screen bg-white">
     <Header />
    <div className="min-h-screen ">

     <Outlet />
    </div>
     
     <Footer />
     </div>
    </>
  )
}

export default App
