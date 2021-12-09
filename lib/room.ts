import { ADJECTIVES, ANIMAL_NAMES, randomWord } from "./words";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const MIN_ROOM_NAME_LENGTH = 6; // "bad-ox"
export const MAX_ROOM_NAME_LENGTH = 25; // "old-fashioned-hummingbird"

export interface Room {
  name: string;
  ownerId: string;
  playerIds: string[];
}

// Lowercase string, replace separators by dashes and remove all other
// characters.
export function normalizeRoomName(name?: string): string {
  if (!name) return "";
  return name
    .toLowerCase()
    .replaceAll(/[_ ]/g, "-")
    .replaceAll(/[^-a-z]/g, "");
}

export function generateRoomName(): string {
  return randomWord(ADJECTIVES) + "-" + randomWord(ANIMAL_NAMES);
}

export function createRoom(ownerId: string): Room {
  return {
    name: generateRoomName(),
    ownerId,
    playerIds: [ownerId],
  };
}
