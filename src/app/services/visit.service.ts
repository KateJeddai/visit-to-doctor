import { Injectable, EventEmitter } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from './auth.service';
import { Visit } from '../visit/visit.model';

@Injectable()
export class VisitService {
    visitsArranged = [];
    visitsArrangedChanged = new EventEmitter<{ visitDate: string, visitTime: string }[]>();

    constructor(private authService: AuthService) {}

    onAddVisit(visit: Visit) {
        const uid = this.authService.uid;        
        firebase.database().ref('visits').child(uid).child('myvisits').push({...visit});
    }

    getVisits() {
        const uid = this.authService.uid;
        return firebase.database().ref('/visits/' + uid).once('value', (snapshot) => {
              return snapshot;
          }).catch(err => console.log(err.message));
    }

    checkAvailableTime() {
       const visits = [];
       const vts = [];
       return firebase.database().ref('/visits/').once('value', (snapshot) => {
            snapshot.forEach(snap => {
               let data = snap.val();
               let allVisits = data.myvisits;
               visits.push(allVisits);
            })
            visits.forEach(v => {
                if(v){
                    Object.keys(v).forEach(key => {
                        vts.push({...v[key]});
                    })
                }    
            })
            this.visitsArranged = vts;
            this.visitsArrangedChanged.emit(this.visitsArranged);
       }).catch(err => console.log(err.message));
    }

    onDeleteVisit(vis) {
        const uid = this.authService.uid;
        firebase.database().ref('visits')
                           .child(uid)
                           .child('myvisits')
                           .child(vis.key)
                           .remove();
    }
}