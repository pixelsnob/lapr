
var Store = function() {
  this.data = {};
};

Store.prototype.populate = function(data) {
  this.data = data;
};

Store.prototype.fetch = function(data) {
  fetch('/instruments', {
    headers: new Headers({ 'Content-type': 'application/json' })
  }).then(res => {
    return res.json();
  }).then(res => {
    console.log(res);
  });
  //res.json()).then(res => console.log(res));
};

export default Store;
