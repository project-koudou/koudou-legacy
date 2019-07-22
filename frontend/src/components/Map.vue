<template>
  <div>
    <p v-on:click="getNewestPin">Get New Info</p>
    <p v-on:click="getHereNow">Get Here Now</p>
    <p v-on:click="setMapHere">Set Map Here</p>
    <div>
      <ul id="people-list">
        <li v-for="(people, indexPeopleList) in peopleList" v-bind:key="people.name">
          <p v-on:click="setMapView(indexPeopleList)">{{people.name}}</p>
        </li>
      </ul>
    </div>
    <div id="map"></div>
    <div>
      <transition
        enter-active-class="animated bounceInLeft"
        leave-active-class="animated bounceOutRight"
      >
        <map-info
          v-if="show"
          v-bind:header="infoHeader"
          v-bind:title="infoTitle"
          v-bind:text="infoText"
          @timeline="chaseTimeline"
        ></map-info>
      </transition>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import moment from "moment";
import axios from "axios";
import MapInfo from "@/components/MapInfo";

import * as L from "leaflet";
import { Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

require("leaflet.markercluster");
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png")
});

import "leaflet.awesome-markers/dist/leaflet.awesome-markers.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "leaflet.awesome-markers";

export default {
  name: "map",
  components: {
    MapInfo
  },
  data() {
    return {
      pinData: [],
      map: [],
      peopleList: {},
      people: [],
      stocks: [],
      chaseLayer: [],
      show: false,
      info_id: 0,
      infoHeader: "name",
      infoTitle: "cardTitle",
      infoText: "Safe"
    };
  },
  methods: {
    getNewestPin: async function() {
      console.log(this.peopleList);
      let response = await $client.service("api/person").find();
      console.log(response.data);
      var vueComponent = this; // this のスコープを回避するため
      response.data.forEach(function(value, key) {
        if (!("location" in response.data[key])) {
          return;
        }
        if (!(response.data[key]._id in vueComponent.peopleList)) {
          // ユーザId がない
          var createdMarker = L.marker([
            response.data[key].location.latitude,
            response.data[key].location.longitude
          ])
            .bindPopup(response.data[key].name)
            .bindTooltip(response.data[key].name)
            .openTooltip()
            .addTo(vueComponent.people)
            .on("click", function() {
              vueComponent.clickMarker(response.data[key]._id, key);
            });
          vueComponent.peopleList[response.data[key]._id] = {
            name: response.data[key].name,
            marker: createdMarker,
            positionList: {}
          };
          vueComponent.peopleList[response.data[key]._id].positionList[key] = {
            createdAt: response.data[key].location.timestamp,
            latitude: response.data[key].location.latitude,
            longitude: response.data[key].location.longitude,
            marker: createdMarker
          };
        } else {
          if (
            !(
              key in
              vueComponent.peopleList[response.data[key]._id].positionList
            )
          ) {
            vueComponent.map.removeLayer(
              vueComponent.peopleList[response.data[key]._id].marker
            );
            var createdMarker = L.marker([
              response.data[key].location.latitude,
              response.data[key].location.longitude
            ])
              .bindPopup(response.data[key].name)
              .bindTooltip(response.data[key].name)
              .openTooltip()
              .addTo(vueComponent.people)
              .on("click", function() {
                vueComponent.clickMarker(response.data[key]._id, key);
              });
            vueComponent.peopleList[
              response.data[key]._id
            ].marker = createdMarker;
            vueComponent.peopleList[response.data[key]._id].positionList[
              key
            ] = {
              createdAt: response.data[key].location.timestamp,
              latitude: response.data[key].location.latitude,
              longitude: response.data[key].location.longitude,
              marker: createdMarker
            };
          }
        }
      });
    },
    clickMarker: function(_id, markerIndex) {
      console.log("open");
      this.closeMapInfo();
      if (!this.show) this.show = true;
      this.info_id = _id;
      this.infoHeader = this.peopleList[_id].name;
      this.infoTitle = this.peopleList[_id].positionList[
        markerIndex
      ].location.timestamp;
    },
    chaseTimeline: function() {
      var vueComponent = this;
      console.log("chase: " + this.info_id);
      this.map.removeLayer(this.chaseLayer);
      this.chaseLayer = L.layerGroup();
      for (let [key, value] of Object.entries(
        this.peopleList[this.info_id].positionList
      )) {
        setTimeout(function() {
          L.marker([value.location.latitude, value.location.longitude], {
            icon: L.divIcon({ className: "chase-marker" })
          })
            .bindTooltip(value.location.timestamp)
            .openTooltip()
            .addTo(vueComponent.chaseLayer);
        }, key * 200);
        // value.marker.addTo(tmpChaseTimelineLayer);
      }
      this.chaseLayer.addTo(this.map);
    },
    closeMapInfo: function() {
      this.show = false;
      this.map.removeLayer(this.chaseLayer);
      console.log("close");
    },
    getHereNow: function() {
      if (navigator.geolocation) {
        var vueComponent = this;
        function getHereSuccess(position) {
          console.log(position);
          const options = {
            prefix: "fa",
            icon: "coffee",
            markerColor: "red"
          };
          L.marker([position.coords.latitude, position.coords.longitude], {
            icon: L.AwesomeMarkers.icon(options)
          })
            .bindTooltip(moment().format("YYYY-MM-DD HH:mm:ss"))
            .openTooltip()
            .addTo(vueComponent.people);
        }
        function getHereError(error) {
          var errorMessage = {
            0: "原因不明のエラーが発生しました…。",
            1: "位置情報の取得が許可されませんでした…。",
            2: "電波状況などで位置情報が取得できませんでした…。",
            3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
          };
          // エラーコードに合わせたエラー内容をアラート表示
          alert(errorMessage[error.code]);
        }
        navigator.geolocation.getCurrentPosition(getHereSuccess, getHereError, {
          enableHighAccuracy: true
        });
      } else {
        alert("端末が現在地取得機能に対応していません");
      }
    },
    setMapHere: function() {
      if (navigator.geolocation) {
        var vueComponent = this;
        function setHereSuccess(position) {
          console.log(position);
          vueComponent.map.setView([
            position.coords.latitude,
            position.coords.longitude
          ]);
        }
        function setHereError(error) {
          var errorMessage = {
            0: "原因不明のエラーが発生しました…。",
            1: "位置情報の取得が許可されませんでした…。",
            2: "電波状況などで位置情報が取得できませんでした…。",
            3: "位置情報の取得に時間がかかり過ぎてタイムアウトしました…。"
          };
          // エラーコードに合わせたエラー内容をアラート表示
          alert(errorMessage[error.code]);
        }
        navigator.geolocation.getCurrentPosition(setHereSuccess, setHereError, {
          enableHighAccuracy: true
        });
      } else {
        alert("端末が現在地取得機能に対応していません");
      }
    },
    setMapView: function(indexPeopleList) {
      console.log(
        Object.entries(this.peopleList[indexPeopleList].positionList)
      );
      var tmpPosition = Object.entries(
        this.peopleList[indexPeopleList].positionList
      ).slice(-1)[0][1];
      console.log(tmpPosition);
      this.map.setView([
        tmpPosition.location.latitude,
        tmpPosition.location.longitude
      ]);
      console.log(this.peopleList);
    }
  },
  mounted() {
    var vueComponent = this;
    this.map = L.map("map");
    this.map.setView([35.6825, 139.752778], 13);
    this.people = L.layerGroup();
    this.stocks = L.layerGroup();

    this.map.on("popupclose", function(e) {
      vueComponent.closeMapInfo();
    });

    L.marker([35.68, 139.734])
      .bindPopup("Meals")
      .bindTooltip("Meals")
      .openTooltip()
      .addTo(this.stocks),
      L.marker([35.674, 139.753])
        .bindPopup("Water")
        .bindTooltip("Water")
        .openTooltip()
        .addTo(this.stocks),
      L.marker([35.71, 139.747])
        .bindPopup("cloths")
        .bindTooltip("cloths")
        .openTooltip()
        .addTo(this.stocks);

    var mbAttr =
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      mbUrl =
        "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw";

    var grayscale = L.tileLayer(mbUrl, {
        id: "mapbox.light",
        attribution: mbAttr
      }),
      streets = L.tileLayer(mbUrl, {
        id: "mapbox.streets",
        attribution: mbAttr
      });

    var normal = L.tileLayer(
      "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    );

    var baseLayers = {
      normal: normal,
      Grayscale: grayscale,
      Streets: streets
    };

    var overlayMaps = {
      people: this.people,
      stocks: this.stocks
    };

    L.control
      .layers(baseLayers, overlayMaps, { position: "topright" })
      .addTo(this.map);

    streets.addTo(this.map);
    this.people.addTo(this.map);
    this.getNewestPin();
  }
};
</script>

<style scoped>
@import "https://cdn.jsdelivr.net/npm/animate.css@3.5.1";
#map {
  width: 100%;
  height: 800px;
}
.marker {
  text-align: center;
  color: whitef;
  font-size: 16;
  border-radius: 8px;
  box-shadow: 8px 8px 8px rgba(0, 0, 0, 0.4);
}
.chase-marker {
  width: 20px !important;
  height: 20px !important;
  border-radius: 10px !important;
  border: 3px solid #fdfdfd !important;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.8) !important;
  background-color: #c43 !important;
  z-index: 20 !important;
}

.red {
  background: red;
}
</style>
