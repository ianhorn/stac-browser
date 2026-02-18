import { Collection } from './src/models/stac';
import { STAC } from 'stac-js';

// Basemaps configuration for STAC Browser v4

const BASEMAPS = {
  earth: [
    {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      is: 'XYZ',
      title: 'OpenStreetMap',
      attributions: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors.',
      projection: "EPSG:3857",
      visible: true,
      zIndex: 0
    },
    {
      url: 'https://kygisserver.ky.gov/arcgis/rest/services/WGS84WM_Services/Ky_TCM_Base_WGS84WM/MapServer/tile/{z}/{y}/{x}',
      title: 'The Commonwealth Basemap',
      is: 'XYZ',
      attributions: '© <a href="https://registry.opendata.aws/kyfromabove/" target="_blank">KyFromAbove</a>',
      tileSize: 256,
      minZoom: 0,
      maxZoom: 21,
      projection: "EPSG:3857",
      visible: true,
      zIndex: 0
    },
  ],

  europa: [
    {
      url: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/jupiter/europa_simp_cyl.map',
      is: 'TileWMS',
      title: 'USGS Europa',
      attributions: 'USGS Astrogeology',
      projection: 'EPSG:4326',
      params: {
        FORMAT: 'image/png',
        LAYERS: 'GALILEO_VOYAGER'
      }
    }
  ],

  mars: [
    {
      url: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/mars/mars_simp_cyl.map',
      is: 'TileWMS',
      title: 'USGS Mars',
      attributions: 'USGS Astrogeology',
      projection: 'EPSG:4326',
      params: {
        FORMAT: 'image/png',
        LAYERS: 'MDIM21'
      }
    }
  ],

  moon: [
    {
      url: 'https://planetarymaps.usgs.gov/cgi-bin/mapserv?map=/maps/earth/moon_simp_cyl.map',
      is: 'TileWMS',
      title: 'USGS Moon',
      attributions: 'USGS Astrogeology',
      projection: 'EPSG:4326',
      params: {
        FORMAT: 'image/png',
        LAYERS: 'LROC_WAC'
      }
    }
  ]
};

export default function configureBasemap(stac, i18n) {
  let targets;

  if (stac instanceof Collection) {
    targets = stac.getSummary('ssys:targets');
  }

  if (stac instanceof STAC && !targets) {
    targets = stac.getMetadata('ssys:targets');
  }

  if (!targets) {
    targets = ['earth'];
  }

  let layers = [];

  for (const target of targets) {
    const maps = BASEMAPS[target.toLowerCase()];
    if (Array.isArray(maps)) {
      layers = layers.concat(maps);
    }
  }

  return layers;
}
