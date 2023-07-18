import React from 'react';

const Notification = ({ message,isError }) => {
    const notificationClass = isError ? 'notification error' : 'notification success';

    return <div className={notificationClass}>{message}</div>;
};

export default Notification;
