//var publicClients = [
  /*{id: 1, name: 'Laravel', description: 'Provide Laravel Information.', price: 100},
  {id: 2, name: 'AngularJS', description: 'Provide AngularJS Information.', price: 100},
  {id: 3, name: 'PHP', description: 'Provide PHP Information.', price: 100}*/
//];

publicClients: [];
            
function findPublicClient (id) {
  //return this.publicClients[findPublicClientKey(id)];
  return findPublicClientKey(id)[0];
};

function findPublicClientKey (id) {
  //console.log(id + "-" + this.publicClients.filter(key => key.id === id));
  return this.publicClients.filter( key => key.id === id );
  /*
  for (var key = 0; key < this.publicClients.length; key++) {
    if (this.publicClients[key].id === id) {
      return key;
    }
  }
  */
};

var PublicClientService = {

  api_path: 'http://localhost:8080/api/manager/client/public/',

  findAll(fn) {
    axios
      .get(this.api_path, {
          'headers': {
            "Content-type": "application/json"
          }
      })
      .then(response => fn(response))
      .catch(error => console.log(error));
  },

  findById(id, fn) {
    axios
      .get(this.api_path + id)
      .then(response => fn(response))
      .catch(error => console.log(error));
  },

  create(publicClient, fn) {
    axios
      .post(this.api_path, publicClient)
      .then(response => fn(response))
      .catch(error => console.log(error));
  },

  update(id, publicClient, fn) {
    axios
      .put(this.api_path + id, publicClient)
      .then(response => fn(response))
      .catch(error => console.log(error));
  },

  delete(id, fn) {
    axios
      .delete(this.api_path + id)
      .then(response => fn(response))
      .catch(error => console.log(error));
  },

};

var publicClientList = Vue.extend({
  template: '#public-client-list',
  data: function () {
    return {publicClients: [], searchKey: ''};
  },
  computed: {
    filteredPublicClients() {
      return this.publicClients.filter((publicClient) => {
      	return publicClient.publicName.indexOf(this.searchKey) > -1
      	  || publicClient.primaryContact.indexOf(this.searchKey) > -1
      	  || publicClient.primaryEmail.indexOf(this.searchKey) > -1
      	  || publicClient.publicFantasyName.toString().indexOf(this.searchKey) > -1;
      });
    }
  },
  mounted() {
    PublicClientService.findAll(r => {this.publicClients = r.data; publicClients = r.data})
  }
});

var publicClientView = Vue.extend({
  template: '#public-client-view',
  data: function () {
    return {publicClient: findPublicClient(this.$route.params.publicClient_id)};
  }
});

var publicClientEdit = Vue.extend({
  template: '#public-client-edit',
  data: function () {
    return {publicClient: findPublicClient(this.$route.params.publicClient_id)};
  },
  methods: {
    updatePublicClient: function () {
      PublicClientService.update(this.publicClient.id, this.publicClient, r => router.push('/'));
    }
  }
});

var publicClientDelete = Vue.extend({
  template: '#public-client-delete',
  data: function () {
    return {publicClient: findPublicClient(this.$route.params.publicClient_id)};
  },
  methods: {
    deletePublicClient: function () {
      PublicClientService.delete(this.publicClient.id, r => router.push('/'));
    }
  }
});

var publicClientAdd = Vue.extend({
  template: '#public-client-add',
  data: function () {
    return {
      publicClient: {
        publicName: '',
        publicFantasyName: '',
        addressDelivery: '',
        addressBilling: '',
        primaryContact: '',
        primaryEmail: '',
        primaryPhoneNumber: '',
        primarySupportContact: '',
        observations: '',
        status: false
      }
    }
  },
  methods: {
    createPublicClient() {
      PublicClientService.create(this.publicClient, r => router.push('/'));
    }
  }
});

var router = new VueRouter({
  routes: [
    {path: '/', component: publicClientList},
    {path: '/public-client/view/:publicClient_id', component: publicClientView, name: 'public-client-view'},
    {path: '/public-client/add', component: publicClientAdd, name: 'public-client-add'},
    {path: '/public-client/edit/:publicClient_id', component: publicClientEdit, name: 'public-client-edit'},
    {path: '/public-client/delete/:publicClient_id', component: publicClientDelete, name: 'public-client-delete'}
  ]
});

new Vue({
  el: '#app',
  data: {
    company: "Oficina Santa Cruz",
    title: "Public Client Managment",
    subtitle: "" 
  },
  router: router
});