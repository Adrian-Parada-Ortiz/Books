import { Link } from 'react-router-dom';

import './BookCard.css';

function BookCard({book}) {
	
	return (<Link to={ `/book/${book.bookID}` }>
	<div className="book-card">
		<img src={book.coverImageURL} className="cover-image"/>
		<div className="book-text">
			<h2 className="title">{book.title}</h2>
			<div className="book-details">
				<p className="author">{book.author}</p>
				<p className="publication-year">{book.publicationYear}</p>
			</div>
		</div>
	</div>
	</Link>);
}

export default BookCard;
