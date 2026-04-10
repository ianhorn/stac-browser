<template>
  <div class="lidar-thumbnail-wrapper">
    <img
      v-if="hillshadeUrl && !error"
      :src="hillshadeUrl"
      class="lidar-thumbnail"
      alt="Hillshade Preview"
      @error="error = true"
    />
    <div v-else-if="hillshadeUrl && error" class="lidar-thumbnail-error text-muted">
      <small>Preview unavailable</small>
    </div>
  </div>
</template>

<script>
import { getHillshadeUrl } from './maps/thumbnails.js';

export default {
  name: 'LidarThumbnail',
  props: {
    data: {
      type: Object,
      default: null
    },
    size: {
      type: Number,
      default: 400
    }
  },
  data() {
    return {
      error: false
    };
  },
  computed: {
    hillshadeUrl() {
      return getHillshadeUrl(this.data, this.size);
    }
  },
  watch: {
    hillshadeUrl() {
      this.error = false;
    }
  }
};
</script>

<style lang="scss">
#stac-browser {
  .lidar-thumbnail-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .lidar-thumbnail {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .lidar-thumbnail-error {
      padding: 1rem;
      text-align: center;
    }
  }
}
</style>
