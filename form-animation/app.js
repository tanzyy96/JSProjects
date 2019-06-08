function animatedForm() {
  const arrows = document.querySelectorAll(".fa-arrow-right");

  arrows.forEach(arrow => {
    arrow.addEventListener("click", () => {
      // retrieve the next input div
      const input = arrow.previousElementSibling;
      const parent = arrow.parentElement;
      const nextForm = parent.nextElementSibling;

      // check for validation
      if (input.type === "text" && validateUser(input)) {
        console.log(input.value);
        nextSlide(parent, nextForm);
      } else if (input.type === "email" && validateEmail(input)) {
        nextSlide(parent, nextForm);
      } else if (input.type === "password") {
        nextSlide(parent, nextForm);
      } else {
        parent.style.animation = "shake 0.5s ease";
      }
      parent.addEventListener("animationend", () => {
        parent.style.animation = "";
      });
    });
  });
}

function validateUser(user) {
  if (user.value.length < 6) {
    console.log("not enough characters");
    error("rgb(189,87,87)");
  } else {
    error("rgb(87, 189, 130)");
    return true;
  }
}

function validateEmail(email) {
  const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (validation.test(email.value)) {
    error("rgb(87, 189, 130)");
    return true;
  } else {
    error("rgb(189,87,87)");
  }
}

function nextSlide(parent, nextForm) {
  // toggling elements
  parent.classList.add("inactive");
  parent.classList.remove("active");
  nextForm.classList.add("active");
}

function error(color) {
  document.body.style.backgroundColor = color;
}

animatedForm();
