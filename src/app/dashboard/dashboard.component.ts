import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoTicketComponent } from 'app/nuevo-ticket/nuevo-ticket/nuevo-ticket.component';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment"
import { Tickets } from 'app/models/tickets';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public listaTickets:Tickets[]=[];
  constructor(
    private modalService: NgbModal,
    private http: HttpClient

  ) { }

  ngOnInit() {
      this.getTickets()
  }

  getTickets()
  {
    this.http.get<any>(environment.apiUrl+"/tickets")
    .subscribe((response)=>{
    this.listaTickets=response
    })
  }

  nvoTicket()
  {
    const modalRef = this.modalService.open(NuevoTicketComponent, { size: 'md' });
  }

}
