
import { Moment } from 'src/app/Moment';
import { Component, EventEmitter, Input, OnInit, Output  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-moment-form',
  templateUrl: './moment-form.component.html',
  styleUrls: ['./moment-form.component.css']
})
export class MomentFormComponent implements OnInit {
  // para enviar
  @Output() onSubmit = new EventEmitter<Moment>()

  @Input() btnText!: string;

  @Input() momentData : Moment | null = null ;

  momentForm!: FormGroup ;



  ngOnInit(): void {
    // avi inicializar ele
    this.momentForm = new FormGroup ({
      id: new FormControl (this.momentData ? this.momentData.id : ''),
      title: new FormControl (this.momentData ? this.momentData.title : '', [ Validators.required ] ),
      description: new FormControl ( this.momentData ? this.momentData.description : '', [ Validators.required ] ),
      image: new FormControl (""),
    });
  }

  get title(){
      return this.momentForm.get("title") ! ;
  }

  get description(){
    return this.momentForm.get("description") ! ;
  }

  onFileSelected(event: any){

    //obter o arquivo do input
    const file: File = event.target.files[0];

    // para ser inserida no formulário
    this.momentForm.patchValue({image:file});
  }


  submit(){
    if(this.momentForm.invalid){
      return;
    }

    console.log(this.momentForm.value);

    //enviando os dados do formulario para o componente pai
    this.onSubmit.emit(this.momentForm.value);

  }



}
