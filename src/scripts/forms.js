import params from "../styles/variables.json";

(function () {
  const errorColor = params["error-color"];
  const myForm = document.querySelector(".form.connect__content");
  const submitBtn = document.querySelector("button.form__submit");
  const inputs = document.querySelectorAll(".form__input");
  const handlers = {
    name: validateName,
    email: validateMail,
    msg: validateMessage
  };

  function getFieldsValue(fields) {
    let res = {};
    for (const field of fields) {
      res[field.getAttribute("name")] = field.value;
    }
    return res;
  }

  function onSubmitt(e) {
    e.preventDefault();
    let flagPermit = true;

    for (const input of inputs) {
      const attr = input.getAttribute("name");
      const value = input.value;

      if (handlers[attr](value)) {
        flagPermitt = false;
        return;
      }
    }
    if (flagPermit) {
      console.log("do asinc", getFieldsValue(inputs));
    }
  }

  myForm.addEventListener("submit", onSubmitt);

  function validateMail(value) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let res = !re.test(String(value).toLowerCase())
      ? "не соответствует форме ***@***.***"
      : null;

    if (value.length === 0) res = "необходимо заполнить";

    return res;
  }

  function validateName(value) {
    let res = null;
    if (value.length === 0) res = "необходимо заполнить";

    return res;
  }

  function validateMessage(value) {
    let res = null;
    if (value.length === 0) res = "необходимо заполнить";

    return res;
  }

  function validateField(e) {
    const attr = e.currentTarget.getAttribute("name");
    const value = e.currentTarget.value;
    let parent =
      e.currentTarget.closest(".form__elem") ||
      e.currentTarget.closest(".form__elem-area");
    const icon = parent.querySelector(".form__elem-icon");
    const error = parent.querySelector(".error-label");
    const res = handlers[attr](value);
    if (res) {
      icon.style = `fill:red; stroke:${errorColor};`;
      parent.style = `border-bottom:1px solid ${errorColor};`;
      error.style = "opacity:1;";
      error.textContent = res;
    } else {
      icon.style = "";
      parent.style = "";
      error.style = "";
    }
  }

  for (const input of inputs) {
    input.addEventListener("blur", validateField);
  }
})();
