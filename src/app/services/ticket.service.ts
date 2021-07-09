import { Injectable } from '@angular/core';
import { Tickets } from '../models/tickets'
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment"
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class TicketService  {


    getTickets():Observable<Tickets[]>
    {
        return this.http.get<Tickets[]>(environment.apiUrl+"/get/tickets")
    }
  


  constructor(private http: HttpClient) { }
}
