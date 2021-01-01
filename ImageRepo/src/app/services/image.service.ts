import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Image } from 'src/app/models/image.model'
import { ImagePost } from '../models/image-post.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ImageService {
  apiPath: string;

  constructor(private http: HttpClient,
              private userService: UserService) {
    this.apiPath = "https://image-repository-kush.herokuapp.com";
    this.apiPath = "http://localhost:3000";
  }

  getImages(): Observable<any> {
    return this.http.get<any>(this.apiPath+"/image");
  }

  getImage(id: string): Observable<any> {
    return this.http.get<any>(this.apiPath+"/image/"+id);
  }

  getUsersImages(id: string): Observable<any> {
    return this.http.get<any>(this.apiPath+"/image/user/"+id, {
      headers: {
        Authorization: "Bearer " + this.userService.accessToken
      }
    });
  }

  postImages(image: ImagePost) {
    const formData: FormData = new FormData();
    formData.append('imageUpload', image.imageUpload);
    formData.append('name', image.name);
    formData.append('public', image.public.toString());
    formData.append('userId', image.userId);
    return this.http.post(this.apiPath+"/image", formData, {
      headers: {
        Authorization: "Bearer " + this.userService.accessToken
      }
    });
  }

  deleteImage(imageId: string) {
    return this.http.delete(this.apiPath + "/image/" + imageId, {
      headers: {
        Authorization: "Bearer " + this.userService.accessToken
      }
    });
  }
}
