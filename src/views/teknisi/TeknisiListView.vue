<template>
  <section class="isi">
    <section class="hero is-small">
      <div class="judul">
        <p class="title has-text-white">
          Teknisi
        </p>
        <p class="subtitle has-text-white">
          Berikut Adalah Daftar Nama Teknisi Berpengalaman Yang Bekerja Di Bengkel Kami:
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
            <th>ID Teknisi</th>
            <th>Nama Lengkap</th>
            <th>Alamat</th>
            <th>Lama Bekerja</th>
            <th>Jenis Kelamin</th>
            <th>Created at</th>
            <th>Action</th>

          </tr>
          </thead>
          <tbody>
          <tr v-if="teknisi.length" v-for="(value, index) in teknisi">
            <td>{{index + 1}}</td>
            <td>{{value.id_teknisi}}</td>
            <td>{{value.nama_lengkap}}</td>
            <td>{{value.alamat}}</td>
            <td>{{value.lama_bekerja}}</td>
            <td>{{value.jenis_kelamin.jenis}}</td>
            <td>{{value.created_at}}</td>
            <td>
              <div class="field has-addons">
                <p class="control">
                  <RouterLink class="button is-success" :to="{ name: 'teknisi-detail', params: { id_teknisi:  value.id_teknisi}}">
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
            <li>ID TEKNISI <strong>{{teknisi[selectedIndex].id_teknisi}}</strong></li>
            <li>NAMA LENGKAP <strong>{{teknisi[selectedIndex].nama_lengkap}}</strong></li>
            <li>LAMA BEKERJA <strong>{{teknisi[selectedIndex].lama_bekerja}}</strong></li>
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
              <label class="label" for="lama_bekerja_update">Lama Bekerja</label>
              <div class="control">
                <input class="input" type="text" id="lama_bekerja_update" placeholder="Lama Bekerja" required v-model="formEdit.lama_bekerja">
              </div>
            </div>
            <div class="field">
              <label class="label" for="jenis_kelamin_update">Jenis Kelamin</label>
              <div class="control">
                <div class="select is-primary">
                  <select name="jenis_kelamin_insert" id="jenis_kelamin_update" v-model="formEdit.jenis_kelamin">
                    <option v-for="val in jenis_kelamin" :value="val.id">{{val.jenis}}</option>
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
            <label class="label" for="lama_bekerja_insert">Lama Bekerja</label>
            <div class="control">
              <input class="input" type="text" id="lama_bekerja_insert" placeholder="Lama Bekerja" required v-model="formAdd.lama_bekerja">
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
  name: "TeknisiListView",
  data(){
    return{
      teknisi: [],
      jenis_kelamin:[],
      selectedIndex: -1,
      isLoading: false,
      formAdd: {
        id_teknisi: '',
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        tanggal_lahir: '',
        lama_bekerja: '',
        jenis_kelamin: '',
        jenis: '',
      },
      formEdit: {
        id_teknisi: '',
        nama_lengkap: '',
        alamat: '',
        nomor_hp: '',
        tanggal_lahir: '',
        lama_bekerja: '',
        jenis_kelamin: '',
        jenis: '',
      }
    }
  },
  methods:{
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
        const selectedData = this.teknisi[this.selectedIndex];
        const payload = new URLSearchParams({
          'id_teknisi': selectedData.id_teknisi
        });
        fetch(`https://arcturusworkshop.000webhostapp.com/pages/teknisi/delete.php`,{
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: payload.toString(),
        })
          .then(response => {
            if(response.ok){
              this.teknisi.splice(this.selectedIndex, 1);
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
          id_teknisi: this.formEdit.id_teknisi,
          nama_lengkap: this.formEdit.nama_lengkap,
          alamat: this.formEdit.alamat,
          nomor_hp: this.formEdit.nomor_hp,
          tanggal_lahir: this.formEdit.tanggal_lahir,
          lama_bekerja: this.formEdit.lama_bekerja,
          jenis_kelamin: this.formEdit.jenis_kelamin
        });
        fetch(`https://arcturusworkshop.000webhostapp.com/pages/teknisi/update.php`,{
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
              this.teknisi[this.selectedIndex] = json.data;
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
      const selectedData = this.teknisi[index];
      this.formEdit = {
        id_teknisi: selectedData.id_teknisi,
        nama_lengkap: selectedData.nama_lengkap,
        alamat: selectedData.alamat,
        nomor_hp: selectedData.nomor_hp,
        tanggal_lahir: selectedData.tanggal_lahir,
        lama_bekerja: selectedData.lama_bekerja,
        jenis_kelamin: selectedData.jenis_kelamin,
      }
      nextTick(()=>{
        document.getElementById('nama_lengkap_update').focus();
      })
    },
    showAdd(){
      this.resetFormAdd();
      this.showModal('modal-add');
      nextTick(()=>{
        document.getElementById('id_teknisi_insert').focus();
      })
    },
    addNew(){
      this.closeModal('modal-add');
      const payload = new URLSearchParams({
        id_teknisi: this.formAdd.id_teknisi,
        nama_lengkap: this.formAdd.nama_lengkap,
        alamat: this.formAdd.alamat,
        nomor_hp: this.formAdd.nomor_hp,
        tanggal_lahir: this.formAdd.tanggal_lahir,
        lama_bekerja: this.formAdd.lama_bekerja,
        jenis_kelamin: this.formAdd.jenis_kelamin,
      });
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/teknisi/create.php`,{
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
            this.teknisi.push(json.data);
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
        tanggal_lahir: '',
        lama_bekerja: '',
        jenis_kelamin: '',
      }
    }
  },
  mounted() {
    this.loadTeknisi();
    this.loadJenis_Kelamin()
  }
}
</script>

<style scoped>
</style>