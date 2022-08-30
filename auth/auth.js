

const signupForm = document.getElementById('signup-form');
const changeButtonLink = document.getElementById('change-button');
const signUpButton = document.getElementById('signup-button');


signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(signupForm);

    const email = data.get('email');
    const password = data.get('password');
    
    console.log(email,password);

   
});

changeButtonLink.addEventListener('click', () => {
    console.log('clicked');
    signUpButton.textContent = 'Sign in';
})




