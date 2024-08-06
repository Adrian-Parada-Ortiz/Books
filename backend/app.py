from flask import request, jsonify, render_template
from config import app, db
from models import Book


@app.route('/')
def home():
    return render_template('index.html')


@app.route("/books", methods=["GET"])
def get_books():
	books = Book.query.all();
	json_books = list( map(lambda b: b.to_json(), books ) )
	return jsonify({"books": json_books})

@app.route("/book/<int:book_id>", methods=["GET"])
def get_book(book_id):
	book = Book.query.get(book_id)
	if not book:
		return jsonify({"message": "Book not Found!"}), 404
	
	json_book = book.to_json()
	return jsonify(json_book), 200

@app.route("/create_book", methods=["POST"])
def create_book():
	book_id = request.json.get("bookId")
	title = request.json.get("title")
	author = request.json.get("author")
	ISBN = request.json.get("ISBN")
	publisher = request.json.get("publisher")
	publication_year = request.json.get("publicationYear")
	edition = request.json.get("edition")
	genre = request.json.get("genre")
	language = request.json.get("language")
	pages = request.json.get("pages")
	book_format = request.json.get("bookFormat")
	cover_image_URL = request.json.get("coverImageURL")
	description  = request.json.get("description")
	
	new_book = Book(
		book_id = book_id,
		title = title,
		author = author,
		ISBN = ISBN,
		publisher = publisher,
		publication_year = publication_year,
		edition = edition,
		genre = genre,
		language = language,
		pages = pages,
		book_format = book_format,
		cover_image_URL = cover_image_URL,
		description = description
	)
	
	print(new_book.to_json())
	
	try:
		db.session.add(new_book)
		db.session.commit()
	except Exception as e:
		return jsonify({"message": str(e)}), 400
	
	return jsonify({"message": "Book created!"}), 201


@app.route("/update_book/<int:book_id>", methods=["PATCH"])
def update_contact(book_id):
	book = Book.query.get(book_id)
	
	if not book:
		return jsonify({"message": "Book not found"}), 404
	
	data = request.json
	
	
	book.book_id          = data.get("bookId", book.book_id)
	book.title            = data.get("title", book.title)
	book.author           = data.get("author", book.author)
	book.ISBN             = data.get("ISBN", book.ISBN)
	book.publisher        = data.get("publisher", book.publisher)
	book.publication_year = data.get("publicationYear", book.publication_year)
	book.edition          = data.get("edition", book.edition)
	book.genre            = data.get("genre", book.genre)
	book.language         = data.get("language", book.language)
	book.pages            = data.get("pages", book.pages)
	book.book_format      = data.get("bookFormat", book.book_format)
	book.cover_image_URL  = data.get("coverImageURL", book.cover_image_URL)
	book.description      = data.get("description", book.description)
	
	db.session.commit()
	
	return jsonify({"message": "Book Updated!"}), 200


@app.route("/delete_book/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
	book = Book.query.get(book_id)
	
	if not book:
		return jsonify({"message": "Book not Found!"}), 404
	
	db.session.delete(book)
	db.session.commit()
	
	return jsonify({"message": "Book Deleted!"}), 200
	
	
if __name__ == "__main__":
	app.run(debug=True)
