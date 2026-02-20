import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-reportes',
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    CommonModule,
    MatIcon,
    MatTableModule
  ],
  templateUrl: './reportes.component.html',
  styleUrl: './reportes.component.css'
})
export class ReportesComponent {
  autorizaciones: any[] = [];
  transacciones: any[] = [];

  constructor(private reportesService: ServicesService) { }

  ngOnInit() {
    this.reportesService.getAutorizaciones().subscribe({
      next: (res: any) => this.autorizaciones = res,
      error: err => console.error('Error en autorizaciones:', err)
    });

    this.reportesService.getTransacciones().subscribe({
      next: (res: any) => this.transacciones = res,
      error: err => console.error('Error en transacciones:', err)
    });
  }

}
