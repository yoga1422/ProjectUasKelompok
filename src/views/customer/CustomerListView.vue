<template>
  <section class="isi">
    <section class="hero is-small">
      <div class="judul">
        <p class="title has-text-white">
          Customer
        </p>
        <p class="subtitle has-text-white">
          Data Customer yang datang ke bengkel kami:
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
            <th>ID Customer</th>
            <th>Nama Lengkap</th>
            <th>Jenis Kelamin</th>
            <th>Teknisi</th>
            <th>Service</th>
            <th>Tanggal Service</th>
            <th>Created at</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-if="customer.length" v-for="(value, index) in customer">
            <td>{{index + 1}}</td>
            <td>{{value.id_customer}}</td>
            <td>{{value.nama_lengkap}}</td>
            <td>{{value.jenis_kelamin.jenis}}</td>
            <td>{{value.teknisi.nama_lengkap}}</td>
            <td>{{value.service.nama_service}}</td>
            <td>{{value.tanggal_service}}</td>
            <td>{{value.created_at}}</td>
            <td>
              <div class="field has-addons">
                <p class="control">
                  <RouterLink class="button is-success" :to="{ name: 'customer-detail', params: { id_customer:  value.id_customer}}">
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
            <li>ID CUSTOMER <strong>{{customer[selectedIndex].id_customer}}</strong></li>
            <li>NAMA LENGKAP <strong>{{customer[selectedIndex].nama_lengkap}}</strong></li>
            <li>service <strong>{{customer[selectedIndex].service}}</strong></li>
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
              <label class="label" for="nama_lengkap_update">Nama Lengkap</label>
              <div class="control">
                <input class="input" type="text" id="nama_lengkap_update" placeholder="Nama Lengkap" required v-model="formEdit.nama_lengkap">
              </div>
            </div>
            <div class="field">
              <label class="label" for="alamat_update">Alamat</label>
              <div class="control">
                <input class="input" type="text" id="alamat_update" placeholder="Alamat" required v-model="formEdit.alamat">
              </div>
            </div>
            <div class="field">
              <label class="label" for="nomor_hp_update">Nomor HP</label>
              <div class="control">
                <input class="input" type="number" id="nomor_hp_update" placeholder="Nomor HP" required v-model="formEdit.nomor_hp">
              </div>
            </div>
            <div class="field">
              <label class="label" for="tanggal_lahir_update">Tanggal Lahir</label>
              <div class="control">
                <input class="input" type="date" id="tanggal_lahir_update" placeholder="Tanggal Lahir" required v-model="formEdit.tanggal_lahir">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenis_kelamin_update">Jenis Kelamin</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="jenis_kelamin_update" id="jenis_kelamin_update" v-model="formEdit.jenis_kelamin">
                    <option v-for="val in jenis_kelamin" :value="val.id">{{val.jenis}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="teknisi_update">Teknisi</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="teknisi_update" id="teknisi_update" v-model="formEdit.teknisi">
                    <option v-for="val in teknisi" :value="val.id_teknisi">{{val.nama_lengkap}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="service_update">Service</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="service_update" id="service_update" v-model="formEdit.service">
                    <option v-for="val in service" :value="val.kode">{{val.nama_service}}</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="tanggal_service_update">Tanggal Service</label>
              <div class="control">
                <input class="input" type="date" id="tanggal_service_update" placeholder="Tanggal Service" required v-model="formEdit.tanggal_service">
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
      <section class="modal-card-body" style="background: #d8f2fb">
        <form @submit.prevent="addNew">
          <div class="field">
            <label class="label" for="id_customer_insert">ID Customer</label>
            <div class="control">
              <input class="input" type="number" id="id_customer_insert" placeholder="ID Customer" required v-model="formAdd.id_customer">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nama_lengkap_insert">Nama Lengkap</label>
            <div class="control">
              <input class="input" type="text" id="nama_lengkap_insert" placeholder="Nama Lengkap" required v-model="formAdd.nama_lengkap">
            </div>
          </div>
          <div class="field">
            <label class="label" for="alamat_insert">Alamat</label>
            <div class="control">
              <input class="input" type="text" id="alamat_insert" placeholder="Alamat" required v-model="formAdd.alamat">
            </div>
          </div>
          <div class="field">
            <label class="label" for="nomor_hp_insert">Nomor HP</label>
            <div class="control">
              <input class="input" type="number" id="nomor_hp_insert" placeholder="Nomor HP" required v-model="formAdd.nomor_hp">
            </div>
          </div>
          <div class="field">
            <label class="label" for="tanggal_lahir_insert">Tanggal Lahir</label>
            <div class="control">
              <input class="input" type="date" id="tanggal_lahir_insert" placeholder="Tanggal Lahir" required v-model="formAdd.tanggal_lahir">
            </div>
          </div>
          <div class="field">
            <label class="label" for="jenis_kelamin_insert">Jenis Kelamin</label>
            <div class="control">
              <div class="select is-primary">
                <select name="jenis_kelamin_insert" id="jenis_kelamin_insert" v-model="formAdd.jenis_kelamin">
                  <option v-for="val in jenis_kelamin" :value="val.id">{{val.jenis}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="teknisi_insert">Teknisi</label>
            <div class="control">
              <div class="select is-primary">
                <select name="teknisi_insert" id="teknisi_insert" v-model="formAdd.teknisi">
                  <option v-for="val in teknisi" :value="val.id_teknisi">{{val.nama_lengkap}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="service_insert">Service</label>
            <div class="control">
              <div class="select is-primary">
                <select name="service_insert" id="service_insert" v-model="formAdd.service">
                  <option v-for="val in service" :value="val.kode">{{val.nama_service}}</option>
                </select>
              </div>
            </div>
          </div>
          <div class="field">
            <label class="label" for="tanggal_service_insert">Tanggal Service</label>
            <div class="control">
              <input class="input" type="date" id="tanggal_service_insert" placeholder="Tanggal Service" required v-model="formAdd.tanggal_service">
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
  name: "CustomerListView",
  data(){
    return{
      customer: [],
      teknisi: [],
      service: [],
      jenis_kelamin: [],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id_customer: '',
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        tanggal_lahir: new Date().toISOString().slice(0, 10),
        jenis_kelamin: '',
        teknisi: '',
        service: '',
        tanggal_service: new Date().toISOString().slice(0, 10),
        kode: '',
        id_teknisi: '',
        nama_service: '',
      },
      formEdit: {
        id_customer: '',
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        tanggal_lahir: new Date().toISOString().slice(0, 10),
        jenis_kelamin: '',
        teknisi: '',
        service: '',
        tanggal_service: new Date().toISOString().slice(0, 10),
        kode: '',
        id_teknisi: '',
        nama_service: '',
      }
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/customer/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.customer = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadTeknisi(){
      this.isLoading = true;
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/teknisi/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.teknisi = json.data;
        })
        .catch(()=>{
          alert('Terjadi error')
        })
        .finally(()=>{
          this.isLoading = false;
        })
    },
    loadService(){
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
    loadJenis_Kelamin(){
      this.isLoading = true;
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/jenis_kelamin/index.php`,{
        method: 'GET',
      })
        .then(response => {
          if(response.ok){
            return response.json();
          }
        })
        .then(json => {
          this.jenis_kelamin = json.data;
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
        const selectedData = this.customer[this.selectedIndex];
        const payload = new URLSearchParams({
          'id_customer': selectedData.id_customer
        });
        fetch(`https://arcturusworkshop.000webhostapp.com/pages/customer/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.customer.splice(this.selectedIndex, 1);
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
          id_customer: this.formEdit.id_customer,
          nama_lengkap: this.formEdit.nama_lengkap,
          alamat: this.formEdit.alamat,
          nomor_hp: this.formEdit.nomor_hp,
          tanggal_lahir: this.formEdit.tanggal_lahir,
          jenis_kelamin: this.formEdit.jenis_kelamin,
          teknisi: this.formEdit.teknisi,
          service: this.formEdit.service,
          tanggal_service: this.formEdit.tanggal_service,
        });
        fetch(`https://arcturusworkshop.000webhostapp.com/pages/customer/update.php`,{
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
              this.customer[this.selectedIndex] = json.data;
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
      const selectedData = this.customer[index];
      this.formEdit = {
        id_customer: selectedData.id_customer,
        nama_lengkap: selectedData.nama_lengkap,
        alamat: selectedData.alamat,
        nomor_hp: selectedData.nomor_hp,
        tanggal_lahir: selectedData.tanggal_lahir,
        jenis_kelamin: selectedData.jenis_kelamin,
        teknisi: selectedData.teknisi,
        service: selectedData.service,
        tanggal_service: selectedData.tanggal_service,
      }
      nextTick(()=>{
        document.getElementById('nama_lengkap_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('id_customer_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id_customer: this.formAdd.id_customer,
        nama_lengkap: this.formAdd.nama_lengkap,
        alamat: this.formAdd.alamat,
        nomor_hp: this.formAdd.nomor_hp,
        tanggak_lahir: this.formAdd.tanggal_lahir,
        jenis_kelamin: this.formAdd.jenis_kelamin,
        teknisi: this.formAdd.teknisi,
        service: this.formAdd.service,
        tanggal_service: this.formAdd.tanggal_service,
      });
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/customer/create.php`,{
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
            this.customer.push(json.data);
          }
        })
        .catch( (e) =>{
          alert('Terjadi error'+e.toString())
        })
        .finally(()=>{
          this.formAdd.nama_lengkap = '';
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
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        tanggal_lahir: new Date().toISOString().slice(0, 10),
        jenis_kelamin: '',
        teknisi: '',
        service: '',
        tanggal_service: new Date().toISOString().slice(0, 10)
      }
    }
  },
  mounted() {
    this.load();
    this.loadTeknisi();
    this.loadService();
    this.loadJenis_Kelamin()
  }
}
</script>

<style scoped>
</style>