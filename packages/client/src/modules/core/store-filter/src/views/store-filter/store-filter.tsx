import React, { useEffect, useState } from 'react';
import { Box, TextField, Chip } from '@material-ui/core';
import { useStyles } from './css.store-filter';
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch } from 'react-redux';
import { availableEntitiesSelector } from '@core/ms/src/redux/selectors';
import { capitalize, DodayRoutes, Behavior } from '@doday/lib';
import { pushRouteActionCreator } from '@core/navigation';

export interface WithQuery {
  query: { [key: string]: string };
}

export const StoreFilter = (props: WithQuery) => {
  const dispatch = useDispatch();
  const css = useStyles({});
  const entities = useSelector(availableEntitiesSelector);
  const filteredEntities = entities.filter(entity =>
    entity.behavior.includes(Behavior.Publishable)
  );
  const [selectedEntities, updateSelectedEntities] = useState([]);

  useEffect(() => {
    const entities = props.query && props.query.node;
    if (entities) {
      updateSelectedEntities(props.query.node.split(','));
    } else {
      updateSelectedEntities([]);
    }
  }, [props.query]);

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
        {filteredEntities.map(entity => (
          <Chip
            key={entity.doday}
            label={capitalize(entity.doday)}
            clickable
            color={
              selectedEntities.includes(entity.doday) ? 'primary' : undefined
            }
            onClick={() => {
              if (selectedEntities.includes(entity.doday)) {
                dispatch(
                  pushRouteActionCreator(
                    DodayRoutes.routes.store
                      .create()
                      .query({
                        node: selectedEntities
                          .filter(selected => selected !== entity.doday)
                          .join(','),
                      })
                      .build()
                  )
                );
              } else {
                dispatch(
                  pushRouteActionCreator(
                    DodayRoutes.routes.store
                      .create()
                      .query({
                        node: selectedEntities.concat(entity.doday).join(','),
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
