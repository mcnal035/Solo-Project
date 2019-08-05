import React, {Component} from 'react';
import { connect } from 'react-redux';
import Calendar from '../Calendar/Calendar';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

class CalendarList extends Component {

    render (){

        return(
            <>
             <p>Calendar and dates</p>
            <div>
                {this.props.reduxStore.getTrip.map( item =>
                    <>
                    <TableRow key={item.id} value={item.id}>
                        <TableCell>Reserved:<br/> <br/>` {item.name} <br/></TableCell> 
                        <TableCell>Start: {item.start_date.substring(5, 7)+ "/" + item.start_date.substring(8,10)+ "/" + item.start_date.substring(0,4)}<br/></TableCell>
                        <TableCell>End: {item.end_date.substring(5, 7)+ "/" + item.end_date.substring(8,10)+ "/" + item.end_date.substring(0,4)} <br/></TableCell>
                </TableRow>
                    </>
                    
                    )}
             </div>


            </>
        );
    }
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default connect(mapReduxStoreToProps)(CalendarList);