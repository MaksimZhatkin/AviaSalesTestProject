import { Ticket, TicketId } from '../types';

const createTicketId = ({ price, segments }: Ticket): TicketId => {
  return `p${price}dur${segments[0].duration + segments[1].duration}s${segments[0].stops.length + segments[1].stops.length}`;
};

// eslint-disable-next-line import/prefer-default-export
export { createTicketId };
