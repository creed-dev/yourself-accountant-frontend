import {Component} from '@angular/core';
import {SignModalComponent} from "../sign-modal/sign-modal.component";
import {SignEnum} from "../../enums/sign.enum";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  SIGN_ENUM = SignEnum;

  constructor(
    public dialog: MatDialog
  ) {
  }

  openModal(type: number): void {
    this.dialog.open(SignModalComponent, {
      data: {
        type
      }
    });
  }
}
