
const jsdom = require("jsdom");
const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');

import DomEvents from '../../../app/events/dom';

var events;

// todo: add focus/blur events

describe('events', function() {

  beforeEach(function() {
    const dom = new jsdom.JSDOM(`
      <!DOCTYPE html>
      <a id="clickme1">clickme</p>
      <a id="clickme2">clickme also</p>
    `);
    global.document = dom.window.document;
    global.window = dom.window;
    events = new DomEvents;
  });

  describe('addEventListener()', function() {
    it('should add a callback that is triggered on a dom event matching an event name and selector', function() {
      const callback = sinon.spy();
      events.addEventListener('click', '#clickme1', callback);
      document.querySelector('#clickme1').click();
      expect(callback.calledOnce).to.equal(true);
    });
    it('should be idempotent, not adding any extra selectors/callbacks if already defined', function() {
      const callback = sinon.spy();
      events.addEventListener('click', '#clickme1', callback);
      events.addEventListener('click', '#clickme1', callback);
      const callback2 = sinon.spy();
      events.addEventListener('click', '#clickme1', callback2);
      document.querySelector('#clickme1').click();
      document.querySelector('#clickme1').click();
      expect(callback.notCalled).to.equal(true);
      expect(callback2.calledTwice).to.equal(true);
    });
  });

  describe('removeEventListener()', function() {
    it('should prevent a previously added callback from running on a particular selector', function() {
      const callback = sinon.spy();
      events.addEventListener('click', '#clickme1', callback);
      events.removeEventListener('click', '#clickme1');
      document.querySelector('#clickme1').click();
      expect(callback.notCalled).to.equal(true);
    });
    it('should prevent a previously added callback from running if removed and added again', function() {
      const callback = sinon.spy();
      events.addEventListener('click', '#clickme1', callback);
      events.removeEventListener('click', '#clickme1');
      const callback2 = sinon.spy();
      events.addEventListener('click', '#clickme1', callback2);
      document.querySelector('#clickme1').click();
      expect(callback.notCalled).to.equal(true);
      expect(callback2.calledOnce).to.equal(true);
    });
  });

  describe('removeAllEventListeners()', function() {
    it('should prevent all previously added callbacks from running', function() {
      const callback = sinon.spy();
      events.addEventListener('click', '#clickme1', callback);
      events.removeAllEventListeners();
      document.querySelector('#clickme1').click();
      expect(callback.notCalled).to.equal(true);
    });
    it('should prevent all previously added callbacks from running if removed and added again', function() {
      const callback = sinon.spy();
      events.addEventListener('click', '#clickme1', callback);
      const callback2 = sinon.spy();
      events.removeAllEventListeners();
      const callback3 = sinon.spy();
      events.addEventListener('click', '#clickme1', callback3);
      document.querySelector('#clickme1').click();
      expect(callback.notCalled).to.equal(true);
      expect(callback2.notCalled).to.equal(true);
      expect(callback3.calledOnce).to.equal(true);
    });
  });
});
