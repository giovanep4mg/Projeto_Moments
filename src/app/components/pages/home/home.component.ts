import { Component, OnInit } from '@angular/core';

import { MomentService } from 'src/app/services/moment.service';

import { Moment } from 'src/app/Moment';

// para trabalha com links
import { environment } from 'src/environments/environment';

//icon de busca
import { faSearch } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // importa os momentos
  allMoments: Moment[] = [] 

  //fazer um filtro nesses momentos
  moments: Moment[] = [] 

  //carregar url
  baseApiUrl = environment.baseApiUrl ;

  // variáveis de procura
  faSearch = faSearch;
  searchTerm = "" ;



  constructor(
    private momentService: MomentService,
  ){}


  

    ngOnInit(): void {
      //subscribe => ativa o método
      this.momentService.getMoments().subscribe((items) => {

        const data = items.data

        // fomatar a data para a data que usamos
        data.map((item) => {
          item.created_at = new Date(item.created_at!).toLocaleString('pt-BR')
        });

        // passa o novo formato de data para eles:
        this.allMoments = data
        this.moments = data

      });
    }

    search(e: Event){
      // para dizer que é um input do html
      const target = e. target as HTMLInputElement
      // pega o valor desse "input"
      const value = target.value

      //fará um filtro e salvará na var moments
      this.moments = this.allMoments.filter((moment) => {
        
        //pega o valor digitado, coloca em letras minusculas, e retorna
         return moment.title.toLowerCase().includes(value);

      });


    }



}
