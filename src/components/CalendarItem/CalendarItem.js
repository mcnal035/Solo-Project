import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

const styles = {
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
  };

class CalendarItem extends Component {


    state = {
        left: false,
        editDate: {
            
            // id: this.props.reduxStore.user.id,
            itemId:this.props.item.id,
            updateStartDate: '',
            updateEndDate: '',


        }
    }
    handleChange = (event, propertyName) =>{
        console.log('clicked', event.target.value);
        this.setState({
            editDate: {
                 ...this.state.editDate,
                [propertyName]: event.target.value,
            }
        });
    }
    handleEditSubmit = () =>{
        this.props.dispatch({type: 'EDIT_ITEM', payload: this.state.editDate});
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
                onChange={(event) => this.handleChange(event, 'updateStartDate')} /></TableCell>
             
                <TableCell><input type="date"  
                onChange={(event) => this.handleChange(event, 'updateEndDate')}
                /></TableCell>
                <Button onClick={this.handleEditSubmit}>Submit</Button>
                </>
            )
        }
        
    }

      checkId = (item) =>{
        if(this.props.item.user_id === this.props.reduxStore.user.id){
           return(<Button onClick={this.handleEdit}>Edit</Button>)
        }
    } 

    render(){
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
        return(
            
            <>
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
                <TableRow >
                    <TableCell>Reserved:<br/> <br/> {this.props.item.username} <br/></TableCell> 
                    <TableCell>Start: {this.props.item.start_date.substring(5, 7)+ "/" + this.props.item.start_date.substring(8,10)+ "/" + this.props.item.start_date.substring(0,4)}<br/></TableCell>
                    <TableCell>End: {this.props.item.end_date.substring(5, 7)+ "/" + this.props.item.end_date.substring(8,10)+ "/" + this.props.item.end_date.substring(0,4)} <br/></TableCell>
                    <TableCell classId={styles.notShow}>{this.checkId(this.props.item)}</TableCell>
                    <TableCell>{this.handleEdit(this.props.item)}</TableCell>
                        <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button>
                </TableRow>
            </>
        )
    }

}


const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default  withStyles(styles)(connect(mapReduxStoreToProps)(CalendarItem));