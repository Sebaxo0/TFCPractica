

var appMenus = [
  {
    'icon': 'fa fa-home',
    'title': 'Inicio',
    'url': 'inicio',
    'submenu': undefined
  },
  {
    "_id" : "5f920779fb0ce4dbcb2b0e76",
    "icon" : "fas fa-fw fa-indent",
    "title" : "Declaraciones(DJ1945)",
    'caret': 'true',
    "submenu" : [
        {
            "title" : "Subir Declaración",
            "icon" : null,
            "url" : "subirexcel"
        },
        {
            "title" : "Ver Declaración",
            "icon" : null,
            "url" : "verdeclaracion"
        },
        {
            "title" : "Registros Repetidos",
            "icon" : null,
            "url" : "registros-duplicados"
        },
        {
            "title" : "Resumen de Estados",
            "icon" : null,
            "url" : "informe-dj"
        }
    ]
  }
];
var appMenuss = [
  {
  'icon': 'fa fa-home',
  'title': 'Inicio',
  'url': 'inicio',
   
},
{
  "_id" : "5f920779fb0ce4dbcb2b0e76",
  "icon" : "fas fa-fw fa-indent",
  "title" : "Declaraciones(DJ1945)",
  'caret': 'true',
  "submenu" : [
      {
          "title" : "Subir Declaración",
          "icon" : null,
          "url" : "subirexcel"
      },
      {
          "title" : "Ver Declaración",
          "icon" : null,
          "url" : "verdeclaracion"
      },
      {
          "title" : "Registros Repetidos",
          "icon" : null,
          "url" : "registros-duplicados"
      },
      {
          "title" : "Resumen de Estados",
          "icon" : null,
          "url" : "informe-dj"
      }
  ]
}/*,
{
  'icon': 'fa fa-align-left',
  'title': 'Menu Level',
  'url': '',
  'caret': 'true',
  'submenu': [{
    'url': '',
    'title': 'Menu 1.1',
    'caret': 'true',
    'submenu': [{
      'url': '',
      'title': 'Menu 2.1',
      'caret': 'true',
      'submenu': [{
        'url': '',
        'title': 'Menu 3.1',
      },{
        'url': '',
        'title': 'Menu 3.2'
      }]
    },{
      'url': '',
      'title': 'Menu 2.2'
    },{
      'url': '',
      'title': 'Menu 2.3'
    }]
  },{
    'url': '',
    'title': 'Menu 1.2'
  },{
    'url': '',
    'title': 'Menu 1.3'
  }]
}*/];

export default appMenus;
