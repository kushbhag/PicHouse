export class ImagePost {
    constructor(name: string, publicImage: boolean, imageUpload: File, userId: string) {
        this.name = name;
        this.public = publicImage;
        this.imageUpload = imageUpload;
        this.userId = userId;
    }

    name: string;
    public: boolean;
    imageUpload: File;
    userId: string;
}