import React from "react";

const useForm = (type, initialValue) => {
  const [value, setValue] = React.useState("");
  const [error, setError] = React.useState(null);

  const types = {
    email: {
      regex:
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i,
      message: "Digite um e-mail válido",
    },
    password: {
      regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      message:
        "Mínimo de oito caracteres, pelo menos uma letra, um número e um caractere especial",
    },
    number: {
      regex:
        /^([14689][0-9]|2[12478]|3([1-5]|[7-8])|5([13-5])|7[193-7])9[0-9]{8}$/,
      message: "Digite um telefone válido",
    },
  };

  React.useEffect(() => {
    if (initialValue) setValue(initialValue);
  }, [initialValue]);

  function validate(value) {
    if (type === 'noValidate') {
      setError(null);
      return true;
    }
    if (!value) {
      setError("Preencha um valor");
      return false;
    }
    if (type === false) {
      setError(null);
      return true;
    }
    if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message);
      return false;
    } else {
      setError(null);
      return true;
    }
  }

  function onChange(event) {
    setValue(event.target.value);
    if (error) validate(event.target.value);
  }

  return {
    value,
    error,
    onChange,
    validate: () => validate(value),
    onBlur: () => validate(value),
    setError
  };
};

export default useForm;
