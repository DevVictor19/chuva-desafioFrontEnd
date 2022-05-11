const slaca_app = () => {
  const setDisplayNoneById = (id) => {
    const element = document.getElementById(id);
    element.style.display = "none";
  };

  const setDisplayBlockById = (id) => {
    const element = document.getElementById(id);
    element.style.display = "block";
  };

  const setDisplayFlexById = (id) => {
    const element = document.getElementById(id);
    element.style.display = "flex";
  };

  const selectItensFromSideMenu = () => {
    const navigationAnchors = document.querySelectorAll(
      ".sidemenu-navigation ul li a"
    );

    const [initialActiveLi] =
      document.getElementsByClassName("sidemenu-active");
    const activeSpan = document.getElementById("sidemenu-active-mark");

    let lastActiveLi = initialActiveLi;

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

    for (let anchor of navigationAnchors) {
      anchor.addEventListener("click", selectItemMenu);
    }
  };

  const listenBodyContentHeight = () => {
    const content = document.getElementById("content");
    const [sideBarMenu] = document.getElementsByClassName("sidemenu");

    const bodyHeightChangeHandler = () => {
      const currentHeight =
        content.clientHeight || content.scrollHeight || content.offsetHeight;

      sideBarMenu.style.height = `${currentHeight}px`;
    };

    content.addEventListener("click", bodyHeightChangeHandler);
    window.addEventListener("load", bodyHeightChangeHandler);
  };

  const expandTexts = () => {
    const resumeShowMoreBtn = document.getElementById("resume-text-showMore");

    const showTextsHandler = (ellipsis_id, button_id, clippedText_id) => {
      setDisplayNoneById(ellipsis_id);
      setDisplayNoneById(button_id);
      setDisplayBlockById(clippedText_id);
    };

    const resumeShowMoreBtnHandler = () => {
      showTextsHandler(
        "resume-ellipsis",
        "resume-text-showMore",
        "resume-text-clipped"
      );
    };

    resumeShowMoreBtn.addEventListener("click", resumeShowMoreBtnHandler);
  };

  const addTopics = () => {
    const createTopicBtn = document.getElementById("create-topic-btn");
    const sendNewTopicBtn = document.getElementById(
      "discussions-form-actions-submit"
    );
    const remakeTopicBtn = document.getElementById("remake-topic-btn");

    const createTopicBtnHandler = () => {
      setDisplayNoneById("discussions-addTopic");
      setDisplayFlexById("discussions-writeTopic");
    };

    const sendNewTopicBtnHandler = () => {
      const assuntoInputText = document.getElementById("assunto");
      const conteudoTextArea = document.getElementById("conteudo");
      let inputsAreValid = true;

      // verificar se algum dos inputs se encontra vazio
      if (assuntoInputText.value.trim() === "") {
        assuntoInputText.style.borderColor = "red";
        inputsAreValid = false;
      }

      if (conteudoTextArea.value.trim() === "") {
        conteudoTextArea.style.borderColor = "red";
        conteudoTextArea.style.borderBottom = "2px solid red";
        inputsAreValid = false;
      }

      if (!inputsAreValid) {
        return;
      }

      // resetando estilos
      assuntoInputText.style.borderColor = "#ccc";
      conteudoTextArea.style.borderColor = "#ccc";
      conteudoTextArea.style.borderBottom = "none";

      setDisplayNoneById("discussions-writeTopic");
      setDisplayFlexById("discussions-topicSent");

      // limpando inputs
      assuntoInputText.value = "";
      conteudoTextArea.value = "";
    };

    const remakeTopicBtnHandler = () => {
      setDisplayNoneById("discussions-topicSent");
      setDisplayFlexById("discussions-addTopic");
    };

    createTopicBtn.addEventListener("click", createTopicBtnHandler);
    sendNewTopicBtn.addEventListener("click", sendNewTopicBtnHandler);
    remakeTopicBtn.addEventListener("click", remakeTopicBtnHandler);
  };

  const answersShowHideHanlder = () => {
    const discussionCardAnswerBtns = document.getElementsByClassName(
      "discussions-card-answers-btn"
    );

    const answerBtnHandler = (event) => {
      currentAnswerSectionId = `answers-${event.target.id}`;
      currentAnswerSection = document.getElementById(currentAnswerSectionId);

      if (currentAnswerSection.style.display === "block") {
        setDisplayNoneById(currentAnswerSectionId);
        return;
      }

      setDisplayBlockById(currentAnswerSectionId);
    };

    for (let AnswerBtn of discussionCardAnswerBtns) {
      AnswerBtn.addEventListener("click", answerBtnHandler);
    }
  };

  selectItensFromSideMenu();
  listenBodyContentHeight();
  expandTexts();
  addTopics();
  answersShowHideHanlder();
};
slaca_app();
