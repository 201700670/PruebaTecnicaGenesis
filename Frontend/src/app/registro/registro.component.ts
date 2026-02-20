import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, PLATFORM_ID, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import swal from "sweetalert2";
interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
@Component({
  selector: 'app-registro',
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
    MatIcon
  ],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent implements OnDestroy {
  username: string = "";
  authorization: boolean = false;
  @ViewChild('panel') panel!: ElementRef;

  ngOnInit(): void {

  }


  constructor(public userService: ServicesService, private router: Router) {

  }

  ngOnDestroy(): void {
  }
  ///////////////////////////////////////RESTRICCIONES PARA NO DEJAR CAMPOS VACIOS/////////////////
  email = new FormControl('', [Validators.required, Validators.email]);
  firstname = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un valor';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessageother() {
    if (this.lastname.hasError('required')) {
      return 'Debes ingresar un valor';
    } else if (this.firstname.hasError('required')) {
      return 'Debes ingresar un valor';
    } else {
      return 'Campos obligatorios Debes ingresar un valor';
    }
  }
  /////////////////////////////////////////////VARIABLES PARA INGRESO DE DATOS////////////////////////
  uploadedFiles: Array<File> = [];
  idcard: string = "";
  telefono: string = "";
  address: string = "";
  password: string = "";
  amount: number = 0;
  pin : number = 0;
  Register() {
    this.userService.consulta(this.telefono, this.idcard, this.address, this.amount).subscribe((res) => {
      if (res) {
        
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Autorización ',
          showConfirmButton: false,
          timer: 1500
        })
        this.authorization = true;
      } else {
        swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Credenciales incorrectas ingrese nuevamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });

  }

  redirigir() {
    this.router.navigate(["/transferencia"]);
  }

  Transfer() {
    
    this.userService.realizarPago(this.pin.toString(), this.telefono, this.idcard, this.address, this.amount).subscribe((res) => {
      if (res) {
        
        swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Transferencia realizada ',
          showConfirmButton: false,
          timer: 1500
        })
        this.authorization = false;
        this.router.navigate(["/login"]);
      } else {
        swal.fire({
          position: 'center',
          icon: 'error',
          title: 'Credenciales incorrectas ingrese nuevamente',
          showConfirmButton: false,
          timer: 1500
        })
      }
    });
  }
}

export interface Amigos {
  username: string
  foto: string
}

