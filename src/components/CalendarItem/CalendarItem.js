import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './CalendarItem.css';

//Material UI

import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 200,
    },
  });

class CalendarItem extends Component {


    state = {
        open: false,
        editDate: {
            itemId:this.props.item.id,
            updateStartDate: '',
            updateEndDate: '',


        }
    }
    handleChange = (event, propertyName) => {
        this.setState({
            editDate: {
                 ...this.state.editDate,
                [propertyName]: event.target.value,
            }
        });
    }
    handleEditSubmit = () =>{
        this.props.dispatch({type: 'EDIT_ITEM', payload: this.state.editDate});
        this.handleClose();
    }
    


      checkId = (item) =>{
        if(this.props.item.user_id === this.props.reduxStore.user.id){
           return(<>
           <Button onClick={this.handleClickOpen}>Edit</Button></>)
        }
    } 


    //Material UI functions
    handleClickOpen = () => {
        this.setState({ open: true });
      };

    handleClose = () => {
        this.setState({ open: false });
      };  

    render(){
        const { classes } = this.props;



        return(
            
        <>
        <div>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Change your Date</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
             
                  <input type="date"  
                onChange={(event) => this.handleChange(event, 'updateEndDate')}
                />
            
                  <input type="date" min="2018-08-04" max="2020-04-02" 
                onChange={(event) => this.handleChange(event, 'updateStartDate')} />
                
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Back
            </Button>
            <Button onClick={this.handleEditSubmit} color="primary"> 
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <Table>
          <TableHead>
            <TableRow>
                <TableCell>Users</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Change Dates</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
                <TableRow>
                    <TableCell>{this.props.item.username} <br/></TableCell> 
                    <TableCell>Start: {this.props.item.start_date.substring(5, 7)+ "/" + this.props.item.start_date.substring(8,10)+ "/" + this.props.item.start_date.substring(0,4)}<br/></TableCell>
                    <TableCell>End: {this.props.item.end_date.substring(5, 7)+ "/" + this.props.item.end_date.substring(8,10)+ "/" + this.props.item.end_date.substring(0,4)} <br/></TableCell>
                    <TableCell>{this.checkId(this.props.item)}</TableCell>
                </TableRow>
        </TableBody>
      </Table>
        </>
        )
    }

}


const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default  withStyles(styles)(connect(mapReduxStoreToProps)(CalendarItem));