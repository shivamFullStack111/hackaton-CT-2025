import { useEffect } from "react";
import { DyteProvider, useDyteClient } from "@dytesdk/react-web-core";
import MeetingRoom from "./MeetingRoom";

function App() {
  const [meeting, initMeeting] = useDyteClient();

  useEffect(() => {
    initMeeting({
      authToken:
        "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdJZCI6IjIyMjE3Y2EyLTUyZTctNDVkNy1hYmM1LTA3OWYwNGM5ZTEyNyIsIm1lZXRpbmdJZCI6ImJiYjg4NDdiLWYyYWQtNDZiNC1hNTkyLTVmMmY2NmUwNmM0ZiIsInBhcnRpY2lwYW50SWQiOiJhYWFkYWU4OC01YWU1LTQ3MTMtOTc3Ny0yNTk4ODIzZmZjMDgiLCJwcmVzZXRJZCI6ImM4NDAzMDk1LWMwYTgtNDVjYy05N2ExLTUxYTJiZTQ3NmU3NiIsImlhdCI6MTc2Njg0NTQxNywiZXhwIjoxNzY3NDUwMjE3fQ.tUwZwcIyohJXAjNAN0zxYo-1Ax579ERVeZ3U6ZvbbJ_MFFJ2K4vNncC-sJwZTSDXVJgUhtC5Zvhs0-onU6TWsd8wGIM1DQuFSlRSmPO02PP4QdHGg-6VZo3ug3Ay4HU6TWs9mTbbUoPNKfiwIYCbkpQHpNxfIQx4JA9-CAnVMSzKsjGUkhXpPpqmWer-pnt5XZJ-jvGdGthmpisi1ReugZcaYyTJR6W3aHHVzrC8-rdBy-aWw_khLv32JbO-7UnP6enUi7F081TwnScfXLknONm9E2mKGkq7rVzpfrK1sVJmQV_jplANQWmZMNqoMesl5247abFq1ANy4hqDK68jfA",
      defaults: {
        audio: false,
        video: false,
      },
    });
  }, []);

  return (
    <DyteProvider value={meeting} fallback={<p>Joining meeting...</p>}>
      <MeetingRoom />
    </DyteProvider>
  );
}

export default App;
