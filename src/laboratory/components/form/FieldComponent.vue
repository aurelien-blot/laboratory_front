<template>
  <template v-if="fieldType==='STANDARD'">
    <label for="width" class="">{{ field.label }}</label>
    <Field :id="field.name"
           :name="field.name"
           :label="field.label"
           :rules="field.rules"
           class="form-control"
           :type="field.type"
           :as="asFormat"
           v-model="value"
           :value="value"
           :disabled="disabled"
           @input="updateValue"
    />
    <ErrorMessage :name="field.name" class="text-danger" v-if="showError"/>
  </template>
  <template v-else-if="fieldType==='SELECT'">
    <v-select  density="compact" class="customSelect"
               v-model="value"
               :items="field.options"
               :label="field.label"
               :clearable="!field.rules.required"
    ></v-select>
  </template>
</template>
<script>
import {configure, ErrorMessage, Field,} from "vee-validate";
import {FieldClass} from "@/laboratory/class/fieldClass.js";

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `Le champ ${ctx.label} est requis.`,
      uniqueValue: `Le nom ${ctx.value} est déjà utilisé.`,
      between: `Le champ ${ctx.label} doit être compris entre ${ctx.rule.params[0]} et ${ctx.rule.params[1]}.`,
      integer: `Le champ ${ctx.label} doit être un nombre entier.`,
      decimal: `Le champ ${ctx.label} doit être un nombre décimal avec ${ctx.rule.params} chiffre(s) après la virgule.`
    };
    return messages[ctx.rule.name] ? messages[ctx.rule.name] : `Le champ ${ctx.label} est invalide.`;
  },
  validateOnInput: true,
});

export default {
  name: 'FieldComponent',
  components: {
    Field,
    ErrorMessage,
  },
  props: {
    field: {
      type: FieldClass,
      required: true
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    disabled:{
      type: Boolean,
      default: false,
    },
    showError: {
      type: Boolean,
      default: true,
    }
  },
  data() {
    return {
      value:  null,
      textArea : false,
      fieldType : "STANDARD"
    }
  },
  computed: {
    asFormat() {
      return this.textArea ?"textarea":"";
    }
  },
  methods: {
    initValue(){
      let initialValue = this.modelValue;
      if (initialValue == null && this.field.defaultValue != null) {
        initialValue = this.field.defaultValue;
      }
      this.value = initialValue;
      this.$emit('update:modelValue', initialValue);
    },
    updateValue(event) {
      this.value = event.target.value;
      this.$emit('update:modelValue', event.target.value);
    },
    manageTypes(){
      if(this.field.type==="textarea"){
        this.field.type= "text";
        this.textArea = true;
      }
      else if(this.field.type==="select"){
        this.fieldType = "SELECT";
      }
    }
  },
  watch: {
    modelValue(newVal) {
      this.value = newVal;
    },
  },
  mounted() {
    this.initValue();
    this.manageTypes();
  }
}
</script>
<style scoped>
.customSelect{
  margin-top: 24px;
}
</style>