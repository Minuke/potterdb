import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IntroComponent } from './components/intro/intro.component';
import { CharactersComponent } from './components/characters/characters.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IntroComponent, CharactersComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'potterdb';
}
