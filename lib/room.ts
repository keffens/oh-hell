const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const ROOM_NAME_LENGTH = 6;

export function generateRoomName(): string {
  let name = "";
  for (var i = 0; i < ROOM_NAME_LENGTH; i++) {
    name += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return name;
}
