import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Menu from './Menu';

const Home = () => {

    
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Menu/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                </Routes>
            </BrowserRouter>
        ) 
    
    
}

export default Home;