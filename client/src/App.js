import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from '../src/components/Home'
import LandingPage from '../src/components/LandingPage'
import Create from '../src/components/Create'
import Detail from './components/Detail';
import styles from './App.module.css'

const arr = ["Action", "RPG"]

const App = () => {
  return (
    <BrowserRouter>
    <div className={styles.App}>
    <Routes>
      <Route exact path= '/' element={<LandingPage/>}/>
      <Route exact path= '/home' element={<Home/>}/>
      <Route path= '/home/:id' element ={<Detail arr={arr}/>}/>
      <Route path= '/videogame' element={<Create/>}/>
    </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App;
