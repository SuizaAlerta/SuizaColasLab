import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pantalla',
  templateUrl: './pantalla.component.html',
  styleUrls: ['./pantalla.component.css']
})
export class PantallaComponent implements OnInit {

  @ViewChild('videoPlayer') videoplayer: any;

  constructor() { 

    /* var myVideo = document.getElementById("my_video_1").id
    console.log(myVideo); */
    
    /* var myVideo: any = document.getElementById("my_video_1");
    myVideo.play */
    
  }

  ngOnInit(): void {
    
  }


}