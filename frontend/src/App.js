import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AddBook from './components/Books/AddBook';
import Books from './components/Books/Books';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/books' element={<Books />} />
        <Route path='/addbook' element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;
