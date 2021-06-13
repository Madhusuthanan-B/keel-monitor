import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Button } from './button';

@Component({
  selector: 'app-button-group',
  templateUrl: './button-group.component.html',
  styleUrls: ['./button-group.component.scss']
})
export class ButtonGroupComponent implements OnInit {
  @Input() data: Button[];
  @Output() selectedButton = new EventEmitter<Button>();

  constructor() { }

  ngOnInit(): void {
  }

  update(updatedBtn: Button) {
    this.data.forEach((btn) => {
      btn.isActive = btn.id === updatedBtn.id;
    });
    this.selectedButton.emit(updatedBtn);
  }

}
