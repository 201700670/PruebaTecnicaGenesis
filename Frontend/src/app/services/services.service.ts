import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {
  API_URI = 'http://localhost:8090/';
  constructor(private http: HttpClient) { }

  public login(username: string, password: string) {
    return this.http.post(`${this.API_URI}login`, { username, password });
  }

  saveUser(id_user: string, pass_user: string, token: any) {
    localStorage.setItem('userSession', id_user);
    localStorage.setItem('userPassword', pass_user);
    localStorage.setItem('token', token);
  }

  public consulta(telefono: string, idcard: string, account: string, amount: number) {
    const token = localStorage.getItem('token');
    const body = {
      strIdentificador01: telefono,
      strIdentificador02: idcard,
      strIdentificador03: account,
      dblCashAmount: amount,
      strCurrency: "20"
    };
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.API_URI}consulta`, body, { headers });
  }

  realizarPago(pin: string, telefono: string, idcard: string, account: string, amount: number) {
    const token = localStorage.getItem('token');
    const body = {
      strPin: pin,
      strIdentificador01: telefono,
      strIdentificador02: idcard,
      strIdentificador03: account,
      dblCashAmount: amount,
      strCurrency: "320"
    };
    console.log(body)
    const headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` });
    return this.http.post(`${this.API_URI}pago`, body, { headers });
  }
  getAutorizaciones() {
    return this.http.get(`${this.API_URI}reportes/autorizaciones`);
  }

  getTransacciones() {
    return this.http.get(`${this.API_URI}reportes/transacciones`);
  }

}
