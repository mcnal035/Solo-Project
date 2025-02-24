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


import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    textField: {
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      width: 200,
      overFlow: "auto",

    },
    formControl: {
      margin: theme.spacing.unit,
      display: 'flex',
    },
    // root: {
    //   width: '100%',
    //   marginTop: theme.spacing.unit * 3,
    //   overflowX: 'auto',
    // },
    table: {
      minWidth:   'auto',
      
    },
    tableCell: {
      width: '20%',
      padding: 'auto',
      marginLeft: theme.spacing.unit,
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '20%',
    },
    button:{
      width:170,
      backgroundColor:'#179600',
      textAlign: 'center',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '25px',
      marginBottom: '45px',
    },
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      backgroundColor: 'lightblue',
      textAlign: 'left',
      overflow:'auto',
      height: '400px',
      marginLeft: '60px',
      marginRight: '60px',
      marginBottom: '10px',
      marginTop: '10px',
    },
   title:{
    marginLeft: '10px',
     borderBottom:"2px solid",

   },
  });



class CalendarList extends Component {

  state = {
    filterDate:{
    year: '',
    month: "",
    }
  }

 //takes the inputs for month and year and sets state.
  handleChange = (event, propertyToChange) => {
     console.log('event.target.value', event.target.value);
    this.setState({
      filterDate:{
       ...this.state.filterDate,
      [propertyToChange]: event.target.value,
      }
    })
  }
  // function takes month and year and filters the specified month and year to show.
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
          <h3  className={classes.textField}>Select A Month</h3>
          {/* <InputLabel className={classes.textField} htmlFor="age-simple">Filter Month</InputLabel> */}
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
          <Button className={classes.button} onClick={() => this.handleSubmit()}>Filter</Button>
          </FormControl>
        </div>   
             
      <Paper className={classes.root} elevation={1}>
        <h2 className={classes.title}>Calendar Dates</h2> 
        <Table className={classes.table}>
          <TableHead>
            <TableRow component="tr" scope="row">
                <TableCell className={classes.tableCell}>User</TableCell>
                <TableCell className={classes.tableCell}>Start Date</TableCell>
                <TableCell className={classes.tableCell}>End Date</TableCell>
                <TableCell className={classes.tableCell}>Reserved</TableCell>
                <TableCell className={classes.tableCell}>Change Dates</TableCell>
            </TableRow>
          </TableHead>  
              <TableBody>
                {this.props.reduxStore.getTrip.map(item => 
                <CalendarItem  key={item.id} item={item}/>)}
                </TableBody>
            </Table> 
      </Paper>
            </>
      );
  } 
}

    const mapReduxStoreToProps = reduxStore => ({
        reduxStore
    })


export default withStyles(styles)(connect(mapReduxStoreToProps)(CalendarList));