import React, {Component} from 'react';
import { connect } from 'react-redux';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import './CalendarItem.css';

//Material UI
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
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
    }

    handleEdit =()=> { 
        if(this.props.item.user_id === this.props.reduxStore.user.id) {
           
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
        <Button onClick={this.handleClickOpen}>Open select dialog</Button>
        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Fill the form</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-native-simple">Age</InputLabel>
                <Select
                  native
                  value={this.state.age}
                //   onChange={this.handleChange('age')}
                  input={<Input id="age-native-simple" />}
                >
                  <option value="" />
                  <option value={10}>Ten</option>
                  <option value={20}>Twenty</option>
                  <option value={30}>Thirty</option>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="age-simple">Age</InputLabel>
                <Select
                  value={this.state.age}
                //   onChange={this.handleChange('age')}
                  input={<Input id="age-simple" />}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
                <TableRow>
                    <TableCell>Reserved:<br/> <br/> {this.props.item.username} <br/></TableCell> 
                    <TableCell>Start: {this.props.item.start_date.substring(5, 7)+ "/" + this.props.item.start_date.substring(8,10)+ "/" + this.props.item.start_date.substring(0,4)}<br/></TableCell>
                    <TableCell>End: {this.props.item.end_date.substring(5, 7)+ "/" + this.props.item.end_date.substring(8,10)+ "/" + this.props.item.end_date.substring(0,4)} <br/></TableCell>
                    <TableCell>{this.checkId(this.props.item)}</TableCell>
                    <TableCell className="hidden">{this.handleEdit(this.props.item)}</TableCell>
                    <Button onClick={this.handleClickOpen}>Open select dialog</Button>
                        {/* <Button onClick={this.toggleDrawer('right', true)}>Open Right</Button> */}
                </TableRow>
            </>
        )
    }

}


const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default  withStyles(styles)(connect(mapReduxStoreToProps)(CalendarItem));