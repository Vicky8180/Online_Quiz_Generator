import "./AddEffect.css"
function showAddEffect(element) {
    // Add a class to trigger the effect
    element.classList.add('add-effect');

    // Remove the class after the animation ends to reset the state
    element.addEventListener('animationend', function() {
        element.classList.remove('add-effect');
    }, { once: true });
}


export default showAddEffect