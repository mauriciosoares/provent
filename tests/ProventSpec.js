describe('Testing Provent', function() {
  var testContainer;

  function addLink() {
    var link = document.createElement('a');
    testContainer.appendChild(link);

    return link;
  }

  beforeEach(function() {
    testContainer = document.createElement('div');
    testContainer.id = 'test-container';

    document.body.appendChild(testContainer);
  });

  afterEach(function() {
    testContainer.parentNode.removeChild(testContainer);
  });

  it('should trigger the `then` once the button is clicked', function() {
    var link = addLink();
    var spy = {
      callback: function() {}
    };

    spyOn(spy, 'callback');

    Provent(link, 'click').then(function() {
      spy.callback();
    });
    click(link);

    expect(spy.callback).toHaveBeenCalled();
  });

  it('should trigger the `then` callback everytime it is used', function() {
    var link = addLink();
    var spy = {
      callback1: function() {},
      callback2: function() {}
    };

    spyOn(spy, 'callback1');
    spyOn(spy, 'callback2');

    Provent(link, 'click').then(function() {
      spy.callback1();
    });

    Provent(link, 'click').then(function() {
      spy.callback2();
    });

    click(link);

    expect(spy.callback1).toHaveBeenCalled();
    expect(spy.callback2).toHaveBeenCalled();
  });

  it('`this` inside `then` callback should point to the element', function() {
    var link = addLink();

    Provent(link, 'click').then(function() {
      expect(this).toBe(link);
    });

    click(link);
  });

  it('`arguments[0]` inside `then` callback should point to the event object', function() {
    var link = addLink();
    var linkEvent;

    link.addEventListener('click', function(e) {
      linkEvent = e;
    })

    Provent(link, 'click').then(function(proventEvent) {
      expect(proventEvent).toBe(linkEvent);
    });

    click(link);
  });

  it('concatenated `then` calls should get the previous return', function() {
    var link = addLink();

    Provent(link, 'click').then(function() {
      return true;
    }).then(function(param) {
      expect(param).toBe(true);
    });

    click(link);
  });

  it('should remove the listener when `reject` is used', function() {
    var link = addLink();
    var spy = {
      callback: function() {}
    };

    spyOn(spy, 'callback');

    var promise = Provent(link, 'click').then(function() {
      spy.callback();
    })

    promise.reject();

    click(link);

    expect(spy.callback).not.toHaveBeenCalled();
  });

  it('should remove the listener from a specific promise when `Provent.reject` is used passing an id, the returned value should still be passed', function() {
    var link = addLink();
    var spy = {
      callback1: function() {},
      callback2: function() {},
      callback3: function() {},
    };

    spyOn(spy, 'callback1');
    spyOn(spy, 'callback2');
    spyOn(spy, 'callback3');

    var promise = Provent(link, 'click')

    promise.then(function() {
      spy.callback1();
      return true;
    }).then('#id', function() {
      spy.callback2();
    }).then(function(param) {
      expect(param).toBe(true);
      spy.callback3();
    });

    promise.reject('#id');

    click(link);

    expect(spy.callback1).toHaveBeenCalled();
    expect(spy.callback2).not.toHaveBeenCalled();
    expect(spy.callback3).toHaveBeenCalled();
  });
});
