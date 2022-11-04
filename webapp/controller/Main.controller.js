sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("thiago.imagesearch.controller.Main", {
            onInit: function () {

                var ImageList = {
                    Images: [
                    {
                        title: "Google",
                        url: "https://www.google.com"
                    }
                    ]
                    };

                    var ImageModel = new JSONModel(ImageList);
                    this.getView().setModel(ImageModel, "ModeloImagem");
            },
    
            onPressBuscar: function(){
                //alert("Thiago Stefanini");
                var oInputBusca = this.byId("inpBusca");
                var sQuery = oInputBusca.getValue();
             
                $.ajax({
                    //cabeçalho
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
                    method: "GET",
                    async:true,
                    crossDomain:true,
                    jsonpCallback: "getJSON",
                    contentType: "application/json",
                    headers: {
                            "X-RapidAPI-Key": "2b0e045c1dmsh46e2aaeb0aa7cfep1987c6jsn2fe5032c9e62",
                            "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                        },//Fim Headers:{ 

                    //corpo
                        data: {
                            "q": sQuery,
                            "pageNumber": 1,
                            "pageSize": 30,
                            "autoCorrect": true,
                            "safeSearch" : true
                        },//fim data:{

                    //retorno em caso de sucesso
                        success: function(data, textStatus){
                            //Pega o objeto
                            var oImageModel = this.getView().getModel("ModeloImagem");
                            //Pega conteudo
                            var oDadosImage = oImageModel.getData();
                            //Cria lista Vazia
                            oDadosImage = {
                                Images: []
                            };
                            //Colocar a lista vazia antes de pegar os dados novos
                            oImageModel.setData(oDadosImage); 
                            
                            var listaResultados = data.value;
                            var newItem;

                            //Loop
                            for(var i = 0; i < listaResultados.length; i++ ){
                                //read
                                newItem = listaResultados[i];
                                //append
                                oDadosImage.Images.push(newItem);
                            };

                            oImageModel.refresh();

                        }.bind(this),//Fim Success:

                    //retorno em caso de erro
                        error: function(){

                        
                        }.bind(this)//Fim Error:

                }); // Fim $.ajax({
                }
                
        });
    });
