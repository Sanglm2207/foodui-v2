import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';



@Component({
  selector: 'app-select',
  templateUrl: './select-box.component.html',
  styleUrls: ['./select-box.component.scss']
})
export class SelectBoxComponent implements OnInit {

  @Input() data;
  @Input() optionLabel: string;

  ngOnInit(): void{
    console.log("data from parent", this.data);
    
  }


}


