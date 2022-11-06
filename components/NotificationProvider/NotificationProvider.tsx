import { useNotificationStore } from "../../store/notificationStore";

const Success = ({ message }: { message: string }) => (
  <div
    className={`
    text-white border border-gray-700 font-semibold
    p-4 m-4 rounded-lg min-w-[300px] border-b-[4px] border-b-green-400 slide
  `}
  >
    {message}
  </div>
);

const Error = ({ message }: { message: string }) => (
  <div
    className={`text-white border border-gray-700 font-semibold
     p-4 m-4 rounded-lg min-w-[300px] border-b-[4px] border-b-red-400 slide
  `}
  >
    {message}
  </div>
);

const Notification = ({ notification }: { notification: AppNotification }) => {
  switch (notification.type) {
    case "success":
      return <Success message={notification.message} />;
    case "error":
      return <Error message={notification.message} />;
    default:
      return null;
  }
};

const NotificationProvider = ({ children }: { children: any }) => {
  const notifications = useNotificationStore((store) => store.notifications);

  return (
    <div className="h-full w-full bg-transparent absolute top-0 overflow-hidden">
      <div className="absolute right-0">
        {notifications.map((n) => (
          <Notification key={n.notificationId} notification={n} />
        ))}
      </div>
      {children}
    </div>
  );
};

export default NotificationProvider;
