<template>
  <section class="hero is-small has-background-grey-light" style="box-shadow: 5px 10px grey">
    <div class="hero-body">
      <p class="title">
        DATA TEKNISI
      </p>
      <p class="subtitle">
        Berikut detail biodata teknisi berdasarkan id nya:
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="teknisi">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
            </div>
            <div class="media-content">
              <p class="title is-4">Biodata Teknisi</p>
              <p class="subtitle is-6">dengan ID {{id_teknisi}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>Nama Lengkap</dt>
              <dd><strong>{{teknisi.nama_lengkap}}</strong></dd>

              <dt>Alamat</dt>
              <dd><strong>{{teknisi.alamat}}</strong></dd>

              <dt>Nomor HP</dt>
              <dd><strong>{{teknisi.nomor_hp}} item</strong></dd>

              <dt>Tanggal Lahir</dt>
              <dd><strong>{{teknisi.tanggal_lahir}}</strong></dd>

              <dt>Lama Bekerja</dt>
              <dd><strong>{{teknisi.lama_bekerja}}</strong></dd>

              <dt>Jenis Kelamin</dt>
              <dd><strong>{{teknisi.jenis_kelamin.jenis}}</strong></dd>

            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/teknisi" class="button is-info">
                  <span class="icon is-small">
                    <i class="fas fa-arrow-left"></i>
                  </span>
                  <span>Kembali</span>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="container">
        <div class="notification is-danger">
          Maaf, teknisi dengan <strong>ID `{{id_teknisi}}` tidak ditemukan</strong>
        </div>
      </div>
    </div>
    <div class="has-text-centered" v-if="isLoading">
      <i class="fa-solid fa-spinner fa-pulse"></i>
    </div>
  </section>
</template>

<script>
export default {
  name: "TeknisiDetailView",
  data() {
    return {
      teknisi: null,
      id_teknisi: this.$route.params.id_teknisi,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/teknisi/get.php?id_teknisi=${this.id_teknisi}`,{
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
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
</style>