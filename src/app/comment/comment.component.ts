import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.css']
})
export class CommentComponent {
	@Input() questionNBR:string
	@Input() year:string
	@Input() textCommentaire:string
	@Input() commentaire:string
	@Output() closeModal = new EventEmitter();

	onCloseComment(){
		this.closeModal.emit()
	}

}
