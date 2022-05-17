import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import Solo from './Solo';
import Profile from './Profile';
import EditUsername from './EditUsername';
import EditPassword from './EditPassword';
import EditMail from './EditMail';

const Home = () => {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path='/' exact element={<Menu/>}/>
                    <Route path='/login' element={<Login/>}/>
                    <Route path='/register' element={<Register/>}/>
                    <Route path='/solo' element={<Solo/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                    <Route path='/edit/username' element={<EditUsername/>}/>
                    <Route path='/edit/password' element={<EditPassword/>}/>
                    <Route path='/edit/mail' element={<EditMail/>}/>
                </Routes>
            </BrowserRouter>
        ) 
    
    
}

export default Home;