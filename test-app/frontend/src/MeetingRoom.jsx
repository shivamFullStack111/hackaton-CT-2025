import {
  useDyteMeeting,
  useDyteSelector,
} from "@dytesdk/react-web-core";
import { useEffect, useRef } from "react";

export default function MeetingRoom() {
  const { meeting } = useDyteMeeting();

  // ✅ SELF + OTHER PARTICIPANTS (array form)
  const participants = useDyteSelector((meeting) => {
    const others = Array.from(meeting.participants.joined.values());
    return [meeting.self, ...others];
  });

  return (
    <div style={{ padding: 20 }}>
      <h2>Dyte Video Test</h2>

      {/* CONTROLS */}
      <div style={{ marginBottom: 10 }}>
        <button onClick={() => meeting.self.enableAudio()}>
          Mic ON
        </button>
        <button onClick={() => meeting.self.disableAudio()}>
          Mic OFF
        </button>
      </div>

      <div style={{ marginBottom: 10 }}>
        <button onClick={() => meeting.self.enableVideo()}>
          Camera ON
        </button>
        <button onClick={() => meeting.self.disableVideo()}>
          Camera OFF
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <button onClick={() => meeting.leaveRoom()}>
          Leave Meeting
        </button>
      </div>

      {/* VIDEO GRID */}
      <div style={{ display: "flex", gap: 12 }}>
        {participants.map((p) => (
          <VideoTile key={p.id} participant={p} />
        ))}
      </div>
    </div>
  );
}

function VideoTile({ participant }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl) return;

    // ✅ Correct Dyte → Browser video attach
    if (participant.videoEnabled && participant.videoTrack?.track) {
      const mediaStream = new MediaStream([
        participant.videoTrack.track,
      ]);
      videoEl.srcObject = mediaStream;
      videoEl.play().catch(() => {});
    }

    return () => {
      if (videoEl) {
        videoEl.srcObject = null;
      }
    };
  }, [participant.videoEnabled, participant.videoTrack]);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted={participant.isSelf} // 🔥 SELF VIDEO FIX
        style={{
          width: 220,
          height: 160,
          backgroundColor: "black",
        }}
      />
      <p style={{ textAlign: "center" }}>
        {participant.isSelf ? "You" : participant.name}
      </p>
    </div>
  );
}
