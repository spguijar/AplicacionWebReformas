import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],

})
export class AppComponent {
  title = 'reformasentumano';
  constructor(private translate: TranslateService) {
    // Establece el idioma español predeterminado
    translate.setDefaultLang('es');
  }
}
