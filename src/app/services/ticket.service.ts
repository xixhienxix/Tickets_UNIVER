import { Injectable } from '@angular/core';
import { Tickets } from '../models/tickets'
import { Observable, of } from 'rxjs';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment"
import { catchError, map, tap } from 'rxjs/operators';
import {HttpHeaders} from '@angular/common/http'



@Injectable({
  providedIn: 'root'
})
export class TicketService  {


    getTickets():Observable<Tickets[]>
    {
        return this.http.get<Tickets[]>(environment.apiUrl+"/tickets")
    }
  
    postTickets(tickets:Tickets)
    {
    return this.http.post<Tickets>(environment.apiUrl+"/tickets",tickets)
    }

    putTickets(tickets:Tickets)
    {
    return this.http.put<Tickets>(environment.apiUrl+"/tickets",tickets)
    }

  constructor(private http: HttpClient) { }
}
