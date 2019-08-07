import React, {Component} from 'react';
import { connect } from 'react-redux';

import CalendarItem from '../CalendarItem/CalendarItem';
import { withStyles } from '@material-ui/core/styles';


const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };

class CalendarList extends Component {




    render (){
       
        

       
        return(
            <>
             <h2>Calendar and Dates</h2>    
                {this.props.reduxStore.getTrip.map(item => 
                <CalendarItem  key={item.id} item={item}/>)}
            </>
        )
    } 
}



const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default withStyles(styles)(connect(mapReduxStoreToProps)(CalendarList));