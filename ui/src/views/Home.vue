<template>
<div class="home">
    <div class="container home">
          <div>
            <h3 class="mb-5 text">Simple ATS</h3>
            <!-- <div v-if="!user">
                <h3>Please <router-link to="/Login">Sign in</router-link></h3>
            </div>
            <div v-if="user">
                <h5>Welcome user</h5>
            </div> -->
          <div class="data">
              <div>
                  <h4>Total Candidates</h4>
                  <p></p>
                </div>
              <div class="text">
                <h4>Open Vacancies</h4>
                <p>{{ item.vacancyTitle }}</p>
              </div>
              <div class="text">
                <h4>Appointed</h4>
                <p>{{  }}</p>
              </div>
          </div>
          
      </div>
    </div>
</div>
</template>

<script>
let jobs = { vacancyTitle: "test" };
import { HttpService } from "@/services/http.service";
export default {
      name: 'Home',
      data() {
        return {
          item: jobs
        }
      },
      methods: {
        async getJobs() {
        let res = this.item = await HttpService.httpGet("jobs")
        console.log(res)
      }
      },
        beforeMount() {
          this.getJobs();
      },
      created() {
        if (localStorage.getItem('token') === null) {
          this.user = false
        } else {
          this.user = true
        };
      }
}
</script>

<style lang="scss">
@import '@/styles/styles.scss';
  .home {
    background-color: #e2f3f8;
    height: 93.5vh;
  }
  .data {
    display: flex;
    justify-content: space-between;
  }
</style>