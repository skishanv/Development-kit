// Format date for display
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Get week dates
export function getWeekDates(date: Date = new Date()): Date[] {
  const current = new Date(date);
  const week: Date[] = [];
  current.setDate(current.getDate() - current.getDay());

  for (let i = 0; i < 7; i++) {
    week.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return week;
}

// Check if date is today
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

// Check if date is in the past
export function isPastDate(date: Date): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
}

// Get relative date description
export function getRelativeDateStr(date: Date): string {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'Today';
  if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
  if (date.toDateString() === yesterday.toDateString()) return 'Yesterday';

  return formatDate(date);
}

// Get month calendar dates
export function getMonthDates(year: number, month: number): Date[] {
  const dates: Date[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  // Add dates from previous month to start on Sunday
  const daysFromPrevMonth = firstDay.getDay();
  const prevMonth = new Date(year, month - 1, 1);
  for (let i = daysFromPrevMonth - 1; i >= 0; i--) {
    dates.push(new Date(year, month - 1, prevMonth.getDate() - i));
  }

  // Add dates from current month
  for (let date = 1; date <= lastDay.getDate(); date++) {
    dates.push(new Date(year, month, date));
  }

  // Add dates from next month to complete the calendar grid
  const remainingDays = 42 - dates.length; // 6 rows × 7 days
  for (let date = 1; date <= remainingDays; date++) {
    dates.push(new Date(year, month + 1, date));
  }

  return dates;
}

// Format time for display
export function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  }).format(date);
}

// Parse time string
export function parseTime(timeStr: string): Date {
  const [time, period] = timeStr.split(' ');
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setHours(
    period === 'PM' && hours !== 12 ? hours + 12 : hours,
    minutes,
    0,
    0
  );
  return date;
}