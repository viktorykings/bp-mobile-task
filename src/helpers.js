export function adjustFontSize(size, linkSize) {
  document.querySelectorAll(`.access`).forEach(el => {
    el.style.fontSize = size + 'px';
  });
  document.querySelector('.per-year').style.fontSize = size - 2 + 'px'
  const links = [...document.querySelector('.footer').children]
  links.forEach(el => {
    el.style.fontSize = linkSize + 'px';
  })
}

// export function selectSubscription() {
//   document.addEventListener("DOMContentLoaded", () => {
//     const subscriptionButtons = document.querySelectorAll(".subscription");
//     const continueButton = document.querySelector("#continue-button");

//     let activeButton = null;
//     console.log(subscriptionButtons)

//     subscriptionButtons.forEach(button => {
//       button.addEventListener("click", () => {
//         // Убираем active у всех
//         subscriptionButtons.forEach(btn => btn.classList.remove("active"));

//         // Добавляем active только текущему
//         button.classList.add("active");
//         activeButton = button;
//       });
//     });

//     continueButton.addEventListener("click", () => {
//       if (activeButton) {
//         const url = activeButton.getAttribute("data-url");
//         window.location.href = url; // Переход по ссылке
//       } else {
//         console.error("Выберите вариант подписки перед продолжением!");
//       }
//     });
//   })

// }
export function selectSubscription() {


  const subscriptionButtons = document.querySelectorAll(".subscription");
  const continueButton = document.querySelector("#continue-button");

  let activeButton = null;

  function setActiveButton(selectedButton) {
    subscriptionButtons.forEach(btn => btn.classList.remove("active"));
    selectedButton.classList.add("active");
    activeButton = selectedButton;
  }

  function proceedToUrl() {
    if (activeButton) {
      const url = activeButton.getAttribute("data-url");
      window.location.href = url; // Переход по указанной ссылке
    } else {
      alert("Выберите вариант подписки перед продолжением!");
    }
  }

  // Привязываем обработчики событий
  subscriptionButtons.forEach(button => {
    button.addEventListener("click", () => setActiveButton(button));
  });

  continueButton.addEventListener("click", proceedToUrl);
}