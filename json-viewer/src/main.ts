import * as fs from "fs";
import * as path from "path";
import * as readlineSync from "readline-sync";
import { Game, Developer } from "./interface";

// JSON-bestanden inlezen   
const loadJSON = <T>(filename: string): T => {
  const filePath = path.join(__dirname, "../data", filename);
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
};

// Data inladen
const games: Game[] = loadJSON<Game[]>("gameslijst.json");

// Menu weergeven
const showMenu = (): void => {
  console.log("Welcome to the JSON data viewer!\n");
  console.log("1. View all data");
  console.log("2. Filter by ID");
  console.log("3. Exit");
};

// Alle games tonen
const showAllGames = (): void => {
  console.log("All Games:");
  games.forEach((game) => {
    console.log(`- ${game.name} (${game.id})`);
  });
};

// Game zoeken op ID
const filterByID = (): void => {
  const id = readlineSync.questionInt("Please enter the ID you want to filter by: ");
  const game = games.find((g) => g.id === id);

  if (!game) {
    console.log("No game found with that ID.");
    return;
  }

  console.log(`${game.name} (${game.id})`);
  console.log(`- Description: ${game.description}`);
  console.log(`- Price: €${game.price.toFixed(2)}`);
  console.log(`- Available: ${game.isAvailable ? " Yes" : " No"}`);
  console.log(`- Release Date: ${game.releaseDate}`);
  console.log(`- Category: ${game.category}`);
  console.log(`- Genres: ${game.genres.join(", ")}`);
  console.log(`- Developer: ${game.developer.name} (${game.developer.country})`);
  console.log(`- Website: ${game.developer.website}`);
};

// Hoofdloop
const main = (): void => {
  while (true) {
    showMenu();
    const choice = readlineSync.questionInt("Please enter your choice: ");

    switch (choice) {
      case 1:
        showAllGames();
        break;
      case 2:
        filterByID();
        break;
      case 3:
        console.log("Exiting program...");
        process.exit(0);
      default:
        console.log("Invalid choice, please try again.");
    }
  }
};

main();