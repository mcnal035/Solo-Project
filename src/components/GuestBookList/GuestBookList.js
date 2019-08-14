import {connect} from 'react-redux';
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';


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
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 6,
      paddingBottom: theme.spacing.unit * 6,
      backgroundColor: 'lightblue',
      textAlign: 'left',
      marginTop: '20px',
      // marginBottom: '12px',
      marginLeft: '100px',
      marginRight: '600px',
      width: '600px',
      height: '400px',
      overflow:'auto',
    },
    button:{
      width:25,
      margin:20, 
      backgroundColor: '#E65B54', 
      fontSize:'10px',
    },
  
    divButton: {
      float: 'right',
      marginLeft:'100px',
      width: '1%',
      right:'0',
      
    },
    user:{
      fontSize: '12px',
    },
    text:{
      fontSize: '16px',
      marginBottom: '10px',
      width: '800px',
      textAlign: 'left',
      display: 'inline-block',
    },

  });

class GuestBookList extends Component {
    state = {
      newLog:{
      itemId:this.props.item.id,
      log: '', 
      }
      };
    

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


  handleDelete = () => {
    console.log('clicked Delete, this.props.item.id', this.props.item.id);
    this.props.dispatch({type: 'DELETE_BOOK', payload: this.props.item.id})
  }

    checkId = (item) =>{
      const { classes } = this.props;
      if(this.props.item.user_id === this.props.reduxStore.user.id){
         return(
         <>
         
         <Button  className={classes.button} onClick={this.handleDelete}>Remove</Button>
         
         </>)
      }
  } 


    render() {
      const { classes } = this.props;
        return(
            <> 
            
             {/* {JSON.stringify(this.state)} */}
            
        <div className={classes.user}>{this.props.item.username}&nbsp;{this.props.item.date_stamp.substring(5, 7)+ "/" +this.props.item.date_stamp.substring(8,10)+ "/" + this.props.item.date_stamp.substring(0,4)} </div>
           
           <div className={classes.text}>
           <div className={classes.divButton}>{this.checkId(this.props.item)}</div> 
           <div>{this.props.item.text}</div> 
            <br/>
            </div>
            
            </>
        );
    }



}
const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default  withStyles(styles)(connect(mapReduxStoreToProps)(GuestBookList));