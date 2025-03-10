
import { EventInput } from '@fullcalendar/core';
import { Events } from '../models/Events';

let eventGuid = 0;
const TODAY_STR = new Date().toISOString().replace(/T.*$/, ''); // YYYY-MM-DD of today

export const INITIAL_EVENTS:Events[] = [
  {
    dateNote: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, voluptas fugit in, repellendus nam adipisci ipsam nisi incidunt iusto et magni? Ab culpa praesentium aspernatur ullam commodi dolor eius deserunt. ',
    fullname: 'Иван Иванов',
    id: createEventId(),
    meetdate: '2025-03-10T10:00:00'
  },
  {
    id: createEventId(),
    fullname: 'Петр Петров',
    dateNote: 'Совещание с клиентом',
    meetdate: '2025-03-11T14:00:00'
  },
  {
    id: createEventId(),
    fullname: 'Петр Петров',
    dateNote: 'Совещание с клиентом',
    meetdate: '2025-03-11T14:00:00'
  },
  {
    id: createEventId(),
    fullname: 'Петр Петров',
    dateNote: 'Совещание с клиентом',
    meetdate: '2025-03-11T14:00:00'
  },
  {
    id: createEventId(),
    fullname: 'Петр Петров',
    dateNote: 'Совещание с клиентом',
    meetdate: '2025-03-11T14:00:00'
  },
  {
    id: createEventId(),
    fullname: 'Петр Петров',
    dateNote: 'Совещание с клиентом',
    meetdate: '2025-03-11T14:00:00'
  }
];

export function createEventId() {
  return String(eventGuid++);
}
