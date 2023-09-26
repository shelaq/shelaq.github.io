(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const s of t.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function i(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=i(e);fetch(e.href,t)}})();Vue.use(VueMaterial.default);new Vue({el:"#app",data:{timer:"",stations:{world_trade_center:{name:"World Trade Center",trains:[]},exchange_place:{name:"Exchange Place",trains:[]},grove_street:{name:"Grove Street",trains:[]},christopher_street:{name:"Christopher Street",trains:[]},ninth_street:{name:"9th Street",trains:[]},fourteenth_street:{name:"14th Street",trains:[]},twenty_third_street:{name:"23rd Street",trains:[]},thirty_third_street:{name:"33rd Street",trains:[]},newark:{name:"Newark Penn",trains:[]},harrison:{name:"Harrison",trains:[]},journal_square:{name:"Journal Square",trains:[]},newport:{name:"Newport",trains:[]},hoboken:{name:"Hoboken",trains:[]}}},created:function(){this.fetchStations(),this.timer=setInterval(this.fetchStations,5e3)},methods:{fetchStations:function(){for(var a in this.stations)this.$http.get("https://path.api.razza.dev/v1/stations/"+a+"/realtime").then(function(n){return function(i){this.stations[n].trains=i.body.upcomingTrains.sort(function(r,e){return Date.parse(r.projectedArrival)-Date.parse(e.projectedArrival)}).map(function(r){return{name:r.lineName,arrival_time:moment(Date.parse(r.projectedArrival)).fromNow()}})}}(a))}},beforeDestroy(){clearInterval(this.timer)}});
