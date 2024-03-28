const textElement = document.getElementById('text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {};
let textNodes = []; // Define textNodes globally

async function startGame() {
  state = {};
  textNodes = await fetchTextNodes(); // Assign the fetched textNodes to the global variable
  showTextNode(1); // Pass the textNodeIndex directly
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  });
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state);
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  if (nextTextNodeId <= 0) {
    return startGame();
  }
  state = Object.assign(state, option.setState);
  showTextNode(nextTextNodeId); // Pass nextTextNodeId directly
}

async function fetchTextNodes() {
  try {
    const response = await fetch('textNodes.json');
    if (!response.ok) {
      throw new Error('Failed to fetch text nodes');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching text nodes:', error.message);
    // You can handle error cases here
    return [];
  }
}

startGame();
