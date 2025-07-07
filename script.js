// Buttons Referenzen

const rollBtn = document.querySelector('roll');
const d6Btn = document.querySelector('#six_dice');
const d20Btn = document.querySelector('#twenty_dice');
const dice = document.querySelector('#dice');

// Dice Models

const diceModels = {
    d6: '#6diceModel',
    d20: '#20diceModel'
};

let currentModel = diceModels.d6;
let currentDice = null;

// Swap Models function

function switchDice(modelId) {
  currentModel = modelId;
}

// Makes a new Dice Entity
function spawnDice() {
  // Deletes old Dice
  if (currentDice) {
    currentDice.parentNode.removeChild(currentDice);
  }

  //Dice Entity Parameters
  const dice = document.createElement('a-entity');
  dice.setAttribute('gltf-model', currentModel);
  dice.setAttribute('scale', '0.5 0.5 0.5');
  dice.setAttribute('position', '0 5 0');
  dice.setAttribute('dynamic-body', '');

  marker.appendChild(dice);
  currentDice = dice;

  // Quick Timeout to wait for body, then applies physics (rotation, speed)
  setTimeout(() => {
    if (dice.body) {
      const randForce = () => (Math.random() - 0.5) * 10;
      dice.body.velocity.set(0, 0, 0);
      dice.body.angularVelocity.set(0, 0, 0);
      dice.body.applyImpulse(
        new CANNON.Vec3(randForce(), 5 + Math.random() * 5, randForce()),
        new CANNON.Vec3(0, 0, 0)
      );
      dice.body.angularVelocity.set(randForce(), randForce(), randForce());
    }
  }, 200);
}

//Events

// Dice swapping Events

d6Btn.addEventListener('click', () => switchDice(diceModels.d6));
d20Btn.addEventListener('click', () => switchDice(diceModels.d20));

// Roll button

rollBtn.addEventListener('click', spawnDice);