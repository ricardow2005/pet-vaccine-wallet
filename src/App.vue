<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>Prototipo de execução</span>
        <span class="font-weight-light"> - Bem vindo {{ user.name }} </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-row  no-gutters>
   <v-col sm="auto">
      <v-card  outlined>
    <v-navigation-drawer v-model="drawer" :mini-variant.sync="mini" expand-on-hover permanent>
      <v-list-item>
        <v-list-item-avatar>
          <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>John Leider</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    </v-card>
    </v-col>
    <v-col sm="100%"> 
      <v-card
           class="pa-2"
          outlined
          tile
        >
    <v-main>
      <router-view />
    </v-main>
      </v-card>
    </v-col>
    
    </v-row>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "App",
  components: {},

mounted () {
    axios
      //.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .get('./json/user.json')
      .then(response => {
          console.log(response.data.d.results[0])
          this.user = response.data.d.results[0]
      } )
      .catch(error => console.log(error))
      
  },

  data: () => ({
    //
    user: [],
    drawer: true,
    items: [
      { title: "Home", icon: "mdi-home-city", to: "/index" },
      { title: "Clientes", icon: "mdi-clipboard-list-outline", to: "/cliente" },
      { title: "Veterinarios", icon: "mdi-graphql", to: "/veterinario" },
      { title: "Medicamentos", icon: "mdi-account-group-outline", to: "/form" },
      { title: "Procedimentos", icon: "mdi-account-group-outline", to: "/formlist" },
      { title: "Tipo Animal", icon: "mdi-account-group-outline", to: "/tipoanimal" },
      { title: "Animal", icon: "mdi-account-group-outline", to: "/animal" },

      

    ],
    mini: true
  })
};
</script>
