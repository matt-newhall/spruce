# Limitations

I am quite happy with the solution given, but here's what I would improve on if I had the chance to do the task again:

- I'd like to pay slightly more attention to the frontend styling. It's been a little while since I've used TailwindCSS so I did some bits here and there, but mostly focused on code quality for the purpose of this exercise.
- Testing is brief for both the front and backends. I believe I've tested the core functionality, such as the database writing of games/players, as well as the boardUtils.ts file - which contains the majority of the functionality on the frontend - but it would have been nice to do some E2E tests & testing some of the queries/mutations in the client.
- There is currently no ability to change either player's name. I believe this is possible, and I have setup the players table such that `name` is not a unique constraint. `getPlayerId` has hard-coded player names of 'Player X' and 'Player O' currently - the simple way to get around this would be to manually hardcode the IDs into the client, but this isn't particularly extensible. The better approach would be to remove the business logic of 'player X' and 'player O' from the backend. The `games` table could be updated to state 'Player 1' and 'Player 2'. Additionally, on the frontend the game state could change the active player based on the player ID.
- Layout isn't great - mobile will be particularly bad at larger screen sizes. Also, all of the components are 'clumped' a bit - only really an issue for the score display which definitely could look nicer.
- I'd like to share types between the FE and BE. I think this particularly shows in `useStats.ts` where the `data` object is untyped.
- `onClickSquare` is in dire need of a refactor, it's doing quite a bit more than a simple `onClick` and is also handling a lot of game end checking which direly needs to be in a different function.
- Test runs wipe database data entirely - doing this again, it would be better to do test runs in a separate Docker container to avoid deleting live data, but I just didn't have time for this.
