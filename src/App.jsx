import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './auth/auth'
import './App.css'
import { Footer, Header } from './components/index.js'
import { login, logout } from './store/authslice'
function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("App mounted");
    authService.getCurrentUser()
      .then((userData) => {
        console.log("Current user:", userData);
        if (userData) {
          console.log("Dispatching login");
          dispatch(login({ userData }))
        }
        else {
          console.log("Dispatching logout");
          dispatch(logout())
        }
      })
      .finally(() => {
        console.log("Setting loading to false");
        setLoading(false);
      })
  }, [])

  return !loading ? (
    <div className='min-h-screen w-full bg-gray-600'>
      <div className='flex flex-wrap content-between text-black bg-gray-400'>
        <Header />
        <main>
          {/* Outlet */}
        </main>
        <Footer />
      </div >
    </div >
  ) : (

    <>

      {console.log("Still loading")}

    </>

  );
}




export default App
