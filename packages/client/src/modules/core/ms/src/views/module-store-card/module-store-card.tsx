import React from 'react';
import {
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  CardActions,
  Button,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { Icons } from '@doday/ui';
import { DodayRoutes, RouteSysname } from '@doday/lib';
import { pushRouteActionCreator } from '@modules/core/navigation';
import { buyModuleActionCreator } from '@root/modules/core/ms';

export const ModuleStoreCard = props => {
  const dispatch = useDispatch();
  const { item, style } = props;

  if (!item) return null;

  const handleBuyModule = () => {
    dispatch(buyModuleActionCreator(item.doday.did));
  };

  return (
    <Grid item key={item.doday.did} style={style}>
      <Card
        onClick={() => {
          console.log('click', item.doday.did);
          dispatch(
            pushRouteActionCreator(
              DodayRoutes.routes[RouteSysname.DodayDetails]
                .create(item.doday.did)
                .build()
            )
          );
        }}
      >
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="body2" component="h2">
              {item.doday.sysname}
            </Typography>
            <Box display="flex" mt={2} mb={2} alignItems="center">
              <Typography
                variant="body1"
                // className={classes.paddedLabel}
              >
                {item.doday.rate || 0}
              </Typography>
              <Icons.Score color="primary" width={2} height={2} />
            </Box>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary" onClick={handleBuyModule}>
            Buy
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};
