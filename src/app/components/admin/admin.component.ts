import { Component, OnInit } from '@angular/core';
import { EncuestaService } from '../../services/encuesta.service';
import { Encuesta } from '../../models/encuesta.model';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'lastName', 'age', 'choice'];
  dataSource: Encuesta[];

  constructor(private _encuestaService: EncuestaService) { }

  ngOnInit() {
    this._encuestaService.getAll().subscribe(
      (data) => {
        console.log('data', data);
        this.dataSource = <Encuesta[]> data;
      }, (error) => {
        console.log('error', error);
      }
    );
  }

}
