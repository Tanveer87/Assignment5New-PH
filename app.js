const apiBase = 'https://www.themealdb.com/api/json/v1/1/';

const mealsContainer = document.getElementById('meals-container');
const mealDetailsDiv = document.getElementById("meal-details");


// Getting Meal Data From Base API
const getMealData = mealInput => {
    const url = `${apiBase}search.php?s=${mealInput}`;
    fetch(url)
        .then(response => response.json())
        .then(data => updateUI(data));
}


// Search Button Event handling
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', () => {
    const mealInput = document.getElementById('meal-input').value;
    getMealData(mealInput)
})


// Getting and Setting Meal's Name and Ingredients
const setMealDetails = (data) => {
    const meal = data.meals[0];
    document.getElementById("meal-image").setAttribute('src', `${meal.strMealThumb}`);
    document.getElementById("meal-name").innerText = meal.strMeal;
    const ul = document.getElementById("ingredients-list");
    ul.innerHTML = "";

    for (let i = 1; i <= 20; i++) {
        if (meal[`strIngredient${i}`] === "")
            break;
        const li = document.createElement('li');

        const ingredientName = meal[`strIngredient${i}`];
        const ingredientMeasure = meal[`strMeasure${i}`];

        li.innerHTML = `<i class="checkbox fas fa-check-square"></i>${ingredientMeasure} ${ingredientName}`;
        ul.appendChild(li);
    }
}


// Getting Meal Data By Meal ID
const mealDetails = mealId => {
    fetch(`${apiBase}lookup.php?i=${mealId}`)
        .then(response => response.json())
        .then(data => setMealDetails(data))
    mealDetailsDiv.style.display = 'block';
    location.href = '#meal-details'
}


// Setting all meal information
const updateUI = mealsCollection => {

    if (mealsCollection.meals === null) {
        clearBody();
        notFoundDisplay('block');
    }
    else {
        clearBody();

        mealsCollection.meals.forEach(singleMeal => {

            const singleMealDiv = document.createElement('div');
            singleMealDiv.className = "mealDisplay";

            const mealName = singleMeal.strMeal;
            const mealImage = singleMeal.strMealThumb;
            const mealId = singleMeal.idMeal;

            const singleMealInfo = `
            <img src="${mealImage}"/>
            <div class="d-flex justify-content-center align-items-center">
                <p class="text-center mealName">${mealName}</p>
            </div>
        `
            singleMealDiv.innerHTML = singleMealInfo;
            mealsContainer.appendChild(singleMealDiv);

            singleMealDiv.addEventListener('click', () => {
                mealDetails(mealId);
            });

        });
    }
}


// Displaying Not Found Message 
const notFoundDisplay = displayValue => {
    document.getElementById("not-found").style.display = displayValue;
}


// Removing unnecessary element from the body
const clearBody = () => {
    notFoundDisplay('none');
    mealsContainer.innerHTML = "";
    mealDetailsDiv.style.display = 'none';
}