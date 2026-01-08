const words = document.querySelectorAll('.word');
const categories = document.querySelectorAll('.category');
let correctCount = 0;
const totalWords = words.length;

words.forEach(word => {
  word.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', word.dataset.category);
    e.dataTransfer.setData('wordId', word.innerText); // optional if you want to identify
    setTimeout(() => word.style.opacity = '0.5', 0);
  });

  word.addEventListener('dragend', () => {
    word.style.opacity = '1';
  });
});

categories.forEach(category => {
  category.addEventListener('dragover', e => {
    e.preventDefault(); // must do this to allow drop
  });

  category.addEventListener('drop', e => {
    e.preventDefault();
    const droppedCategory = e.dataTransfer.getData('text/plain');
    const wordText = e.dataTransfer.getData('wordId');

    // Find the dragged word by innerText
    const draggedWord = Array.from(words).find(w => w.innerText === wordText);

    if (droppedCategory === category.dataset.category) {
        draggedWord.classList.add('correct'); // fades out (CSS)
        
        // remove after animation and update counter
        setTimeout(() => {
          draggedWord.style.display = 'none';
          correctCount++; // increment correct words
          
          // If all words are done, show message
          if (correctCount === totalWords) {
            showGoodJobMessage();
          }
        }, 300); // match CSS transition time
      } else {
        draggedWord.style.opacity = '1'; // wrong word stays
      }
  });
});
function showGoodJobMessage() {
    const message = document.createElement('div');
    message.innerText = 'Good job!';
    message.classList.add('good-job');
    document.body.appendChild(message);
  
    setTimeout(() => {
      message.remove();
    }, 2000); // message lasts 2 seconds
  }
