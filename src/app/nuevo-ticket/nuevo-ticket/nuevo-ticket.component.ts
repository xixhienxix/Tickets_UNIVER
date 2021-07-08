import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-nuevo-ticket',
  templateUrl: './nuevo-ticket.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./nuevo-ticket.component.css']
})
export class NuevoTicketComponent implements OnInit {
  constructor(
    public modal: NgbActiveModal

  ) { }

  ngOnInit() {

  }

  close(){
    this.modal.close();
  }
}
