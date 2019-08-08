

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
  });



class Calendar extends Component {
    
    state = {
        labelWidth: 0,
        
        newTripTime: {
            startDate: '', //new Date()
            endDate:  '',
            reserve: 'none', // this will need to change to a reservation time. Then bring in the props for the user name to show on the map.
        }
    }
    //Fetch precreated DB List
    componentDidMount(){
        this.props.dispatch({type:'FETCH_LIST'});
       
    }

    handleChange = (event, propertyName) => {
        console.log('entered date',  event.target.value);
        this.setState({
            newTripTime: {
                 ...this.state.newTripTime,
                [propertyName]: event.target.value,
            }
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.dispatch({type:'ADD_DATE', payload: this.state.newTripTime}); // need to create a post to DB. 
    }

render() {
    const { classes } = this.props;
  return (
    <>
        
        {this.state.reduxStore}
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
      
      
      <br /><TextField
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
         <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Open/Reserved</InputLabel>
          <Select
            value={this.state.newTripTime.reserve}
            onChange={(event) => this.handleChange(event, 'reserve')}
            inputProps={{
              name: 'reserved',
            }}
          >
            <MenuItem value=""><em>None</em></MenuItem>
            <MenuItem value={"reserved"}>Reserved</MenuItem>
            <MenuItem value={"open"}>Open</MenuItem>
          </Select>
        </FormControl>
         
          <Button style={{width:170,backgroundColor:'#179600',marginTop:20,}} type="submit">Submit</Button>
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
