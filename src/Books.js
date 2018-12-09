import React from 'react';
import SelectUtilty from './SelectUtility'
import PropTypes from 'prop-types';


class Books extends React.Component{

    static propTypes={
        changeBookShelf:PropTypes.func,
        books:PropTypes.array.isRequired
    }
    render(){
        return (
            this.props.books.map((book)=>{
               return (<li key={book.id}>
                <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${book.imageLinks.thumbnail||''}")` }}></div>
                    <div className="book-shelf-changer">
                        <SelectUtilty bookId={book.id} handleBookChange={(val)=>{this.props.changeBookShelf(book,val)}}/>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    {book.authors && book.authors.map(author=>{
                    return <div className="book-authors" key={author}>{author}</div>
                    })}
                </div>
            </li>)
            })
            
        )
    }
}
export default Books;