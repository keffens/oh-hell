import { userIdToken } from "./firebase";
import { Room } from "./room";

export interface ApiResponse<T> {
  // Either error or data is set.
  error?: string;
  data?: T;
}

async function fetchWithAuth<Res>(req: any): Promise<[any, number, string]> {
  const response = await fetch("api/createRoom", {
    method: "POST",
    body: JSON.stringify({ ...req, idToken: await userIdToken() }),
  });
  if (response.status !== 200) {
    const { error } = await response.json();
    return [undefined, response.status, error ?? response.statusText];
  }
  return [(await response.json()) as Res, 200, ""];
}

export async function callCreateRoom(): Promise<ApiResponse<Room>> {
  const [room, status, statusText] = await fetchWithAuth({});
  if (room) return { data: room };
  return { error: `${status} Failed to create room: ${statusText}` };
}
