
import { Component, ViewChild, ElementRef } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
    selector: 'custom-modal',
    templateUrl: './modal.component.html'
})
export class ModalComponent {

    constructor() { }

    modalClass: string;
    modalTitle: string;
    modalConfig: string;
    backdrop: any;
    ignoreBackdropClick: boolean;
    keyboard: boolean;
    show: boolean;
    @ViewChild('customModal') customModal: ModalDirective;

    showModal(modalType: string, modalTitle: string, backdrop?: any, ignoreBackdropClick?: boolean, keyboard?: boolean, show?: boolean): void {
        if (modalType !== undefined) {

            this.backdrop = backdrop !== undefined ? backdrop : false;
            this.ignoreBackdropClick = ignoreBackdropClick !== undefined ? ignoreBackdropClick : false;
            this.keyboard = keyboard !== undefined ? keyboard : false;
            this.show = show !== undefined ? show : false;

            switch (modalType) {
                case 'sm':
                    this.modalClass = 'modal-sm';
                    break;
                case 'lg':
                    this.modalClass = 'modal-lg';
                    break
                default:
                    this.modalClass = 'modal-lg';
                    break;
            }
            this.modalTitle = modalTitle;
            this.customModal.config = { backdrop: this.backdrop, ignoreBackdropClick: this.ignoreBackdropClick, keyboard: this.keyboard, show: this.show };
            this.customModal.show();            
        }
    }
}
