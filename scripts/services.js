// Dom interaction services
var domServices = {
  fetchInputValue : function(id){
    if(!id) return null;
    var domNode = document.getElementById(id);
    return domNode ? domNode.value : null;
  },
  fetchInputNode : function(id){
    if(!id) return null;
    return document.getElementById(id);
  },
  addClass : function(id, className){
    if(id && className){
      var node = domServices.fetchInputNode(id);
      if(node) node.parentNode.classList.add(className);
    }
  },
  removeClass : function(id, className){
    if(id && className){
      var node = domServices.fetchInputNode(id);
      if(node) node.parentNode.classList.remove(className);
    }
  }
};

// Regexp services
var regexpServices = {
  isEmailValid : function(email){
    var mailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return mailReg.test(String(email).toLowerCase());
  }
}
