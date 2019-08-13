import React, {Component} from 'react';
import { connect } from 'react-redux';
import './CalendarItem.css';

//Material UI
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';

//Test Calendar


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
      backgroundColor:'#179600',
      
    }
  
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
        const { classes } = this.props;
        if(this.props.item.user_id === this.props.reduxStore.user.id){
           return(<>
           <Button  className={classes.button} onClick={this.handleClickOpen}>Edit</Button></>)
        }
    } 

    handleDelete = () =>{
        this.props.dispatch({type: 'DELETE_ITEM', payload: this.props.item.id})
        console.log('clicked Delete')
        this.handleClose();
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
                  defaultValue="2017-05-24"
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
                  defaultValue="2017-05-24"
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