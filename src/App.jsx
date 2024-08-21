import {useState,useEffect} from 'react'
import {useDispatch} from "react-redux";
import authservice from './appwrite/auth';
import { login,logout } from './store/authslice';
import { Header } from './componets';
import {Footer} from './componets';
import './App.css'
import { Outlet } from 'react-router-dom';
import './assets/fonts/fonts.css'

function App() {
  const [loading,setloading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authservice.getCurrentUser()
    .then((userdata)=>{
      if(userdata){
        dispatch(login({userdata}))
      }
      else{
        dispatch(logout())
      }
    })
    .finally(()=>{setloading(false)})
  },[])

  return !loading ? (<div className='min-h-screen flex flex-wrap content-between bg-gray-300'>
    <div className='w-full block'>
      <Header />
      <Outlet />
      <Footer />
    </div>
  </div>) : null
}

export default App
