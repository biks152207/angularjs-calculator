(function(){
  'use strict';
  angular.module('testProject1App')
    .controller('mainCtrl', Ctrl);

  Ctrl.$inject = ['$http', 'httpResource', '$scope'];
  function Ctrl($http, httpResource, $scope){
    var main = this;
    main.resourceList = [];
    main.updatePriceAndHour = updatePriceAndHour.bind(main);
    main.changePriceAndHour = changePriceAndHour.bind(main);
    main.priceDescription = [];
    main.defaultCurrency = 'EUR';
    main.currencyList = [
      'EUR',
      'USD',
      'GBP',
      'PLN'
    ]
    main.total = null;
    main.resourceData = {
      vm:{},
      disk: {},
      network:{},
      netadp:{},
      image:{}
    }
    main.getResource = getResource;
    main.getResource();

    function getResource(){
      httpResource.getResource()
        .then(function(result){
          main.resourceList = _.groupBy(result.data.service, 'resource');
        });
    }

    function updatePriceAndHour(){
      for(var key in main.resourceData){
        if (main.resourceData[key].type){
          var filterdData = main.resourceList[key].filter(function(data){
            return data.type === main.resourceData[key].type;
          });
          if (!main.resourceData[key].period){
            main.resourceData[key].period = filterdData[0].billing.period;
          }
          if (!main.resourceData[key].quantity){
            main.resourceData[key].quantity = filterdData[0].billing.quantity;
          }
          main.resourceData[key].price = filterdData[0].billing.price[main.defaultCurrency] * main.resourceData[key].quantity * main.resourceData[key].period.replace(/\D/g,'');
          main.resourceData[key].resource = key;
          main.resourceData[key].data = filterdData[0].data;
          // main.priceDescription.push(JSON.parse(JSON.stringify(main.resourceData[key])));
          main.priceDescription.forEach(function(data, index){
            if (data.resource == key){
              main.priceDescription[index] = JSON.parse(JSON.stringify(main.resourceData[key]));
            }else{
              main.priceDescription.push(JSON.parse(JSON.stringify(main.resourceData[key])));
            }
          });

          if (main.priceDescription.length === 0){
            main.priceDescription.push(JSON.parse(JSON.stringify(main.resourceData[key])));
          }

        }
      }
    }

    function changePriceAndHour(key, invalid){

      if (!invalid){
        var filterdData = main.resourceList[key].filter(function(data){
          return data.type === main.resourceData[key].type;
        });
        // console.log(filterdData[0]);
        if (main.resourceData[key].period.indexOf('h') !== -1){
          main.resourceData[key].period = main.resourceData[key].period.replace(/\D/g,'');
        }
        main.resourceData[key].price = filterdData[0].billing.price[main.defaultCurrency] * main.resourceData[key].quantity * main.resourceData[key].period;
        main.resourceData[key].resource = key;
        main.resourceData[key].data = filterdData[0].data;
        main.priceDescription.forEach(function(data,index){
          if (data.resource == key){
            main.priceDescription[index] = JSON.parse(JSON.stringify(main.resourceData[key]));
          }else{
            main.priceDescription.push(JSON.parse(JSON.stringify(main.resourceData[key])));
          }
        })

      }
    }

    $scope.$watchCollection(angular.bind(main, function(){
      return main.priceDescription;
    }), function(newValue){
      main.total = null;
      main.priceDescription = _.unique(newValue, 'resource');
      main.priceDescription.forEach(function(data){
        main.total += data.price;
      })
    })

  }
})();
