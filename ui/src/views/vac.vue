<template>
  <div class="background">
    <div class="container">
      <div class="mb-4 pt-3">
        <h2>vac</h2>
      </div>
      <li v-for="item in arrayItem" v-bind:key="item._id">
        <router-link :to="{ path: '/Vacancies/' + item._id }" class="nav">
          <h5>{{ item.vacancyTitle }}</h5>
        </router-link>
        <p>{{ item.street }} {{ item.city }} {{ item.town }}</p>
        <p>{{ item.isDeleted }}</p>
      </li>
    </div>
  </div>
</template>

<script>
let jobArray = [
  {
    vacancyTitle: "test",
  },
];
import { HttpService } from "@/services/http.service";

export default {
  name: "vac",
  data() {
    return {
      arrayItem: jobArray,
    };
  },
//   methods: {
//     async getJobs() {
//       const res = await HttpService.httpGet("jobs");
//       jobArray.splice(0, jobArray.length);
//       jobArray.push(...res);
//     }
//     },
//       beforeMount() {
//         this.getJobs();
//     },
created() {
    HttpService.httpGet("jobs")
    .then(res => {
        console.log(res)
        this.jobArray = res.data
    })
}
};
</script>

<style scoped>

li {
  display: block;
  background: #343a40;
  padding: 25px 25px 15px 25px;
  margin-bottom: 20px;
}
h5 {
  color: #e5e5e5;
}
p {
  color: rgba(255, 255, 255, 0.5);
}
.container {
  background: grey;
  padding-bottom: 10px;
}
</style>