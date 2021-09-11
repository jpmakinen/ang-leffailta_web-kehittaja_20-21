import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/service/auth.service';

/* 
HUOM!!
pakko oli importoida alla olevat stylesit, muutoin ei navigointipalkin
dropmenu(selaimen ikkunan ollessa pieni) olisi toiminut Bootstrapin v5.x. 
v4.x toimi moitteetta ilman importamista
*/
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(public authService: AuthService) {}

  ngOnInit(): void {}
}
