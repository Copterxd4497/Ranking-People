document.addEventListener('DOMContentLoaded', () => {
  const button1 = document.querySelector('.button_1');
  const button2 = document.querySelector('.button_2');

  if (button1) {
    button1.addEventListener('click', function() {
      const candidateId = button1.getAttribute('data-candidate-id');
      updateImage('button1', candidateId);
    });
  }

  if (button2) {
    button2.addEventListener('click', function() {
      const candidateId = button2.getAttribute('data-candidate-id');
      updateImage('button2', candidateId);
    });
  }

  function updateImage(buttonId, candidateId) {
    fetch('/chosed', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ chosed: buttonId, candidateId: candidateId })
    })
      .then(response => response.text())
      .then(html => {
        document.open();
        document.write(html);
        document.close();
      })
      .catch(error => console.error('Error:', error));
  }
});
