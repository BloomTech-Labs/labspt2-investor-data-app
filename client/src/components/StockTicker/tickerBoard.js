import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '75%',
    marginTop: theme.spacing.unit * 3,
    marginLeft: 'auto',
    marginRight: 'auto',
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

let id = 0;
function createData(name, open, high, low, close, change) {
  id += 1;
  return { id, name, open, high, low, close, change };
}

// Dummy data until stock ticker functionality has been achieved
const rows = [
  createData('Dow', 159, 6.0, 24, 4.0, 2),
  createData('Nasdaq', 237, 9.0, 37, 4.3, 5),
  createData('S&P', 262, 16.0, 24, 6.0, 3),
  createData('Citigroup', 305, 3.7, 67, 4.3, 4),
  createData('Apple', 356, 16.0, 49, 3.9, 2),
];

function TickerBoard(props) {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Symbol</CustomTableCell>
            <CustomTableCell align="right">Start</CustomTableCell>
            <CustomTableCell align="right">High</CustomTableCell>
            <CustomTableCell align="right">Low</CustomTableCell>
            <CustomTableCell align="right">Close</CustomTableCell>
            <CustomTableCell align="right">Change</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row">
                {row.name}
              </CustomTableCell>
              <CustomTableCell align="right">{row.open}</CustomTableCell>
              <CustomTableCell align="right">{row.high}</CustomTableCell>
              <CustomTableCell align="right">{row.low}</CustomTableCell>
              <CustomTableCell align="right">{row.close}</CustomTableCell>
              <CustomTableCell align="right">{row.change}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

TickerBoard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TickerBoard);