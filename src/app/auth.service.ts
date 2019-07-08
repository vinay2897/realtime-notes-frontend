import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = false;
  httpServerUrl = "/api";
  constructor(private http: HttpClient) { }

  signup(user){
    return this.http.post(this.httpServerUrl+"/signup", user, {withCredentials: true});
  }

  login(user){
    return this.http.post(this.httpServerUrl+"/login", user, {withCredentials: true});
  }

  logout(){
    return this.http.post(this.httpServerUrl+"/logout", {}, {withCredentials: true});
  }

  createNote(){
    return this.http.post(this.httpServerUrl+"/create-note", {}, {withCredentials: true});
  }

  setRid(content){
    return this.http.post(this.httpServerUrl+"/test-redis", {content}, {withCredentials: true});
  }

  shareNote(shareWith){
    return this.http.post(this.httpServerUrl+"/share-note", shareWith, {withCredentials: true});
  }

  getAllNotes(){
    return this.http.post(this.httpServerUrl+"/all-notes", {}, {withCredentials: true});
  }

  accessNote(rid){
    return this.http.post(this.httpServerUrl+"/access-notes", {rid}, {withCredentials: true});
  }

}
