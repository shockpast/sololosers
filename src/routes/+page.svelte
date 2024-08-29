<script lang="ts">
  import * as Table from "$lib/components/ui/table"
  import { Badge } from "$lib/components/ui/badge"
  import { Input } from "$lib/components/ui/input"

  let steamid: string = ""
  let saved_data

  export let data: {
    updated_at: number,
    timing: number,
    data: {
      attributes: ["cheater", "suspicious"]
      last_seen: { player_name: string, time: number }
      proof?: ["associate", "defender"]
      steamid: string
    }[]
  }

  saved_data = data
</script>

<div class="grid grid-cols-1 justify-items-center mb-6 mt-3">
  <p>solo's loser list web representation</p>
  <p class="text-center font-['Noto Sans Mono'] mb-6">{data.data.length} players found</p>

  <Input type="text" placeholder="Filter by SteamID3" class="mt-3 max-w-64" bind:value={steamid} />
</div>

<div class="absolute left-1/4 right-1/4 w-6/12 border-4 rounded-md">
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>Name (Last Seen)</Table.Head>
        <Table.Head>Attributes</Table.Head>
        <Table.Head>SteamID3</Table.Head>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {#each saved_data.data.filter((p) => p.steamid.includes(steamid)) as player}
        <Table.Row>
          <Table.Cell>
            <a href={`https://steamid.io/lookup/${player.steamid}`} class="hover:text-blue-400 transition-colors">
              {player.last_seen.player_name}
            </a>
          </Table.Cell>
          <Table.Cell>
            {#each player.attributes as attribute}
              <Badge class={
                attribute == "cheater"
                  ? "bg-red-600 hover:bg-red-500"
                  : attribute == "suspicious"
                    ? "bg-yellow-500 hover:bg-yellow-400"
                    : "bg-slate-500 hover:bg-slate-300"
                + "transition ease-in-out duration-200"
              }>{attribute}</Badge>
            {/each}
          </Table.Cell>
          <Table.Cell>{player.steamid}</Table.Cell>
        </Table.Row>
      {/each}
    </Table.Body>
  </Table.Root>
</div>
