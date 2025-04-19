export const checkPermission = () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return false;
  }
  
  if (Notification.permission === 'granted') {
    return true;
  }
  
  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        return true;
      }
    });
  }
  
  return false;
};

export const sendNotification = (title: string, options: NotificationOptions = {}) => {
  if (!checkPermission()) return;
  
  const notification = new Notification(title, options);
  
  notification.onclick = () => {
    window.focus();
    notification.close();
  };
  
  return notification;
};

export const scheduleDeadlineReminders = (tasks: any[]) => {
  // Clear any existing reminders
  if (typeof localStorage !== 'undefined') {
    const reminderIds = JSON.parse(localStorage.getItem('reminderIds') || '[]');
    reminderIds.forEach((id: number) => clearTimeout(id));
    localStorage.setItem('reminderIds', JSON.stringify([]));
  }
  
  const newReminderIds: number[] = [];
  
  tasks.forEach(task => {
    if (!task.deadline || task.completed) return;
    
    const deadlineTime = new Date(task.deadline).getTime();
    const now = new Date().getTime();
    
    // If deadline is in the future
    if (deadlineTime > now) {
      // Remind 1 hour before deadline
      const reminderTime = deadlineTime - (60 * 60 * 1000);
      const timeUntilReminder = reminderTime - now;
      
      if (timeUntilReminder > 0) {
        const timerId = window.setTimeout(() => {
          sendNotification(`Task Reminder: ${task.title}`, {
            body: `Your task "${task.title}" is due in 1 hour.`,
            icon: '/favicon.ico'
          });
        }, timeUntilReminder);
        
        newReminderIds.push(timerId);
      }
      
      // Also remind 15 minutes before deadline
      const shortReminderTime = deadlineTime - (15 * 60 * 1000);
      const timeUntilShortReminder = shortReminderTime - now;
      
      if (timeUntilShortReminder > 0) {
        const timerId = window.setTimeout(() => {
          sendNotification(`Urgent Task Reminder: ${task.title}`, {
            body: `Your task "${task.title}" is due in 15 minutes!`,
            icon: '/favicon.ico'
          });
        }, timeUntilShortReminder);
        
        newReminderIds.push(timerId);
      }
    }
  });
  
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('reminderIds', JSON.stringify(newReminderIds));
  }
};