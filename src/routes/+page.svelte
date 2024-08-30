<script lang="ts">
  import * as Table from "$lib/components/ui/table"
  import { Badge } from "$lib/components/ui/badge"
  import { Input } from "$lib/components/ui/input"

  import type { PageData } from "./$types"

  let filter: string = ""

  export let data: PageData;
</script>

<div class="grid grid-cols-1 justify-items-center mb-6 mt-3">
  <p><a href="https://steamcommunity.com/id/0e-" class="text-blue-400 hover:text-blue-300 transition-colors duration-50">solo's</a> loser list web representation</p>
  <p class="text-center font-['Noto Sans Mono'] mb-6">{data.losers.length} players found</p>

  <Input type="text" placeholder="Search by Name or SteamID3" class="mt-3 max-w-64" bind:value={filter} />
</div>

<div class="w-[50%] ml-[25%] mr-[25%] border-4 rounded-md">
  <Table.Root>
    <Table.Header>
      <Table.Row>
        <Table.Head>Name (Last Seen)</Table.Head>
        <Table.Head>Attributes</Table.Head>
        <Table.Head>SteamID3</Table.Head>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {#each data.losers.filter((p) => p.steamid.includes(filter) || p.last_seen.player_name.includes(filter)) as player}
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

<style lang="postcss">
  :global(body) {
    margin-bottom: 40px;
  }
</style>