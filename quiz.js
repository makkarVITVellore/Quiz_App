const quesJSON = [
  {
    correctAnswer: "Python",
    options: ["Java", "Python", "Go", "JavaScript"],
    question: "Which programming language is commonly used in Machine Learning?"
  },
  {
    correctAnswer: "Cristiano Ronaldo",
    options: ["Cristiano Ronaldo", "Lionel Messi", "Luiz Suarez", "Karim Benzema"],
    question: "Which player has the highest number of goals in International football?"
  },
  {
    correctAnswer: "Zoom",
    options: ["Github", "VS Code", "Teams", "Zoom"],
    question: "Which of the following softwares is not developed/owned by Microsoft?"
  },
  {
    correctAnswer: "Open AI",
    options: ["Facebook", "Whatsapp", "Instagram", "Open AI"],
    question: "Which of the following companies is not owned by Meta?"
  },
  {
    correctAnswer: "Sundar Pichai",
    options: ["Sundar Pichai", "Elon Musk", "Mark Zuckerberg", "Satya Nadella"],
    question: "Who is the current CEO of Google?"
  }
];

/*
const questionObj =
{
  category: 'Food & Drink',
  id: 'qa-1',
  correctAnswer: 'Three',
  options: ['Two', 'Three', 'Four', 'Five'],
  question:
    "How many pieces of bun are in a Mcdonald's Big Mac?",
};
*/

/*
*In this project, we are going to use mostly 3 properties of the above questionObj. To avoid using the dot operator
 * with questionObj again & again, we can destructure the questionObj. Destructuring involves creating new variables 
 * with the same names as the object's keys. Now instead of doing questionElement.textContent=questionObj.question, 
 * we can simply write question.
  */

/*
const {
  correctAnswer, options, question
} = questionObj;
*/

let score = 0;
const penalty = 0.25;
let currQuestion = 0;
const maxScore = quesJSON.length;

//Accessing all the elements 
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const scoreElement = document.getElementById("score");
const nextElement = document.getElementById("next");

//adding next question functionality
nextElement.addEventListener("click", () => {
  scoreElement.textContent = `Score: ${score}/${maxScore}`;
  nextQuestion();
});


showQuestion();

function showQuestion() {

  //Destructuring each object
  const {
    correctAnswer, options, question
  } = quesJSON[currQuestion];

  //setting question's text content
  // questionElement.textContent = questionObj.question;
  questionElement.textContent = question;
  console.log(currQuestion);
  //shuffle the options 
  const shuffledOptions = shuffleOptions(options);

  //Populating the options div with the buttons
  shuffledOptions.forEach((opt) => {

    const btn = document.createElement('button');
    btn.textContent = opt;
    optionsElement.appendChild(btn);

    //event handling on the button
    btn.addEventListener("click", () => {
      if (opt === correctAnswer) {
        score++;
      } else {
        score = score - penalty;
      }

      scoreElement.textContent = `Score: ${score}/${maxScore}`;
      nextQuestion();
    });
  });

}

function nextQuestion() {
  optionsElement.textContent = '';
  if (currQuestion < quesJSON.length - 1) {
    currQuestion++;
    showQuestion();
  } else {
    questionElement.textContent = 'Quiz Completed!!';
    nextElement.remove();
  }
}
//shuffle the options
function shuffleOptions(options) {
  for (let i = options.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i);
    [options[i], options[j]] = [options[j], options[i]];
  }

  return options;
}
