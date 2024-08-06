import BookCard from './BookCard.jsx';

import { Link } from 'react-router-dom';

import './Home.css';

function Home({books}) {
		
	return (
		<>
		<Link to={ '/create' }>
				<button className="btn-create">New Book</button>
		</Link>
		
		<div className="main-container">
			{books.map( book => <BookCard book={book}/>)}
		</div>
		</>
	);
}

export default Home;
