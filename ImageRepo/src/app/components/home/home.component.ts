import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImagePost } from 'src/app/models/image-post.model';
import { Image } from 'src/app/models/image.model';
import { ImageService } from 'src/app/services/image.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  fileToUpload: File = null;
  images: Image[];
  constructor(private imageService: ImageService,
              private router: Router) { }

  ngOnInit(): void {
    this.imageService.getImages().subscribe(is => {
      this.images = is.images;
    }, err => {
      console.log(err);
    });
  }

  goToImage(image: Image) {
    this.router.navigate(['/image', image._id]);
  }

  handleFileInput(files: FileList) {
    // var im = new ImagePost();
    // this.fileToUpload = files.item(0);
    // im.name = 'Test';
    // im.imageUpload = files.item(0);
    // this.imageService.postImages(im).subscribe(res => {
    //   console.log(res);
    // });
  }
}
