import { Component, Input, Output, EventEmitter } from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  imports: [
    NgIf
  ],
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  // Cette propriété contrôle la visibilité du PopUp
  @Input() isVisible = false;

  // Cette propriété permet de définir le titre du PopUp
  @Input() title = 'Pop-Up Title';

  // Cette propriété permet de définir le contenu du PopUp
  @Input() content = 'Voici le contenu du Pop-Up';

  @Input() type: 'event' | 'confirmation' = 'event';

  // Événement de fermeture pour le PopUp
  @Output() close = new EventEmitter<void>();

  @Output() confirm = new EventEmitter<void>();



  // Méthode pour fermer le PopUp
  closePopUp() {
    this.close.emit();
  }
  confirmAction() {
    this.confirm.emit();
  }


}
