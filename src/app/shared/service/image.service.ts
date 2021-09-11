// lähteenä Firebase-docs

import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Image } from '../models/image';

@Injectable({
  providedIn: 'root',
})
export class ImageService {
  imageDetailList!: AngularFireList<any>;

  private basePath = '/images';

  constructor(private angfiredb: AngularFireDatabase) {}

  // haetaan kuvat kannasta AngularFireListin avulla
  getImages(): AngularFireList<Image> {
    return this.angfiredb.list(this.basePath, (ref) => ref);
  }
}
