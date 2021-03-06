"use strict";

// при старте показываем Цели
turnOnGoals();
turnOffActions();

// получаем цели из БД
fetch('http://localhost:5000/goals')
    .then( response => response.json() )
    .then(
        function(json) {
            // отрисовываем полученные цели
            for (let i = 0; i < json.length; i++) {
                const goal = json[i];
                displayGoalDiv(goal.name, goal.target, 0);
            }
        }
    )
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
    saveNewGoal(divGoalName.value, goalNumericArgument.value);

    // очищаем поля ввода
    divGoalName.value = "";
    goalNumericArgument.value = "";
}

function displayGoalDiv(goalName, goalTarget, goalCurrent) {
    // отображаем div с новой целью
   let divGoals = document.getElementById("goals");    
   let div = document.createElement('div');
   div.innerHTML = `
   <div>
        <p style="margin-top: 20px; margin-bottom: 0;">${goalName} - 25% (25/${goalTarget})</p>
        <div class="progress" style="margin-top: 0;">
            <div class="progress-bar" role="progressbar" style="width: 45%;" aria-valuenow="25" 
                aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </div>
   `
   divGoals.appendChild(div);
}

function saveNewGoal(goalName, target) {
    fetch(
        'http://localhost:5000/goals',
        {
            method: 'POST',
            body: JSON.stringify({
                name: goalName,
                target: target,
            }),
        },
    )
    .then( response => response.json() )
    .then(
        function(json) {
            alert(json.message);
        }
    )
    .catch(function(error) {
        console.log('Looks like there was a problem: \n', error);
    }); 
}
