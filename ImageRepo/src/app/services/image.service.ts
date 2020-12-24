import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/image.model'
import { ImagePost } from '../models/image-post.model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private http: HttpClient) { }

  getImages(): Observable<any> {
    return this.http.get<any>("https://image-repository-kush.herokuapp.com/image");
  }

  postImages(image: ImagePost) {
    const formData: FormData = new FormData();
    formData.append('imageUpload', image.imageUpload);
    formData.append('name', image.name);
    formData.append('price', image.price.toString());
    return this.http.post("https://image-repository-kush.herokuapp.com/image", formData);
  }
}
