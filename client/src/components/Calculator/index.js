import React from 'react';
import InputForm from "./InputForm";

// Material UI Components
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import { Zoom } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";

// WithStyles
import styles from '../Styles/Calculator/styles';

class Calculator extends React.Component {
    constructor(props) {
        super(props);
  
    this.state = {
        checked: false
        };
    }
 
    componentDidMount() {
        this.setState(state => ({ checked: !state.checked }));
    }
    handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    
    return (
    <Zoom in={checked}>
      <div className={classes.parent}>
        <CssBaseline />
        <Typography
          component="h1"
          variant="h2"
          color="textPrimary"
          className={classes.header}
          gutterBottom
        >
          Stock Calculator
        </Typography>
        <InputForm gutterBottom />
      </div>
      </Zoom>
    );
  }
}
export default withStyles(styles)(Calculator);
