<template>
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="1024">
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props"> Cadastrar Produto </v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="text-h5">Cadastro Produto</span>
          </v-card-title>
          <v-card-text @submit.prevent="submitForm">
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="produto.name"
                    label="Nome do Produto*"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Descrição"
                    v-model="produto.description"
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Preço*"
                    v-model="produto.price"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Quantidade*"
                    v-model="produto.quantity"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12">
                  <v-autocomplete
                    :items="[
                      'Jogos',
                      'Livros',
                      'Filmes',
                      'Camisetas',
                      'Acessórios',
                      'Gadgets',
                    ]"
                    label="Categoria*"
                    v-model="produto.category"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="12">
                  <v-text-field
                    label="Imagem"
                    v-model="produto.image"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <button @click="dialog = false" class="btn btn-error">
              Cancelar
            </button>
            <button @click="submitForm" class="btn btn-accent">Cadastrar</button>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </template>


<script>
import api from "../api";
export default {
  name: "CadastroProduto",
  data() {
    return {
      dialog: false,
      produto: {
        name: "",
        description: "",
        prioe: "",
        quantity: "",
        category: "",
        image: "",
        manufacturer: "",
      },
    };
  },
  methods: {
    submitForm() {
      api
        .post("/product", this.produto, {
          headers: {
            Authorization: "Bearer " + localStorage.token,
          },
        })
        .then((response) => {
          this.dialog = false;
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
          alert("Erro ao cadastrar produto");
        });
    },
  },
};
</script>
