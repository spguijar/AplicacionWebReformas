import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // imports: [FormsModule,
  //   ButtonModule,
  //   MenuModule,
  //   DropdownModule,],
})
export class AppComponent {
  title = 'reformasentumano';
}
