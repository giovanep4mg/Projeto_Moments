import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  message: string = "";

  constructor() { }
  // método que vai adicionar a mensagem
  add(message: string){
    //atribuir no sistema
    this.message = message

    // mostra a mensagem depois desse tempo aciona o método clear
    setTimeout(() => {
      this.clear()
    },4000)
  }

  // método clear para apagar a mensagem
  clear(){
    this.message = "" ;
  }


}
