# Kniffel in React
 (Made by using npm create-react-app in Node.js)
 
 ### Kniffel dice game (also called Yahtzee): 
 - https://en.wikipedia.org/wiki/Yahtzee
 - https://de.wikipedia.org/wiki/Kniffel
 
 ## Implementation
 
 - The program is written in Javascript using React.
    - Main file is App.js keeping track of the game state, parent of all other components.
    - RollDice component is responsible for the dice, and related buttons.
    - Dice component renders a single dice with the correct color scheme (selected or not) and animation status (shaking or not).
 - The game can be played individually or with maximum 6 players. (Default is set to 4, but can be changed in the Navigation Bar.)
 - Steps:
      - Player 1 presses "Würfeln" button to throw the dice.
      - If he wants to keep any of the dice, he has to click on that particular die to select it.
      - Every turn a player has 3 chances to throw the dice, the selected ones will not change.
      - If the player does not want to use all of his throws, he can push the "Fertig" button.
      - After the 3 throws are done or the "Fertig" button was pushed, the player has to select one of thirteen categories in the score table. The points for the given category are calculated automatically.
      - After the points were calculated, the game moves on to the next player.
- These steps are repeated until all thirteen categories for all players are full.
- At the bottom of the score table players can see who gathered the most points in the "Gesamtsumme" row.
- The game can be reset by using the "Reset" button under the table. (Or by selecting a different starting player count in the navigation bar)

![image](https://user-images.githubusercontent.com/65888378/140896819-e6548378-399a-4632-ba97-d76a789487a5.png)
![image](https://user-images.githubusercontent.com/65888378/140897034-1816cfd4-d4a8-47d8-8425-9b36685376cd.png)

## Further ideas
- Hover effect showing description of categories.
- Sound effects when throwing the dice, and cheering sounds at game end.
- Pop-up window at game end showing placements.
- Expandable menu 
   - to mute sounds
   - game rules
   - ... etc.
- Leaderboard keeping track of the highest points achieved.
- Customizable dice styles and color theme (e.g. dark mode)
