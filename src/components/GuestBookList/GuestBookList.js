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
  
    divButton: {
      textAlign: 'right',

    },
    user:{
      fontSize: '12px',
    },
    text:{
      fontSize: '16px',
      // marginTop: '12px',
      marginBottom: '10px',
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
      if(this.props.item.user_id === this.props.reduxStore.user.id){
         return(<>
         <div className={'divButton'}>
         <Button  style={{width:25,margin:20, float: 'right', backgroundColor: '#E65B54', fontSize:'10px' }} onClick={this.handleDelete}>Remove</Button>
         </div>
         </>)
      }
  } 


    render() {
      const { classes } = this.props;
        return(
            <> 
            
             {/* {JSON.stringify(this.state)} */}
            
           <div className={classes.user}> {this.props.item.username}{this.props.item.date_stamp.substring(5, 7)+ "/" +this.props.item.date_stamp.substring(8,10)+ "/" + this.props.item.date_stamp.substring(0,4)} </div>
           
           <div className={classes.text}>
           {this.checkId(this.props.item)} {this.props.item.text}
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