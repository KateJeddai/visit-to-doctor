import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { VisitService } from '../services/visit.service';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.css']
})

export class AppAbout implements OnInit {
    showVisits: boolean; 
    @ViewChild('myvisits') myVisits: ElementRef;
    
    constructor(private route: ActivatedRoute, private router: Router,
                private visitService: VisitService,
                private authService: AuthService) {}

    ngOnInit() {
        this.showVisits = false;
    }

    openVisitPage() {
        this.router.navigate(['new-visit'], { relativeTo: this.route });
    }

    showMyVisits() {
       this.showVisits = !this.showVisits;  
       this.visitService.getVisits();
       //  window.scrollTo(0, this.myVisits.nativeElement.offsetTop + 300);
       setTimeout(() => { 
          this.myVisits.nativeElement.scrollIntoView({behavior: "smooth", block: "end"});
       }, 100);
    }


}
