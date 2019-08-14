import React, {Component} from 'react';
import { connect } from 'react-redux';
import './CalendarItem.css';

//Material UI
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import Swal from 'sweetalert2';

import moment from 'moment';
//Test Calendar

// styles the component
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '40%',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 400,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: '600px',

    },
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
    tableCell: {
      width: '20%',
      padding: 'auto',
      marginLeft: theme.spacing.unit,
    },
    button:{
      width:20,
      backgroundColor:'#E65B54',
      
    }
  
  });

class CalendarItem extends Component {


    state = {
        open: false,
        editDate: {
            itemId:this.props.item.id,
            updateStartDate: moment(this.props.item.start_date).format('YYYY-MM-DD'),
            updateEndDate: moment(this.props.item.end_date).format('YYYY-MM-DD'), // create a reducer to handle the dates that need to be pulled.
        }
    }
    // sets the changes in state
  handleChange = (event, propertyName) => {
        this.setState({
            editDate: {
                 ...this.state.editDate,
                [propertyName]: event.target.value,
            }
        });
    }

    // function checks if dates have already been taken and once it passes the check it sends the update to the database.
  handleEditSubmit = () =>{
      this.handleClose();
      for (let i = 0; i < this.props.reduxStore.getTrip.length; i++) {
        if ( (this.state.editDate.updateStartDate >=  this.props.reduxStore.getTrip[i].start_date &&  this.state.editDate.updateEndDate <=  this.props.reduxStore.getTrip[i].end_date) ||
          (this.props.reduxStore.getTrip[i].start_date >= this.state.editDate.updateStartDate && this.props.reduxStore.getTrip[i].end_date <= this.state.editDate.updateEndDate)){
            Swal.fire({
              
              type: 'error',
              title: 'Pick a Different Day Dumb-Ass',
              text: `Something went wrong becasue you're an idiot!`, 
            });
            
            return 'good';
     }
      }    
      Swal.fire({
        position: 'top-end',
        type: 'success',
        title: 'Your date has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      this.props.dispatch({type: 'EDIT_ITEM', payload: this.state.editDate});
      this.handleClose();  
    }
  


    // compares the id of the user and the items user id then creates a button to allow edits that take place.
  checkId = (item) =>{
        const { classes } = this.props;
        if(this.props.item.user_id === this.props.reduxStore.user.id){
           return(<>
           <Button  className={classes.button} onClick={this.handleClickOpen}>Edit</Button></>)
        }
    } 
    // function handle deleting infomration from the database.
    //TODO make the dispatch take the dates and hold them to be looked at.
  handleDelete = () =>{
        this.props.dispatch({type: 'DELETE_ITEM', payload: this.props.item.id})
        console.log('clicked Delete', this.state.editDate)
        this.handleClose();
    }


    //Material UI functions hanlde opening a pop up window and closing one.
  handleClickOpen = () => {
    console.log(this.props.item.start_date);
    console.log('this.props.item',  this.props.item)
      this.props.dispatch({type: 'EDIT_DATES', payload: this.props.item})
        this.setState({ 
          open: true, 
          
        });

      };

  handleClose = () => {
        this.setState({ open: false });
      };  

  render() {
        const { classes } = this.props;

        return(     
        <>
        
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Change Date</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
            <TextField
                  id="date"
                  label="Start"
                  type="date"
                  value={this.state.editDate.updateStartDate}
                  onChange={(event) => this.handleChange(event, 'updateStartDate')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                
            <TextField
                  id="date"
                  label="End"
                  type="date"
                  value={this.state.editDate.updateEndDate}
                  onChange={(event) => this.handleChange(event, 'updateEndDate')}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                
            </form>
          </DialogContent>
        <DialogActions>
          <Button onClick={ () => this.handleDelete() } float="left" color="secondary">
              Remove DATE
            </Button>
            <Button onClick={ this.handleClose } color="primary">
              Back
            </Button>
            <Button onClick={ this.handleEditSubmit } color="primary"> 
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      
      {/* <Table className={classes.root}> */}
                <TableRow align="center">
                    <TableCell className={classes.tableCell}>{this.props.item.username}</TableCell> 
                    <TableCell className={classes.tableCell}>{this.props.item.start_date.substring(5, 7)+ "/" + this.props.item.start_date.substring(8,10)+ "/" + this.props.item.start_date.substring(0,4)}</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.item.end_date.substring(5, 7)+ "/" + this.props.item.end_date.substring(8,10)+ "/" + this.props.item.end_date.substring(0,4)}</TableCell>
                    <TableCell className={classes.tableCell}>{this.props.item.open_closed}</TableCell>
                    <TableCell className={classes.tableCell}>{this.checkId(this.props.item)}&nbsp;</TableCell>
                </TableRow>
        
      {/* </Table> */}
            
        </>
        )
    }

}


    const mapReduxStoreToProps = reduxStore => ({
        reduxStore
    })


export default  withStyles(styles)(connect(mapReduxStoreToProps)(CalendarItem));