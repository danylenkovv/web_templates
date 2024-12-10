function getPages() {
    return [
        {name: 'tab1', title: 'First Tab', text: 'This is the content of the first tab.'},
        {name: 'tab2', title: 'Second Tab', text: 'This is the content of the second tab.'},
        {name: 'tab3', title: 'Third Tab', text: 'This is the content of the third tab.'}
    ];
}

function createTabButton(page, isActive = false) {
    let tabButton = document.createElement('div');
    tabButton.classList.add('tab-button');
    if (isActive) tabButton.classList.add('active');
    tabButton.textContent = page.title;
    tabButton.dataset.tab = page.name;
    tabButton.addEventListener('click', () => displayTabContent(page.name));

    return tabButton;
}

function generateTabs(pages) {
    let tabButtonsContainer = document.querySelector('.tabs');

    pages.forEach((page, index) => {
        let isActive = index === 0; // Set the first tab as active
        let tabButton = createTabButton(page, isActive);
        tabButtonsContainer.appendChild(tabButton);

        if (isActive) displayTabContent(page.name); // Display content of the first tab by default
    });
}

function displayTabContent(tabName) {
    let tabContentContainer = document.querySelector('.tab-content');
    let pages = getPages(); // Fetch the pages array from the function
    let currentPage = pages.find(page => page.name === tabName);
    tabContentContainer.innerHTML = `<h2>${currentPage.title}</h2><p>${currentPage.text}</p>`;

    updateActiveTab(tabName);
    window.location.hash = `#${tabName}`; // Update the URL hash
}

function updateActiveTab(tabName) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.toggle('active', button.dataset.tab === tabName);
    });
}

function loadTabFromHash() {
    let hash = window.location.hash.substring(1); // Remove the '#' symbol
    if (hash) {
        displayTabContent(hash);
    }
}

function initTabs() {
    generateTabs(getPages());
    loadTabFromHash();
}

window.addEventListener('DOMContentLoaded', initTabs);
