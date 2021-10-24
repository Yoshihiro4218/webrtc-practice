import FirebaseSignallingClient from "./FirebaseSignallingClient";

export default class RtcClient {
  constructor(setRtcClient) {
    const config = {
      iceServers: [{urls: 'stun:stun.stunprotocol.org'}],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignallingClient = new FirebaseSignallingClient();
    this.localPeerName = '';
    this.remotePeerName = '';
    this._setRtcClient = setRtcClient;
    this.mediaStream = null;
  }

  setRtcClient() {
    this._setRtcClient(this);
  }

  async getUserMedia() {
    try {
      const constraints = {audio: true, video: true};
      // TODO: comment out
      // this.mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
    } catch (e) {
      console.log(e);
    }
  }

  startListening(localPeerName) {
    this.localPeerName = localPeerName;
    this.setRtcClient();
    // listen signalling server
    const database = this.firebaseSignallingClient.database
      .ref(localPeerName)
      .on('value', (snapshot) => {
        const data = snapshot.val();
      });
  }
}