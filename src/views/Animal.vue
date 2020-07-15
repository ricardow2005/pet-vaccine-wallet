<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista Animais</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="newCliente()">Novo Animal</v-btn>
    </v-toolbar>
    <v-row class="text-center">
      <v-col cols="12">
        <v-data-table :headers="headers" :items="items" :items-per-page="5" class="elevation-1">
          <template v-slot:item.actions="{ item }">
            <v-icon small class="mr-2" @click="editCliente(item)">mdi-pencil</v-icon>
            <v-icon title="Deletar" small @click="deleteItem(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="700px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="10">
                  <v-text-field label="Nome" v-model="editedItem.nome" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-select
                    v-model="editedItem.tipo_animal"
                    :items="tipoanimal"
                    item-value="id"
                    item-text="nome"
                    label="Tipo Animal"
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-select
                    v-model="editedItem.cliente"
                    :items="clientes"
                    item-value="id"
                    item-text="nome"
                    label="Responsavel"
                  ></v-select>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Peso" v-model="editedItem.peso" suffix="Kilos"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-menu
                    v-model="menu2"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                        v-model="dataformatada"
                        label="Data Nascimento"
                        readonly
                        v-bind="attrs"
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="editedItem.data_nascimento" @input="fechadata()"></v-date-picker>
                  </v-menu>
                </v-col>
              </v-row>
            </v-container>
            <small>Campos indicados com "*" são Obrigatórios</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="blue darken-1" text @click="saveCliente()">Salvar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";


export default {
  name: "HelloWorld",

  data: () => ({
    dialog: false,
    editedIndex: -1,
    backend: 'https://petvaccinewallet.herokuapp.com',
    //backend: "http://localhost:8000",

    headers: [
      {
        text: "id",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "nome", value: "nome" },
      { text: "peso", value: "peso" },
      { text: "data_nascimento", value: "data_nascimento" },
      { text: "nmtipoanimal", value: "nmtipoanimal" },
      { text: "nmcliente", value: "nmcliente" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    items: [],
    tipoanimal: [],
    clientes: [],

    menu2: false,
    dataformatada: null,

    editedItem: {
      id: "",
      nome: "",
      peso: "",
      data_nascimento: "",
      tipo_animal: "",
      nmtipoanimal: "",
      cliente: "",
      nmcliente: "",
      tipoanimal: "",
      nmcliente: ""
    },

  }),

  mounted() {
    this.getData();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Animal" : "Editar Animal";
    }
  },

  methods: {

    fechadata(){
      this.menu2 = false;
      this.dataformatada = this.formatDate(this.editedItem.data_nascimento);
    },

    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },

    deleteItem(item) {
      console.log(item);
      axios
        .delete(this.backend + "/animaldelete/", {
          data: { id: item.id }
        })
        .then(response => {
          alert("Eliminado com sucesso!");
          this.getData();
        })
        .catch(e => {
          console.error(e);
          alert("Erro ao Eliminar!");
        });
    },

    newCliente() {
      this.editedIndex = -1;

      this.dialog = true;
    },
    saveCliente() {
      if (this.editedIndex == -1) {
        //Novo

        axios
          .post(this.backend + "/animalcreate/", this.editedItem)
          .then(response => {
            this.getData();
            alert("Inserido com sucesso!");
            this.dialog = false;
          })
          .catch(e => {
            console.error(e);
            alert("Erro ao Inserir!");
            this.dialog = false;
          });
      } else {
        //update
        this.updateCliente();
      }
    },
    updateCliente() {
      
      axios
        .put(
          this.backend + "/animalupdate/" + this.editedItem.id + "/",
          this.editedItem
        )
        .then(response => {
          this.getData();
          this.dialog = false;
          alert("Atualizado com sucesso!");
        })
        .catch(e => {
          console.error(e);
          alert("Erro ao atualizar!");
        });
    },

    editCliente(item) {
      this.editedIndex = this.items.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dataformatada = this.editedItem.data_nascimento;
      this.dataformatada = this.formatDate(this.dataformatada);
      this.dialog = true;
    },

    getData() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios.get(this.backend + "/animal/").then(response => {
        console.log(response.data);
        this.items = response.data;
      });

      axios.get(this.backend + "/tipoanimal/").then(response => {
        console.log(response.data);
        this.tipoanimal = response.data;
      });

      axios.get(this.backend + "/cliente/").then(response => {
        console.log(response.data);
        this.clientes = response.data;
      });
    }
  }
};
</script>
