import { Container } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Footer from "./components/Footer";
import Header from './components/Header'

import HomeScreen from './screens/HomeScreen'
import ClubScreen from './screens/ClubScreen'
import EventScreen from './screens/EventScreen'
import LoginScreen from './screens/LoginScreen'
import MyClubsScreen from './screens/MyClubsScreen'
import MemberScreen from './screens/MemberScreen'
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ClubListScreen from './screens/ClubListScreen';
import ClubEditScreen from './screens/ClubEditScreen';
import SearchBox from './components/SearchBox';

function App() {
  return (
    <Router>
      <Header/>
        <main className='py-3'>
          <Container>
            <Routes>
              <Route path='/' element={<HomeScreen exact />} />
              <Route path='/search/:keyword' element={<SearchBox />} />
              <Route path='/club/:id' element={<ClubScreen />} />
              <Route path='/login' element={<LoginScreen />} />
              <Route path='/register' element={<RegisterScreen />} />
              <Route path='/profile' element={<ProfileScreen />} />
              <Route path='/myclubs' element={<MyClubsScreen />} />
              <Route path='/member/:id' element={<MemberScreen />} />
              <Route path='/event/:id' element={<EventScreen />} />
              <Route path='/members/:id' element={<MemberScreen />} />
              
              

              <Route path='/admin/userlist' element={<UserListScreen />} />
              <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />

              <Route path='/admin/clublist' element={<ClubListScreen />} />
              <Route path='/admin/club/:id/edit' element={<ClubEditScreen />} />
              
              
            </Routes>
            
          </Container>
          
        </main>
      <Footer/>
    </Router>
  );
}

export default App;
