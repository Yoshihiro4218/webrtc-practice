import FirebaseSignallingClient from "./FirebaseSignallingClient";

export default class RtcClient {
  constructor(remoteVideoRef, setRtcClient) {
    const config = {
      iceServers: [{urls: 'stun:stun.stunprotocol.org'}],
    };
    this.rtcPeerConnection = new RTCPeerConnection(config);
    this.firebaseSignallingClient = new FirebaseSignallingClient();
    this.localPeerName = '';
    this.remotePeerName = '';
    this.remoteVideoRef = remoteVideoRef;
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

  async setMediaStream() {
    await this.getUserMedia();
    // TODO: comment out
    // this.addTracks();
    this.setRtcClient();
  };

  addTracks() {
    this.addAudioTrack();
    this.addVideoTrack();
  };

  addAudioTrack() {
    this.rtcPeerConnection.addTrack(this.audioTrack, this.mediaStream);
  };

  addVideoTrack() {
    this.rtcPeerConnection.addTrack(this.videoTrack, this.mediaStream);
  };

  get audioTrack() {
    return this.mediaStream.getAudioTracks()[0];
  };

  get videoTrack() {
    return this.mediaStream.getVideoTracks()[0];
  };

  setOntrack() {
    this.rtcPeerConnection.ontrack = (rtcTrackEvent) => {
      if (rtcTrackEvent.track.kind !== 'video') return;

      const remoteMediaStream = rtcTrackEvent.streams[0];
      this.remoteVideoRef.current.srcObject = remoteMediaStream;
      this.setRtcClient();
    };

    this.setRtcClient();
  };

  connect(remotePeerName) {
    this.remotePeerName = remotePeerName;
    this.setRtcClient();
    this.setOntrack();
  };

  setOnicecandidateCallback() {
    this.rtcPeerConnection.onicecandidate = ({candidate}) => {
      if (candidate) {
        console.log({candidate});
        // TODO: remote へ candidate を通知する
      }
    }
  };

  startListening(localPeerName) {
    this.localPeerName = localPeerName;
    this.setRtcClient();
    // listen signalling server
    this.firebaseSignallingClient.database
      .ref(localPeerName)
      .on('value', (snapshot) => {
        const data = snapshot.val();
      });
  }
}