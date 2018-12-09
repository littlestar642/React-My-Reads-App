import React from 'react';
import {Link} from 'react-router-dom';
import Books from './Books';
import {search, getAll} from './BooksAPI';
let storage=window.localStorage;
class BookSearch extends React.Component{


    state={
      query:''
    }
    handleChange=(e)=>{
      let val=e.target.value;
      e.target.onkeyup=(event)=>{
        if(event.keyCode===13){
          search(val).then((books)=>{
            storage.setItem('searchBooks',JSON.stringify(books));
            this.props.getBooks(books)
          })
        }
      }
      
      this.setState({
        query:e.target.value
      })
    }
    handleUpdate=(book,val)=>{
        this.props.changeBookShelfHandle(book,val);
        getAll().then((books)=>this.props.getBooks(books))
    }
    handleResult=()=>{
      if(!this.props.books.error){
        return this.props.books.filter((book)=>{
          return book.title.toLowerCase().includes(this.state.query) && this.state.query!==''
        })  
      }
      else return [];
            
    }

    
    render(){
        return (
            
            <div className="search-books">
            <div className="search-books-bar">
              <Link to='/'>
              <button className="close-search">Close</button>
              </Link>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" value={this.state.query} onChange={this.handleChange} placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <Books books={this.handleResult()} changeBookShelf={(book,val)=>{this.handleUpdate(book,val)}}/>
              </ol>
              {this.props.books.error && (<div>Wrong Search</div>)}
            </div>

          </div>
                  
        )
    }
}
export default BookSearch