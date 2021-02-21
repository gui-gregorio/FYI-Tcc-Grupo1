if (typeof (Treinamento) === "undefined") { Treinamento = {}; }

//Variavel Global
var formContext = null;


Treinamento.Contatos = {

    onLoad: function (executionContext) {
        formContext = executionContext.getFormContext();


    },

    onSave: function (saveContext) {
        formContext = saveContext.getFormContext();
        var cpf = formContext.getAttribute("new_cpf").getValue();
        var retorno = Treinamento.Contatos.validaCPF(cpf);
        if (retorno === false) {
            Treinamento.Contatos.mensagemErro();
            saveContext.getEventArgs().preventDefault();


        }



    },

    //// Função para verificar cpf duplicado

    cpfOnChange: function () {
        debugger;
        //Xrm.Navigation.openAlertDialog({ title: "Validação Host", text: "Host já está em uso pela Licença "}, { height: 300, width: 300 });
        var cpf = formContext.getAttribute("new_cpf").getValue();
        ////formContext.getAttribute("new_cpf").setValue("525-231");
        if (cpf !== null) {
            var retorno = Treinamento.Contatos.validaCPF(cpf);
            if (retorno === false) {
                Xrm.Page.getControl("new_cpf").setNotification("CPF Inválido, insira um CPF válido");


            }
            else {
                Xrm.Page.getControl("new_cpf").clearNotification();
                cpf = formContext.getAttribute("new_cpf").getValue();
                var contatoid = formContext.data.entity.getId();
                var filter = "";
                if (contatoid != "")
                    // eq significa igual e o ne significa diferente 
                    filter = " and contactid ne '" + contatoid + "'"
                Xrm.WebApi.retrieveMultipleRecords("contact", "?$filter=new_cpf eq '" + cpf + "'" + filter).then(
                    function success(result) {
                        if (result.entities.length > 0) {
                            Xrm.Page.getControl("new_cpf").setNotification("Cpf já existe");

                        }
                        // perform additional operations on retrieved records
                    },
                );
            }

        }

    },

    mensagemErro: function () {
        Xrm.Navigation.openAlertDialog("O CPF é invalido, insira um CPF válido.");
    },

    //Altera o CPF
    mascaraCPF: function (cpf) {
        //referenciaCPF = 336.322.800-70
        var cpfFormatado = cpf.substring(0, 3) + "." + cpf.substring(3, 6) + "." + cpf.substring(6, 9) + "-" + cpf.substring(9, 11);
        formContext.getAttribute("new_cpf").setValue(cpfFormatado);
    },

    validaCPF: function (valorCPF) {
        var cpf = valorCPF;

        exp = /\.|\-|\//g
        cpf = cpf.toString().replace(exp, "");


        if (cpf.length != 11 || cpf == "00000000000" || cpf == "11111111111" || cpf == "22222222222" ||
            cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" || cpf == "66666666666" ||
            cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999")
            return false;

        add = 0;
        for (i = 0; i < 9; i++)
            add += parseInt(cpf.charAt(i)) * (10 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(9)))
            return false;
        add = 0;
        for (i = 0; i < 10; i++)
            add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev == 10 || rev == 11)
            rev = 0;
        if (rev != parseInt(cpf.charAt(10)))
            return false;
        Treinamento.Contatos.mascaraCPF(cpf);

        return true;

    }


}

