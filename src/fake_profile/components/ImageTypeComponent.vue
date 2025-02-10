<template>
  <div class="row">

  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import { UNITS } from '@/map_gen/util/constants';
import MapApiService from "@/map_gen/services/api/mapApiService.js";
import ErrorService from "@/laboratory/services/errorService.js";
import BiomeApiService from "@/map_gen/services/api/biomeApiService.js";
import ImageTypeApiService from "@/fake_profile/services/api/imageTypeApiService.js";
export default {
  name: 'ImageTypeComponent',
  components: {
  },
  props: {
  },
  data() {
    return {
      imageTypeList: [{
        id: 1,
        name: "Test",
        description: "Test",

      }],
    }
  },
  computed: {
    ...mapGetters({
      isTestMode: 'isTestMode',
    }),
  },
  methods: {
    ...mapActions({
      setLoading: "setLoading",
    }),
    async loadImateTypeList() {
      let that = this;
      this.setLoading(true);
      await ImageTypeApiService.selectAll().then((results) => {
        that.imageTypeList = results;
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    },
  },
  async mounted() {
    await this.loadImateTypeList();
  }
}

</script>
<style scoped>

</style>
