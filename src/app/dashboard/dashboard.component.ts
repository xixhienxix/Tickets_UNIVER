import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NuevoTicketComponent } from 'app/nuevo-ticket/nuevo-ticket/nuevo-ticket.component';
import { HttpClient } from "@angular/common/http";
import {environment} from "../../environments/environment"
import { Tickets } from 'app/models/tickets';
import { TicketService } from 'app/services/ticket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public listaTickets:Tickets[]=[];
  public listaTicketsCompletas:Tickets[]=[];
  public listaTicketsXVencer:Tickets[]=[];
  public listaTicketsVencidas:Tickets[]=[];
  public listaTicketsVencidasUnDia:Tickets[]=[];
  public listaTicketsVencidasDosDias:Tickets[]=[];

  reloadInterval:number = 60;
  interval;
  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    public ticketService:TicketService

  ) { }

  ngOnInit() {
      this.getTickets()
  }

  
  Init(array:Tickets)
  {
    let color

    let today = +new Date();
    let manana = new Date().getTime();
    let pasadoManana = new Date().getTime();
    
    const hr = 3600000
    const almostTimeUp = (3600000 * 80)/100
    const oneDay = 60 * 60 * 24 * 1000
    const twoDay = 60 * 60 * 48 * 1000

    const arrayMiliseconds = new Date(array.Fecha_Inicio).getTime()

    if((arrayMiliseconds-today)<oneDay)
    {
      //HORAS
      if( (arrayMiliseconds-today) < almostTimeUp && array.Estatus != 0)
      {
        array.Color="#21D864" //verde
        this.listaTickets.push(array)
        this.ticketService.putTickets(array).subscribe((response)=>{
          console.log("Actualizado Verde", response)
        })
        
      }
      if( (arrayMiliseconds-today) == almostTimeUp && array.Estatus != 0)
      {
        array.Color="#F2C811" //amarrillo
        this.listaTicketsXVencer.push(array)
        this.ticketService.putTickets(array).subscribe((response)=>{
          console.log("Actualizado Amarrillo", response)
        })
      }else if((arrayMiliseconds-today) > almostTimeUp && arrayMiliseconds <= hr && array.Estatus != 0)
      {
        array.Color="#F2C811" //amarrillo
        this.listaTicketsXVencer.push(array)
        this.ticketService.putTickets(array).subscribe((response)=>{
          console.log("Actualizado Amarillo", response)
        })
      }
      else if((arrayMiliseconds-today) > almostTimeUp && arrayMiliseconds > hr && arrayMiliseconds < oneDay && array.Estatus != 0)
      {
        array.Color="#E83728"//rojo
        this.listaTicketsVencidas.push(array)
        this.ticketService.putTickets(array).subscribe((response)=>{
          console.log("Actualizado Rojo", response)
        })
      }
    } else if ((arrayMiliseconds-today)<twoDay && array.Estatus != 0)
    {
      array.Color="#EC86AE" //rojo 1 Dia
      this.listaTicketsVencidasUnDia.push(array)
      this.ticketService.putTickets(array).subscribe((response)=>{
        console.log("Actualizado Rojo 1 Dia", response)
      })
    }
    else if((arrayMiliseconds-today)>=twoDay && array.Estatus != 0)
    {
      array.Color="#FFC0D9" // rojo 2 Dias
      this.listaTicketsVencidasDosDias.push(array)
      this.ticketService.putTickets(array).subscribe((response)=>{
        console.log("Actualizado Rojo 2 Dias", response)
      })
    }
    else if(array.Estatus==0)
    {
      this.listaTicketsCompletas.push(array)
      this.ticketService.putTickets(array).subscribe((response)=>{
        console.log("Actualizado Sin Color", response)
      })
    }
           
  }

  getTickets()
  {
    this.http.get<any>(environment.apiUrl+"/tickets")
    .subscribe((response)=>{
      for(let i=0;i<response.length;i++)
      {
        this.Init(response[i])
      }
      // setInterval(this.Init,30000)
    })
  }

  nvoTicket()
  {
    const modalRef = this.modalService.open(NuevoTicketComponent, { size: 'md' });
  }

  completar()
  {
    //Preguntas
  }
}
