import { userIdToken } from "./firebase";
import { Room } from "./room";

async function fetchWithAuth<Res>(
  target: string,
  req: any = {}
): Promise<{ response?: Res; status: number; statusText?: string }> {
  const response = await fetch(`api/${target}`, {
    method: "POST",
    body: JSON.stringify({ ...req, idToken: await userIdToken() }),
  });
  if (response.status !== 200) {
    const { error } = await response.json().catch(() => ({}));
    return {
      status: response.status,
      statusText: error || response.statusText,
    };
  }
  return { response: (await response.json()) as Res, status: 200 };
}

export async function callCreateRoom(): Promise<{
  errorMessage?: string;
  room?: Room;
}> {
  const {
    response: room,
    status,
    statusText,
  } = await fetchWithAuth<Room>("createRoom");
  if (room) return { room };
  return { errorMessage: `${status} Failed to create room: ${statusText}` };
}
