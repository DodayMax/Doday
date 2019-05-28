import { Theme, createStyles } from '@material-ui/core';
import { config } from '@root/styles/config';
import { utils } from '@root/styles/utils';

export const css = (theme: Theme) =>
  createStyles({
    input: {
      fontSize: `${config.typographySizes.bodyM}rem`,
      paddingLeft: `${config.spacing.spaceS}px`,
    },
    dodayName: {
      wordBreak: 'break-word',
    },
    resourceDescription: utils.paddingTop(config.spacing.spaceL),
    resourceStatusIcon: {
      height: '1.6rem',
      paddingLeft: '0.4rem',
    },
    completed: {
      color: theme.palette.text.secondary,
    },
    videoWrapper: {
      position: 'relative',
      paddingBottom: '56.25%' /* 16:9 */,
      margin: '3rem 0 0 0',
      height: 0,
      '& iframe': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
      },
    },
    delete: {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.dark,
      '&:focus': {
        backgroundColor: theme.palette.error.dark,
      },
      '&:hover': {
        backgroundColor: theme.palette.error.main,
      },
    },
    spaced: {
      marginBottom: `${config.spacing.spaceXS}px`,
    },
  });
