import React from 'react';

export interface WithQuery {
  query: { [key: string]: string };
}

export const StoreFilter = (props: WithQuery) => {
  console.log(props.query);
  return <div>Store filter</div>;
};
