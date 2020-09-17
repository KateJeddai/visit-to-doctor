import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
    token: string;
    uid: string;
    signedUp: boolean;
    signInError: boolean;

    constructor(private router: Router) {}
    
    signUpUser(email: string, password: string, firstName: string, lastName: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(res => {
                    this.signedUp = true;
                    firebase.auth().onAuthStateChanged(user => {
                        if(user){
                          firebase.database().ref('visits/' + user.uid).set({
                            firstName, lastName, email
                          }) 
                        }  
                    })
               })
               .catch(error => console.log(error));
    }

    signInUser(email: string, password: string) {
        this.signInError = false;
        firebase.auth().signInWithEmailAndPassword(email, password)
                .then(res => {
                    this.router.navigate(['/']);
                
                    firebase.auth().currentUser.getIdToken()
                            .then((token: string) => {
                                this.token = token;
                    })
                    firebase.auth().onAuthStateChanged(user => {
                        if(user) this.uid = user.uid;
                    })
                })
                .catch(error => {
                    switch(error.code){
                        case 'auth/wrong-password':
                            this.signInError = true;
                    }
                });
    }

    getToken() {
        firebase.auth().currentUser.getIdToken()
                .then((token: string) => {
                    this.token = token;
                })
                .catch(err => console.log(err));
                return this.token;
    }

    isAuth() {
        return this.token != null;
    }

    logOut() {
        firebase.auth().signOut();
        this.token = null;
        this.uid = null;
        this.router.navigate(['/login']);
    }

}