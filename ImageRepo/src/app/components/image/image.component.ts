import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Image } from 'src/app/models/image.model';
import { User } from 'src/app/models/user.model';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  id: string;
  image: Image;
  user: User;

  constructor(private route: ActivatedRoute,
              private imageService: ImageService,
              private userService: UserService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.imageService.getImage(this.id).subscribe(i => {
        this.image = i.image;
        this.userService.getUser(i.image.userId).subscribe(u => {
          this.user = u.user;
        });
      });
    });
  }
}
