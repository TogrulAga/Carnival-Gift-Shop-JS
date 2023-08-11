const input = require("sync-input");

function Gift(name, price, id) {
  this.name = name;
  this.price = price;
  this.id = id;
}

const gifts = [];
gifts[0] = new Gift("Teddy Bear", 10, 1);
gifts[1] = new Gift("Big Red Ball", 5, 2);
gifts[2] = new Gift("Huge Bear", 50, 3);
gifts[3] = new Gift("Candy", 8, 4);
gifts[4] = new Gift("Stuffed Tiger", 15, 5);
gifts[5] = new Gift("Stuffed Dragon", 30, 6);
gifts[6] = new Gift("Skateboard", 100, 7);
gifts[7] = new Gift("Toy Car", 25, 8);
gifts[8] = new Gift("Basketball", 20, 9);
gifts[9] = new Gift("Scary Mask", 75, 10);

console.log(`WELCOME TO THE CARNIVAL GIFT SHOP!
Hello friend! Thank you for visiting the carnival!`);

function showGifts() {
  console.log("Here's the list of gifts:\n");

  if (gifts.length === 0) {
    console.log("Wow! There are no gifts to buy.");
    return;
  }
  gifts.forEach((gift) => console.log(`${gift.id}- ${gift.name}, Cost: ${gift.price} tickets`));
}

let tickets = 0;

function checkTickets() {
  console.log(`Total tickets: ${tickets}`);
}

function main () {
  showGifts();

  while (true) {
    console.log("\nWhat do you want to do?")
    const action = input("1-Buy a gift 2-Add tickets 3-Check tickets 4-Show gifts 5-Exit the shop\n");

    if (!action.match("[1-5]")) {
      console.log("Please enter a valid number!")
      continue;
    }

    const choice = Number(action);
    switch (choice) {
      case 1:
        if (gifts.length === 0) {
          console.log("Wow! There are no gifts to buy.");
          continue;
        }

        const id = input("Enter the number of the gift you want to get: ");
        if (!id.match("[1-9]|10")) {
          console.log("Please enter a valid number!");
          continue;
        }

        const giftId = Number(id);
        const gift = gifts.find(g => g.id === giftId);
        if (gift === undefined) {
          console.log("There is no gift with that number!");
          continue;
        }

        if (tickets < gift.price) {
          console.log("You don't have enough tickets to buy this gift.")
          continue;
        }

        tickets -= gift.price;
        gifts.splice(gifts.findIndex(g => g.id === giftId), 1);
        console.log(`Here you go, one ${gift.name}!`);
        checkTickets();
        break;
      case 2:
        const amount = input("Enter the ticket amount: ");
        if (!amount.match(/^(\d{1,3}|1000)$/)) {
          console.log("Please enter a valid number between 0 and 1000.");
          continue;
        }
        tickets += Number(amount);
        checkTickets();
        break;
      case 3:
        checkTickets();
        break;
      case 4:
        showGifts();
        break;
      case 5:
        console.log("Have a nice day!");
        return;
      default:
    }
  }
}


main();