import React from 'react'
// import * as BooksAPI from './BooksAPI'
import {Route,Link} from 'react-router-dom';
import './App.css'
import Books from './Books';
import BookSearch from './BookSearch'
import {getAll,update} from './BooksAPI';

let storage=window.localStorage;

class BooksApp extends React.Component {
  state = {
    books:[],
  }
  

  componentDidMount=()=>{
    let booksArr=storage.getItem('books');
    if(booksArr){
    this.setState({books:JSON.parse(booksArr)});
    }
    getAll().then((books)=>{
      storage.setItem('books',JSON.stringify(books));
      this.setState({books})
    })
  }

  changeBook=(book,val)=>{
    update(book,val)
    this.setState((state)=>{

      let update=state.books.filter((boo)=>boo.id===book.id)
      if(update.length===0){
        state.books.push(book);
        return {books:state.books}
      }
      update[0].shelf=val;
      let old=state.books.filter(boo=>boo.id!==book.id)
      update=update.concat(old)
      storage.setItem('books',JSON.stringify(update))
      return {books:update}
    })
  }
  
  render() {
    return (
      <div className="app">
        <Route path='/search' render={()=>(
        
        <BookSearch books={this.state.books}  changeBookShelfHandle={this.changeBook} />
        )}/>
        <Route exact path='/' render={()=>(
          <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>  
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    <Books changeBookShelf={this.changeBook} books={this.state.books.filter((book)=>book.shelf==='currentlyReading')}/>
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  <Books changeBookShelf={this.changeBook} books={this.state.books.filter((book)=>book.shelf==='wantToRead')}/>
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  <Books changeBookShelf={this.changeBook} books={this.state.books.filter((book)=>book.shelf==='read')}/>
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
              <Link to='/search'>
              <button>Add a book</button>
              </Link>
          </div>
        </div>
        )}/>
        </div>
    )
  }
}

export default BooksApp
