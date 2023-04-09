import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserForm from './Components/UserForm';
import PostForm from './Components/PostForm';
import PostList from './Components/PostList';
import UserList from './Components/UserList';
import PostAnalytics from './Components/PostAnalytics';
import UserAnalytics from './Components/UserAnalytics';
import { Navbar } from './Components/Navbar';

function App() {
  return (
    <div className="App">


        <Navbar/>
        <Routes>
          <Route path='/' element={<UserForm/>} />
          <Route path='/postform' element={<PostForm/>} />
          <Route path='/postlist' element={<PostList/>} />
          <Route path='/userlist' element={<UserList/>} />
          <Route path='/postanalytics' element={<PostAnalytics/>} />
          <Route path='/useranalytics' element={<UserAnalytics/>} />
        </Routes>
      {/* <UserForm /> */}
      {/* <PostForm/> */}
      {/* <PostList /> */}
      {/* <UserList /> */}
      {/* <PostAnalytics /> */}
      {/* <UserAnalytics /> */}
      
    </div>
  );
}

export default App;
