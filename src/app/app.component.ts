/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {LanguageService} from './@core/services/_service/language.service';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(
    public translate: TranslateService,
    private language: LanguageService,
  ) {
  }

  ngOnInit(): void {
    this.language.setInitState();
  }
}
