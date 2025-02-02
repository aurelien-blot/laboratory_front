<template>
  <BasicViewComponent>
    <template v-slot:content>
      <div class="row mb-10 mt-3">
        <div class="col-12 text-center ">
          <h1 class="project-title">Quick Mail</h1>
        </div>
      </div>
      <template v-if="email!=null">
        <div class="row emailForm">
          <Form novalidate @submit.prevent="sendEmail" v-if="email!=null">
            <div class="mb-3">
              <label for="to" class="form-label">Destinataire</label>
              <Field name="to" type="text" v-model="email.to"
                     class="form-control" label="Destinataire"
                     id="to" rules="required|emailList"/>
              <ErrorMessage name="to" class="text-danger"/>
            </div>
            <div class="mb-3">
              <label for="cc" class="form-label">CC (optionnel)</label>
              <Field name="cc" type="text" v-model="email.cc"
                     class="form-control" label="CC (optionnel)"
                     id="cc" rules="emailList"/>
              <ErrorMessage name="cc" class="text-danger"/>
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">CCI (optionnel)</label>
              <Field name="cci" type="text" v-model="email.cci"
                     class="form-control" label="CCI (optionnel)"
                     id="cci" rules="emailList"/>
              <ErrorMessage name="cci" class="text-danger"/>
            </div>
            <div class="mb-3">
              <label for="username" class="form-label">Objet</label>
              <Field name="subject" type="text" v-model="email.subject"
                     class="form-control" label="Objet"
                     id="subject" rules="required"/>
              <ErrorMessage name="subject" class="text-danger"/>
            </div>

            <div class="mb-3">
              <label for="body" class="form-label">Message</label>
              <Field name="body" as="textarea" v-model="email.body"
                     class="form-control" label="Message"
                     id="body" rows="5"/>
              <ErrorMessage name="body" class="text-danger"/>
            </div>

          </Form>
        </div>
        <div class="row mt-4">
          <div class="col-12 text-center" v-if="email!=null">
            <button type="button" class="btn btn-primary" :disabled="!canSubmit" @click="sendEmail()">Envoyer</button>
          </div>
        </div>
      </template>
      <template v-else>
        <template v-if="successMessage!=null">
          <div class="row ">
            <div class="col-12 text-center alert alert-success bg-success" >
              <span>{{ successMessage }}</span>
              <p class="mt-4"><button type="button" class="btn btn-primary btn-md" @click="initNewEmail()">Envoyer un autre mail</button></p>
            </div>
          </div>
        </template>
        <template v-if="errorMessage!=null">
          <div class="row ">
            <div class="col-12 text-center alert alert-danger bg-danger" >
              <span>{{ errorMessage }}</span>
              <p class="mt-4"><button type="button" class="btn btn-primary btn-md" @click="initNewEmail()">Rééessayer</button></p>
            </div>
          </div>
        </template>
      </template>
    </template>
  </BasicViewComponent>
</template>

<script>

import {mapActions, mapGetters} from "vuex";
import BasicViewComponent from "@/laboratory/components/BasicViewComponent.vue";
import {Field, defineRule, ErrorMessage, Form, configure} from 'vee-validate';
import {required} from '@vee-validate/rules';
import UtilService from "@/laboratory/services/utilService.js";
import ErrorService from "@/laboratory/services/errorService.js";
import MailService from "@/quick_mail/services/api/mailService.js";


defineRule('required', required);
defineRule('emailList', (value) => {
  if (!value) return true; // Champ vide accepté (cas des champs optionnels)
  const emails = value.split(';').map(email => email.trim());
  return UtilService.isEmailList(value) ? true : 'Une ou plusieurs adresses email ne sont pas valides. Si plusieurs valeurs : séparez par des points-virgules.';
});

configure({
  generateMessage: (ctx) => {
    const messages = {
      required: `Le champ ${ctx.label} est requis.`,
      email: `Le champ ${ctx.label} doit être une adresse email valide.`
    };
    return messages[ctx.rule.name] ? messages[ctx.rule.name] : `Le champ ${ctx.label} est invalide.`;
  },
  validateOnInput: true,
});

export default {
  name: 'QuickMailHome',
  components: {
    ErrorMessage,
    Field,
    BasicViewComponent,
    Form
  },
  data() {
    return {
      email: null,
      successMessage: null,
      errorMessage: null,
    }
  },
  computed: {
    ...mapGetters(['isTestMode', "isLoading"]),
    canSubmit() {
      return this.email != null &&
          this.email.to != null && this.email.to.length > 0 && UtilService.isEmailList(this.email.to)
          && (this.email.cc == null || this.email.cc.length === 0 || UtilService.isEmailList(this.email.cc))
          && (this.email.cci == null || this.email.cci.length === 0 || UtilService.isEmailList(this.email.cci))
          && this.email.subject != null && this.email.subject.length > 0
    },
  },
  watch: {},
  methods: {
    ...mapActions({
      setLoading: "setLoading",
    }),
    initNewEmail() {
      this.successMessage = null;
      this.errorMessage = null;
      this.email = {
        to: "azefaze@adea.fr;azeafafa@sfjsfes.fr",
        cc: "",
        cci: "",
        subject: "test",
        body: ""
      }
    },
    async sendEmail() {
      let that = this;
      that.setLoading(true);
      await MailService.sendMail(that.email).then((result) => {
        let code = result.status;
        if (code === 200) {
          that.successMessage = "Email envoyé avec succès.";
          that.email = null;
        }
      }).catch((error) => {
        if(error.status==500){
          that.errorMessage = "Erreur lors de l'envoi de l'email : " + error.message;
          that.email = null;
        }
        else{
          ErrorService.showErrorInAlert(error);
        }
      });
      await this.setLoading(false);
    }
  },
  mounted() {
    this.initNewEmail();
  }
}

</script>
<style scoped>
.emailForm {
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  width: 50%;
  margin: auto;
}

.field {
  margin-bottom: 10px;
}
</style>