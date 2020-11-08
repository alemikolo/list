import React, { FC } from 'react';

const getEvents = (): void => {
  fetch('/api/projects/get', { method: 'GET' })
    .then(res => res.json())
    .then(json => console.error(json))
    .catch(err => console.error(err));
};

const Dashboard: FC = () => {
  return (
    <>
      <div>Dashboard page</div>
      <button onClick={getEvents} type="button">
        server test
      </button>
    </>
  );
};

export default Dashboard;
