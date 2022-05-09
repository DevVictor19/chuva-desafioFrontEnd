const slaca_sidemenu = () => {
  // selecao dos elementos
  const navigationAnchors = document.querySelectorAll(
    ".sidemenu-navigation ul li a"
  );

  const initialActiveLi = document.getElementsByClassName("sidemenu-active");
  const activeSpan = document.querySelector(".sidemenu-active span");

  // funcoes funcionamento
  let lastActiveLi = initialActiveLi[0];

  const selectItemMenu = (event) => {
    const currentClickedLi = event.path[1];
    if (lastActiveLi === currentClickedLi) {
      return;
    }

    lastActiveLi.classList.remove("sidemenu-active");
    lastActiveLi.removeChild(activeSpan);

    currentClickedLi.classList.add("sidemenu-active");
    currentClickedLi.appendChild(activeSpan);

    lastActiveLi = currentClickedLi;
  };

  // eventos
  for (let anchor of navigationAnchors) {
    anchor.addEventListener("click", selectItemMenu);
  }
};
slaca_sidemenu();

const slaca_showMoreText = () => {
  // selecao elementos
  const resumeShowMoreBtn = document.getElementById("resume-text-showMore");

  // funcoes funcionamento
  const setDisplayNoneById = (id) => {
    const element = document.getElementById(id);
    element.style.display = "none";
  };

  const setDisplayBlockByClassName = (className) => {
    const element = document.getElementsByClassName(className);
    element[0].style.display = "block";
  };

  const showTextsHandler = (ellipsis_id, button_id, clippedText_class) => {
    setDisplayNoneById(ellipsis_id);
    setDisplayNoneById(button_id);
    setDisplayBlockByClassName(clippedText_class);
  };

  // eventos
  resumeShowMoreBtn.addEventListener("click", () => {
    showTextsHandler(
      "resume-ellipsis",
      "resume-text-showMore",
      "resume-text-clipped"
    );
  });
};
slaca_showMoreText();
