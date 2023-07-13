// Quiz data
var questions = [
    {
      question: "What is the capital city of France?",
      options: ["Paris", "London", "Berlin", "Rome"],
      answer: "Paris"
    },
    {
      question: "What is the largest planet in our solar system?",
      options: ["Mars", "Venus", "Saturn", "Jupiter"],
      answer: "Jupiter"
    },
    {
      question: "What year was JavaScript created?",
      options: ["1995", "2005", "2010", "1985"],
      answer: "1995"
    },
    {
      question: "Which programming language is known as the 'mother of all languages'?",
      options: ["Python", "C", "Java", "Assembly"],
      answer: "Assembly"
    }
  ];
  
  // Variables
  var currentQuestionIndex = 0;
  var score = 0;
  var time = 60;
  var timerInterval;
  
  // DOM elements
  var timeEl = document.getElementById("time");
  var questionEl = document.getElementById("question");
  var optionsEl = document.getElementById("options");
  var resultEl = document.getElementById("result");
  var initialsEl = document.getElementById("initials");
  var saveButtonEl = document.getElementById("save-button");
  var resultContainerEl = document.getElementById("result-container");
  var mainContainerEl = document.getElementById("main-container");
  var highScoresContainerEl = document.getElementById("high-scores-container");
  
  // Event listener for options
  optionsEl.addEventListener("click", handleOptionClick);
  
  // Event listener for save button
  saveButtonEl.addEventListener("click", handleSaveButtonClick);
  
  // Event listener for view scores button
  var viewScoresButtonEl = document.getElementById("view-scores");
  viewScoresButtonEl.addEventListener("click", handleViewScoresClick);
  
  // Event listener for go back button
  var goBackButtonEl = document.getElementById("go-back");
  goBackButtonEl.addEventListener("click", handleGoBackClick);
  
  // Event listener for clear scores button
  var clearScoresButtonEl = document.getElementById("clear-scores");
  clearScoresButtonEl.addEventListener("click", handleClearScoresClick);
  
  // Function to start the quiz
  function startQuiz() {
    startTimer();
    showQuestion();
  }
  
  // Function to start the timer
  function startTimer() {
    timerInterval = setInterval(function() {
      time--;
      timeEl.textContent = time;
  
      if (time <= 0) {
        endQuiz();
      }
    }, 1000);
  }
  
  // Function to display the current question
  function showQuestion() {
    var question = questions[currentQuestionIndex];
  
    questionEl.textContent = question.question;
    optionsEl.innerHTML = "";
  
    for (var i = 0; i < question.options.length; i++) {
      var option = document.createElement("button");
      option.classList.add("option");
      option.textContent = question.options[i];
      optionsEl.appendChild(option);
    }
  }
  
  // Function to handle option click
  function handleOptionClick(event) {
    var selectedOption = event.target;
    var selectedAnswer = selectedOption.textContent;
    var question = questions[currentQuestionIndex];
  
    if (selectedAnswer === question.answer) {
      score++;
      resultEl.textContent = "Correct!";
    } else {
      time -= 10;
      resultEl.textContent = "Wrong!";
    }
  
    resultContainerEl.style.display = "block";
    optionsEl.style.pointerEvents = "none";
    selectedOption.classList.add("selected");
  
    currentQuestionIndex++;
  
    if (currentQuestionIndex === questions.length) {
      endQuiz();
    } else {
      setTimeout(function() {
        resultContainerEl.style.display = "none";
        optionsEl.style.pointerEvents = "auto";
        selectedOption.classList.remove("selected");
        showQuestion();
      }, 1000);
    }
  }
  
  // Function to end the quiz
  function endQuiz() {
    clearInterval(timerInterval);
  
    questionEl.textContent = "";
    optionsEl.innerHTML = "";
  
    resultEl.textContent = "Quiz ended!";
    resultContainerEl.style.display = "block";
  
    initialsEl.style.display = "inline";
    saveButtonEl.style.display = "inline";
  }
  
  // Function to handle view scores button click
  function handleViewScoresClick() {
    mainContainerEl.style.display = "none";
    highScoresContainerEl.style.display = "block";
    renderHighScores();
  }
  
  // Function to handle go back button click
  function handleGoBackClick() {
    highScoresContainerEl.style.display = "none";
    mainContainerEl.style.display = "block";
  }
  
  // Function to handle clear scores button click
  function handleClearScoresClick() {
    localStorage.removeItem("highScores");
    renderHighScores();
  }
  
  // Function to render high scores
  function renderHighScores() {
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    var highScoresListEl = document.getElementById("high-scores-list");
    highScoresListEl.innerHTML = "";
  
    for (var i = 0; i < highScores.length; i++) {
      var scoreData = highScores[i];
      var listItem = document.createElement("li");
      listItem.textContent = scoreData.initials + " - " + scoreData.score;
      highScoresListEl.appendChild(listItem);
    }
  }
  
  // Function to handle save button click
  function handleSaveButtonClick() {
    var initials = initialsEl.value.trim();
  
    if (initials !== "") {
      var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
      var scoreData = {
        initials: initials,
        score: score
      };
      highScores.push(scoreData);
      localStorage.setItem("highScores", JSON.stringify(highScores));
      alert("Score saved!");
  
      initialsEl.value = "";
      initialsEl.style.display = "none";
      saveButtonEl.style.display = "none";
    }
  }
  
  // Start the quiz
  startQuiz();
  