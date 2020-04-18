import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Clients } from './clients';

@Injectable({
  providedIn: 'root'
})
export class ClientsService {

    constructor(private http: HttpClient) {}

    private url = "http://localhost:3000/clients";
    headers = new HttpHeaders().set('Content-Type', 'application/json').set('Accept', 'application/json');
    httpOptions = {
      headers: this.headers
    };

    //lista de clientes
    getClients(): Observable<Clients[]> {
      return this.http.get<Clients[]>(this.url).pipe(
        tap(data => console.log(data)),
        catchError(this.handleError)
      );
    }

    //Cliente por id
    getClient(id: number): Observable<Clients> {
      const link = `${this.url}/${id}`;
      return this.http.get<Clients>(link).pipe(
      catchError(this.handleError)
      );
    }

    //cadastrar cliente
    addClient(client: Clients): Observable<Clients> {
      client.id=null;
      return this.http.post<Clients>(this.url, client, this.httpOptions).pipe(
      tap(data => console.log(data)),
      catchError(this.handleError)
    );
  }

  //atualizar cliente
  updateClient(client: Clients): Observable<Clients>{
    const link = `${this.url}/${client.id}`;
    return this.http.put<Clients>(link, client, this.httpOptions).pipe(
      tap(() => client),
      catchError(this.handleError)
    );
  }

  //Deletar Cliente
  deleteClient (id: number): Observable<Clients> {
    const link = `${this.url}/${id}`;
    return this.http.delete<Clients>(link, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error(error);                                       //Created a function to handle and log errors, in case
    return throwError(error);
  }

}
