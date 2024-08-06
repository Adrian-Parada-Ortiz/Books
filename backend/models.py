from config import db


class Book(db.Model):
	book_id          = db.Column(db.Integer, primary_key=True)
	title           = db.Column(db.String(200), unique=True, nullable=False)
	author          = db.Column(db.String(80), unique=False, nullable=False)
	ISBN            = db.Column(db.String(80), unique=True, nullable=False)
	publisher       = db.Column(db.String(200), unique=False, nullable=False)
	publication_year = db.Column(db.Integer, primary_key=False)
	edition         = db.Column(db.String(100), unique=False, nullable=False)
	genre           = db.Column(db.String(200), unique=False, nullable=False)
	language        = db.Column(db.String(100), unique=False, nullable=False)
	pages           = db.Column(db.Integer, primary_key=False)
	book_format      = db.Column(db.String(100), unique=False, nullable=False)
	cover_image_URL   = db.Column(db.String(200), unique=False, nullable=False)
	description     = db.Column(db.String(300), unique=False, nullable=False)
	
	def to_json(self):
		return {
			"bookID": self.book_id,       
			"title": self.title,        
			"author":  self.author,          
			"ISBN":    self.ISBN,            
			"publisher":  self.publisher,       
			"publicationYear":  self.publication_year, 
			"edition":   self.edition,        
			"genre":    self.genre,         
			"language":  self.language,       
			"pages":  self.pages,          
			"bookFormat":  self.book_format,     
			"coverImageURL":  self.cover_image_URL,  
			"description":   self.description 
		}
