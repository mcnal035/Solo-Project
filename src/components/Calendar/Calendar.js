

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

import React, {Component} from 'react';
import { connect } from 'react-redux';
import CalendarList from '../CalendarList/CalendarList';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Swal from 'sweetalert2';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 400,
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 400,
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
    button:{
      width:170,
      backgroundColor:'#179600',
      marginTop:20,
      marginRight: '50px',
      marginBottom: '60',
      marginLeft:'650px'
    },
  });



class Calendar extends Component {
    
    state = {
        labelWidth: 0,
        
        newTripTime: {
            startDate: '', //new Date()
            endDate:  '',
            reserve: 'None', // this will need to change to a reservation time. Then bring in the props for the user name to show on the map.
        }
    }
    //Fetch precreated DB List to display on the page with the dates
  componentDidMount(){
        this.props.dispatch({type:'FETCH_LIST'});
       
    }
    // sets the state when the event changes.
  handleChange = (event, propertyName) => {
        console.log('entered date',  event.target.value);
        this.setState({
            newTripTime: {
                 ...this.state.newTripTime,
                [propertyName]: event.target.value,
            }
        });
    }
    // submits the changes if they pass the check 
  handleSubmit = (event, i) => {
      event.preventDefault();
      for (let i = 0; i < this.props.reduxStore.getTrip.length; i++) {
        if ( (this.state.newTripTime.startDate >=  this.props.reduxStore.getTrip[i].start_date &&  this.state.newTripTime.endDate <=  this.props.reduxStore.getTrip[i].end_date) ||
          (this.props.reduxStore.getTrip[i].start_date >= this.state.newTripTime.startDate && this.props.reduxStore.getTrip[i].end_date <= this.state.newTripTime.endDate)){
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
        this.props.dispatch({type:'ADD_DATE', payload: this.state.newTripTime}); // need to create a post to DB. 
  }


  render() {
    const { classes } = this.props;
    return (
      <>
          
          {this.state.reduxStore}
          <h2 align="center">Calendar</h2> 
        <form onSubmit={this.handleSubmit} className={classes.root} autoComplete="off">
        
          <TextField
                    id="date"
                    label="Start"
                    type="date"
                    defaultValue=''
                    onChange={(event) => this.handleChange(event, 'startDate')}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /><br />
        
        &nbsp;
        <br />&nbsp;&nbsp;<TextField
                    id="date"
                    label="End"
                    type="date"
                    defaultValue=''
                    onChange={(event) => this.handleChange(event, 'endDate')}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  /> 
        <br/> 
        &nbsp;&nbsp;
          <FormControl className={classes.textField}>
            <InputLabel htmlFor="age-simple">Open/Reserved</InputLabel>
            <Select
              value={this.state.newTripTime.reserve}
              onChange={(event) => this.handleChange(event, 'reserve')}
              inputProps={{
                name: 'reserved',
              }}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              <MenuItem value={"Reserved"}>Reserved</MenuItem>
              <MenuItem value={"Open"}>Open</MenuItem>
            </Select>
          </FormControl>
          
            <Button className={classes.button} type="submit">Submit</Button>
        </form>
        <div></div>
        
        <div>
          <CalendarList />
        </div>
      
      </>
    );
  }
}

    const mapStateToProps = reduxStore =>({
        reduxStore,
       

    });

export default  withStyles(styles)(connect(mapStateToProps)(Calendar));
