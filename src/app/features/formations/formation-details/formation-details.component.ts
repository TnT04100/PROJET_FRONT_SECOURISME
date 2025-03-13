import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormationService } from '../formation-list/services/formation.service';
import Formation from '../formation-list/models/formation.interface';
import {DatePipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-formation-details',
  templateUrl: './formation-details.component.html',
  imports: [
    DatePipe,
    NgIf
  ],
  styleUrl: './formation-details.component.css'
})
export class FormationDetailsComponent implements OnInit {
  formation: Formation | undefined;

  constructor(private route: ActivatedRoute, private formationService: FormationService) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.formation = this.formationService.getById(parseInt(id));
    }
  }
}
