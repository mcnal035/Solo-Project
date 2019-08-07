

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

import React, {Component} from 'react';
import { connect } from 'react-redux';
import CalendarList from '../CalendarList/CalendarList';
import Button from '@material-ui/core/Button';



class Calendar extends Component {
    
    state = {
        newTripTime: {
            startDate: '', //new Date()
            endDate:  '',
           
            reserve: 'open', // this will need to change to a reservation time. Then bring in the props for the user name to show on the map.
        }
    }
    //Fetch precreated DB List
    componentDidMount(){
        this.props.dispatch({type:'FETCH_LIST'});
    }

    handleChange = (event, propertyName) => {
        console.log('entered date',  event.target.value);
        this.setState({
            newTripTime: {
                 ...this.state.newTripTime,
                [propertyName]: event.target.value,
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({type:'ADD_DATE', payload: this.state.newTripTime}); // need to create a post to DB. 
    }

render() {
  return (
    <>
        <h1>Arranmore</h1>
      <form onSubmit={this.handleSubmit}>
          <label>Start Date:</label>   
      <input type="date" min="2018-08-04" max="2020-04-02" 
            onChange={(event) => this.handleChange(event, 'startDate')} />
       <br/><label>End Date:</label>
       <input type="date"  
            onChange={(event) => this.handleChange(event, 'endDate')}
       />
      <br/> 
       <select type="text"
            onChange={(event) => this.handleChange(event, 'reserve')}>
         <option value="reserved">Reserved</option>
         <option value="open">Open</option>
         </select> 
          <Button type="submit">Submit</Button>
      </form>
      <div></div>
      
      <div>
        <CalendarList />
      </div>
    
    </>
  );
}
}

    const mapStateToProps = reduxStore =>({
        reduxStore,
       

    });

export default connect(mapStateToProps)(Calendar);
