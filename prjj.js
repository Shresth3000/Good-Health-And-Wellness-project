
const meals = [
  { ingredients: ["eggs", "spinach"], suggestion: "Scrambled eggs with spinach 🥬🍳" },
  { ingredients: ["oats", "milk"], suggestion: "Overnight oats with fruits 🍓🥛" },
  { ingredients: ["chicken", "rice"], suggestion: "Grilled chicken with brown rice 🍗🍚" },
  { ingredients: ["banana", "yogurt"], suggestion: "Banana yogurt smoothie 🍌🥤" },
  { ingredients: ["beans", "bread"], suggestion: "Beans on toast 🥖🌱" }
];


const workouts = {
  low: [
    "10 min yoga flow 🧘",
    "Light stretching routine 🪷",
    "15 min slow walk 🚶‍♂️"
  ],
  medium: [
    "20 min bodyweight workout 💪",
    "HIIT (15 min) 🔥",
    "Cycling for 30 min 🚴"
  ],
  high: [
    "Intense cardio blast (20 min) 🏃",
    "Heavy strength training (30 min) 🏋️",
    "CrossFit-style workout 💥"
  ]
};


function getMeal() {
  let input = document.getElementById("ingredientInput").value.toLowerCase();
  let meal = meals.find(m => input.includes(m.ingredients[0]) || input.includes(m.ingredients[1]));

  let result = meal ? meal.suggestion : "Try a fruit salad 🍎🥗 – healthy & quick!";
  document.getElementById("mealResult").innerText = result;
}


function getWorkout() {
  let time = document.getElementById("timeInput").value;
  let energy = document.getElementById("energyInput").value;

  if (!time || !energy) {
    document.getElementById("workoutResult").innerText = "⚠️ Enter both time & energy level!";
    return;
  }

  let workoutList = workouts[energy];
  let suggestion = workoutList[Math.floor(Math.random() * workoutList.length)];

  document.getElementById("workoutResult").innerText = `${suggestion} (Time: ${time} mins)`;
}
