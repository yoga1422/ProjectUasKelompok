<template>
  <section class="hero is-small has-background-grey-light" style="box-shadow: 5px 10px grey">
    <div class="hero-body">
      <p class="title">
        Layanan Service
      </p>
      <p class="subtitle">
        Berikut detail Layanan Service Bengkel
      </p>
    </div>
  </section>
  <section class="content">
    <div v-if="service">
      <div class="card">
        <div class="card-content">
          <div class="media">
            <div class="media-left">
            </div>
            <div class="media-content">
              <p class="title is-4">Service</p>
              <p class="subtitle is-6">dengan Kode {{kode}}</p>
            </div>
          </div>
          <div class="content">
            <dl>
              <dt>Kode Service</dt>
              <dd><strong>{{service.kode}}</strong></dd>
              <dt>Nama Service</dt>
              <dd><strong>{{service.nama_service}}</strong></dd>

              <dt>Garansi</dt>
              <dd><strong>{{service.garansi}}</strong></dd>

              <dt>Harga Service</dt>
              <dd><strong>{{service.harga_service}}</strong></dd>

              <dt>Keterangan</dt>
              <dd><strong>{{service.keterangan}}</strong></dd>

              <dt>Supplier</dt>
              <dd><strong>{{service.supplier.nama_supplier}}</strong></dd>
            </dl>
            <hr>
            <div class="columns">
              <div class="column">
                <RouterLink to="/service" class="button is-info">
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
          Maaf, resepsionis dengan <strong>ID `{{id}}` tidak ditemukan</strong>
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
  name: "ServiceDetailView",
  data() {
    return {
      service: null,
      kode: this.$route.params.kode,
      isLoading: false
    }
  },
  methods:{
    load(){
      this.isLoading = true;
      fetch(`https://arcturusworkshop.000webhostapp.com/pages/service/get.php?kode=${this.kode}`,{
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
    }
  },
  mounted() {
    this.load();
  }
}
</script>

<style scoped>
</style>