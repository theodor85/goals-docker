"use strict";

// при старте показываем Цели
turnOnGoals();
turnOffActions();

// получаем цели из БД

fetch('http://localhost:5000/goals')
.then(function(response) {
    let goals = response.json();
    console.log(goals);
    
    // отображем цели
    for (let i = 0; i < goals.length; i++) {
        const goal = goals[i];
        displayGoalDiv(goal.name, goal.target, goal.current);
    }
})
.catch(function(error) {
  console.log('Looks like there was a problem: \n', error);
});


// обработчик выбора меню Цели
function goalsMenuClick() {
    turnOffActions();
    turnOnGoals();
}

// обработчик выбора меню Действия
function actionsMenuClick() {
    turnOnActions();
    turnOffGoals();
}

function turnOnGoals() {
    let divGoals = document.getElementById("goals");
    divGoals.style.display = "";
}

function turnOffGoals() {
    let divGoals = document.getElementById("goals");
    divGoals.style.display = "none";
}

function turnOnActions() {
    let divActions = document.getElementById("actions");
    divActions.style.display = "";
}

function turnOffActions() {
    let divActions = document.getElementById("actions");
    divActions.style.display = "none";
}


// обработчик ввода новой цели
function onAddGoal(){
    // проверка, что указано имя цели
    let divGoalName = document.getElementById("goalName");
    let goalNumericArgument = document.getElementById("goalNumericArgument");
    if (!divGoalName.value){
        alert("Укажите название цели!");
        return;
    }

    displayGoalDiv(divGoalName.value, goalNumericArgument.value, 0);

    // сохранение в БД
    addNewGoal(divGoalName.value, goalNumericArgument.value);

    // очищаем поля ввода
    divGoalName.value = "";
    goalNumericArgument.value = "";
}

function displayGoalDiv(goalName, goalTarget, goalCurrent) {
    // отображаем div с новой целью
    /* добавляем вот такой div:
    <div>
        <p style="margin-top: 20px; margin-bottom: 0;">Название цели - 25% (25/100)</p>
        <div class="progress" style="margin-top: 0;">
            <div class="progress-bar" role="progressbar" style="width: 45%;" aria-valuenow="25" 
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
    */
   let divGoals = document.getElementById("goals");    
   let div = document.createElement('div');
   div.innerHTML = '<div><p style="margin-top: 20px; margin-bottom: 0;">' + goalName + ' - 0% (0/' + goalTarget + ')</p><div class="progress" style="margin-top: 0;"><div class="progress-bar" role="progressbar" style="width: 0%;" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div></div></div>';

   divGoals.appendChild(div);
}
