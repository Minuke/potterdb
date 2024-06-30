import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search-box',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './search-box.component.html',
  styleUrl: './search-box.component.css'
})

export class SearchBoxComponent implements OnInit {
  searchText: string = '';
  searchSubject: Subject<string> = new Subject();

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(500)
    ).subscribe(searchValue => {
      this.searchText = searchValue;
      console.log(this.searchText);
    });
  }

  onSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchSubject.next(target?.value || '');
  }
}
