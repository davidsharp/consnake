# consnake ~ snake in devtools

How to run in your webpage:
```html
<script type="module">
  import init from "consnake"
  init()
</script>
```

This game listens for arrow key events once the game is running. The game only runs once it detects that devtools have been opened, but it is a silly toy that isn't the best way to play snake.

## development
`yarn serve` serves `index.html` via `http-server`, then at `localhost:7777` open devtools to see the game

_Further thoughts:_
- random colours between games
- more games?

_Happy snaking!_
