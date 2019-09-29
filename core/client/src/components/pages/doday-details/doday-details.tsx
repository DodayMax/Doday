import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RouteComponentProps, StaticContext } from 'react-router';
import ducks, { activeToolsSelector, selectedDodaySelector } from '@doday/duck';
import { LayoutSpot, useRouter } from '@doday/lib';
import { ToolWrapper } from '@root/components/tool-wrapper/tool-wrapper';
import { useTranslation } from 'react-i18next';

export const DodayDetails = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const router: RouteComponentProps<any, StaticContext, any> = useRouter();
  const activeTools = useSelector(activeToolsSelector);
  const selectedDoday = useSelector(selectedDodaySelector);

  useEffect(() => {
    const did = router.match.params.did;
    dispatch(ducks.details.actions.fetchSelectedDodayActionCreator(did));
  }, []);

  if (!selectedDoday) {
    return <>Loading...</>;
  }

  const selectedDodayType = selectedDoday && selectedDoday.type;
  const tool =
    activeTools &&
    Object.values(activeTools).find(
      tool =>
        tool.config.entities &&
        !!tool.config.entities.find(entity => entity.type === selectedDodayType)
    );

  return (
    <ToolWrapper
      tool={tool}
      place={LayoutSpot.details}
      dodayType={selectedDodayType}
      isProgress={false}
      t={t}
    />
  );
};
