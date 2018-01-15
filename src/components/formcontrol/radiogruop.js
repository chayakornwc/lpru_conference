import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import  { RadioGroup } from 'material-ui/Radio';
import { FormLabel, FormControl, FormControlLabel, FormHelperText } from 'material-ui/Form';


const styles = theme => ({
  root: {
    display: 'flex',
    width:'100%'
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
    display: 'inline-block'
  },
});

class RadioG extends React.Component {
  state = {
    value: '',
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" required className={classes.formControl}>
          <FormLabel component="legend">{this.props.name}</FormLabel>
          <RadioGroup
            aria-label={this.props.name}
            name={this.props.name}
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
           {this.props.children}
          
          </RadioGroup>
        </FormControl>
       
      </div>
    );
  }
}

RadioG.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RadioG);
