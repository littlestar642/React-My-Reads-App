import React from 'react';
import {Link} from 'react-router-dom';
import Books from './Books';
import {search} from './BooksAPI';

class BookSearch extends React.Component{


    state={
      query:'',
      newBooks:[],
    }
    handleChange=(e)=>{
      let val=e.target.value;
      search(val).then((books)=>{
        this.setState({newBooks:books});
      })
      this.setState({
        query:e.target.value
      })
    }
    handleUpdate=(book,val)=>{
        this.props.changeBookShelfHandle(book,val);
    }
    handleResult=()=>{
      let finalBooks=[];
      let oldArr=this.props.books;
      let newArr=this.state.newBooks;
      if(this.state.newBooks && !this.state.newBooks.error){
        for(let x of newArr){
          let found=0;
          for(var j=0;j<oldArr.length;j++){
            if(x.id===oldArr[j]['id']){
              finalBooks.push(oldArr[j]);
              found=1;
              break;
            }
          }
          if(found)continue;
          finalBooks.push(x);
    }
      }
          if(this.state.newBooks && !this.state.newBooks.error){
        return finalBooks.filter((book)=>{
          if(!book.shelf)book.shelf='none';
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
                <input type="text" value={this.state.query} onChange={this.handleChange} placeholder="Press Enter to search by Title"/>
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                <Books books={this.handleResult()}  changeBookShelf={(book,val)=>{this.handleUpdate(book,val)}}/>
              </ol>
              {this.state.newBooks && this.state.newBooks.error && (<div>Wrong Search. Please Re-enter</div>)}
            </div>

          </div>
                  
        )
    }
}
export default BookSearch