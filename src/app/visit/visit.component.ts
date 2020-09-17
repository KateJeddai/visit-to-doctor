import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import * as _moment from 'moment';
import { VisitService } from '../services/visit.service';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-visit',
    
    animations: [
        trigger('visitAdded', [
            state('open', style({
                opacity: 1
             })),
            state('closed', style({
                opacity: 0
             })),
            transition('open => closed', [
                animate('1s')
            ]),
            transition('closed => open', [
                animate('0.5s')
            ]),
       ])
    ],   
    templateUrl: './visit.component.html',
    styleUrls: ['./visit.component.css']    
})

export class AppVisit implements OnInit {
   firstName: string;
   lastName: string;
   visitDate: string;
   visitTime: string;

   animState = 'closed';

   timeTable = [{time:'9:00', taken: false}, 
                {time:'9:30', taken: false},
                {time:'10:00', taken: false},
                {time:'10:30', taken: false},
                {time:'11:00', taken: false},
                {time:'11:30', taken: false},
                {time:'12:00', taken: false},
                {time:'12:30', taken: false},
                {time:'13:00', taken: false},
                {time:'13:30', taken: false}];
   
   datesArray = [];

   date = new Date();
   dd = this.date.getDate();
   mm = this.date.getMonth();
   yy = this.date.getFullYear();

   minDate = new Date(this.yy, this.mm, this.dd);
   todayDate = _moment(this.minDate).format('MM/DD/YYYY');

   myFilter = (d: Date): boolean => {
     const day = d.getDay();
     return day !== 0 && day !== 6;
  }

  constructor(private visitService: VisitService,
              private router: Router ) {}

  ngOnInit() {
    let start = new Date(this.yy, this.mm, this.dd);
    let end = new Date(this.yy, this.mm, this.dd + 7);
    while (start <= end) {         
        if(start.getDay() !== 0 && start.getDay() !== 6){
            this.datesArray.push(_moment(new Date(start)).format('MM/DD/YYYY'));
        }
        start.setDate(start.getDate() + 1);       
    }
  }

  addEvent(event: MatDatepickerInputEvent<Date>) {                                                                                                                                                                                                                                              
    this.timeTable = [{time:'9:00', taken: false}, 
    {time:'9:30', taken: false},
    {time:'10:00', taken: false},
    {time:'10:30', taken: false},
    {time:'11:00', taken: false},
    {time:'11:30', taken: false},
    {time:'12:00', taken: false},
    {time:'12:30', taken: false},
    {time:'13:00', taken: false},
    {time:'13:30', taken: false}];


      this.visitDate = _moment(event.value).format('MM/DD/YYYY');
      this.visitService.checkAvailableTime(); 

      this.visitService.visitsArrangedChanged.subscribe(visitsArranged => {
          visitsArranged.forEach(vis => {
                 this.timeTable.forEach(time => {
                    if(vis.visitDate === this.visitDate && vis.visitTime === time.time){
                       time.taken = true;
                     }
                 })
          })
      })
  }
  onChooseTime(e: any) {
      this.visitTime = e.target.innerText;
      this.timeTable.forEach(time => {
        if(this.visitTime === time.time){
           time.taken = true;
         }
     })
  }
  
  onCancelCreate() {
      this.router.navigate(['/']);
  }

  onSubmit() {
      const visit = { visitDate: this.visitDate, visitTime: this.visitTime };
      this.visitService.onAddVisit(visit);        
      this.animState = 'open';
           setTimeout(() => {
               this.animState = 'closed';
           }, 1000);
           setTimeout(() => {
               this.router.navigate(['/']); 
           }, 2500);
  }
  

}   