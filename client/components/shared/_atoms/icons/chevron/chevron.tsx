import * as React from 'react';
import classnames from 'classnames';

const styles = require('./_chevron.module.scss');

interface ChevronProps {
  left?: boolean;
  right?: boolean;
}

export const Chevron = ({ left = true, right }: ChevronProps) => {
  const classNames = classnames({
    [styles.flip]: right,
  });

  return <svg width="20" height="20" className={classNames} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path d="M9.002 11.995l6.518-6.532a1.424 1.424 0 0 0-.616-2.419 1.417 1.417 0 0 0-1.39.409L5 11.986l2.185 2.19 6.358 6.371a1.417 1.417 0 0 0 2.413-.617 1.424 1.424 0 0 0-.408-1.393l-6.546-6.542z" id="chevron-1"/></defs><g fill="none" fillRule="evenodd"><path fill="none" d="M0 0h24v24H0z"/><use fill="#000" xlinkHref="#chevron-1"/></g></svg>;
};