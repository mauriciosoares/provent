describe('test', function() {
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
    var callback = {
      test: function() {}
    };

    spyOn(callback, 'test');

    Provent(link, 'click').then(function() {
      callback.test();
    });
    click(link);
    // link.click();

    expect(callback.test).toHaveBeenCalled();
  });
});
