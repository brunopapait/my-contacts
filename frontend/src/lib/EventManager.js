export default class EventManager {
  constructor() {
    this.listeners = new Map();
  }

  on(event, listener) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event).push(listener);
  }

  emit(event, payload) {
    if (!this.listeners.has(event)) {
      return;
    }

    this.listeners.get(event).forEach((listener) => listener(payload));
  }

  removeListener(event, listenerToRemove) {
    const listeners = this.listeners.get(event);
    if (!listeners) {
      return;
    }

    const filteredListeners = listeners.filter((listener) => listener !== listenerToRemove);
    this.listeners.set(event, filteredListeners);
  }
}

const toastEventManager = new EventManager();

function addToast1(payload) {
  console.log('addToast listener 1 -> ', payload);
}

function addToast2(payload) {
  console.log('addToast listener 2 -> ', payload);
}

toastEventManager.on('addtoast', addToast1);
toastEventManager.on('addtoast', addToast2);

toastEventManager.emit('addtoast', { type: 'success', text: 'Hello World!' });

toastEventManager.removeListener('addtoast', addToast1);

toastEventManager.emit('addtoast', { type: 'danger', text: 'Depois de remover' });

console.log(toastEventManager);
