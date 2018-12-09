import React from 'react';
import PropTypes from 'prop-types';

class SelectUtility extends React.Component{
    static propTypes={
        bookId:PropTypes.string.isRequired,
        handleBookChange:PropTypes.func.isRequired
    }
    
    render(){
        return (
            
                <select onChange={(e)=>{let val=e.target.value;
                                        this.props.handleBookChange(val);}}>
                <option value="move">Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none" defaultValue>None</option>
                </select>
                  
        )
    }
}
export default SelectUtility;