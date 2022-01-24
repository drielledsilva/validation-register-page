class Validator {

    constructor() {
       this.validations = [
           'data-required', 
           'data-min-length',
           'data-max-length',
           'data-email-validate',
           'data-only-letters',
           'data-equal',
           'data-password-validate',
    ]
}

    // iniciar a validação de todos os campos

    validate(form) {

        // resgata todas as validações
        let currentValidations = document.querySelectorAll('form .error-validation');

        if(currentValidations.length > 0) {
            this.cleanValidations(currentValidations);
        }

        // pegar os inputs
        let inputs = form.getElementsByTagName('input');

        // HTMLCollection -> array (pega o elemento e transforma em um array de vários elementos)
        let inputsArray = [...inputs];

        // loop nos inputs e validação mediante ao que for encontrado
        inputsArray.forEach(function(input) {

            //loop em todas as validações existentes
            for(let i = 0; this.validations.length > i; i++){
                if(input.getAttribute(this.validations[i]) != null) {
                    
                    // limpando a string para virar u método
                    let method = this.validations[i].replace('data-', '').replace('-', '');

                    // valor do input
                    let value = input.getAttribute(this.validations[i]);

                    // invoca o método
                    this[method](input, value);
                
                }
            }
    
        }, this);

    }

    // verifica se um input tem um número mínimo de caracteres
    minlength(input, minValue) {

        let inputlength = input.value.length;

        let errorMessage = `O campo precisa ter pelo menos ${minValue} caracteres`;

        if(inputlength < minValue) {
            this.printMessage(input, errorMessage);
        }


    }

    // verifica se um input passou do limite de carateres
    maxlength(input, maxValue) {

        let inputlength = input.value.length;

        let errorMessage = `O campo precisa ter menos que ${maxValue} caracteres`;

        if(inputlength > maxValue) {
            this.printMessage(input, errorMessage);
        }
        
    }

    // valida emails
    emailvalidate(input) {

        // email@email.com -> email@email.com.br
        let re = /\S+@\S+\.\S+/;

        let email = input.value;

        let errorMessage = `Por favor, insira um e-mail válido`;

        if(!re.test(email)) {
            this.printMessage(input, errorMessage);
        }
    }

    // valida se o campo tem apenas letras
    onlyletters(input) {
        let re = /^[A-Za-z]+S/;

        let inputValue = input.value;

        let errorMessage = `Este campo não aceita númeors nem caracteres especiais`

        if(!re.test(inputValue)) {
            this.printMessage(input, errorMessage);
        }
    }

    // método para imprimir mensagens de erro na tela
    printMessage(input, msg) {

        // quantidade de erros
        let errorsQty = input.parentNode.querySelector('.error-validation');

        if(errorsQty === null) {
            let template = document.querySelector('.error-validation').cloneNode(true);

            template.textContent = msg;

            let inputParent = input.parentNode;

            template.classList.remove('template');

            inputParent.appendChild(template);
        }

    }
    
        // verifica se o input é requerido
        required(input) {
            
            let inputValue = input.value;

            if(inputValue === '') {
                let errorMessage = `Este campo é obrigatório`

                this.printMessage(input, errorMessage);
            }
        }

        // verifica se dois campos são iguais
        equal(input, inputName) {

            let inputToCompare = document.getElementsByName(inputName)[0];

            let errorMessage = `Verifique novamente a sua senha`

            if(input.value != inputToCompare.value) {
                this.printMessage(input, errorMessage);
            }
        }

        // valida campo de senha
        passwordvalidate(input) {

            // transforma uma string em um array
            let charArr = input.value.split("");

            let uppercases = 0;
            let numbers = 0;

            for(let i = 0; charArr.length > i; i++) {
               if(charArr[i] === charArr[i].toUpperCase() && isNaN(parseInt(charArr[i]))) {
                   uppercases++;
               } else if(!isNaN(parseInt(charArr[i]))) {
                   numbers++;
               }
            }

            if(uppercases === 0 || numbers === 0) {
               let errorMessage = `Insira letras maiúsculas, minúsculas e números`

               this.printMessage(input, errorMessage);
            }

        }

         // limpa as validações da tela
         cleanValidations(validations) {
            validations.forEach(el => el.remove());

        }

}

    
let form = document.getElementById("register-form");
let submit = document.getElementById("btn-submit");

let validator = new Validator();


// evento que dispara as validações

submit.addEventListener('click', function(e) {

    e.preventDefault();

    validator.validate(form);

});