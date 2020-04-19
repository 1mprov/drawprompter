;(function () {

  function begin () {
    //hide the prompt div
    document.getElementById('thePromptContainer').style.display = 'none';
    var selectedTopic;

    generateButton = document.getElementById('generateButton');
    thePrompt = document.getElementById('thePrompt');
    thePromptLabel = document.getElementById('thePromptLabel');
    theTopicListUl = document.getElementById('topicsGenerator');

    // all available topics/themes
    for (key in baseTopics) {
      basicTopicsList.push(key);
    }
    // generate topics as UI list elements, all selected by default
    generateTopicElements(basicTopicsList, theTopicListUl);

    // click events
    // generate prompt button
    generateButton.addEventListener('click', (e) => {
      // some err handling 
      if (basicTopicsList.length == 0) {
        document.getElementById("theError").classList.remove("hideElement");
        document.getElementById('thePromptContainer').style.display = 'none';
        return;
      } else {
        document.getElementById("theError").setAttribute("class", "hideElement");
      }
      
      selectedTopic = getRandomBasicTopic(basicTopicsList);
      thePrompt.innerHTML = getRandomPrompt(selectedTopic);
      thePromptLabel.innerHTML = selectedTopic;
      document.getElementById('thePromptContainer').style.display = 'inline-block';
    });

  }

  // helper funcs
  // getRandomInRange returns a random number within the specified range
  function getRandomInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // getRandomPrompt returns a random prompt
  function getRandomPrompt(selectedTopic) {
    let idx;
    topicPrompts = baseTopics[selectedTopic];

    idx = getRandomInRange(0, topicPrompts.length);
    return topicPrompts[idx];
  }

  // getRandomTopicSet returns a random key from the baseTopics map
  function getRandomTopicSet(selectedTopic) {
    return baseTopics[basicTopicsList[selectedTopic]];
  }

  function getRandomBasicTopic(basicTopicsList){
    let idx = getRandomInRange(0,basicTopicsList.length)
    return basicTopicsList[idx]
  }

  function removeTopic(topicToRemove) {
    for (var i = 0; i < basicTopicsList.length ; i++) {
      if (basicTopicsList[i] == topicToRemove) {
        basicTopicsList.splice(i, 1);
      }
    }
  }

  function addTopic(topicToAdd) {
    basicTopicsList.push(topicToAdd);
  }

  // HTML element generation funcs
  // generateTopicLiElements attaches a list of LI elements to the supplied UL 
  // for Topics in the UI
  function generateTopicElements(basicTopicsList, theTopicListUl) {
    for (var i = 0; i < basicTopicsList.length ; i++) {
      var liNode = document.createElement("LI");
      var inputNode = document.createElement("INPUT");
    
      inputNode.setAttribute("type", "checkbox");
      inputNode.setAttribute("class", "hiddenChkBx");
      inputNode.setAttribute("id", basicTopicsList[i]);
      inputNode.setAttribute("value", basicTopicsList[i]);
      // selected by default
      inputNode.checked = true;
      liNode.appendChild(inputNode);

      var labelNode = document.createElement("LABEL");
      labelNode.setAttribute("for", basicTopicsList[i]);
      labelNode.innerHTML =  basicTopicsList[i];
      liNode.appendChild(labelNode);
      
      theTopicListUl.appendChild(liNode);
      liNode.addEventListener('click', unselectTopicElements);
    }
  }

  function unselectTopicElements(e) {
    var activeInput = e.currentTarget.getElementsByTagName("input");
    var interactingTopic = activeInput[0].id; 

    if (activeInput[0].checked == true) {
      e.currentTarget.setAttribute("class", "unChkdChkBx");
      activeInput[0].checked = false;
      // remove the interactive topic from the basicTopicsList
      removeTopic(interactingTopic);
    } else {
      activeInput[0].checked = true;
      e.currentTarget.classList.remove("unChkdChkBx");
      if (!basicTopicsList.includes(interactingTopic)) {
        basicTopicsList.push(interactingTopic);
      }
    }
    
    e.stopPropagation();
  }

  // HTML to load
  document.addEventListener('DOMContentLoaded', begin)
})()