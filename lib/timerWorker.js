let timer;

self.addEventListener('message', e => {
  if (e.data.start) {
    timer = setInterval(() => {
      self.postMessage({ tick: true });
    }, 1000);
  } else if (e.data.stop) {
    clearInterval(timer);
  }
});
