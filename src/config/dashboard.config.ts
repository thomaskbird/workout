export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: false,
    },
  },
};

export const lastWeekVsThisWeek = {
  labels: ['Sun', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  datasets: [
    {
      label: 'Last week',
      data: [20, 40, 60, 80, 100, 56],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'This week',
      data: [8, 67, 33, 44, 105],
      backgroundColor: 'rgba(16, 158, 115, 0.5)',
    },
  ]
};

export const lastMonthVsThisMonth = {
  labels: ['Oct', 'Nov'],
  datasets: [
    {
      label: 'Last month',
      data: [20, 40, 60, 80],
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
    {
      label: 'This month',
      data: [8, 67, 33, 44],
      backgroundColor: 'rgba(16, 158, 115, 0.5)',
    },
  ]
};