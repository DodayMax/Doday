import { Theme } from '@material-ui/core';

export const common = {
  cell: (theme: Theme) => ({
    borderBottom: `1px solid ${theme.palette.divider}`,
  }),
};
