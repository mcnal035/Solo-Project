import {connect} from 'react-redux';
import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
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
  });

class GuestBookList extends Component {
    // state = {
      
    //    log: '',
        
    //   };
    

    //   handleChange = (event, propToChange) => {
    //       console.log('event target', event.target.value)
    //     this.setState({
    //         ...this.state,
    //       [propToChange]: event.target.value,
    //     });
    //   };

    //   handleSubmit = (event) => { 
    //       event.preventDefault();
    //       console.log('clicked submit', this.state.log);
          
    //   }



    render() {
        const { classes } = this.props;
        return(
            <>
            
           <li> {this.props.item.username}<span><br /></span>{this.props.item.date_stamp.substring(5, 7)+ "/" +this.props.item.date_stamp.substring(8,10)+ "/" + this.props.item.date_stamp.substring(0,4)}
           
           
           <br />
            {this.props.item.text} 
            </li>
            </>
        )
    }



}
const mapReduxStoreToProps = reduxStore => ({
    reduxStore
})


export default  withStyles(styles)(connect(mapReduxStoreToProps)(GuestBookList));