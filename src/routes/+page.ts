import type { PageLoad } from './$types';

type Losers = {
  attributes: ["cheater", "suspicious", ""]
  last_seen: { player_name: string, time: number }
  steamid: string
}[]


let losers = [] as Losers

export const load: PageLoad = async ({ fetch }) => {
  const response = await fetch("https://raw.githubusercontent.com/soooolooo/Losers-list/main/playerlist.losers.json")
  const json = await response.json()
  losers = json.players

  return {losers}
};