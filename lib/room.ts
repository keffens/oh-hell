const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const ROOM_NAME_LENGTH = 6;

export interface Room {
  name: string;
  ownerId: string;
  playerIds: string[];
}

export function generateRoomName(): string {
  let name = "";
  for (var i = 0; i < ROOM_NAME_LENGTH; i++) {
    name += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
  }
  return name;
}

export function createRoom(ownerId: string): Room {
  return {
    name: generateRoomName(),
    ownerId,
    playerIds: [ownerId],
  };
}
