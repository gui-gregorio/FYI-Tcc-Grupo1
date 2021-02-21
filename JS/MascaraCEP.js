if (typeof (CNPJ) === "undefined") { CNPJ = {}; }

var formContext = null;


TreinamentoCEP = {
    onLoad: function(executionContext){
        formContext = executionContext.getFormContext();
        formContext.getControl("new_cep").getAttribute().addOnChange(TreinamentoCEP.onChange);

    },


    onChange: function () {
        var cep = formContext.getAttribute("new_cep").getValue();
        if (cep != null) {
            TreinamentoCEP.mascaraCEP(cep);
        }

    },

    mascaraCEP: function (valorcep) {
        //referencia cep = 06180-010
        exp = /\.|\-|\//g
        cep = valorcep.toString().replace(exp, "");
        cepFormatado = cep.substring(0, 5) + "-" + cep.substring(5, 8);
        formContext.getAttribute("new_cep").setValue(cepFormatado);

    }



}