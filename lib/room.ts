import { VerifiedUser } from "./firebase";
import { ADJECTIVES, ANIMAL_NAMES, randomWord } from "./words";

export const MIN_ROOM_NAME_LENGTH = 6; // "bad-ox"
export const MAX_ROOM_NAME_LENGTH = 25; // "old-fashioned-hummingbird"
export const MAX_PLAYERS = 12;

export enum GameState {
  WaitingForPlayers = 0,
  Playing,
  Finished,
}

export interface Player {
  uid: string;
  name: string;
  cards?: number;
}

export interface Room {
  name: string;
  ownerId: string;
  gameState: GameState;
  players: Player[];
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

export function generateRoom(user: VerifiedUser): Room {
  return {
    name: generateRoomName(),
    ownerId: user.uid,
    gameState: GameState.WaitingForPlayers,
    players: [{ uid: user.uid, name: user.name }],
  };
}
