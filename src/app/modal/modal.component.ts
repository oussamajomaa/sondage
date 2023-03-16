import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.css'],
	
})
export class ModalComponent {
	@Input() questionNBR: string
	@Input() display:string;

	@Output() closeModal = new EventEmitter();

	onCloseHandled(){
		this.closeModal.emit()
	}
}
