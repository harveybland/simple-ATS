<template>
    <div>
        <ul class="header mb-4">
            <div class="vac">
                <li>
                    <h5>{{ arrayItem.vacancyTitle }}</h5>
                    <p>{{ arrayItem.companyName }} - {{ arrayItem.town }}</p>
                </li>
            </div>
        </ul>
        <li>
            <div class="banner">
            <router-link to="/Vacancies"><b-icon-arrow-up rotate="-90"></b-icon-arrow-up></router-link>
            <router-link :to="{ path: '/Vacancies/' + arrayItem._id }">Details</router-link>
            <router-link :to="{ path: '/editVacancy/' + arrayItem._id }">Job Description</router-link>
             <router-link :to="{ path: '/NewApplicant/' + arrayItem._id }" >Application Form</router-link>
             <router-link :to="{ path: '/ApplicantsView/' + arrayItem._id }" >Applicants</router-link>
            </div>
        </li>
          <div class="container">     
                <div class="head">
                  <h4>Applying for - {{ arrayItem.vacancyTitle }}</h4>
                  <p>{{ arrayItem.companyName }} - {{ arrayItem.town }}</p>
               </div>
              <div class="contain mt-3">
                <b-form-group class="displaynone">
                      <label>id</label>
                      <b-form-input v-model="arrayItem._id"></b-form-input>
                </b-form-group>
              <b-form-group class="box">
                      <label>First Name</label>
                      <b-form-input placeholder="Harvey" v-model="firstname"></b-form-input>
                </b-form-group>
                <b-form-group class="box">
                    <label>Surname</label>
                    <b-form-input placeholder="Bland" v-model="surname"></b-form-input>
                </b-form-group>
                     <b-form-group class="box">
                      <label>Postcode</label>
                      <b-form-input placeholder="bb8 7ns" v-model="postcode"></b-form-input>
                </b-form-group>
                <b-form-group class="box">
                    <label>Mobile</label>
                    <b-form-input placeholder="0795445590" v-model="mobile"></b-form-input>
                </b-form-group>
                     <b-form-group class="box">
                      <label>Email</label>
                      <b-form-input placeholder="harvey.bland@genius.online" v-model="emailaddress"></b-form-input>
                </b-form-group>
                <b-form-group class="box">
                    <label>Current Employer</label>
                    <b-form-input placeholder="Simon" v-model="currentEmployer"></b-form-input>
                </b-form-group >
                     <b-form-group class="box">
                      <label>Current Job Title</label>
                      <b-form-input placeholder="Developer" v-model="currentJobTitle"></b-form-input>
                </b-form-group>
              <div style="text-align: center;" class="box">
                <b-button class="mb-3" variant="info" @click.prevent="createApplicant">Create</b-button>
              </div>
              </div>
            </div>
          </div>
</template>

<script>
let job = { vacancyTitle: "test" }
let id = "";

import { HttpService } from "@/services/http.service";
import { gsap } from "gsap";
export default {
  name: "NewApplicant",
  data() {
    return {
      arrayItem: {
        _id: ''
      },
      firstname: '',
      surname: '',
      postcode: '',
      mobile: '',
      emailaddress: '',
      currentEmployer: '',
      currentJobTitle: '',
      applicationStatusId: '604a033e9448df2d9810ee20',
      arrayItem: job,
    }
  },
   methods: {
      createApplicant() {
        const body = { jobid: this.$data.arrayItem._id, firstname: this.$data.firstname, surname: this.$data.surname,
        postcode: this.$data.postcode, mobile: this.$data.mobile, emailaddress: this.$data.emailaddress,
        currentEmployer: this.$data.currentEmployer, currentJobTitle: this.$data.currentJobTitle,
        applicationStatusId: this.$data.applicationStatusId };
        this.id = this.$router.currentRoute.params.id;
        HttpService.httpPost('apply/' + this.id, body)
        .then(res => {
            this.$router.push('/ApplicantsView/' + this.id);
        })
        .catch(error => {
        console.log(error);
        })
    },
     async getJob() {
      this.id = this.$router.currentRoute.params.id;
      this.arrayItem = await HttpService.httpGet("job/" + this.id)
    }
    },
    beforeMount() {
    this.getJob();
  },
    mounted() {
      gsap.from(".box", {
      duration: 0.5,
      scale: 0.2, 
      opacity: 0, 
      stagger: 0.1,
    })
    //   gsap.to(".box", {
    //   duration: 0.5, 
    //   opacity: 0, 
    //   y: 20, 
    //   stagger: 0.1,
    // });
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/styles.scss';
.displaynone {
  display: none;
}
//Main
  .container {
    text-align: left;
    h4 {
      color: #fff;
      margin: 0;
    }
    p {
      padding: 0 0 15px 15px;
      color: #fff;
      margin: 0;
    }
  }
  .contain {
      margin: 0 100px 30px 100px;
  }
  label {
    display: flex;
  }

</style>