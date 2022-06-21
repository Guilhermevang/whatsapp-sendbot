(function () {
  const MIN_DELAY = 250; // ms
  const message = String(prompt('Digite a mensagem que você deseja enviar:'));
  const times = Number(prompt('Digite a quantidade de vezes que você deseja enviar a mensagem:'));
  const delay = Number(prompt(`Digite o tempo de espera entre cada envio (${MIN_DELAY}ms):`) || MIN_DELAY);

  const must_continue = confirm(`Deseja continuar?
    - Mensagem: ${message}
    - Quantidade: ${times}
    - Delay: ${delay}`);

  if (!must_continue) return alert('Encerrando...');

  if (message.length < 1) return alert('A mensagem deve ter pelo menos um caractere.');
  if (times < 1) return alert('A quantidade deve ser maior que zero.');
  if (delay < MIN_DELAY) return alert(`O tempo de espera deve ser maior que ${MIN_DELAY}ms.`);

  const main = document.querySelector('#main');
  const footer = main.querySelector('footer');
  const textarea = footer.querySelector('div[contenteditable="true"]');

  const send = (callback, count) => {
    textarea.textContent = message;
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    footer.querySelector('[data-icon="send"]').click(); // Send message

    let textLen = textarea.textContent.length;
    if (textLen > 0) return callback(true, `Houve um erro ao enviar a mensagem ${count}`);
    return callback(false, `${count}a enviada com sucesso!`);
  }

  let sended = 0;
  const send_interval = setInterval(() => {
    send((error, message) => {
      if (error) {
        clearInterval(send_interval);
        return alert(message);
      } else console.log(message);
    }, ++sended);

    if (sended >= times) clearInterval(send_interval);
  }, delay);
})()