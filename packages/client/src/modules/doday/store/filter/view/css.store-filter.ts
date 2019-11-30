import { makeStyles, createStyles } from '@material-ui/styles';
import { Theme } from '@material-ui/core';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    searchContainer: {
      width: '70%',
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    searchInput: {
      fontSize: '2.6rem',
    },
    tag: {
      '&:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
    },
  })
);
