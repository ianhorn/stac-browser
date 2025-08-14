import { CRS } from 'leaflet';

const KYFROMABOVE_ATTRIBUTION = 'KyFromAbove';
const WMS = 'LWMSTileLayer'

const BASEMAPS = {
    tcm: {
        url: 'https://kygisserver.ky.gov/arcgis/services/WGS84WM_Services/Ky_TCM_Base_WGS84WM/MapServer/WMSServer',
        name: 'The Commonwealth Basemap',
        is: WMS,
        attribution: KYFROMABOVE_ATTRIBUTION,
        format: 'image/png',
        layers: 'Layers',
        crs: Credential.EPSG3857
    }
};

/**
 * @typedef BasemapOptions
 * @type {Object}
 * @property {string} is Component: LWMSTileLayer or LTileLayer
 * @see https://vue2-leaflet.netlify.app/components/
 */

/**
 * 
 * @param {Object} stac The STAC object
 * @param {Object} map The Leaflet map object
 * @param {Object} i18n Vue I18N object
 * @returns {Array.<BasemapOptions>}
 */

export default function configureBasemap(stac, map, i18n) {
  let targets = ['earth'];
  if (stac instanceof STAC) {
    if (stac.isCollection() && Utils.isObject(stac.summaries) && Array.isArray(stac.summaries['ssys:targets'])) {
      targets = stac.summaries['ssys:targets'];
    }
    else if (stac.isCollection() && Array.isArray(stac['ssys:targets'])) {
      targets = stac['ssys:targets'];
    }
    else if (stac.isItem() && Array.isArray(stac.properties['ssys:targets'])) {
      targets = stac.properties['ssys:targets'];
    }
  }

  return targets.map(target => BASEMAPS[target.toLowerCase()]);
};