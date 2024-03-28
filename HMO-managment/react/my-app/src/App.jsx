import { useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import AddClient from './components/addClient'

import Menu from './components/Menu';
import CovidGraph from './components/CovidGraph';
import MemberTable from './components/table'
import { useDispatch } from 'react-redux';
function App() {
  const dispatch=useDispatch()
  useEffect(() => {
dispatch({ type: 'GET_MEMBER' });
// setCurrentRequest(myRequest)
// console.log(myRequest);
}, []);
  const [count, setCount] = useState(0)

  return (
    <>
  <Menu></Menu>
  {/* <Cards/> */}
    <Routes >
        <Route path='addClient' element={<AddClient/>}></Route>
        <Route path='CovidGraph' element={<CovidGraph/>}></Route>
        <Route path='Table' element={<MemberTable/>}></Route>
        </Routes>
        
    </>
  )
}

export default App
