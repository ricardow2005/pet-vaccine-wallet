<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista de Tipos de Enfermidade</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="newCliente()">Novo Tipo de Enfermidade</v-btn>
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
    //backend: 'https://petvaccinewallet.herokuapp.com',
    backend: "http://localhost:8000",

    headers: [
      {
        text: "id",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "nome", value: "nome" },

      { text: "Actions", value: "actions", sortable: false }
    ],
    items: [],
    editedItem: {
      id: "",
      nome: "",
    },
   
    
  }),

  mounted() {
    this.getData();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Tipo de Enfermidade" : "Editar Tipo de Enfermidade";
    }
  },

  methods: {
 
    deleteItem(item) {
      console.log(item);
      axios
        .delete(this.backend + "/tipoenfermidadedelete/", {
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
          .post(this.backend + "/tipoenfermidadecreate/", this.editedItem)
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
            this.backend + "/tipoenfermidadeupdate/" + this.editedItem.id + "/",
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
      this.dialog = true;
    },

    getData() {
      axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
      axios.get(this.backend + "/tipoenfermidade/").then(response => {
        console.log(response.data);
        this.items = response.data;
      });
    }
  }
};
</script>
