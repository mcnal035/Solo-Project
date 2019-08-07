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
             <p>Calendar and dates</p>
         
                
                {this.props.reduxStore.getTrip.map(item => 
                <CalendarItem  key={item.id} item={item}/>)}
                    {/* <>
                    <TableRow key={item.id} value={item.id}>
                        <TableCell>Reserved:<br/> <br/> {item.username} <br/></TableCell> 
                        <TableCell>Start: {item.start_date.substring(5, 7)+ "/" + item.start_date.substring(8,10)+ "/" + item.start_date.substring(0,4)}<br/></TableCell>
                        <TableCell>End: {item.end_date.substring(5, 7)+ "/" + item.end_date.substring(8,10)+ "/" + item.end_date.substring(0,4)} <br/></TableCell>
                        <TableCell classId={styles.notShow}>{this.checkId(item)}</TableCell>
                        <TableCell>{this.handleEdit(item)}</TableCell>
                        <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
                    </TableRow>
                    </> */}
                    
                    
                    


            </>
        )
    } 
}



const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default withStyles(styles)(connect(mapReduxStoreToProps)(CalendarList));