const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}


// creating a Room class
class Room {
  constructor (name, description, inventory, locked, connections) {
    this.name = name,
    this.description = description,
    this.inventory = inventory,
    this.locked = locked,
    this.connections = connections
  }
  map (){
    console.log(`From the ${this.name} you can go to ${this.connections}`)
  }
}

//creating new Objects of my Room class
let Street = new Room ("Street", "You are standing on the street facing a large brick house. Surrounding the house is a tall fence that you are unable to climb or walk around.\n You see a door with a keypad above the handle. On the door is a note.", "keypad, note", false, "kitchen")

let Kitchen = new Room ("Kitchen", "You are now in an all white kitchen. Nothing of color except the plants in the corner of the room, and the bright pink 60's looking fridge.", "fridge, plants", true, "fridge, street" )

let Fridge = new Room ("Fridge", "You are crouched inside of a fridge. You see a seltzer bottle with a handwritten lable on it", "seltzer", false, "kitchen, hallway")

let Hallway = new Room ("Hallway", "You are standing in a long empty hallway. There are two doors. One that is locked with a keypad, and one that is cracked open.", "keypad", false, "fridge, stairs, office")

let Stairs = new Room ("Stairs", "You are halfway up a staircase. At the bottom - the door you just came through. At the top - a dark room", null, false, "hallway, attic")

let Attic = new Room ("Attic", "Now you're standing at the entrance to a large pitch black room. In the far corner, a distance away, by a ray of light coming through a crack in the ceiling, you can see an un-lit candle.", "candle", false, "stairs")

let Office = new Room ("Office", "You're in the middle of a big room with a desk, an iPhone, and laptops everywhere. You must be in someone's office..", "cellphone, laptop, desk", true, "hallway, bedroom")

let Bedroom = new Room ("Bedroom", "You walk into a bedroom with a cozy looking bed ready for someone to sleep in. Next to the bed is a glass of water and a handwritten note. On the wall opposite of the bed you see a broken window that is cracked open", "bed, glass of water, note", false, "office, window")

let Window = new Room ("Window", "You're halfway out the window! One leg inside, one leg outside. It's a 5ft drop to the ground", false, "bedroom, backyard")

let Backyard = new Room ("Backyard", "You are free!! You're in a beautiful backyard full of wildlife and flowers. You can see the Mansfield range off in the distance with an amazing colorful sunset starting. You're at peace.", null, false, null)

//lookup table to map search key (player input) to search value (room Objects)
let roomLookUp = {
  street: Street,
  kitchen: Kitchen,
  fridge: Fridge,
  hallway: Hallway,
  stairs: Stairs,
  attic: Attic,
  office: Office,
  bedroom: Bedroom,
  window: Window,
  backyard: Backyard
}

//State machine that shows possible actions/tranisitions from one state to the next
let roomStates = {
  street: ["Kitchen"],
  kitchen: ["Street" , "Fridge"],
  fridge: ["Kitchen" , "Hallway"],
  hallway: ["Fridge" , "Stairs" , "Office"],
  stairs: ["Hallway" , "Attic"],
  attic: ["Stairs"],
  office: ["Hallway" , "Bedroom"],
  bedroom: ["Office" , "Window"],
  window: ["Bedroom" , "Backyard"]
}

//creating Items class and methods
class Item {
  constructor(name, description, takeable, readable, interactive){
    this.name = name,
    this.description = description,
    this.takeable = takeable,
    this.readable = readable,
    this.interactive = interactive
  }
  read(){
    if (readable === true){
    console.log(this.description)
  }else{
    console.log(`Why are you trying to read a ${this.name} ? You can't do that.`)
  }
}
  take(){
    if (takeable === true){
      inventory.push()
      console.log(`You've added ${this.name} to your inventory`)
    }else{
      console.log('You cannot take this!! Bad!')
    }
   }
   async interact(){
     if (interactive === true){
       let code = await ask("Enter the passcode to unlock this door.\n")
        while (code !== '2431'){
          console.log("Wrong passcode! Try again")
        }if (code === '2431'){
          nextRoom.locked = false //next room or current????
        }
      else if (interactive !== true){
        throw("Cannot interact with this item. Try [take] or [read] instead.")
      }
    }
  }
}
//name, description (for when read), takeable, readable, interactive
  //creating new Objects of my Items class ////LOWERCASE??? to match inventory in room???
  let Keypad = new Item ("Keypad", null, false, false, true)
  let Note = new Item ("Note", "To unlock this door, enter passcode: 2431", false, true, false)
  let Plants = new Item ("Plants", null, true, false, false)
  let Seltzer = new Item ("Seltzer Bottle", "This fridge is cold, isn't is? I bet there's a way into a hallway from here..", true, true, false)
  let Candle = new Item ("Candle", null, false, false, false)
  let iPhone = new Item ("iPhone", "A YouTube video called 'Cute Cats Chasing a Toy' is playing", true, true, false)
  let Laptop = new Item ("Laptop", "There are a million MDN tabs open in the browser and VSCode is open with a Javascript file that has a bunch of code that looks like a Zorkington game.", true, true, false)
  let Bed = new Item ("Bed", null, false, false, false)
  let glassOfWater = new Item ("Glass of Water", null, true, false, false)

  //lookup table for items
  let itemLookUp = {
    keypad: Keypad,
    note: Note,
    plants: Plants,
    "selzter bottle": Seltzer,
    candle: Candle,
    iPhone: iPhone,
    laptop: Laptop,
    bed: Bed,
    "glass of water": glassOfWater
  }

let inventory = [];

let currentRoom = "street";

      //view inventory function
      //drop inventory function...filter through to match user input to reaction
//MAKE PLAYER OBJECT TO TRACK PERSONAL INVENTORY

    //in room..ask - what would you like to do? see map? move rooms? see inventory of room? see personal inventory? [take], [read], or [interact] with item?
 
    async function playing(){
      console.log(roomLookUp[currentRoom].description)
      let input = await ask(`What would you like to do?\n You can [look at the map], [move rooms], [see room inventory], [see personal inventory], [take an item], [read] an item, or [interact] with an item.\n >_`)
      if (input === 'look at the map'){
        roomLookUp[currentRoom].map()
        return playing()
      }
      if (input === 'move rooms'){
      return moveRooms()
      }
      if (input === 'see room inventory'){
        console.log(roomLookUp[currentRoom].inventory)
        let nextMove = await ask("Now what would you like to do?")///FIX THIS TO MAKE OWN IF INPUT
        if (nextMove === 'take an item'){
        return itemTake()}
      }
      if (input === 'see personal inventory'){
        console.log(inventory)
        ///NOT SURE IF THIS WILL WORK 
      }
      if (input === 'read'){
        return readItem()
      }

      


      async function readItem() {
        let whichRead = await ask("Which item would you like to read\n")
        whichRead = whichRead.charAt(0).toUpperCase() + whichRead.slice(1).toLowerCase()
        if (whichRead === 'note'){
          console.log(Note.read())
        }
      }

    async function itemTake (){
      let whichItem = await ask(`Which item from the ${currentRoom} would you like to take?\n`)
      whichItem = whichItem.charAt(0).toUpperCase() + whichItem.slice(1).toLowerCase
      if (itemLookUp.includes(whichItem)){
        whichItem.take()
      }///UNSURE THIS WILL WORK
      }
    

    async function moveRooms(){
      let move = await ask(`Which room would you like to move to?\n`)
      move = move.charAt(0).toUpperCase() + move.slice(1).toLowerCase()
      if (roomStates[currentRoom].includes(move)){
        currentRoom = move.toLowerCase()
          }else{
          console.log(`You can't go to the ${move} from ${currentRoom}`)
        }
        return playing()
    }






  }

    //if input = map
    //roomlookup[currentroom].map------MAP----WORKS!!!!!!!!!
    //if input = move rooms----------MOVE ROOM
    //ask- which room do you want to go to?
    //if roomStates[currentRoom].includes(input)
    //currentRoom = input.toLowerCase......console log description
    //return in room function to start process over-------------WORKS!!!!!!!!!
    //if current room = attic
    //ask, you have two choices, walk forward to get candle, or go back down stairs
    //if foward to candle, die, process exit, ask if play again
    //if go back down stairs
    //start in room function again
    //if input see inventory of room-------ROOM INVENTORY
    //console log roomLookUp[currentRoom].inventory
    //if input see personal inventory-----PERSONAL INVENTORY....NEED TO DO! UNSURE HOW LOL
    //console log playerlookup.inventory????
    //if input is take an item-------TAKE ITEM
    //check if item takeable, if true, push to personal inventory
    //if not takeable, say no no(but maybe already in method above)
    //if read an item
    //check if readable...or call read method on item from lookup table?
    //if interact with item
    //call interact meth
    //if in bedroom and P interact w. bed
    //game done, process exit...ask if play again?
    //if current room backyard
    //P won game!! process exit, or ask if they want to play again, restart top function

    //Make function for "now what would you like to do" rather than restarting whole playing function each time 

    playing()