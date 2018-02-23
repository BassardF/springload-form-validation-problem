var formValidation = {
  // Returns : whether the form should be sent after validation.
  // Runs all the checks to maximise feedback even if it fails early
  validate : function () {
    var sendForm = true;
    sendForm = this.checkEmail() && sendForm;
    sendForm = this.checkPassword() && sendForm;
    sendForm = this.checkColour() && sendForm;
    sendForm = this.checkAnimal() && sendForm;
    return sendForm;
  },
  // Email must be a valid email address.
  checkEmail : function(){
    var email = domServices.fetchInputValue(DOM_CONSTANTS.FORM.EMAIL);
    var valid = !!email && regexpServices.isEmailValid(email);
    this.addOrRemoveErrorClassToParentNode(DOM_CONSTANTS.FORM.EMAIL, valid);
    return valid;
  },
  // Password must be longer than 8 characters.
  checkPassword : function(){
    var password = domServices.fetchInputValue(DOM_CONSTANTS.FORM.PASSWORD);
    var valid = !!password && password.length > 8;
    this.addOrRemoveErrorClassToParentNode(DOM_CONSTANTS.FORM.PASSWORD, valid);
    return valid;
  },
  // Colour must be selected - Redundant with the "required" attribute for recent browsers
  checkColour : function(){
    var valid = !!domServices.fetchInputValue(DOM_CONSTANTS.FORM.COLOUR);
    this.addOrRemoveErrorClassToParentNode(DOM_CONSTANTS.FORM.COLOUR, valid);
    return valid;
  },
  // At least two Animals must be chosen.
  // If Tiger is one of the chosen Animals then Type of tiger is required to be a non-empty string.
  checkAnimal : function(){
    var chosenAnimals = [];
    for (var i = 0; i < DOM_CONSTANTS.FORM.ANIMALS.length; i++) {
      var domNode = domServices.fetchInputNode(DOM_CONSTANTS.FORM.ANIMALS[i]);
      if(domNode.checked) {
        chosenAnimals.push(DOM_CONSTANTS.FORM.ANIMALS[i]);
      }
    }
    var validAnimalLength = chosenAnimals.length >= 2;
    var validTigerCase = this.checkTigerType(chosenAnimals.indexOf(DOM_CONSTANTS.FORM.TIGER) !== -1);
    this.addOrRemoveErrorClassToParentNode(DOM_CONSTANTS.FORM.TIGER, validAnimalLength);
    return validAnimalLength && validTigerCase;
  },
  // Check that a type of tiger has been chosen if "tiger" is selected
  // Needs to run even if not required to clear the error class
  checkTigerType : function(required){
    var valid = !required || !!domServices.fetchInputValue(DOM_CONSTANTS.FORM.TIGER_TYPE);
    this.addOrRemoveErrorClassToParentNode(DOM_CONSTANTS.FORM.TIGER_TYPE, valid);
    return valid;
  },
  // Handle the error class : Add / Remove
  addOrRemoveErrorClassToParentNode : function(id, valid){
    if(valid) domServices.removeClass(id, CSS_CONSTANTS.ERROR);
    else domServices.addClass(id, CSS_CONSTANTS.ERROR);
  }
}
