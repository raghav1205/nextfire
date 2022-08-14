import {UserContext} from '../lib/context'
import { useUserData } from '../lib/hooks';
import Navbar from '../components/Navbar'
import '../styles/globals.css'
import {Toaster} from 'react-hot-toast'



function MyApp({ Component, pageProps }) {
  const userData = useUserData();

 
  return (
    <>
    <UserContext.Provider value = {userData}>
      <Navbar/>
      <Component {...pageProps} />
      <Toaster/>
    </UserContext.Provider>
    </>
    )
}

export default MyApp
