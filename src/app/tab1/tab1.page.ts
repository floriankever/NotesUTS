import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FotoService, Photo } from '../services/foto.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public fotoService:FotoService,
    public afStorage : AngularFireStorage,
    public toastCtrl : ToastController,
    afs : AngularFirestore
    ) {
      this.isidataColl = afs.collection('Notes');
      this.isidata = this.isidataColl.valueChanges();
    }

  async ngOnInit() {
    await this.fotoService.loadFoto();
  }

  TambahFoto() {
    this.fotoService.tambahFoto();
  }

  fototitle : string;
  fotoUpload : Photo;

  getNama(judulFoto : Photo) {
    this.fotoUpload = judulFoto;
    this.fototitle = judulFoto.filePath;
  }

  uploadData() {
    const imgfilepath = `ImgStorage/${this.fotoUpload.filePath}`;
    this.afStorage.upload(imgfilepath, this.fotoUpload.dataImage).then(()=> {
      console.log(this.fotoUpload);
      this.showToast();
    });
  }

  isidata: Observable<Notes[]>;
  isidataColl: AngularFirestoreCollection<Notes>;
  Judul: string;
  Tanggal: string;
  Isi: string;
  Nilai: string;

  simpanNote() {
    this.isidataColl.doc(this.Judul).set({
      Judul: this.Judul,
      Tanggal: this.Tanggal,
      Isi: this.Isi,
      Nilai: this.Nilai,
    })
    //this.uploadData()
  }

  async showToast() {
    await this.toastCtrl.create({
      message: 'Note Tersimpan',
      duration : 2000,
      position : 'middle'
    }).then(res => res.present());
  }

}

export interface Notes {
  Judul: string,
  Isi: string,
  Nilai: string,
  Tanggal: string,
}