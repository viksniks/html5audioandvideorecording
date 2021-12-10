import { Component } from '@angular/core';
import * as FileSaver from 'file-saver';
declare var document:any;
declare var window:any;
declare var MediaRecorder:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test';
 mediaRecorder:any;
 mediaStream:any;
 fileName:any;

   startRecording() {
    var e = document.getElementById("recordingType");
    var recordingType = e.value;
    var player = document.getElementById("player");
    document.getElementById("player").style.display = "block";
    document.getElementById("recordBtn").style.display = "none";
    document.getElementById("div1").style.display = "none";

    document.getElementById("stopBtn").style.display = "block";
  var ref = this;
    var handleSuccess = function(stream:any) {
        ref.mediaStream = stream;
        player.srcObject = stream;
        ref.mediaRecorder = new MediaRecorder(stream);
        ref.mediaRecorder.start();
        ref.mediaRecorder.ondataavailable = (event:any) => {

            console.log(event.data);
            var blob = event.data;
            // console.log(blob.type);
           // var url = window.URL.createObjectURL(blob);
          //  window.location = url;
            // var a = document.getElementById("download");
            // a.href = url;
            //  var format = (recordingType == "video") ? ".mp4" : ".mp3";

            //  var name = Date.now() + format;
             FileSaver.saveAs(blob,Date.now().toString());

            // a.click();
            // window.URL.revokeObjectURL(url);

            // var reader = new FileReader();
            // reader.readAsDataURL(blob);
            // reader.onloadend = function() {
            //     var base64data = reader.result;

            //     document.getElementById("recorded").data = base64data;
            //     console.log(base64data);
            // }
        }


    };
    var obj = (recordingType == "video") ? {
        audio: true,
        video: true
    } : {
        audio: true,
        video: false
    };

    navigator.mediaDevices.getUserMedia(obj)
        .then(handleSuccess)

}

 stopRecording() {
  this.mediaRecorder.stop();

  document.getElementById("player").style.display = "none";
  document.getElementById("recordBtn").style.display = "block";
  document.getElementById("stopBtn").style.display = "none";
  document.getElementById("div1").style.display = "block";
  // Stop all the tracks in the 
  // received media stream
  this.mediaStream.getTracks()
      .forEach((track:any) => {
          track.stop();
      });
 }
}
