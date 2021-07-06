export interface SlotGamesGameInfo {
  
  "gameId": number,
  "gameName": string,
  "gameInfo": string,
  "translatedContent": string

}
export interface GameInfo {
  slotGamesGameInfo : SlotGamesGameInfo[]
}


export interface UserStatus {
  statusId: number;
  message: string;
}
