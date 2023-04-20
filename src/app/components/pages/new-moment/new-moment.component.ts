import { Moment } from 'src/app/Moment';
import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Router } from '@angular/router';

import { MessagesService } from 'src/app/services/messages.service';





@Component({
  selector: 'app-new-moment',
  templateUrl: './new-moment.component.html',
  styleUrls: ['./new-moment.component.css']
})
export class NewMomentComponent implements OnInit {

  btnText = 'Compartilhar';

  ngOnInit(): void {}

  constructor(
    private momentService: MomentService,
    private messagesService : MessagesService,
    private router : Router,
    ){}

      // vai ter interação com o API => async
      async createHandler(moment: Moment){

          // cria um formData para trabalhar com formulários
          const formData = new FormData();

          formData.append("title", moment.title);
          formData.append("description", moment.description);

          console.log("titulo e descrição foi adicionado ao banco de dados")

          if(moment.image){
          formData.append("image", moment.image);
          }

          console.log("imagem foi adicionada ao banco de dados");

          // sobrescrevendo
          await  this.momentService.createMoment(formData).subscribe();

          // após envio irá aparecer essa mensagem
          this.messagesService.add("Momento adicionado com sucesso!");

          // depois será redirecionado para a página home
          this.router.navigate(['/']);

          /*
          this.momentService.createMoment(formData).subscribe({
            next: () =>{
              this.messagesService.add("Momento adicionado com sucesso!");
              this.router.navigate(['/'])
            }
          });
          */

        }









}
