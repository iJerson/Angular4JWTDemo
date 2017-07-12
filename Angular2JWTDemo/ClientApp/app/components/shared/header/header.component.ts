
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { ModalComponent } from '../modal/modal.component';

import { AuthenticationService } from '../../../services/authentication/authentication.service';

@Component({
    selector: 'shared-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    @ViewChild('logoutModal') public logoutModal: ModalComponent;

    showLogoutModal(ev): void {
        ev.stopPropagation();
        this.logoutModal.showModal('sm', 'Sign-out');        
    }

    logout(): void {
        this.router.navigate(['/login']);
    }
}
