import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  socket: WebSocket;
  messages = []
  sent = []

  constructor(private http: HttpClient){

  
  }

  send(message){
    this.sent.push(message)
    this.socket.send(message)
  }

  connect(){
    let url = "ws://192.168.31.160:3000/";
    this.socket = new WebSocket(url);
    this.socket.onerror = (error) => {
      console.log(error);
    };
    this.socket.onmessage = (event)=>{
      this.messages.push(event.data)
    };
  }

  setCookie(){
    this.http.post("http://localhost:3001/set-cookie", {}, {withCredentials: true}).subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

}
