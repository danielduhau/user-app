import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = { id: 0, name: '', email: '' };
  isEditing: boolean = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing = true;
      this.userService.getUserById(+id).subscribe(user => {
        this.user = user;
      });
    }
  }

  saveUser(): void {
    if (this.isEditing) {
      this.userService.updateUser(this.user.id, this.user).subscribe(() => {
        this.navigateToUsers();
      });
    } else {
      this.userService.createUser(this.user).subscribe(() => {
        this.navigateToUsers();
      });
    }
  }

  navigateToUsers() {
    this.router.navigate(['/users']);
  }
}
