// ==UserScript==
// @name     Set Parcel Shop Id
// @version  1
// @grant    none
// ==/UserScript==

if (window.location.href.includes('https://production-eu01-esprit.demandware.net/on/demandware.store/Sites-Site/')) {

    function waitForElement(selector) {
        return new Promise(function (resolve, reject) {
            var element = document.querySelector(selector);

            if (element) {
                resolve(element);
                return;
            }

            var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutation) {
                    var nodes = Array.from(mutation.addedNodes);
                    for (var node of nodes) {
                                    var element = document.querySelector(selector);
                           if (element) {
                            observer.disconnect();
                            resolve(element);
                            return;
                        }
                    };
                });
            });

            observer.observe(document.documentElement, { childList: true, subtree: true });
        });
    }

    waitForElement('#popupTooltipsTitle').then(function (element) {
          if (!window.location.search.includes('automation=')) {
          var elements = Array.from(document.querySelectorAll('a'));
          var shipmentLink = elements.filter(function(element) {
            return element.text.includes('Shipment');
          });
          var shipmentLink = shipmentLink && shipmentLink[0] ? shipmentLink[0] : null;
          shipmentLink.id = 'shipmentLink';

          if (shipmentLink) {
            document.getElementById('bm-breadcrumb').innerHTML = '<button style="width:100%; font-size:18px; background-color:yellow" onclick="var shippy = document.getElementById(\'shipmentLink\'); shippy.href += \'&automation=1\';shippy.click(); return false;">Go</button>' + document.getElementById('bm-breadcrumb').innerHTML
            shipmentLink.parentElement.innerHTML += '<button id="goButton" onclick="var shippy = document.getElementById(\'shipmentLink\'); shippy.href += \'&automation=1\';shippy.click(); return false;">Go</button>'
          }
          if (localStorage.doit === 'doit') {
                      var labels = Array.from(document.querySelectorAll('.infobox_item.top'));             
            
            var exportInfo = labels.filter(function(element) {
              console.info(element.innerHTML);
                return element.innerHTML.includes('Export Failed');
              });
            if (exportInfo.length > 0) {
                document.getElementById('goButton').click();
            }
                                   
                    }
        } else if (window.location.search.includes('automation=1')) {
          var elements = Array.from(document.querySelectorAll('a'));
          var shippingAddressLink = elements.filter(function(element) {
            return element.text.includes('Shipping Address');
          });
          shippingAddressLink = shippingAddressLink && shippingAddressLink[0] ? shippingAddressLink[0] : null;
          shippingAddressLink.href+= '&automation=2'
          shippingAddressLink.click();
        } else if (window.location.search.includes('automation=2')) {
          var elements = Array.from(document.querySelectorAll('textarea'));
          var textArea = elements.filter(function(element) {
               return element.value.includes('locationId');
          });
          var textArea = textArea && textArea[0] ? textArea[0] : null;
          var parcelShopData = {init: true};
          
          try {
            parcelShopData = JSON.parse(textArea.value);
          } catch(e) {}
          var locationId = parcelShopData.init ? '': parcelShopData.locationId;
             //sessionStorage.locationId = locationId;

     
          
          var elements = Array.from(document.querySelectorAll('td.w tr'));
          var line = elements.filter(function(element) {
               return element.innerHTML.includes('parcelShopId used for click and collect') && element.innerHTML.includes('class="fielditem2"');
          });
          // second element because BM is stupid
          var line = line && line[1] ? line[1] : null;
                    line.querySelector('input.inputfield_en').value = locationId;
                    document.querySelector('form[name="UpdateForm"]').action += '?automation=3&locationId=' + locationId;
          window.addEventListener('load', (event) => {
                        document.querySelector('form[name="UpdateForm"] button[name="update"]').click();
          });
        } else if (window.location.search.includes('automation=3')) {
           var elements = Array.from(document.querySelectorAll('a.breadcrumb'));
           var locationId = window.location.search.split('&').filter((element) => element.includes('locationId='))[0].replace('locationId=','')
           var lastBreadCrumb = elements.pop();
           lastBreadCrumb.href += '&automation=4&locationId=' + locationId;
                     lastBreadCrumb.click();
        } else if (window.location.search.includes('automation=4')) {
           var elements = Array.from(document.querySelectorAll('a.table_tabs_dis'));
           var locationId = window.location.search.split('&').filter((element) => element.includes('locationId='))[0].replace('locationId=','')

           var attributeTab = elements.pop();
           attributeTab.href += '&automation=5&locationId=' + locationId;
                     attributeTab.click();
        } else if (window.location.search.includes('automation=5')) {
           var elements = Array.from(document.querySelectorAll('input.inputfield_en'));
           var locationId = window.location.search.split('&').filter((element) => element.includes('locationId='))[0].replace('locationId=','')
           var elements = Array.from(document.querySelectorAll('input.inputfield_en'));
                 elements.pop().value = locationId;
           document.querySelector('form[name="AttributeForm"]').action += '?automation=6';
           window.addEventListener('load', (event) => {
             document.querySelector('form[name="AttributeForm"] button[name="update"]').click();
           });
        } else if (window.location.search.includes('automation=6')) {
           var elements = Array.from(document.querySelectorAll('a.breadcrumb'));
           var lastBreadCrumb = elements.pop();
           lastBreadCrumb.href += '&automation=7';
                     lastBreadCrumb.click();
        } else if (window.location.search.includes('automation=7')) {
            var elements = Array.from(document.querySelectorAll('a'));
            var exportStatusLink = elements.filter(function(element) {
              return element.text.includes('Export Status');
            });
            exportStatusLink = exportStatusLink && exportStatusLink[0] ? exportStatusLink[0] : null;
              exportStatusLink.href += '&automation=8';
              exportStatusLink.click();
        } else if (window.location.search.includes('automation=8')) {
              document.querySelector('select[name="ExportStatus"]').value = 'notexported';
            window.addEventListener('load', (event) => {
                        document.querySelector('button[name="saveExportStatus"]').click();
            });
        }
                
    });
}

