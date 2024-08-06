import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './Detail.css';

function Detail() {
	
	let { id } = useParams();
	
	const [book, setBook] = useState({});
	
	const fetchBooks = async () => {
		const res = await fetch("/book/"+id);
		const data = await res.json();
		
		setBook(data);
	};
	
	useEffect(()=> {
		fetchBooks();
	}, []);
	
	return (
		<div className="container">
			<div className="book">	
				<img src={book.coverImageURL}/>
				
				<div className="book-details">
					<p><strong>Title:</strong> {book.title}</p>
					<p><strong>Author:</strong> {book.author}</p>
					<p><strong>ISBN:</strong> {book.ISBN}</p>
					<p><strong>Publisher:</strong> {book.publisher}</p>
					<p><strong>Publication Year:</strong> {book.publicationYear}</p>
					<p><strong>Edition:</strong> {book.edition}</p>
					<p><strong>Genre:</strong> {book.genre}</p>
					<p><strong>Language:</strong> {book.language}</p>
					<p><strong>Pages:</strong> {book.pages}</p>
					<p><strong>Format:</strong> {book.format}</p>
					<p><strong>Description:</strong> {book.description}</p>
				</div>
				<div className="buttons">
					<Link to={ `/edit/${book.bookID}` }>
						<button className="edit-button">Edit</button>
					</Link>
				</div>
			</div>
		</div>
	);
}


export default Detail;
