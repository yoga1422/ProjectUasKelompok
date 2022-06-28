<template>
  <section class="isi">
    <section class="hero is-small">
      <div class="judul">
        <p class="title has-text-white">
          Supplier
        </p>
        <p class="subtitle has-text-white">
          Berikut Adalah Supplier dari bengkel kami:
        </p>
      </div>
    </section>
    <section class="content">
      <div class="container">
        <button class="button is-link" @click="showAdd">
        <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                  </span>
          <span>Data baru</span>
        </button>
        <table class="table has-background-success-light">
          <thead>
          <tr>
            <th>#</th>
            <th>ID</th>
            <th>Nama Supplier</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="supplier.length" v-for="(value, index) in supplier">
            <td>{{index + 1}}</td>
            <td>{{value.id}}</td>
            <td>{{value.nama_supplier}}</td>
            <td>{{value.created_at}}</td>
            <td>
              <div class="field has-addons">
                <p class="control">
                  <button class="button is-warning" @click="showUpdate(index)">
                  <span class="icon is-small">
                    <i class="fas fa-pencil"></i>
                  </span>
                    <span>Edit</span>
                  </button>
                </p>
                <p class="control">
                  <button class="button is-danger" @click="showDelete(index)">
                  <span class="icon is-small">
                    <i class="fas fa-trash"></i>
                  </span>
                    <span>Delete</span>
                  </button>
                </p>
              </div>
            </td>
          </tr>
          <tr v-else>
            <td colspan="9">
              <div class="notification is-warning">
                Tidak ada data
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="has-text-centered" v-if="isLoading">
        <i class="fa-solid fa-spinner fa-pulse"></i>
      </div>
    </section>
  </section>
  <div class="modal" id="modal-delete">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Confirm Delete</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex > -1">
          <ul>
            <li>ID <strong>{{supplier[selectedIndex].id}}</strong></li>
            <li>NAMA SUPPLIER <strong>{{supplier[selectedIndex].nama_supplier}}</strong></li>
          </ul>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="remove">Delete</button>
        <button class="button" @click="closeModal('modal-delete')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-update">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Form Update</p>
      </header>
      <section class="modal-card-body">
        <div v-if="selectedIndex >= 0">
          <form @submit.prevent="update">
            <div class="field">
              <label class="label" for="nama_supplier_update">Nama Supplier</label>
              <div class="control">
                <input class="input" type="text" id="nama_supplier_update" placeholder="Nama Supplier" required v-model="formEdit.nama_supplier">
              </div>
            </div>
          </form>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="update">Update</button>
        <button class="button" @click="closeModal('modal-update')">Close</button>
      </footer>
    </div>
  </div>
  <div class="modal" id="modal-add">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Add new</p>
      </header>
      <section class="modal-card-body">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="id_insert">ID Supplier</label>
            <div class="control">
              <input class="input" type="number" id="id_insert" placeholder="ID Supplier" required v-model="formAdd.id">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_supplier_insert">Nama Supplier</label>
            <div class="control">
              <input class="input" type="text" id="nama_supplier_insert" placeholder="Nama Supplier" required v-model="formAdd.nama_supplier">
            </div>
          </div>
        </form>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="addNew">Save</button>
        <button class="button" @click="closeModal('modal-add')">Close</button>
      </footer>
    </div>
  </div>
</template>

<script>
import {nextTick} from "vue";
export default {
  name: "SupplierListView",
  data(){
    return{
      supplier: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id: '',
        nama_supplier: '',
      },
      formEdit: {
        id: '',
        nama_supplier: '',
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/supplier/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.supplier = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    remove(){
      this.closeModal('modal-delete');
      if(this.selectedIndex >= 0){
        const selectedData = this.supplier[this.selectedIndex];
        const payload = new URLSearchParams({
          'id': selectedData.id
        });
        fetch(`https://arcturusworkshop.000webhostapp.com/pages/supplier/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.supplier.splice(this.selectedIndex, 1);
            }
            return response.json();
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }
          })
          .catch(()=>{
            alert('Terjadi error')
          })
      }
      this.selectedIndex = -1;
    },
    update(){
      this.closeModal('modal-update');
      if(this.selectedIndex >= 0){
        const payload = new URLSearchParams({
          id: this.formEdit.id,
          nama_supplier: this.formEdit.nama_supplier,
        });
        fetch(`https://arcturusworkshop.000webhostapp.com/pages/supplier/update.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            return response.json()
          })
          .then(json =>{
            if(!json.status){
              alert(json.error);
            }else{
              /*
              Update data pada kolom yg diupdate
               */
              this.supplier[this.selectedIndex] = json.data;
            }
          })
          .catch( (e) =>{
            alert('Terjadi error'+e.toString())
          })
          .finally(()=>{
            this.selectedIndex = -1;
          })
      }
    },
    showDelete(index){
      this.showModal('modal-delete');
      this.selectedIndex = index;
    },
    showUpdate(index){
      this.showModal('modal-update');
      this.selectedIndex = index;
      const selectedData = this.supplier[index];
      this.formEdit = {
        id: selectedData.id,
        nama_supplier: selectedData.nama_supplier,
      }
      nextTick(()=>{
        document.getElementById('nama_supplier_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('id_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id: this.formAdd.id,
        nama_supplier: this.formAdd.nama_supplier,
      });
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/supplier/create.php`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload.toString(),
      })
        .then(response => {
          return response.json()
        })
        .then(json =>{
          if(!json.status){
            alert(json.error);
          }else{
            this.supplier.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama_supplier = '';
        })
    },
    showModal(id){
      document.getElementById(id).classList.add('is-active');
    },
    closeModal(id){
      document.getElementById(id).classList.remove('is-active');
    },
    resetFormAdd(){
      this.formAdd = {
        nama_supplier: '',
      }
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
</style>