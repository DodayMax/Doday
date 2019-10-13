import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { clearBuilderActionCreator, activeToolsSelector } from '@doday/ducks';
import { Page, PageHeader, pageflow, AnimationType } from '@doday/shared';

import { WithTools, LayoutSpot } from '@doday/lib';
import { ToolWrapper } from '@root/components/tool-wrapper/tool-wrapper';
import { useTranslation } from 'react-i18next';

export interface BuilderProps {}

export const Builder = pageflow({ animation: AnimationType.UP })(
  (props: BuilderProps & WithTools) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const activeTools = useSelector(activeToolsSelector);
    const onRequestClose = () => {
      dispatch(clearBuilderActionCreator());
    };

    const renderBuilder = () => {
      return Object.values(activeTools).map(tool =>
        tool.config.entities.map(entity => {
          return (
            <Route
              key={entity.name}
              path={`/builder/${entity.name}`}
              render={routerProps => (
                <ToolWrapper
                  tool={tool}
                  place={LayoutSpot.builder}
                  dodayType={entity.type}
                  isProgress={false}
                  t={t}
                />
              )}
            />
          );
        })
      );
    };

    return (
      <Page header={<PageHeader withClose onClose={onRequestClose} />}>
        {renderBuilder()}
      </Page>
    );
  }
);
