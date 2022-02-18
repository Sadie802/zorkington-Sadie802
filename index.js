const readline = require('readline');
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  console.log(`182 Main St.
You are standing on the street facing a large brick house. Surrounding the house is a tall fence that you are unable to climb.\n You see a door with a keypad above the handle. On the door is a note.`)
  let answer = await ask('What would you like to do?');
}

// creating a Room class
class Room {
  constructor (name, description, locked) {
    this.name = name,
    this.description = description,
    this.locked = locked
    
  }
}

//creating new Objects of my Room class
let Street = new Room ("Street", "You are standing on the street facing a large brick house. Surrounding the house is a tall fence that you are unable to climb or walk around.\n You see a door with a keypad above the handle. On the door is a note.", false)

let Kitchen = new Room ("Kitchen", "You are now in an all white kitchen. Nothing of color except the plants in the corner of the room, and the bright pink 60's looking fridge.", true)

let Fridge = new Room ("Fridge", "You are crouched inside of a fridge. You see a seltzer bottle with a handwritten lable on it", false)

let Hallway = new Room ("Hallway", "You are standing in a long empty hallway. There are two doors. One that is locked with a keypad, and one that is cracked open.", false)

let Stairs = new Room ("Stairs", "You are halfway up a staircase. At the bottom - the door you just came through. At the top - a dark room", false)

let Attic = new Room ("Attic", "Now you're standing at the entrance to a large pitch black room. In the far corner, a distance away, by a ray of light coming through a crack in the ceiling, you can see an un-lit candle.", false)

let Office = new Room ("Office", "You're in the middle of a big room with desks, cell phones, and laptops everywhere. You must be in someone's office..", true)

let Bedroom = new Room ("Bedroom", "You walk into a bedroom with a cozy looking bed ready for someone to sleep in. Next to the bed is a glass of water and a handwritten note. On the wall opposite of the bed you see a broken window that is cracked open", false)

let Window = new Room ("Window", "You're halfway out the window! One leg inside, one leg outside. It's a 5ft drop to the ground", false)

let Backyard = new Room ("Backyard", "You are free!! You're in a beautiful backyard full of wildlife and flowers. You can see the Mansfield range off in the distance with an amazing colorful sunset starting. You're at peace.", false)

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

//State machine that shows possible moves/tranisitions from one state to the next
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