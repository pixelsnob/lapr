
import EventEmitter from 'eventemitter3';
import DomEvents from './dom';

class AppEvents {
  
  constructor() {
    this.dom = new DomEvents;
    this.app = new EventEmitter;
  }
}

export default (new AppEvents);

