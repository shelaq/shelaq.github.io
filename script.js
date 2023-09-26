Vue.use(VueMaterial.default);

new Vue({
  el: '#app',
  data: {
    timer: '',
    stations: {
      "newark": {
        name: "Newark Penn",
        trains: []
      },
      "harrison": {
        name: "Harrison",
        trains: []
      },
      "journal_square": {
        name: "Journal Square",
        trains: []
      },
      "grove_street": {
        name: "Grove Street",
        trains: []
      },
      "exchange_place": {
        name: "Exchange Place",
        trains: []
      },
      "world_trade_center": {
        name: "World Trace Center",
        trains: []
      },
      "newport": {
        name: "Newport",
        trains: []
      },
      "hoboken": {
        name: "Hoboken",
        trains: []
      },
      "christopher_street": {
        name: "Christopher Street",
        trains: []
      },
      "ninth_street": {
        name: "9th Street",
        trains: []
      },
      "fourteenth_street": {
        name: "14th Street",
        trains: []
      },
      "twenty_third_street": {
        name: "23rd Street",
        trains: []
      },
      "thirty_third_street": {
        name: "33rd Street",
        trains: []
      }
    }
  },
  created: function() {
    this.fetchStations();
    this.timer = setInterval(this.fetchStations, 5000)
  },
  methods: {
    fetchStations: function() {
      for (var curr_station in this.stations) {
        this.$http.get("https://path.api.razza.dev/v1/stations/" + curr_station + "/realtime").then((function(station) {
          return function(result) {
            this.stations[station].trains = result.body.upcomingTrains.sort(function(a, b) {
              return Date.parse(a.projectedArrival) - Date.parse(b.projectedArrival);
            }).map(function(train) {
              return {
                name: train.lineName,
                arrival_time: moment(Date.parse(train.projectedArrival)).fromNow()
              };
            });
          }
        })(curr_station));
      }
    }
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
});
