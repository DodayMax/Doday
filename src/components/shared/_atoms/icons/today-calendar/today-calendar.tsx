import * as React from 'react';

export const TodayCalendar = () => {
  return <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><defs><path d="M20 8V5h-2v1h-2V5H8v1H6V5H4v3h16zm0 2H4v10h16V10zm-2-7h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2V2h2v1h8V2h2v1zm-7 12.586l4.293-4.293 1.414 1.414L11 18.414l-3.707-3.707 1.414-1.414L11 15.586z" id="calendar-1"/></defs><g fill="none" fillRule="evenodd"><path fill="none" d="M0 0h24v24H0z"/><mask id="calendar-2" fill="#fff"><use xlinkHref="#calendar-1"/></mask><g mask="url(#calendar-2)" fill="#000"><path d="M0 0h24v24H0z"/></g></g></svg>;
};