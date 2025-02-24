import {connect} from 'react-redux';
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';


import Button from '@material-ui/core/Button';
import GuestBookList from '../GuestBookList/GuestBookList';
import Paper from '@material-ui/core/Paper';

// styles the page.
const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
    },
    dense: {
      marginTop: 16,
    }, 
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      backgroundColor: 'lightblue',
      textAlign: 'left',
      marginTop: '1px',
      marginBottom: '1px',
      marginLeft: '100px',
       marginRight: '600px',
      width: '70%',
      height: '400px',
      overflow:'auto',
    },
    button:{
      width:'100px',
      margin: '20px', 
      backgroundColor: '#179600', 
      fontSize:'10px',
    },
    header: {
      marginTop: '1px',
      marginBottom: '1px',
      marginLeft: '100px',
      marginRight: '600px',
    },
    menu: {
      width: 200,
    },
    textArea:{
      width: '50%', 
    }
  });

class GuestBook extends Component {
    state = {
      newLog:{
       log: '',
      }
        
      };
      // grabs the guest list information and displays it.
  componentDidMount(){
        this.props.dispatch({type:'FETCH_BOOK'});
    }
    //takes the state of the event and sets it to then be dispatched to the DB.
  handleChange = (event, propToChange) => {
           console.log('event target', event.target.value)
        this.setState({
            newLog:{
            // ...this.state.newLog,
          [propToChange]: event.target.value,
            }
        });
      };
      // takes the new setState and dispatches it to the Database.
  handleSubmit = (event) => { 
          event.preventDefault();
          this.setState({
            newLog:{
              log: '',
            }
          })
        //   console.log('clicked submit',  this.state.log);
          this.props.dispatch({type:'POST_LOG', payload: this.state.newLog});
      }
      



  render() {
        const { classes } = this.props;
    return(
            <>
            {/* {JSON.stringify(this.state)} */}
            <form  value={this.state.newLog.log} onSubmit={this.handleSubmit}>
            <h1>Guest Book</h1>
            <textarea rows="10" cols="80" maxLength="999" className={classes.textArea} value={this.state.newLog.log}  
                onChange={(event) => this.handleChange(event, 'log')}></textarea>

            &nbsp;&nbsp;&nbsp; <Button className={classes.button} type="submit">Submit</Button>
            </form>
            <h1 className={classes.header}>Guest Entries</h1>
            <Paper className={classes.root} elevation={1}>
        {this.props.reduxStore.guestBookReducer.map(item => 
            <GuestBookList  key={item.id} item={item} />)}
            </Paper>
            </>
        );
    }
}


      const mapStateToProps = reduxStore =>({
          reduxStore 

      });


export default withStyles(styles)(connect(mapStateToProps)(GuestBook));