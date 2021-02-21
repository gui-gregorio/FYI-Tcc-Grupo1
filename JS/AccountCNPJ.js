if (typeof (CNPJ) === "undefined") { CNPJ = {}; }

var formContext = null;

TreinamentoCNPJ = {
    onLoad: function (executionContext) {
        formContext = executionContext.getFormContext();
        formContext.getControl("new_cnpj").getAttribute().addOnChange(TreinamentoCNPJ.onChange);
    },

    onChange: function() {
        var cnpj = formContext.getAttribute("new_cnpj").getValue();
        retorno = TreinamentoCNPJ.validaCnpj(cnpj);
        if (retorno === false) {
            Xrm.Page.getControl("new_cnpj").setNotification("CNPJ Inválido");
        }
        else {
            Xrm.Page.getControl("new_cnpj").clearNotification();
        }
    },

    onSave: function (executionContext) {
        formContext = saveContext.getFormContext();
        formContext = saveContext.getFormContext();
        var cnpj = formContext.getAttribute("new_cnpj").getValue();
        var retorno = TreinamentoCNPJ.validaCNPJ(cnpj);
        if (retorno === false) {
            Treinamento.Contatos.mensagemErro();
            saveContext.getEventArgs().preventDefault();


        }

    },


    mascaraCnpj: function (cnpj) {
        //referencia CNPJ formatado = 22.125.994/0001-05
        //referencia CNPJ não formatado = 22125994000105
        var cnpjFormatado = cnpj.substring(0, 2) + "." + cnpj.substring(2, 5) + "." + cnpj.substring(5, 8) + "/" + cnpj.substring(8, 12) + "-" + cnpj.substring(12, 14);
        formContext.getAttribute("new_cnpj").setValue(cnpjFormatado);
       
    },

    validaCnpj: function (valorcnpj) {
        var cnpj = valorcnpj;
        exp = /\.|\-|\//g
        cnpj = cnpj.toString().replace(exp, "")

        if (cnpj == '') return false;

        if (cnpj.length != 14)
            return false;

        // Elimina CNPJs invalidos conhecidos
        if (cnpj == "00000000000000" ||
            cnpj == "11111111111111" ||
            cnpj == "22222222222222" ||
            cnpj == "33333333333333" ||
            cnpj == "44444444444444" ||
            cnpj == "55555555555555" ||
            cnpj == "66666666666666" ||
            cnpj == "77777777777777" ||
            cnpj == "88888888888888" ||
            cnpj == "99999999999999")
            return false;

        // Valida DVs
        tamanho = cnpj.length - 2
        numeros = cnpj.substring(0, tamanho);
        digitos = cnpj.substring(tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(0))
            return false;

        tamanho = tamanho + 1;
        numeros = cnpj.substring(0, tamanho);
        soma = 0;
        pos = tamanho - 7;
        for (i = tamanho; i >= 1; i--) {
            soma += numeros.charAt(tamanho - i) * pos--;
            if (pos < 2)
                pos = 9;
        }
        resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        if (resultado != digitos.charAt(1))
            return false;
        TreinamentoCNPJ.mascaraCnpj(cnpj)
        return true;

    }

}


