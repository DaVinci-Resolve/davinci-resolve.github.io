"use strict";bmdApp.config(["$provide","$urlRouterProvider",function(o,t){o.decorator("$location",["$delegate","bmdLocation",function(o,t){return t(o,void 0)}]),t.otherwise(function(){})}]);