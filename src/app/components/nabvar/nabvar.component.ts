import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nabvar',
  templateUrl: './nabvar.component.html',
  styleUrls: ['./nabvar.component.css']
})
export class NabvarComponent {
  constructor(private afAuth: AngularFireAuth,
    private router: Router,) {
  }

  logOut() {
    this.afAuth.signOut().then(() => this.router.navigate(['/login']));
  }
}
