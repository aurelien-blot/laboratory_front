
<template>
  <LoadingComponent/>

  <div class="container-fluid">
    <slot name="content"></slot>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import LoadingComponent from "@/laboratory/components/util/LoadingComponent.vue";

export default {
  name: 'BasicViewComponent',
  components: {
    LoadingComponent,
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['isTestMode']),
  },
  methods: {
    ...mapActions(['setLoading']),

  },
  mounted() {
  }
}

</script>
<style scoped>

</style>
