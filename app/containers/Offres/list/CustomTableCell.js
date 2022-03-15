import { TableCell, withStyles } from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: '#f7f7f7',
    },
  },
}))(TableCell);
export default CustomTableCell;
