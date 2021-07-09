import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../../environments/environment"
import { Tickets } from 'app/models/tickets';
import { Campanas } from 'app/models/campanas';
import { catchError, map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { TicketService } from 'app/services/ticket.service';
import { CampanasService } from 'app/services/campanas.service';

@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nuevo-ticket.component.css']
})
export class NuevoTicketComponent implements OnInit {
  public listaTickets:Tickets[];
  public listaCampanas:Campanas[]=[];

  constructor(
    public modal: NgbActiveModal,
    private http: HttpClient,
    public campanaService:CampanasService
  ) {

   }

  ngOnInit() {
    this.getCampanas();
  }

  close(){
    this.modal.close();
  }

  getCampanas()
  {
    this.campanaService.getCampanas()
    .subscribe((response)=>{
      this.listaCampanas=response
    })

  }

  guardaTicket(campana,responsable)
  {
    var date = new Date();

    let estatus = 1 
    let fecha_inicio= date;
    // add a day
    let fecha_fin= date.setHours( date.getHours() + 24 );
    let fecha_seguimeinto = date.setHours( date.getHours() + 48 );
    let hora_abierto = date.setHours( date.getHours() + 1 );


    let tickets: Tickets = {
      id:1,
      campana:campana,
      responsable:responsable,
      supervisor:'',
      estatus:estatus,
      fecha_inicio:fecha_inicio,
      fecha_fin:fecha_fin,
      fecha_seguimeinto:fecha_seguimeinto,
      hora_abierto:hora_abierto,
      };
    this.http.post<Tickets>(environment.apiUrl+"/api/tickets",tickets)
  }
}
