export default class Masks {
  static cpf = (value) => {
    if (value) {
      return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{3})(\d)/, '$1.$2') // captura 2 grupos de numero o primeiro de 3 e o segundo de 1, apos capturar o primeiro grupo ele adiciona um ponto antes do segundo grupo de numero
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }
  };

  static cpfRemove = (value) => {
    if (value) {
      return value.replaceAll('.', '').replace('-', ''); // substitui qualquer caracter que nao seja numero por nada
    }
  };

  static cellphone(value) {
    if (value) {
      var r = value.replace(/\D/g, '');
      r = r.replace(/^0/, '');
      if (r.length > 10) {
        r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');
      } else if (r.length > 5) {
        r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, '($1) $2-$3');
      } else if (r.length > 2) {
        r = r.replace(/^(\d\d)(\d{0,5})/, '($1) $2');
      } else {
        r = r.replace(/^(\d*)/, '($1');
      }
      return r;
    }
  }

  static cellphoneRemove = (value) => {
    if (value) {
      return value
        .replace('(', '')
        .replace('-', '')
        .replace(')', '')
        .replace(' ', '');
    }
  };

  static cep = (value) => {
    if (value) {
      return value
        .replace(/\D/g, '') // substitui qualquer caracter que nao seja numero por nada
        .replace(/(\d{5})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1'); // captura 2 numeros seguidos de um traço e não deixa ser digitado mais nada
    }
  };

  static cepRemove = (value) => {
    if (value) {
      return value.replace('-', ''); // substitui qualquer caracter que nao seja numero por nada
    }
  };
}
