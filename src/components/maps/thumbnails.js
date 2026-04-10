// Maps STAC collection ID → kyraster.ky.gov ImageServer service name for hillshade previews
export const HILLSHADE_SERVICES = {
    'laz-phase1': 'Ky_DSM_First_Return_5FT_Phase1',
    'laz-phase2': 'Ky_DSM_First_Return_2FT_Phase2',
    'laz-phase3': 'Ky_DSM_First_Return_2FT_Phase2',
    'dem-phase1': 'Ky_DEM_KYAPED_5FT',
    'dem-phase2': 'Ky_DEM_KYAPED_2FT_Phase2',
    'dem-phase3': 'Ky_DEM_KYAPED_2FT_Phase3'
};

/**
 * Builds a hillshade preview image URL from the kyraster.ky.gov ImageServer.
 * Used as the thumbnail source for LAZ/DEM collection items.
 * @param {number[]} bbox    - [minLon, minLat, maxLon, maxLat] in WGS84
 * @param {string}   service - ImageServer service name (from HILLSHADE_SERVICES)
 * @param {number}   size    - pixel dimensions of the square output image (default 400)
 * @returns {string} Full exportImage URL returning a hillshade JPEG/PNG
 */
export function buildHillshadeUrl(bbox, service, size = 200) {
    const base = `https://kyraster.ky.gov/arcgis/rest/services/ElevationServices/${service}/ImageServer/exportImage`;
    const params = new URLSearchParams({
        bbox: bbox.join(','),
        bboxSR: '4326',
        size: `${size},${size}`,
        imageSR: '3089',
        time: '',
        format: 'jpgpng',
        pixelType: 'UNKNOWN',
        interpolation: '+RSP_BilinearInterpolation',
        renderingRule: JSON.stringify({
            rasterFunction: 'Hillshade',
            rasterFunctionArguments: { HillshadeType: 1, ZFactor: 1.0 },
            variableName: 'DEM'
        }),
        f: 'image'
    });
    return `${base}?${params}`;
}

/**
 * Returns a hillshade preview URL for a STAC item, or null if the item's
 * collection is not in the known services map or has no bbox.
 * @param {object} data - STAC item with .collection and .bbox
 * @param {number} size - pixel dimensions (default 400)
 * @returns {string|null}
 */
export function getHillshadeUrl(data, size = 400) {
    if (!data) return null;
    const service = HILLSHADE_SERVICES[data.collection];
    if (!service) return null;
    const bbox = data.bbox;
    if (!Array.isArray(bbox) || bbox.length < 4) return null;
    return buildHillshadeUrl(bbox, service, size);
}
