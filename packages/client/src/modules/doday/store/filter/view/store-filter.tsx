import React, { useEffect, useState } from 'react';
import { Box, TextField, Chip } from '@material-ui/core';
import { useStyles } from './css.store-filter';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { availableEntitiesSelector } from '@redux/auth';
import { capitalize, Behavior, Route } from '@doday/lib';
import { pushRouteActionCreator } from '@redux/navigation';
import { RouteSystem } from '@root/core/systems';

export interface StoreFilterProps {
  route: Route;
}

export const StoreFilter = (props: StoreFilterProps) => {
  const dispatch = useDispatch();
  const css = useStyles({});
  const entities = useSelector(availableEntitiesSelector);
  const filteredEntities =
    entities &&
    entities.filter(entity =>
      entity.doday.behavior.includes(Behavior.Publishable)
    );
  const [selectedEntities, updateSelectedEntities] = useState([]);

  useEffect(() => {
    const nodes = props.route && props.route.query && props.route.query.node;
    if (nodes) {
      updateSelectedEntities(props.route.query.node.split(','));
    } else {
      updateSelectedEntities([]);
    }
  }, [props.route]);

  return (
    <Box
      display="flex"
      flexGrow={1}
      justifyContent="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        flexGrow={1}
        justifyContent="center"
        alignItems="flex-end"
        mt={4}
        mb={4}
        className={css.searchContainer}
      >
        <Box mb={2} mr={4}>
          <SearchIcon color="disabled" />
        </Box>
        <TextField
          fullWidth
          id="doday-search"
          label={'Search for doday'}
          // onChange={e => this.props.setSearchTermActionCreator(e.target.value)}
          // onKeyDown={this.onSearch}
          InputProps={{
            classes: {
              input: css.searchInput,
            },
          }}
        />
      </Box>
      <Box display="flex" justifyContent="center" mb={4}>
        {filteredEntities &&
          filteredEntities.map(entity => (
            <Chip
              key={entity.doday.did}
              label={capitalize(entity.doday.doday)}
              clickable
              color={
                selectedEntities.includes(entity.doday.doday)
                  ? 'primary'
                  : undefined
              }
              onClick={() => {
                if (selectedEntities.includes(entity.doday.doday)) {
                  dispatch(
                    pushRouteActionCreator(
                      RouteSystem.api()
                        .routes.store.create()
                        .query({
                          node: selectedEntities
                            .filter(selected => selected !== entity.doday.doday)
                            .join(','),
                        })
                        .build()
                    )
                  );
                } else {
                  dispatch(
                    pushRouteActionCreator(
                      RouteSystem.api()
                        .routes.store.create()
                        .query({
                          node: selectedEntities
                            .concat(entity.doday.doday)
                            .join(','),
                        })
                        .build()
                    )
                  );
                }
              }}
              className={css.tag}
            />
          ))}
      </Box>
    </Box>
  );
};
