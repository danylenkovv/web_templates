document.querySelector('.bmi-form').addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
    event.preventDefault();

    let height = getHeight();
    let weight = getWeight();
    let bmi = calculateBMI(height, weight);

    displayResult(bmi);
    highlightFigure(bmi);
}

function getHeight() {
    return parseFloat(document.querySelector('.height-input').value) / 100;
}

function getWeight() {
    return parseFloat(document.querySelector('.weight-input').value);
}

function calculateBMI(height, weight) {
    return weight / (height * height);
}

function displayResult(bmi) {
    let resultContainer = document.querySelector('.result-container');
    let bmiResult = document.querySelector('.bmi-result');

    resultContainer.classList.remove('d-none');
    bmiResult.textContent = `Your BMI is: ${bmi.toFixed(1)}`;
}

function highlightFigure(bmi) {
    let figures = document.querySelectorAll('.bmi-category .figure');

    // Remove previous highlights
    figures.forEach(figure => figure.classList.remove('highlight'));

    // Highlight the appropriate figure
    if (bmi <= 18.5) {
        figures[0].classList.add('highlight');
    } else if (bmi <= 24.9) {
        figures[1].classList.add('highlight');
    } else if (bmi <= 29.9) {
        figures[2].classList.add('highlight');
    } else {
        figures[3].classList.add('highlight');
    }
}

