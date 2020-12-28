import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImagePost } from 'src/app/models/image-post.model';
import { ImageService } from 'src/app/services/image.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-image',
  templateUrl: './add-image.component.html',
  styleUrls: ['./add-image.component.css']
})
export class AddImageComponent implements OnInit {

  imageForm: FormGroup;

  constructor(private fb: FormBuilder,
              private imageService: ImageService,
              private userService: UserService,
              private router: Router) { }

  get f(){
    return this.imageForm.controls;
  }

  ngOnInit(): void {
    this.imageForm = this.fb.group({
      name: ['', Validators.required],
      public: [true],
      image: [File, Validators.required]
    });
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.imageForm.patchValue({
        image: file
      });
    }
  }

  submit() {
    // console.log(this.imageForm.get('image').value);
    var im = new ImagePost(this.imageForm.get('name').value,
                           this.imageForm.get('public').value,
                           this.imageForm.get('image').value,
                           this.userService.user._id);
    this.imageService.postImages(im).subscribe(res => {
      this.router.navigate(['/home']);
    });
  }

}
