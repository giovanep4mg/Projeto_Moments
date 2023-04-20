import { Component, OnInit } from '@angular/core';
import { MomentService } from 'src/app/services/moment.service';
import { Moment } from 'src/app/Moment';

import { FormGroup, FormControl, FormGroupDirective, Validators } from '@angular/forms';

import { Router, ActivatedRoute} from '@angular/router';
import { environment } from 'src/environments/environment';
import { faTimes, faEdit } from '@fortawesome/free-solid-svg-icons';
import { MessagesService } from 'src/app/services/messages.service';
import { CommentService } from 'src/app/services/comment.service';
import { Comment } from 'src/app/Comment';




@Component({
  selector: 'app-moment',
  templateUrl: './moment.component.html',
  styleUrls: ['./moment.component.css']
})
export class MomentComponent implements OnInit {
  moment?: Moment;
  baseApiUrl = environment.baseApiUrl;

  faTimes = faTimes;
  faEdit = faEdit;

  // propriedade não iniciada mais existe
  commentForm!: FormGroup



  constructor(

    private momentService: MomentService,
    private route: ActivatedRoute,
    private messagesService: MessagesService,
    private router: Router,
    private commentService: CommentService,

  ){}

  ngOnInit(): void {
    //pegar o id
    const id = Number(this.route.snapshot.paramMap.get("id"));

    // carregar dados
    this.momentService
    .getMoment(id)
    .subscribe((item) => (this.moment = item.data) );

    this.commentForm = new FormGroup({
      text: new FormControl('',[Validators.required]),
      username: new FormControl('',[Validators.required]),
    });

  }

  get text() {
    return this.commentForm.get('text')!;
  }

  get username() {
    return this.commentForm.get('username')!;
  }



      async removeHandler(id: number){

            // quando tiver uma resposta de depois de ter sido excluido
            await this.momentService.removeMoment(id).subscribe()

            // exibe essa mensagem
            this.messagesService.add("Momento excluido com sucesso!");

            // vai para a página inicial g
            this.router.navigate(["/"]);

      }

    async onSubmit(formDirective: FormGroupDirective){

      // se nao estiver preenchido vai parar aqui e retornar
      if(this.commentForm.invalid){
          return
      }

      const data: Comment = this.commentForm.value

      data.momentId = Number (this.moment!.id)

        await this.commentService
        .createComment(data)
        .subscribe((comment) => this.moment!.comments!.push(comment.data));

        this.messagesService.add("Comentário adicionado com sucesso!");

        // vai limpar o formulário
        this.commentForm.reset();
        formDirective.resetForm();


    }



}
