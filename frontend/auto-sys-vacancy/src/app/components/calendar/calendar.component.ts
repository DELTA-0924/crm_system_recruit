import { Component , signal, ChangeDetectorRef, OnInit } from '@angular/core';
import { CommonModule, LowerCasePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventDropArg } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import tippy from 'tippy.js';

import { INITIAL_EVENTS, createEventId } from '../../services/event-utils';
import { CalendarService } from '../../services/calendar.service';
import { Events } from '../../models/Events';
import { __importDefault } from 'tslib';
@Component({
  selector: 'app-calendar',
  imports: [FullCalendarModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit{
  eventList: Events[] = []; // Сразу массив, чтобы избежать null
  calendarVisible = signal(true);
  calendarOptions = signal<CalendarOptions>({
    plugins: [
      interactionPlugin,
      dayGridPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: [], // Пока пусто, заполним после загрузки данных
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    eventDidMount: (info) => {

      tippy(info.el, {
        content: info.event.title,
        placement: 'top',
        theme: 'custom',
        trigger: 'mouseenter focus', 
      });        
    },
    eventDrop: this.handleEventDrop.bind(this),
  });
  currentEvents = signal<EventApi[]>([]);

  loadEvents() {
    this.calendarService.getEvents().subscribe((data)=>{
      this.eventList=data
      console.log(this.eventList)

      this.updateCalendarEvents();
    })    
  }

  /** Обновляем события в календаре */
  updateCalendarEvents() {
    this.calendarOptions.update((options) => ({
      ...options,
      events: this.eventList!.map(event => ({        
        id: event.id,
        title: `ИМЯ: ${event.fullname} - Примечание: ${event.dateNote} - Время: ${event.meetdate.split('T')[1]}`,
        start: event.meetdate
      }))
    }));
    
  }

  constructor(private changeDetector: ChangeDetectorRef,private calendarService:CalendarService) {
    
  }
  ngOnInit(): void {
    this.loadEvents();
  }

  handleCalendarToggle() {
    this.calendarVisible.update((bool) => !bool);
  }

  handleWeekendsToggle() {
    this.calendarOptions.update((options) => ({
      ...options,
      weekends: !options.weekends,
    }));
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const fullname = prompt('Введите ФИО:');
    const dateNote = prompt('Введите примечание:');
    const calendarApi = selectInfo.view.calendar;
  
    calendarApi.unselect(); // сброс выделения
  
    if (fullname && dateNote) {
      const newEvent = {
        id: createEventId(),
        fullname,
        dateNote,
        meetDate: selectInfo.startStr
      };
  
      calendarApi.addEvent({
        id: newEvent.id,
        title: `${newEvent.fullname} - ${newEvent.dateNote}`,
        start: newEvent.meetDate
      });
    }
  }
  

  handleEventClick(clickInfo: EventClickArg) {
 
 const isMobile = window.innerWidth <= 768;
  if(isMobile){
      tippy(clickInfo.el, {
        content: `Вы кликнули на событие: ${clickInfo.event.title}`,
        placement: 'top',
        theme: 'custom',
        trigger:'click'
      });
    }
    // Здесь можно добавить дополнительную логику, например, подтверждение удаления

  }

  handleEventDrop(eventDropInfo: EventDropArg) {
    const updatedEvent = eventDropInfo.event;
    
    const updatedEventData = {
      id: updatedEvent.id,
      fullname:'',
      meetDate: new Date(updatedEvent.start!).toISOString().substring(0,16),
    };

    console.log(updatedEventData)
    this.calendarService.updateEvent(updatedEventData).subscribe()

    // Отправляем обновленные данные на сервер
    // this.calendarService.updateEvent(updatedEventData).subscribe(response => {
    //   console.log('Event updated:', response);
    // }, error => {
    //   console.error('Error updating event:', error);
    // });
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents.set(events);
    this.changeDetector.detectChanges(); // workaround for pressionChangedAfterItHasBeenCheckedError
  }
  Substring(title:string):string{
    let subTitle=title.substring(4,title.indexOf("-"));
    return subTitle.length>20 ? subTitle.substring(0,20):subTitle;
  }
}
