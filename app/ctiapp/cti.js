let agent = anCti.newAgent();
let webphone;
let audio = new Audio();
audio.autoplay = true;

agent.startApplicationSession({
    username: "phuln6@fpt.com",
    password: "Phuln6!!!",
})
agent.on("applicationsessionstarted", (event) => {
    // webphone = agent.getDevice("sip:9999@autocall.oncallcx.test.vn");
    webphone = agent.getDevice("sip:1973@oncallcx.crm.vn");
    console.log({webphone});
    // tell server that we want to use WebRTC (error handling omitted)
    webphone.monitorStart({ rtc:true });  
});

// if WebRTC creates a media-stream we bind it to the corresponding elements
agent.on('localstream', (event) => {
  document.getElementById('localView').srcObject = event.stream;
});

agent.on('remotestream',(event) => {
  document.getElementById('remoteView').srcObject = event.stream;
  audio.srcObject = event.stream;
});

document.onclick = () => {
    let call = webphone.calls[0];
    if (!call) {
        // click without an active call -> start a video call to number 23
        webphone.makeCall("0985554375", { autoOriginate: "doNotPrompt",audio : true,video : false,subjectOfCall : 'PredictiveCall'});
    } else if (call.localConnectionInfo=="alerting") {
        // click while we have an alerting call -> accept it
        call.answerCall({ audio:true, video: true});
    } else {
        // otherwise we release the call
        call.clearConnection();
    }
}