import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { CalendarComponent } from 'ng-fullcalendar';
import { Options } from 'fullcalendar';
import { EventSesrvice } from './event.service';
declare const $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit, AfterViewInit  {
  calendarOptions: Options;
  displayEvent: any;
  events = null;
  @ViewChild(CalendarComponent) ucCalendar: CalendarComponent;
  constructor(protected eventService: EventSesrvice, private elementRef : ElementRef) { }

  ngOnInit() {
    console.log("on init"); 
    this.calendarOptions = {
      //now: '2018-04-07',
      editable: true,
      eventLimit: false,
      header: {
        left: 'prev,next today',
        center: 'title',
        right: 'month,agendaWeek,agendaDay,listMonth'
      },
      events: [{
        title: '000',
        start: '2018-08-03',
        backgroundColor: "white",
        editable: false,
      },
      {
        title: 'Long Event',
        start: '2018-08-03'
        //end: '2016-09-10'
      },
      {
        id: 999,
        title: 'Repeating Event',
        start: '2018-08-03'
      }],
      dayRender: function (date, cell) {
        cell.css("background-color", "red");
      }
    };
   
    
  }
  ngAfterViewInit(){
    console.log("after view render calender is",this.ucCalendar);
       
    var view =$('#calendar').fullCalendar('getView'); 
    console.log("view value",view);
  }
  loadevents() {
    this.eventService.getEvents().subscribe(data => {
      this.events = data;
    });
  }
  clickButton(model: any) {
    this.displayEvent = model;
    console.log("button click",model);
  }
  dayClick(model: any) {
    console.log(model);
  }
  eventClick(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title,
        allDay: model.event.allDay
        // other params
      },
      duration: {}
    }
    this.displayEvent = model;
  }
  updateEvent(model: any) {
    model = {
      event: {
        id: model.event.id,
        start: model.event.start,
        end: model.event.end,
        title: model.event.title
        // other params
      },
      duration: {
        _data: model.duration._data
      }
    }
    this.displayEvent = model;
  }
}
