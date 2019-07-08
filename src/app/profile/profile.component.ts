import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  create = false;
  loading = false;
  shareNoteInput = false;
  shareForm: FormGroup;
  socket: WebSocket;
  allNotes: [];
  // allNotes = [{rid:12}, {rid:2}];
  currentNote:any;
  note: string = '';

  constructor(private authService: AuthService) {
    this.shareForm = new FormGroup({
      shareWith: new FormControl('')
    })
  }

  ngOnInit() {
  }

  createNote() {
    this.loading = true;
    this.authService.createNote().subscribe(res => {
      console.log(res)
      // if(res["rid"]){
      this.loading = false;
      //   this.create = true;
      //   let url = "ws://localhost:3000/";
      //   this.socket = new WebSocket(url);
      //   this.socket.onerror = (error) => {
      //     console.log(error);
      //   };
      //   this.socket.onmessage = (event)=>{
      //     console.log(event.data)
      //   };
      // }
    }, err => {
      console.log(err)
    })
  }

  shareNote() {
    this.authService.shareNote(this.shareForm.value).subscribe(res => {
      console.log(res)
    }, err => {
      console.log(err)
    })
  }

  getAllNotes() {
    this.authService.getAllNotes().subscribe(res => {
      console.log(res)
      this.allNotes = res["my_notes"]
    }, err => {
      console.log(err)
    })
  }

  accessNote(rid) {
    this.authService.accessNote(rid).subscribe(res => {
      console.log(res)
      if(res["rid"]){
        this.currentNote = res["rid"];
        this.connectWebsocket();
      }
    }, err => {
      console.log(err)
    })
  }

  connectWebsocket(){
    if(this.socket){
      this.socket.close();
    }
    
    let url = "ws://192.168.31.160:3000/";
    this.socket = new WebSocket(url);
    this.socket.onerror = (error) => {
      console.log(error);
    };
    this.socket.onmessage = (event)=>{
      // console.log(event.data)
      this.note = event.data;
    };
  }

  test(content){
    this.socket.send(content);
  }
}
