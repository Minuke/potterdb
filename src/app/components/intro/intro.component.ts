import { Component } from '@angular/core';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.css'
})
export class IntroComponent {

  public title:string = "Secretos de Hogwarts";
  public subtitle:string = "Un Viaje Mágico a través del Mundo de Harry Potter"

}
