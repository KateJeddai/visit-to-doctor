import { Component, OnInit } from '@angular/core';
import { Visit } from '../visit/visit.model';
import { Subscription } from 'rxjs';
import { VisitService } from '../services/visit.service';
import { AuthService } from '../services/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-myvisits',
  templateUrl: './myvisits.component.html',
  styleUrls: ['./myvisits.component.css'],
  animations: [
    trigger('visitCancelled', [
        state('present', style({
           opacity: 1
        })),
        transition('* => void', [
            animate(300, style({
              opacity: 0,
              transform: 'translateX(-100px)'
            }))
        ])
    ])
  ]
})
export class MyvisitsComponent implements OnInit {
  subscription: Subscription;
  visits: Visit[];
  previousVisits: Visit[] = [];
  
  d = new Date();
  dd = this.d.getDate();
  mm = this.d.getMonth();
  yy = this.d.getFullYear();
  today = new Date(this.yy, this.mm, this.dd);

  constructor(private visitService: VisitService,
              private authService: AuthService) { }

  ngOnInit() {
    this.getMyVisits();
  }

  getMyVisits() {
    const vts = [];
    this.visitService.getVisits()
        .then((visits: any) => {
                let data = visits.val();
                let key = visits.key;
                let myvisits = data.myvisits;
    
                if(myvisits){
                  Object.keys(myvisits).forEach(key => {
                    vts.push({...myvisits[key], key: key});
                  });                              
                  this.visits = vts;

                  const timeNow = this.d.toLocaleTimeString(); 
                  this.visits.forEach(v => {
                    if(this.today > new Date(v.visitDate) || 
                       new Date(v.visitDate).getTime() === new Date(this.today).getTime() &&
                       v.visitTime < timeNow) {
                            this.previousVisits.push({visitDate: v.visitDate, visitTime: v.visitTime});
                    }
                  })
                }
        });       
        
  }

  checkActuality(visDate, visTime) {
      const timeNow = this.d.toLocaleTimeString(); 
      if(this.today < new Date(visDate) || 
         new Date(visDate).getTime() === new Date(this.today).getTime() &&
         visTime > timeNow){
            return true;
      } 
      else {
         return false;
      }
  }

  onCancelVisit(vis) {
      this.visitService.onDeleteVisit(vis);
      this.getMyVisits();
  }

}
