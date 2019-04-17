import * as React from 'react';
import { Text } from '../shared/_atoms/typography';
import { Page, PageHeader } from '../shared/_molecules/page';
import { TypographySize } from '@root/lib/common-interfaces';

export const Profile = () => (
  <Page header={<PageHeader><a href="/api/logout">Logout</a></PageHeader>}>
    <Text size={TypographySize.h1}>
      Profile
    </Text>
  </Page>
);