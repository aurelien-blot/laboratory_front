<template>
  <div class="row">

  </div>

</template>

<script>
import {mapActions, mapGetters} from "vuex";
import ErrorService from "@/laboratory/services/errorService.js";
import ModelApiService from "@/fake_profile/services/api/modelApiService.js";
export default {
  name: 'ModelComponent',
  components: {
  },
  props: {
  },
  data() {
    return {
      modelList: [{
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
    async loadModelList() {
      let that = this;
      this.setLoading(true);
      await ModelApiService.selectAll().then((results) => {
        that.modelList = results;
      }).catch((error) => {
        ErrorService.showErrorInAlert(error);
      });
      this.setLoading(false);
    },
  },
  async mounted() {
    await this.loadModelList();
  }
}

</script>
<style scoped>

</style>
