import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';

import Home from './pages/home/Home.jsx';
import Detail from './pages/detail/Detail.jsx';
import CreateBook from './pages/create/CreateBook.jsx';
import EditBook from './pages/edit/EditBook.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';

function App() {
	const [books, setBooks] = useState([]);
	
	const fetchBooks = async () => {
		const res = await fetch("/books");
		const data = await res.json();
		
		setBooks(data.books);
	};
	
	useEffect(()=>{
		fetchBooks();
	}, []);
	
	return (
	<Router>
		<Nav/>
		<Routes>
			<Route index element={<Home books={books} />} />
			<Route path="/book/:id" element={<Detail />} />
			<Route path="/create" element={<CreateBook />} />
			<Route path="/edit/:id" element={<CreateBook />} />
		</Routes>
		<Footer/>
    </Router>
  )
}

export default App
