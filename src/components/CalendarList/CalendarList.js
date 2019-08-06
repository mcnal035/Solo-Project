import React, {Component} from 'react';
import { connect } from 'react-redux';
import Calendar from '../Calendar/Calendar';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };

class CalendarList extends Component {


    state = {
        left: false,
        editDate: {
            id: this.props.reduxStore.getTrip.user_id,
            updateStartDate: this.props.reduxStore.getTrip.start_date,
            updateEndDate: this.props.reduxStore.getTrip.end_date,

        }
    }



    handleChange = () =>{
        console.log('clicked');
    }


    toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
      };

    handleEdit = (item) =>{
        if(item.user_id === this.props.reduxStore.user.id){
            return(
                <>
                <TableCell><input type="date" min="2018-08-04" max="2020-04-02" 
                onChange={(event) => this.handleChange(event, 'startDate')} /></TableCell>
             
                <TableCell><input type="date"  
                onChange={(event) => this.handleChange(event, 'endDate')}
                /></TableCell>
                <Button onClick={this.handleSubmit}>Submit</Button>
                </>
            )
        }
        
    }

      checkId = (item) =>{
        if(item.user_id === this.props.reduxStore.user.id){
           return(<Button onClick={this.handleEdit}>Edit</Button>)
        }
    } 



    render (){
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
              <List>
                {['Edit'].map((text, index) => (
                  <ListItem button key={text}>
                    <ListItemText primary={text} />
                    <Button onClick={this.handleEdit}>Update</Button>
                  </ListItem>
                ))}
              </List>
              <Divider />
              <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                  <ListItem button key={text}>
                    
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </div>
          );
        

        console.log(this.props.reduxStore.user_id);
        console.log(this.props.reduxStore.user_id);
        return(
            <>
             <p>Calendar and dates</p>
             <SwipeableDrawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
          onOpen={this.toggleDrawer('right', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
            
                {this.props.reduxStore.getTrip.map( item => 
                    <>
                    <TableRow key={item.id} value={item.id}>
                        <TableCell>Reserved:<br/> <br/> {item.username} <br/></TableCell> 
                        <TableCell>Start: {item.start_date.substring(5, 7)+ "/" + item.start_date.substring(8,10)+ "/" + item.start_date.substring(0,4)}<br/></TableCell>
                        <TableCell>End: {item.end_date.substring(5, 7)+ "/" + item.end_date.substring(8,10)+ "/" + item.end_date.substring(0,4)} <br/></TableCell>
                        <TableCell>{this.checkId(item)}</TableCell>
                        <TableCell>{this.handleEdit(item)}</TableCell>
                        <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
                    </TableRow>
                    </>
                    
                    )}
                    


            </>
        )
    } 
}



const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default withStyles(styles)(connect(mapReduxStoreToProps)(CalendarList));