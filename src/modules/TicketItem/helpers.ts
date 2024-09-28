const getStopsTitle = (stops: number) => {
  switch (stops) {
    case 1:
      return '1 Пересадка:';
    case 2:
      return '2 Пересадки:';
    case 3:
      return '3 Пересадки:';
    default:
      return 'Без пересадок';
  }
};

// eslint-disable-next-line import/prefer-default-export
export { getStopsTitle };
