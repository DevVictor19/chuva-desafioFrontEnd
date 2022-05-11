const slaca_contentApp = () => {
  // funcoes globais --------------------
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

  // modificar a aultura da barra lateral de forma dinâmica. --------------------------
  const content = document.getElementById("content");
  const [sideBarMenu] = document.getElementsByClassName("sidemenu");

  const bodyHeightChangeHandler = () => {
    const currentHeight =
      content.clientHeight || content.scrollHeight || content.offsetHeight;

    sideBarMenu.style.height = `${currentHeight}px`;
  };

  content.addEventListener("click", bodyHeightChangeHandler);
  window.addEventListener("load", bodyHeightChangeHandler);

  // expandir a secao resumo ----------------------------------------
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

  // adicionar topicos ---------------------------------------
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

  // exibir e esconder respostas - secao discussoes ---------------
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
slaca_contentApp();
