import { Component, OnInit } from '@angular/core';
import { Encuesta } from '../../models/encuesta.model';
import { EncuestaService } from '../../services/encuesta.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  encuesta: Encuesta = {
    name: '',
    lastName: '',
    age: 0,
    choice: ''
  };
  constructor(private _encuentaService: EncuestaService) { }
  choices: string[] = ['Java', 'C#'];
  ngOnInit() {
  }

  enviar () {
    this._encuentaService.save(this.encuesta).subscribe(
      (data) => {
        alert('Formulario enviado correctamente');
        this.encuesta = {
          name: '',
          lastName: '',
          age: 0,
          choice: ''
        };
      }, (error) => {
        console.log('err', error);
        alert('Ocurrio un error al guardas los datos');
      }
    );
  }

}
