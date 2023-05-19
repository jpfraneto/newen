let timer;
let duration;

addEventListener('message', event => {
  if (event.data.type === 'START') {
    duration = event.data.duration;
    timer = setInterval(() => {
      duration--;
      postMessage('TICK');
      if (duration === 0) {
        clearInterval(timer);
        postMessage('TIME_UP');
      }
    }, 1000);
  } else if (event.data.type === 'PAUSE') {
    clearInterval(timer);
  } else if (event.data.type === 'RESET') {
    clearInterval(timer);
  }
});
