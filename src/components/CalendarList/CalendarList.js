import React, {Component} from 'react';
import { connect } from 'react-redux';

import CalendarItem from '../CalendarItem/CalendarItem';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableHead from '@material-ui/core/TableHead';
import Table from '@material-ui/core/Table';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
const styles = theme => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    formControl: {
      margin: theme.spacing.unit,
    },
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
      overflowX: 'auto',
    },
    table: {
      minWidth: 700,
    },
   
  });



class CalendarList extends Component {

  state = {
    filterDate:{
    year: '',
    month: "",
    }
  }


  handleChange = (event, propertyToChange) => {
     console.log('event.target.value', event.target.value);
    this.setState({
      filterDate:{
       ...this.state.filterDate,
      [propertyToChange]: event.target.value,
      }
    })
  }
  
  handleSubmit = () => {
  this.props.dispatch({type:'EDIT_MONTH', payload: this.state.filterDate})
    console.log('clicked submit filter');
  }


    render (){
     
      const { classes } = this.props;
      
        return(
            <>
          <div>  
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Filter Month</InputLabel>
              <Select
                className={classes.textField}
                value={this.state.filterDate.month}
                onChange={(event) => this.handleChange(event, 'month')}
                inputProps={{
                  name: 'none',
                }}
              >
                <MenuItem value={"0"}><em>None</em></MenuItem>
                <MenuItem value={"01"}>Jan</MenuItem>
                <MenuItem value={"02"}>Feb</MenuItem>
                <MenuItem value={"03"}>March</MenuItem>
                <MenuItem value={"04"}>April</MenuItem>
                <MenuItem value={"05"}>May</MenuItem>
                <MenuItem value={"06"}>June</MenuItem>
                <MenuItem value={"07"}>July</MenuItem>
                <MenuItem value={"08"}>August</MenuItem>
                <MenuItem value={"09"}>September</MenuItem>
                <MenuItem value={"10"}>October</MenuItem>
                <MenuItem value={"11"}>November</MenuItem>
                <MenuItem value={"12"}>December</MenuItem>
                
              </Select>
      </FormControl>
            <TextField
              id="standard-name"
              label="Year"
              type="text"
              inputProps={{
                maxLength: 4
              }}
              className={classes.textField}
              value={this.state.filterDate.year}
              onChange={(event) => this.handleChange(event, 'year')}
              margin="normal"
            />
          <Button style={{width:170,backgroundColor:'#179600',marginTop:20,}} onClick={() => this.handleSubmit()}>Filter</Button>
        </div>   
             <h2>Calendar Dates</h2> 
        <Table className={classes.table}>
          <TableHead>
            <TableRow component="th" scope="row">
                <TableCell align="left">User</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Reserved</TableCell>
                <TableCell align="left">Change Dates</TableCell>
            </TableRow>
          </TableHead>  
        </Table> 
                {this.props.reduxStore.getTrip.map(item => 
                <CalendarItem  key={item.id} item={item}/>)}
            
            </>
        )
    } 
}

const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default withStyles(styles)(connect(mapReduxStoreToProps)(CalendarList));