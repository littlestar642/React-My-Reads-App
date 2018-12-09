import React from 'react';
import PropTypes from 'prop-types';

class SelectUtility extends React.Component{
    static propTypes={
        bookId:PropTypes.string.isRequired,
        handleBookChange:PropTypes.func.isRequired
    }
    state={
        value:'none'
    }
    handleChange=(e)=>{
        let val=e.target.value;
        this.setState({value:val})
        this.props.handleBookChange(val);
    }
    
    render(){
        return (
            
                <select value={this.state.value} onChange={(e)=>{this.handleChange(e)}}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
                </select>
                  
        )
    }
}
export default SelectUtility;