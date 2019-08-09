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

class GuestBook extends Component {
    state = {
      
       log: '',
        
      };

      handleChange = (event, propToChange) => {
          console.log('event target', event.target.value)
        this.setState({
            ...this.state,
          [propToChange]: event.target.value,
        });
      };

      handleSubmit = (event) => { 
          event.preventDefault();
          console.log('clicked submit');
      }



    render() {
        const { classes } = this.props;
        return(
            <>
            <h1>Guest Book</h1>
            <form className={classes.container} onSubmit={this.handleSubmit}>

        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          rowsMax="4"
          value={this.state.multiline}
          onChange={(event) => this.handleChange(event, 'name')}
          className={classes.textField}
          margin="normal"
          helperText="Share your trip"
          variant="outlined"
        />
             <Button style={{width:170,backgroundColor:'#179600',marginTop:20,}} type="submit">Submit</Button>
            </form>
            </>
        )
    }



}

export default withStyles(styles)((GuestBook));;