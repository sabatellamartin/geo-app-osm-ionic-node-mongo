import Map from 'ol/Map';
import View from 'ol/View';
import LayerTile from 'ol/layer/Tile';
import ZoomToExtent from 'ol/control/ZoomToExtent';
import FullScreen from 'ol/control/FullScreen';
import ScaleLine from 'ol/control/ScaleLine';
import Attribution from 'ol/control/Attribution';
import SourceOsm from 'ol/source/OSM';
import SourceStamen from 'ol/source/Stamen';
import { fromLonLat, transform } from 'ol/proj';
import { defaults as defaultControls } from 'ol/control';
import { defaults as defaultInteractions, PinchZoom } from 'ol/interaction';

import Feature from 'ol/Feature';
import VectorSource from 'ol/source/Vector';
import VectorLayer from 'ol/layer/Vector';
import Point from 'ol/geom/Point';
import Polyline from 'ol/format/Polyline';
import LineString from 'ol/geom/LineString';
import {
  Circle as CircleStyle,
  Fill,
  Icon,
  Stroke,
  Style,
  Text,
} from 'ol/style';

import { Injectable } from '@angular/core';

import { environment } from '@env';

import { Coordenada } from '@models/geo';
import { bufferToggle } from 'rxjs/operators';

/**
 * Geographical map containing some basic controls and two sources for its base layer.
 */
@Injectable({
  providedIn: 'root'
})
export class GeoService {

  zoom: number = environment.zoomDefault;
  latitud: number = environment.latDefault;
  longitud: number = environment.lonDefault;

  /** OL-Map. readonly */
  map: Map;

  /** Basic layer. readonly */
  layerTile: LayerTile;

  /** Vector Source. readonly */
  vectorSource: VectorSource;
  
  /** Vector layer. readonly */
  vectorLayer: VectorLayer;
  
  /** Sources for basic layer. readonly */
  sources: { readonly osm: SourceOsm; readonly stamen: SourceStamen; };

  /* shapesTypes. readonly */
  shapesTypes: Array<string> = ["Point","LineString","Polygon","Circle"];

  lineString: LineString = null as any; 

  posicion: Point = null as any; 
  
  posicionInicial: Point = null as any; 

  posicionFinal: Point = null as any; 

  /**
   * Initialise the map.
   */
  constructor() {
    this.inicializar();
  }

  inicializar() {
    this.lineString = null as any; 
    this.posicion = null as any; 
    this.posicionInicial = null as any; 
    this.posicionFinal= null as any;
    
    this.sources = {
      osm: new SourceOsm(),
      stamen: new SourceStamen({ layer: 'toner' })
    };

    this.layerTile = new LayerTile({
      source: this.sources.osm
    });

    this.vectorSource = new VectorSource({
      //features: [new Feature(new Point(fromLonLat([this.longitud, this.latitud])))],
      //features: [routeFeature, geoMarker, startMarker, endMarker],
      wrapX: false
    });

    this.vectorLayer= new VectorLayer({
      source: this.vectorSource,
    });


    this.map = new Map({
      interactions: defaultInteractions().extend([
        new PinchZoom()
      ]),
      layers: [
        this.layerTile,
        this.vectorLayer
      ],
      //displayProjection: "EPSG:4326",
      view: new View({
        center: fromLonLat([this.longitud, this.latitud]),
        zoom: this.zoom,
        constrainResolution: true
      }),
      controls: defaultControls().extend([
        new Attribution(),
        /*new ZoomToExtent({
          extent: [
            813079.7791264898, 5929220.284081122,
            848966.9639063801, 5936863.986909639
          ]
        }),*/
        new FullScreen(),
        new ScaleLine({
          bar: true,
          minWidth: 150
        })
      ])
    });
  } // FIN inicializar

  /**
   * Sets the view to the accordant zoom and center.
   *
   * @param zoom Zoom.
   * @param center Center in long/lat.
   */
  setView(zoom: number, center: [number, number]) {
    this.map.getView().setZoom(zoom);
    this.map.getView().setCenter(fromLonLat(center));
  }

  /**
   * Updates target and size of the map.
   *
   * @param target HTML container.
   */
  updateSize(target = 'map') {
    this.map.setTarget(target);
    this.map.updateSize();
  }

  /**
   * Sets the source of the base layer.
   *
   * @param source Source.
   */
  setSource(source: 'osm' | 'stamen') {
    this.layerTile.setSource(this.sources[source]);
  }

  public marcarPosicion(coordenada: Coordenada, timestamp: number = 0, mensaje: string = '') {

    if (this.vectorSource.getState() === 'ready') {
      if (this.posicion) {
        this.posicion.setCoordinates(fromLonLat([coordenada.longitud, coordenada.latitud]));
        //console.log('set coordinates Point');
      } else {
        this.posicion = new Point(fromLonLat([coordenada.longitud, coordenada.latitud]));
        let feature: Feature = new Feature(this.posicion);
        feature.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 4,
              fill: new Fill({color: 'rgba(0,153,255,0.7)'}),
              stroke: new Stroke({
                color: [0, 153, 255, 0.8],
                width: 2,
              }),
            }),
            text: new Text({
              text: this.generarTexto(timestamp, mensaje),
              fill: new Fill({
                color: 'black'
              }),
              textAlign: 'center',
              textBaseline: 'bottom',
              //offsetY: -5,
              //offsetX: 2,
            })
          })
        );
        feature.setId('posicion');
        this.vectorSource.addFeature(feature);
        this.marcarPosicionInicial(coordenada, timestamp, mensaje);
      }
    }
  }

  public marcarRuta(coordenada: Coordenada, timestamp: number = 0, mensaje: string = '') {
    if (this.vectorSource.getState() === 'ready') {
      if (this.lineString) {
        this.lineString.appendCoordinate(fromLonLat([coordenada.longitud, coordenada.latitud]));
        //console.log('append');
      } else {
        this.lineString = new LineString([fromLonLat([coordenada.longitud, coordenada.latitud])]);
        let feature: Feature = new Feature(this.lineString);
        feature.setStyle(
          new Style({
            //radius: 8,
            //fill: new Fill({color: 'rgba(255,255,255,0.4)'}),
            stroke: new Stroke({
              color: [0, 153, 255, 0.8],
              width: 4,
              //lineDash: [4,8],
              //lineDashOffset: 2
            }),
            text: new Text({
              text: this.generarTexto(timestamp, mensaje),
              fill: new Fill({
                color: 'black'
              }),
              textAlign: 'center',
              textBaseline: 'bottom'
            })
          })
        );
        feature.setId('ruta');
        //console.log('new');
        this.vectorSource.addFeature(feature);
      }
      //console.log(this.vectorSource.getFeatures());
    }
  }

  public marcarPosicionInicial(coordenada: Coordenada, timestamp: number = 0, mensaje: string = '') {
    if (this.vectorSource.getState() === 'ready') {
      if (this.posicionInicial) {
        this.posicionInicial.setCoordinates(fromLonLat([coordenada.longitud, coordenada.latitud]));
        //console.log('set coordinates Inicial');
      } else {
        this.posicionInicial = new Point(fromLonLat([coordenada.longitud, coordenada.latitud]));
        let feature: Feature = new Feature(this.posicionInicial);
        feature.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 4,
              fill: new Fill({color: 'rgba(255,255,255,0.4)'}),
              stroke: new Stroke({
                color: [0, 153, 255, 0.8],
                width: 2,
              })
            }),
            text: new Text({
              text: this.generarTexto(timestamp, mensaje),
              fill: new Fill({
                color: 'black'
              }),
              textAlign: 'center',
              textBaseline: 'bottom',
            })
          }),
        );
        feature.setId('posicionInicial');
        this.vectorSource.addFeature(feature);
      }
    }
  }
  
  public marcarPosicionFinal(coordenada: Coordenada, timestamp: number = 0, mensaje: string = '') {
    if (this.vectorSource.getState() === 'ready') {
      if (this.posicionFinal&&coordenada) {
        this.posicionFinal.setCoordinates(fromLonLat([coordenada.longitud, coordenada.latitud]));
        //console.log('set coordinates Inicial');
      } else if (!this.posicionFinal&&coordenada) {
        this.posicionFinal = new Point(fromLonLat([coordenada.longitud, coordenada.latitud]));
        let feature: Feature = new Feature(this.posicionFinal);
        feature.setStyle(
          new Style({
            image: new CircleStyle({
              radius: 4,
              fill: new Fill({color: 'rgba(255,255,255,0.4)'}),
              stroke: new Stroke({
                color: [0, 153, 255, 0.8],
                width: 2,
              }),
            }),
            text: new Text({
              text: this.generarTexto(timestamp, mensaje),
              fill: new Fill({
                color: 'black'
              }),
              textAlign: 'center',
              textBaseline: 'bottom',
            })
          })
        );
        feature.setId('posicionFinal');
        this.vectorSource.addFeature(feature);
      }
    }
  }

  private generarTexto(timestamp:number, mensaje: string) {
    let texto = mensaje?mensaje:'';
    texto += ' ';
    texto += timestamp&&timestamp>0?this.timestampToDateFormat(timestamp):'';
    return texto;
  }

  private timestampToDateFormat(unix_timestamp: number) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds.
    if (unix_timestamp&&unix_timestamp>0) {
      let date = new Date(unix_timestamp);
      return this.formatAMPM(date).toString();
    } else {
      return '';
    }
  }

  private formatAMPM(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    let strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

}