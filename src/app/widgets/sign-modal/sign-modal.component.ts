import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SignEnum} from "../../enums/sign.enum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-modal',
  templateUrl: './sign-modal.component.html',
  styleUrls: ['./sign-modal.component.scss']
})
export class SignModalComponent implements OnInit {
  SIGN_ENUM = SignEnum;
  form!: FormGroup;
  hidePassword: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { type: number },
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.form = this.fb.group({
      email: [null,
        [Validators.required, Validators.email]
      ],
      password: [null,
        [Validators.required, Validators.minLength(6)]
      ]
    })
  }

  onSubmit(): void {
    console.log(this.form);
  }
}
