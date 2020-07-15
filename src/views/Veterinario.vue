<template>
  <v-container>
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista de Veterinarios</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" @click="newCliente()">Novo veterinario</v-btn>
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
                  <v-text-field label="CPF*" v-model="editedItem.cpf" required></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field label="Email" :rules="emailRules"  :error="errorEmail" :error-messages="errorEmailMessage"  v-model="editedItem.email"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Endereço*" v-model="editedItem.endereco" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Cidade*" v-model="editedItem.cidade" required></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Bairro*" v-model="editedItem.bairro" required></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col cols="12" md="6">
                  <v-text-field label="Telefone1" v-model="editedItem.telefone1"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Telefone2" v-model="editedItem.telefone2"></v-text-field>
                </v-col>
                <v-col cols="12" md="6">
                  <v-text-field label="Telefone Emergencial" v-model="editedItem.telefone_emergencia"></v-text-field>
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
      { text: "telefone1", value: "telefone1" },
      { text: "telefone2", value: "telefone2" },
      { text: "Tel.Emergencia", value: "telefone_emergencia"},
      { text: "email", value: "email" },
      { text: "Actions", value: "actions", sortable: false }
    ],
    items: [],
    editedItem: {
      id: "",
      nome: "",
      cpf: "",
      endereco: "",
      cidade: "",
      bairro: "",
      telefone1: "",
      telefone2: "",
      telefone_emergencia: "",
      email: ""
    },
    emailRules: [
      v => !!v || "Informe um E-Mail",
      v => /.+@.+/.test(v) || "Informe um E-Mail"
    ],
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    errorEmail: false,
    errorEmailMessage: '',
    
  }),

  mounted() {
    this.getData();
  },

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Cliente" : "Editar Cliente";
    }
  },

  methods: {
    isEmailValid: function(email) {
      return email == "" ? "" : this.reg.test(email) ? "success" : "error";
    },

    deleteItem(item) {
      console.log(item);
      axios
        .delete(this.backend + "/veterinariodelete/", {
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

        console.log(this.isEmailValid(this.editedItem.email));

        axios
          .post(this.backend + "/veterinariocreate/", this.editedItem)
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
      console.log(this.isEmailValid(this.editedItem.email));
    /*  if (this.isEmailValid(this.editedItem.email) == "error") {
        this.errorEmail = true;
        this.errorEmailMessage = "Informe um E-mail valido"
      } else {}*/

        axios
          .put(
            this.backend + "/veterinarioupdate/" + this.editedItem.id + "/",
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
      axios.get(this.backend + "/veterinario/").then(response => {
        console.log(response.data);
        this.items = response.data;
      });
    }
  }
};
</script>
