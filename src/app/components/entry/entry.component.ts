import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SecurityService } from '../../services/security.service';
import { TOKEN_NAME, PARAM_USUARIO } from '../../constants';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private serviceSecurity: SecurityService) {
  }

  ngOnInit() {
      this.route.fragment.subscribe((fragment) => {
        let token;
        try {
          token = fragment.split('&')[0].split('=')[1];
        } catch (e) {
          this.serviceSecurity.logout();
        }
        sessionStorage.setItem(TOKEN_NAME, token);
        console.log('antes del subcribe');
        this.serviceSecurity.setToken().subscribe((data: any) => {
          console.log('data despues', data);
          sessionStorage.setItem(PARAM_USUARIO, JSON.stringify(data.body));
          if (data.body.authorities[0].authority === 'ROLE_ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/usuario']);
          }
        });
    });
  }

}
