
import './App.css';
import Navbar from './components/Header/Navbar';
import Home from './components/Home/Home';
import Login from './components/User/Login';
import Main from './components/Main/Main';
import Register from './components/User/Register';
import { BrowserRouter,Routes, Route } from "react-router-dom"
import { useReducer} from 'react'
import BooksContext from './context/BooksContext';
import BookDispatch from './context/BooksDispatch';
import MyBooks from './components/Main/MyBooks';
function App() {
  function bookReducer(books, action) {
    switch (action.type) {
      case 'Search':
        {
          return [...action.payload];
        }
      default:
        return books;
    }
  }
  const db = [];
  const [books, dispatch] = useReducer(bookReducer,db);
  return (
    <BooksContext.Provider value={books}>
      <BookDispatch.Provider value={dispatch}>
    <div>
    <div>
			<BrowserRouter>
        <Navbar/>
        
        <Routes>
        <Route path="/login" exact element={<Login/>} />
				<Route path="/register" exact element={<Register/>} />
				<Route path="/" exact element={<Home/>} />
				<Route path="/books" exact element={<Main/>} />
				<Route path="/my-books/:id" element={<MyBooks/>} />

        </Routes>
        
				
			</BrowserRouter>
		</div>
    
    </div>
    </BookDispatch.Provider> 
    </BooksContext.Provider>
  );
}

export default App;
