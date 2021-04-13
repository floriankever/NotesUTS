import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Notes } from '../tab1/tab1.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  constructor() {}

  isidata: Observable<Notes[]>;

}
