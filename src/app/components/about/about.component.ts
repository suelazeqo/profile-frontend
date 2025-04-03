import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {AboutService} from '../../services/about.service';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgIf,
    FormsModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit, OnDestroy {

  description!: string;
  isEdit = false;
  editedDescription!: string;
  private aboutSubscription!: Subscription;
  private aboutService = inject(AboutService);
  public authService = inject(AuthService);

  ngOnInit() {
    this.aboutSubscription = this.aboutService.getAboutDescription().subscribe(response => {
      this.description = response.description;
      this.editedDescription = response.description;
    });
  }

  editDescription() {
    this.isEdit = true;
  }

  ngOnDestroy() {
    if (this.aboutSubscription) {
      this.aboutSubscription.unsubscribe();
    }
  }

  saveDescription() {
    this.description = this.editedDescription;
    this.isEdit = false;
    this.aboutService.editDescription(this.editedDescription).subscribe();
  }


}
