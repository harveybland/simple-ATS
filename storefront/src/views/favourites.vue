<template>
  <div>
    <div class="banner">
      <a href="/"><b-icon class="h2" icon="arrow-left"></b-icon></a>
      <p>Saved Jobs</p>
    </div>
        <div class="container search">
          <div class="input">
             <div>Job Title: <input type="text" v-model="searchTitle" placeholder="e.g. Manager" /></div>
             <div>Location: <input type="text" v-model="searchTown" placeholder="e.g Skipton" /></div>
          </div>
            <div class="sort">
              <div>
                <h4>Sort Date:</h4>
                <select>
                  <option>Sort</option>
                  <option value="Asc" :v-model="asc">Asc</option>
                  <option value="Desc">Desc</option>
                </select>
              </div>
            <div class="arrange heart">
                <button v-on:click="arrange = !arrange"><b-icon class="h4" icon="filter-square" aria-hidden="true"></b-icon></button>
                <a href="/favourites"><b-icon class="h4 mt-1" icon="suit-heart-fill"></b-icon></a>
            </div>
            </div>
      </div>
      <div class="container">
      <ul :class="arrangeBox">
        <li v-for="item in filteredJobs" v-bind:key="item._id">
            <div class="vacancies">
                <h5>{{ item.vacancyTitle }}</h5>
                <p>{{ item.companyName }} {{ item.town }}</p>
                <p>{{ item.startDate }}</p>
                <div class="text">
                  <p><span>Contract Type:</span> Permanent</p>
                  <p><span> Working Pattern:</span> Full Time</p>
                  <p><span> Salary: </span> {{ item.salary }}</p>
                </div>  
              </div>
              <div class="view">
                <div v-if="item.favourite === true">
                  <b-icon v-on:click="removeFavourite($event, item._id)" icon="suit-heart-fill" class="h4 mt-2"></b-icon>
                </div>
                <div v-if="item.favourite === false">
                  <b-icon v-on:click="addFavourite($event, item._id)" icon="heart" class="h4 mt-2"></b-icon>
                </div>
                <div>
                  <router-link :to="{ path: '/VacanciesView/' + item._id }" class="nav">
                  <h6>View</h6>
                  </router-link>
                </div>
              </div>
        </li>
      </ul>
      </div>
  </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: 'favourites',
          data() {
    return {
        startDate: null,
        endDate: null,
        arrange: false,
        arrayItem: [],
        search: ''
    }
  },
  methods: {
      async getJobs() {
      await axios.get('http://localhost:4000/api/favJobs')
      .then(res => { this.arrayItem = res.data })
    },
          addFavourite(event, _id) {
        console.log(event, _id)
        const body = { _id: event }
        axios.put('http://localhost:4000/api/favJob/' + _id, body)
        .then(res => {
          location.reload();
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      },
        removeFavourite(event, _id) {
        console.log(event, _id)
        const body = { _id: event }
        axios.put('http://localhost:4000/api/unfavJob/' + _id, body)
        .then(res => {
          location.reload();
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
      beforeMount() {
        this.getJobs();
    },
    computed: {
        arrangeBox(){
            return{
                arrange: this.arrange,
            }
        },
        filteredJobs: function(){
            return this.arrayItem.filter((item) => {
                return item.vacancyTitle.toLowerCase().match(this.search);
            });
        }
    }
    }
</script>

<style lang="scss" scoped>
@import '@/styles/styles.scss';
  .banner {
    padding: 15px 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    a {
      display: flex;
      color: #fff;
    }
  }
.arrange {
    display: grid;
    grid-template-columns: 1fr 1fr;
  li {
    margin-right: 20px;
  }
   button {
    border: none;
    background-color: transparent;
  }
  .view {
    padding: 45px 0 0 0;
  }
  .text {
    display: block;
  }
}

.input {
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 15px 0 15px 10px;
  margin: 10px 0;
  div {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  input {
    width: 86%;
    margin-left: 3px;
  }
}

.heart {
    display: flex;
    justify-content: space-evenly;
}

.sort {
  background-color: #e2f3f8;
  display: grid;
  grid-template-columns: 3fr 1fr;
  padding: 15px 0 15px 10px;
  margin: 10px 0;
  div {
    display: flex;
    align-items: center;
  }
  h4 {
    font-size: 20px;
    margin-top: 5px;
  }
}

select {
  padding: 5px 20px;
  border-radius: 8px;
  margin-left: 10px;
}

.date {
  display: grid;
  padding: 0 0 0 10px;
  grid-template-columns: 1fr 1fr;
  .first {
    margin-right: 10px;
  }
}

.view {
  display: flex;
  justify-content: space-around;
  padding: 25px 0 0 0;
  svg {
      cursor: pointer;
  }
}

.vacancies {
  text-align: left;
}

.container li {
  display: grid;
  grid-template-columns: 3fr 1fr;
  margin-bottom: 25px;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0,0,0,0.14901960784313725);
}

  .text {
    display: flex;
    p {
      padding-right: 20px;
    }
  }

  span {
    font-weight: bold;
  }
</style>