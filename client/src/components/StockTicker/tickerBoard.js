import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    width: '65%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 400,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },

});

let id = 0;
function createData(name, Dow, Nasdaq, SP, Citigroup, GE, Google, Amazon, Apple, Microsoft ) {
  id += 1;
  return { id, name, Dow, Nasdaq, SP, Citigroup, GE, Google, Amazon, Apple, Microsoft };
}

const rows = [
  createData('Dow', 159, 6.0, 24),
  createData('Nasdaq', 237, 9.0, 37),
  createData('S&P', 262, 16.0, 24),
  createData('Citigroup', 305, 3.7, 434),
  createData('General Electric', 356, 16.0, 49),
  createData('Google', 222.3, 443, 44.4),
  createData('Amazon', 222.3, 443, 44.4),
  createData('Apple', 222.3, 443, 44.4),
  createData('Microsoft', 222.3, 443, 44.4)
]

function StockTicker(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Symbol</TableCell>
            <TableCell align="right">Open</TableCell>
            <TableCell align="right">High</TableCell>
            <TableCell align="right">Low</TableCell>
            <TableCell align="right">Close</TableCell>
            <TableCell align="right">Change</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.id} className={classes.row}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.Dow}</TableCell>
              <TableCell align="right">{row.NASDAQ}</TableCell>
              <TableCell align="right">{row.AMAZON}</TableCell>
              <TableCell align="right">{row.GOOGLE}</TableCell>
              <TableCell align="right">{row.APPLE}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

StockTicker.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StockTicker);