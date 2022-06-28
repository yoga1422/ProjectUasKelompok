<template>
  <section class="isi">
    <section class="hero is-small">
      <div class="judul">
        <p class="title has-text-white">
          Service
        </p>
        <p class="subtitle has-text-white">
          Berikut Adalah Service Yang Bisa Anda dapatkan Di Bengkel Kami:
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
            <th>Kode</th>
            <th>Nama Service</th>
            <th>Garansi</th>
            <th>Harga Service</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="service.length" v-for="(value, index) in service">
            <td>{{index + 1}}</td>
            <td>{{value.kode}}</td>
            <td>{{value.nama_service}}</td>
            <td>{{value.garansi}}</td>
            <td>{{value.harga_service}}</td>
            <td>{{value.keterangan}}</td>
            <td>{{value.supplier.nama_supplier}}</td>
            <td>{{value.created_at}}</td>
            <td>
              <div class="field has-addons">
                <p class="control">
                  <RouterLink class="button is-success" :to="{ name: 'service-detail', params: { kode:  value.kode}}">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-right"></i>
                  </span>
                    <span>Detail</span>
                  </RouterLink>
                </p>
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
            <li>KODE <strong>{{service[selectedIndex].kode}}</strong></li>
            <li>NAMA SERVICE <strong>{{service[selectedIndex].nama_service}}</strong></li>
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
              <label class="label" for="nama_service_update">Nama Service</label>
              <div class="control">
                <input class="input" type="text" id="nama_service_update" placeholder="Nama Service" required v-model="formEdit.nama_service">
              </div>
            </div>
            <div class="field">
              <label class="label" for="garansi_update">Garansi</label>
              <div class="control">
                <input class="input" type="text" id="garansi_update" placeholder="Garansi" required v-model="formEdit.garansi">
              </div>
            </div>
            <div class="field">
              <label class="label" for="keterangan_update">Keterangan</label>
              <div class="control">
                <input class="input" type="text" id="keterangan_update" placeholder="Keterangan" required v-model="formEdit.keterangan">
              </div>
            </div>
            <div class="field">
              <label class="label" for="supplier_update">Supplier</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="supplier_update" id="supplier_update" v-model="formEdit.supplier">
                    <option v-for="val in supplier" :value="val.id">{{val.nama_supplier}}</option>
                  </select>
                </div>
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
            <label class="label" for="kode_insert">Kode Service</label>
            <div class="control">
              <input class="input" type="number" id="kode_insert" placeholder="Kode Service" required v-model="formAdd.kode">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_service_insert">Nama Service</label>
            <div class="control">
              <input class="input" type="text" id="nama_service_insert" placeholder="Nama Service" required v-model="formAdd.nama_service">
            </div>
          </div>
          <div class="field">
            <label class="label" for="garansi_insert">Garansi</label>
            <div class="control">
              <input class="input" type="text" id="garansi_insert" placeholder="Garansi" required v-model="formAdd.garansi">
            </div>
          </div>
          <div class="field">
            <label class="label" for="harga_service_insert">Harga Service</label>
            <div class="control">
              <input class="input" type="text" id="harga_service_insert" placeholder="Harga Service" required v-model="formAdd.harga_service">
            </div>
          </div>
          <div class="field">
            <label class="label" for="keterangan_insert">Keterangan</label>
            <div class="control">
              <input class="input" type="text" id="keterangan_insert" placeholder="Keterangan" required v-model="formAdd.keterangan">
            </div>
          </div>
          <div class="field">
            <label class="label" for="supplier_insert">Supplier</label>
            <div class="control">
              <div class="select is-primary">
                <select name="supplier_insert" id="supplier_insert" v-model="formAdd.supplier">
                  <option v-for="val in supplier" :value="val.id">{{val.nama_supplier}}</option>
                </select>
              </div>
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
  name: "ServiceListView",
  data(){
    return{
      service: [],
      supplier: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        kode: '',
        nama_service: '',
        garansi: '',
        harga_service: '',
        keterangan: '',
        supplier: '',
        nama_supplier: ''
      },
      formEdit: {
        kode: '',
        nama_service: '',
        garansi: '',
        harga_service: '',
        keterangan: '',
        supplier: '',
        nama_supplier: ''
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/service/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.service = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadSupplier(){
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
        const selectedData = this.service[this.selectedIndex];
        const payload = new URLSearchParams({
          'kode': selectedData.kode
        });
        fetch(`https://arcturusworkshop.000webhostapp.com/pages/service/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.service.splice(this.selectedIndex, 1);
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
          kode: this.formEdit.kode,
          nama_service: this.formEdit.nama_service,
          garansi: this.formEdit.garansi,
          harga_service: this.formEdit.harga_service,
          keterangan: this.formEdit.keterangan,
          supplier: this.formEdit.supplier
        });
        fetch(`https://arcturusworkshop.000webhostapp.com/pages/service/update.php`,{
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
              this.service[this.selectedIndex] = json.data;
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
      const selectedData = this.service[index];
      this.formEdit = {
        kode: selectedData.kode,
        nama_service: selectedData.nama_service,
        garansi: selectedData.garansi,
        harga_service: selectedData.harga_service,
        keterangan: selectedData.keterangan,
        supplier: selectedData.supplier
      }
      nextTick(()=>{
        document.getElementById('nama_service_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('kode_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        kode: this.formAdd.kode,
        nama_service: this.formAdd.nama_service,
        garansi: this.formAdd.garansi,
        harga_service: this.formAdd.harga_service,
        keterangan: this.formAdd.keterangan,
        supplier: this.formAdd.supplier
      });
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/service/update.php`,{
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
            this.service.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama_service = '';
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
        nama_service: '',
        garansi: '',
        harga_service: '',
        keterangan: '',
        supplier: ''
      }
    }
  },
  mounted() {
    this.load();
    this.loadSupplier();
  }
}
</script>

<style scoped>
</style>