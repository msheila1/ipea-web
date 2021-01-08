<template>
  <app-card icon="icon-location3" :collapsible="false" :refreshable="false" bodyClass="p-0">
    <div ref="gmap" class="map w-100"></div>
  </app-card>
</template>

<script lang="ts">
/// <reference types="@types/googlemaps" />

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { Coordenada } from '@/models';

@Component
export default class SemelhanteMap extends Vue {
  @Prop({ default: [] }) private coordenadas!: Coordenada[];

  private bounds!: google.maps.LatLngBounds;
  private map!: google.maps.Map;
  private markers: google.maps.Marker[] = [];
  private maxZoomService!: google.maps.MaxZoomService;
  private iconPath = '/img/map/markers';
  private icons: any = {
    vermelho: {
      icon: 'red.png',
    },
    azul: {
      icon: 'blue.png',
    },
    amarelo: {
      icon: 'yellow.png',
    },
    default: {
      icon: 'default.png',
    },
  };
  private zoom: number = 14;

  protected mounted(): void {
    const self = this;
    const gmapEl: any = self.$refs.gmap;

    self.bounds = new google.maps.LatLngBounds();
    self.maxZoomService = new google.maps.MaxZoomService();
    self.map = new google.maps.Map(gmapEl, {
      zoom: self.zoom,
      center: self.center,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    });

    this.renderMap();
  }

  @Watch('coordenadas', { immediate: false, deep: true })
  private onCoordenadaChanged(value: Coordenada[], oldValue: Coordenada[]): void {
    this.renderMap();
  }

  private renderMap(): void {
    const self = this;

    self.clearMarkers();

    self.map.setZoom(self.zoom);
    self.map.setCenter(self.center);

    self.coordenadas.forEach((coordenada: Coordenada) => {
      const position: any = { lat: coordenada.latitude, lng: coordenada.longitude };
      const marker = self.renderMarker(coordenada.icone, coordenada.titulo, coordenada.conteudo, position);

      self.markers.push(marker);
      self.map.fitBounds(self.bounds.extend(position));
    });

    self.map.setZoom(self.zoom);
    self.map.setCenter(self.center);

    const infoWindow = new google.maps.InfoWindow();

    self.map.addListener('click', (e) => {
      self.maxZoomService.getMaxZoomAtLatLng(e.latLng, (response) => {
        if (response.status !== google.maps.MaxZoomStatus.OK) {
          infoWindow.setContent('Erro no Zoom');
          infoWindow.setPosition(e.latLng);
          infoWindow.open(self.map);
        }
      });
    });

    self.renderLegend();
  }

  private renderMarker(icon: string, title: string, content: string, position: google.maps.LatLng): google.maps.Marker {
    const self = this;

    const marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      icon,
      map: self.map,
      position,
      title,
    });

    const infowindow = new google.maps.InfoWindow({
      content,
    });

    marker.addListener('click', () => {
      marker.setAnimation(marker.getAnimation() !== null ? null : google.maps.Animation.BOUNCE);
      infowindow.open(self.map, marker);
    });

    return marker;
  }

  private renderLegend(): void {
    const self = this;

    const already = !!(self.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM] as any).length;
    if (already) {
      return;
    }

    // tslint:disable:max-line-length
    const legend = document.createElement('div');
    legend.setAttribute('id', 'legend');
    legend.setAttribute('class', 'legenda');
    legend.setAttribute('style', 'z-index: 0; position: absolute; bottom: 127px; right: 0px; background: #fff; border: 3px solid; #000; padding-right: 23px; ');
    legend.innerHTML = '<h3 style="font-size: 15px; margin-left: 7px; padding-top: 6px;">Legenda</h3>';

    const legendItems = [
      { id: 'atual', label: 'Ocorrência atual', icon: 'red.png' },
      { id: 'semelhante', label: 'Ocorrência semelhante', icon: 'yellow.png' },
      { id: 'conhecido', label: 'Autor conhecido', icon: 'blue.png' },
    ];

    legendItems.forEach((legendItem) => {
      if (!document.getElementById(legendItem.id)) {
        const element = document.createElement('div');
        element.setAttribute('id', legendItem.id);
        element.setAttribute('style', 'margin-left: 6px;');

        element.innerHTML = `<img src="${self.iconPath}/${legendItem.icon}" height="25" width="17"> ${legendItem.label}`;

        legend.appendChild(element);
      }
    });

    self.map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
  }

  private get center(): google.maps.LatLng {
    const coordenadaCentral = this.coordenadas.find((coordenada) => coordenada.central);
    const latitude = coordenadaCentral ? coordenadaCentral.latitude : -23.5384554;
    const longitude = coordenadaCentral ? coordenadaCentral.longitude : -46.6372883;

    return new google.maps.LatLng(latitude, longitude);
  }

  private clearMarkers() {
    const self = this;
    self.markers.forEach((marker: google.maps.Marker) => {
        marker.setMap(null);
    });
    self.markers = [];
  }
}
</script>

<style lang="scss">
.map {
  height: 600px;
  margin: 0 auto;
}
</style>
