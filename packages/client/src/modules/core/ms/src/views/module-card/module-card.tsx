import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { pushRouteActionCreator } from '@root/modules/core/navigation';
import { Icons } from '@doday/ui';
import { DodayRoutes, RouteSysname } from '@doday/lib';

export const ModuleCard = props => {
  const dispatch = useDispatch();
  const { item, style } = props;

  if (!item) return null;

  return (
    <Grid item key={item.did} style={style}>
      <Card
        onClick={() => {
          console.log('click', item.did);
          dispatch(
            pushRouteActionCreator(
              DodayRoutes.routes[RouteSysname.ModuleDetails]
                .create(item.did)
                .build()
            )
          );
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="body2" component="h2">
              {item.name}
            </Typography>
            <Box display="flex" mt={2} mb={2} alignItems="center">
              <Typography
                variant="body1"
                // className={classes.paddedLabel}
              >
                {item.rate || 0}
              </Typography>
              <Icons.Score color="primary" width={2} height={2} />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
};
