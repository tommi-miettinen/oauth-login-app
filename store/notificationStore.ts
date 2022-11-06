import create from "zustand";
import { v4 as uuid } from "uuid";

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  notify: (notification) => {
    const notificationId = uuid();
    set(() => ({
      notifications: [
        ...get().notifications,
        { ...notification, notificationId },
      ],
    }));
    setTimeout(() => {
      set(() => ({
        notifications: get().notifications.filter(
          (n) => n.notificationId !== notificationId
        ),
      }));
    }, 3000);
  },
}));
