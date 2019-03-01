require([  "esri/Map",  "esri/views/MapView","esri/widgets/Home",
  "esri/widgets/Search", "esri/widgets/Locate", "esri/widgets/BasemapToggle",
  "esri/layers/FeatureLayer", "dojo/number","dojo/on", "dojo/domReady!" ],
  function(Map, MapView, Home, Search, Locate, BasemapToggle, FeatureLayer, number, on) {
  //vista del mapa
  var map = new Map({
    basemap: "streets"//especifica que tipo de mapa se va a usar
    });
  var view = new MapView({
    container: "viewDiv",
    map: map  //pasa la referencia del mapa
    });
 ////////////////////////////////////////////
  //widgets
  var homeWidget = new Home({
    view: view
    });
  view.ui.add(homeWidget, "top-left");

  var searchWidget = new Search({
        view: view
      });
  view.ui.add(searchWidget, {
            position: "top-left",
            index: 0
          });

  var locateBtn = new Locate({
        view: view
      });
  view.ui.add(locateBtn,"top-left");
  var toggle = new BasemapToggle({
          view: view, //
          nextBasemap: "satellite" // mapa tipo imagen satelital
        });
  view.ui.add(toggle, "top-right");
  //////////////////////////////////////////
  // Establecer donde inicia la vista
  view.center = [-74.0505,4.6733 ];  // logitud y latitud de donde se empieza a ver
  view.zoom = 15;  // zoom a 15
	//Latitude: 4.673157 | Longitude: -74.050594 esta fue sacada de ESRI COLOMBIA
  ///////////////////////////////////////////////
  //simple-fill
  var simpleF = {
    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
    color: "red",
    outline: {  // autocasts as new SimpleLineSymbol()
      color: "white",
      width: "1px"
      }
  };
  //renderer
  var depRenderer = {
    type: "simple",  // autocasts as new SimpleRenderer()
    symbol:simpleF
  };

  ///renderer para capas ecologicas
  var simpleFi = {
    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
    color: "green",
    outline: {  // autocasts as new SimpleLineSymbol()
      color: "white",
      width: "1px"
      }
  };
  //renderer
  var ParkRenderer = {
    type: "simple",  // autocasts as new SimpleRenderer()
    symbol:simpleFi
  };

  //////////////////////////////////////////////
  //agregar las capas de los otros mapas
  //capa division departamental
  var depLayer = new FeatureLayer({
    url: "http://54.187.22.10:6080/arcgis/rest/services/COLOMBIA/MapServer/2",
    renderer: depRenderer//usar el renderer en la capa
  });
  depLayer.opacity = 0.2;
  map.add(depLayer);
  /////////////////////////////////////////////////
  //agregar popUp
  var popupTemplate = { // autocasts as new PopupTemplate()
      title: "Departamento: {DPTO}",
      content: "Código del DANE: {DPTO_DPTO_:NumberFormat}"
    };
  depLayer.popupTemplate = popupTemplate;
  /*
  departamento = function(value,key,data){
    var nombre = data.DPTO;
    var numDane = data.DPTO_DPTO_;
  }*/
 //capa division de centros poblados
  var pobLayer2 = new FeatureLayer({
    url: "http://54.187.22.10:6080/arcgis/rest/services/COLOMBIA/MapServer/0"
  });
  pobLayer2.opacity = 0.2;
  map.add(pobLayer2);
  //////////////////////////capa de ciclo rutas y ciclo carriles
  var cicloLayer = new FeatureLayer({
    ///la capa de ciclo rutas no carga completamente
    url: "http://sinupotp.sdp.gov.co:6080/arcgis/rest/services/SERVICIOS_GEOGRAFICOS/CARTOGRAFIA_POT_DISTRITAL/MapServer/51"
  });
  map.add(cicloLayer);
  ///capa de lugares con atractivo ambiental para las personas
  var ecoLayer = new FeatureLayer({
    url: "http://sinupotp.sdp.gov.co:6080/arcgis/rest/services/SERVICIOS_GEOGRAFICOS/CARTOGRAFIA_POT_DISTRITAL/MapServer/41",
    renderer:ParkRenderer
  });
  map.add(ecoLayer);


});
