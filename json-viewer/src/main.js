"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
var readlineSync = require("readline-sync");
// JSON-bestanden inlezen   
var loadJSON = function (filename) {
    var filePath = path.join(__dirname, "../data", filename);
    var data = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(data);
};
// Data inladen
var games = loadJSON("games.json");
// Menu weergeven
var showMenu = function () {
    console.log("\nWelcome to the JSON data viewer!\n");
    console.log("1. View all data");
    console.log("2. Filter by ID");
    console.log("3. Exit");
};
// Alle games tonen
var showAllGames = function () {
    console.log("\n All Games:");
    games.forEach(function (game) {
        console.log("- ".concat(game.name, " (").concat(game.id, ")"));
    });
};
// Game zoeken op ID
var filterByID = function () {
    var id = readlineSync.questionInt("\nPlease enter the ID you want to filter by: ");
    var game = games.find(function (g) { return g.id === id; });
    if (!game) {
        console.log("\n No game found with that ID.");
        return;
    }
    console.log("\n ".concat(game.name, " (").concat(game.id, ")"));
    console.log("  - Description: ".concat(game.description));
    console.log("  - Price: \u20AC".concat(game.price.toFixed(2)));
    console.log("  - Available: ".concat(game.isAvailable ? " Yes" : " No"));
    console.log("  - Release Date: ".concat(game.releaseDate));
    console.log("  - Category: ".concat(game.category));
    console.log("  - Genres: ".concat(game.genres.join(", ")));
    console.log("  - Developer: ".concat(game.developer.name, " (").concat(game.developer.country, ")"));
    console.log("  - Website: ".concat(game.developer.website));
};
// Hoofdloop
var main = function () {
    while (true) {
        showMenu();
        var choice = readlineSync.questionInt("\nPlease enter your choice: ");
        switch (choice) {
            case 1:
                showAllGames();
                break;
            case 2:
                filterByID();
                break;
            case 3:
                console.log("\n Exiting program...");
                process.exit(0);
            default:
                console.log("\n Invalid choice, please try again.");
        }
    }
};
main();
