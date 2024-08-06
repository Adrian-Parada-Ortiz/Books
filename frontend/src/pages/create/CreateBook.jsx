import { useState, useEffect } from 'react';

import { useParams, useNavigate } from 'react-router-dom';


import './CreateBook.css';

function CreateBook() {
	
	const [form, setForm] = useState({
		bookId: Date.now(),
		title: "",
		author: "",
		ISBN: "",
		publisher: "",
		publicationYear: "",
		edition: "",
		language: "",
		pages: "",
		bookFormat: "",
		description: "",
		coverImageURL: ""
	});
	
	const navigate = useNavigate();
	
	function handleChange({target}) {
		const {name, value} = target;
		
		setForm({
			...form,
			[name]: value
		});
		
		console.log(form);
		
	}
	
	let { id } = useParams();
	
	const fetchBook = async () => {
		const res = await fetch("/book/"+id);
		const data = await res.json();
		
		setForm(data);
		
	};
	
	useEffect(()=> {
		fetchBook();
	}, []);
	
	async function handleSubmit(e) {
		e.preventDefault();
		
		let URL = "/create_book";
		let method = 'POST'
		
		if(id) {
			URL = "/update_book/" + id;
			method = "PATCH";
		}
		
		const jsonData = JSON.stringify(form);
		
		const res = await fetch(URL, {
			method: method,
			headers: { 'Content-Type': 'application/json' },
			body: jsonData,
		});
		
		const ok = await res.ok;
		
		console.log(ok);
		
	}
	
	async function handleDelete(e) {
		e.preventDefault();
		
		let URL = "/delete_book/" + id;
		
		const res = await fetch(URL, {
			method: "DELETE",
			
		});
		
		navigate("/");
		console.log("DELETE");
	}
	
	return (
	<div className="container">
	<form onSubmit={handleSubmit}>
		
		<div className="form-row">
			<input type="text" placeholder="Title" name="title" onChange={ e=>{handleChange(e)} } value={form.title}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="Author" name="author" onChange={ e=>{handleChange(e)} } value={form.author}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="ISBN" name="ISBN" onChange={ e=>{handleChange(e)} } value={form.ISBN}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="Publisher" name="publisher" onChange={ e=>{handleChange(e)} } value={form.publisher}/>
		</div>
		
		<div className="form-row">
			<input type="number" placeholder="Publication Year" name="publicationYear" onChange={ e=>{handleChange(e)} } value={form.publicationYear}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="Edition" name="edition" onChange={ e=>{handleChange(e)} } value={form.edition}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="Genre" name="genre" onChange={ e=>{handleChange(e)} } value={form.genre}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="Language" name="language" onChange={ e=>{handleChange(e)} } value={form.language}/>
		</div>
		
		<div className="form-row">
			<input type="number" placeholder="Pages" name="pages" onChange={ e=>{handleChange(e)} } value={form.pages}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="Format" name="bookFormat" onChange={ e=>{handleChange(e)} } value={form.bookFormat}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="Description" name="description" onChange={ e=>{handleChange(e)} } value={form.description}/>
		</div>
		
		<div className="form-row">
			<input type="text" placeholder="Cover URL" name="coverImageURL" onChange={ e=>{handleChange(e)} } value={form.coverImageURL}/>
		</div>
		
		<div className="action-buttons">
			<button>Save</button>
			<button className="btn-delete" onClick={(e)=>{ handleDelete(e); }}>Delete</button>
		</div>
	</form>
	</div>);
}


export default CreateBook;
