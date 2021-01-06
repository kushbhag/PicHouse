import { Component, OnInit } from '@angular/core';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  alertMessage: string;
  images: Image[] = new Array<Image>();

  constructor(private imageService: ImageService,
              public userService: UserService) { }

  ngOnInit(): void {
    this.imageService.getUsersImages(this.userService.user._id).subscribe(ims => {
      this.images = ims.images;
    }, err => {
      this.alertMessage = "Sorry, an error occurred within the server, refresh the page again and it should work properly!";
    });
  }

  deleteImage(id: string): void {
    this.imageService.deleteImage(id).subscribe(del => {
      this.images = this.images.filter(i => i._id !== id);
    }, err => {
      this.alertMessage = "Sorry, an error occurred within the server, please try it again in 5 seconds";
    });
  }

}
