import * as React from 'react';
import { connect } from 'react-redux';
import { actions } from '@ducks/store';
import { Text } from '../../shared/_atoms/typography';
import { Page, PageHeader } from '../../shared/_molecules/page';
import { TypographySize } from '@root/lib/common-interfaces';
import { Pageflow } from '../../shared/_support/pageflow';
import { RootState } from '@root/lib/models';
import { FetchPublicDodaysForStoreAction } from '@root/ducks/store/actions';
import { DodaysQueryParams } from '@root/services/api/dodays/queries';
import { DodayLike } from '@root/tools/types';
import { Card, LayoutBlock } from '@root/components/shared';

interface StoreProps {}

interface PropsFromConnect {
  dodays: DodayLike[];
  fetchPublicDodaysForStoreActionCreator(
    params: DodaysQueryParams
  ): FetchPublicDodaysForStoreAction;
}

@Pageflow({ path: '/store' })
class StoreClassComponent extends React.Component<
  StoreProps & Partial<PropsFromConnect>
> {
  componentDidMount() {
    this.props.fetchPublicDodaysForStoreActionCreator({});
  }

  render() {
    const { dodays } = this.props;
    return (
      <Page header={<PageHeader withClose />}>
        <Text size={TypographySize.h1}>Store</Text>
        <LayoutBlock direction="row">
          {dodays.map(doday => (
            <Card key={doday.did}>
              <LayoutBlock
                styles={{
                  width: '30%',
                }}
              >
                <img src={(doday.resource && doday.resource.image) || ''} />
                <Text size={TypographySize.m}>{doday.name}</Text>
              </LayoutBlock>
            </Card>
          ))}
        </LayoutBlock>
      </Page>
    );
  }
}

const mapState = (state: RootState) => ({
  dodays: state.store.dodays,
});

export const Store = connect(
  mapState,
  { ...actions }
)(StoreClassComponent);
