import {connect} from 'react-redux';
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import GuestBookList from '../GuestBookList/GuestBookList';


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
    menu: {
      width: 200,
    },
  });

class GuestBook extends Component {
    state = {
      newLog:{
       log: '',
      }
        
      };

      componentDidMount(){
        this.props.dispatch({type:'FETCH_BOOK'});
    }

      handleChange = (event, propToChange) => {
           console.log('event target', event.target.value)
        this.setState({
            newLog:{
            ...this.state.newLog,
          [propToChange]: event.target.value,
            }
        });
      };

      handleSubmit = (event) => { 
          event.preventDefault();
        //   console.log('clicked submit',  this.state.log);
          this.props.dispatch({type:'POST_LOG', payload: this.state.newLog});
      }



    render() {
        const { classes } = this.props;
        return(
            <>
            <h1>Guest Book</h1>
            <form className={classes.container} onSubmit={this.handleSubmit}>
            <textarea rows="10" cols="80" maxLength="999"
                onChange={(event) => this.handleChange(event, 'log')}></textarea>

             <Button style={{width:80,backgroundColor:'#179600',marginTop:20,}} type="submit">Submit</Button>
            </form>
            <h1>Guest List</h1>
            <ul>
        {this.props.reduxStore.guestBookReducer.map(item => 
            <GuestBookList  key={item.id} item={item}/>)}
            </ul>
            </>
        )
    }



}


const mapStateToProps = reduxStore =>({
    reduxStore,
   

});


export default withStyles(styles)(connect(mapStateToProps)(GuestBook));