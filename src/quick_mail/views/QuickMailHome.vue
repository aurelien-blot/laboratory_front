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
              <label for="senderMail" class="form-label">Mail de l'expéditeur</label>
              <Field name="senderMail" type="text" v-model="email.senderMail"
                     class="form-control" label="Mail de l'expéditeur"
                     id="senderMail" rules="required|email"/>
              <ErrorMessage name="senderMail" class="text-danger"/>
            </div>
            <div class="mb-3">
              <label for="senderName" class="form-label">Nom de l'expéditeur</label>
              <Field name="senderName" type="text" v-model="email.senderName"
                     class="form-control" label="Nom de l'expéditeur"
                     id="senderName" rules="required"/>
              <ErrorMessage name="senderName" class="text-danger"/>
            </div>
            <div class="mb-3">
              <label for="to" class="form-label">Destinataire</label>
              <Field name="to" type="text" v-model="email.to"
                     class="form-control" label="Destinataire"
                     id="to" rules="required|email"/>
              <ErrorMessage name="to" class="text-danger"/>
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
import {required, email} from '@vee-validate/rules';
import UtilService from "@/laboratory/services/utilService.js";
import ErrorService from "@/laboratory/services/errorService.js";
import MailService from "@/quick_mail/services/api/mailService.js";


defineRule('required', required);
defineRule('email', email);

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
          this.email.to != null && this.email.to.length > 0 && UtilService.isEmail(this.email.to)
          && this.email.senderMail != null && this.email.senderMail.length > 0 && UtilService.isEmail(this.email.senderMail)
          && this.email.senderName != null && this.email.senderName.length > 0
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
        senderMail: "",
        senderName: "",
        to: "",
        subject: "",
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
        if(error.status===500){
          console.log(error)
          that.errorMessage = "Erreur lors de l'envoi de l'email : " + error.response.data;
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