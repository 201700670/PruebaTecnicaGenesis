import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; // <--- 1. Agrega esta importación
import { MatButtonModule } from '@angular/material/button'; // <--- 2. También esta para los botones
import { FormsModule } from '@angular/forms';
import { ServicesService } from '../../services/services.service';
import { Router } from '@angular/router';
import swal from "sweetalert2";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  user = "";
  hide = true;
  contra = "";

  constructor(public service:ServicesService, private router:Router) { }

  ngOnInit(): void { }

  public Login() {
    if (this.user != "" && this.contra != "") {
      this.service.login(this.user, this.contra).subscribe((res:any) => {
        if (res) {
          swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Ingreso de sesión exitosa',
            showConfirmButton: false,
            timer: 1500
          })
          this.service.saveUser(this.user, this.contra, res.token)
          this.router.navigate(['/registro']);
        } else {
          swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Credenciales incorrectas ingrese nuevamente',
            showConfirmButton: false,
            timer: 1500
          })
        }
      })
    } else {
      swal.fire({
        position: 'center',
        icon: 'warning',
        title: 'Llene todos los campos',
        showConfirmButton: false,
        timer: 1000
      })
    }

  }
  tablas(){
    this.router.navigate(['/reportes']);
  }
}
