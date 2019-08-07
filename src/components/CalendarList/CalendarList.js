import React, {Component} from 'react';
import { connect } from 'react-redux';

import CalendarItem from '../CalendarItem/CalendarItem';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';

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
             <h2>Calendar Dates</h2> 
             <Table>
             <TableHead>
            <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Change Dates</TableCell>
            </TableRow>
          </TableHead>  
          </Table> 
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