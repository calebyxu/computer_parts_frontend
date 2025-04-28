/* Functions */
function openModel(e) {
    console.log(e.currentTarget.id)
    modal.style.display = "block";
    document.querySelector('.modal-id').innerHTML = e.currentTarget.id
}

const modal = document.querySelector(".modal-window");
const btnList = document.querySelectorAll('.item');
const span = document.querySelector('.close');

/* Add event listeners to buttons */
for (var i=0; i < btnList.length; i++) {
    btnList[i].addEventListener('click', openModel)
}

span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
