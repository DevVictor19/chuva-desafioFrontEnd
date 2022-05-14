const slaca_app = () => {
  const setDisplayNone = (element) => {
    element.style.display = "none";
  };

  const setDisplayBlock = (element) => {
    element.style.display = "block";
  };

  const setDisplayFlex = (element) => {
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

  const updateHeightOfSidemenuByContentHeight = () => {
    const content = document.getElementById("content");
    const [sideBarMenu] = document.getElementsByClassName("sidemenu");

    const updateSidemenuHeight = () => {
      const currentHeight =
        content.clientHeight || content.scrollHeight || content.offsetHeight;

      sideBarMenu.style.height = `${currentHeight}px`;
    };

    content.addEventListener("click", updateSidemenuHeight);
    window.addEventListener("load", updateSidemenuHeight);
  };

  const expandTexts = () => {
    const resumeShowMoreBtn = document.getElementById("resume-text-showMore");

    const showTextsHandler = (ellipsis_id, button_id, clippedText_id) => {
      const ellipsisElement = document.getElementById(ellipsis_id);
      const buttonElement = document.getElementById(button_id);
      const clippedTextElement = document.getElementById(clippedText_id);

      setDisplayNone(ellipsisElement);
      setDisplayNone(buttonElement);
      setDisplayBlock(clippedTextElement);
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
    const addTopicSectionElement = document.getElementById(
      "discussions-addTopic"
    );
    const writeTopicSectionElement = document.getElementById(
      "discussions-writeTopic"
    );

    const topicSentSectionElement = document.getElementById(
      "discussions-topicSent"
    );

    const createTopicBtnHandler = () => {
      setDisplayNone(addTopicSectionElement);
      setDisplayFlex(writeTopicSectionElement);
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

      setDisplayNone(writeTopicSectionElement);
      setDisplayFlex(topicSentSectionElement);

      // limpando inputs
      assuntoInputText.value = "";
      conteudoTextArea.value = "";
    };

    const remakeTopicBtnHandler = () => {
      setDisplayNone(topicSentSectionElement);
      setDisplayFlex(addTopicSectionElement);
    };

    createTopicBtn.addEventListener("click", createTopicBtnHandler);
    sendNewTopicBtn.addEventListener("click", sendNewTopicBtnHandler);
    remakeTopicBtn.addEventListener("click", remakeTopicBtnHandler);
  };

  const answersShowHideHandler = () => {
    const discussionCardAnswerBtns = document.getElementsByClassName(
      "discussions-card-answers-btn"
    );

    const answerBtnHandler = (event) => {
      currentAnswerSectionId = `answers-${event.target.id}`;
      currentAnswerSection = document.getElementById(currentAnswerSectionId);

      if (currentAnswerSection.style.display === "block") {
        setDisplayNone(currentAnswerSection);
        return;
      }

      setDisplayBlock(currentAnswerSection);
    };

    for (let AnswerBtn of discussionCardAnswerBtns) {
      AnswerBtn.addEventListener("click", answerBtnHandler);
    }
  };

  const showSideBarOnMobile = () => {
    const mobileBtn = document.getElementById("header-mobileMenuBars");
    const [sideMenu] = document.getElementsByClassName("sidemenu");

    const toggleSideBar = () => {
      if (sideMenu.style.display === "flex") {
        setDisplayNone(sideMenu);
        return;
      }
      setDisplayFlex(sideMenu);
    };

    mobileBtn.addEventListener("click", toggleSideBar);
  };

  selectItensFromSideMenu();
  updateHeightOfSidemenuByContentHeight();
  expandTexts();
  addTopics();
  answersShowHideHandler();
  showSideBarOnMobile();
};
slaca_app();
