// Komponenta za unos kontakta
Vue.component('contact-form', {
    data() {
        return {
            ime: '',
            brojTelefona: ''
        };
    },
    methods: {
        dodajKontakt() {
            if (this.ime && this.brojTelefona) {
                this.$emit('new-contact', {
                    ime: this.ime,
                    brojTelefona: this.brojTelefona
                });
                this.ime = '';
                this.brojTelefona = '';
            }
        }
    },
    template: `
        <div>
            <input v-model="ime" placeholder="Unesite ime" />
            <input v-model="brojTelefona" placeholder="Unesite broj telefona" />
            <button @click="dodajKontakt">Dodaj</button>
        </div>
    `
});

// Komponenta za prikaz liste kontakata
Vue.component('contact-list', {
    props: ['contacts'],
    methods: {
        obrisiKontakt(index) {
            this.$emit('delete-contact', index);
        }
    },
    template: `
        <ul>
            <li v-for="(kontakt, index) in contacts" :key="index">
                {{ kontakt.ime }} - {{ kontakt.brojTelefona }}
                <button @click="obrisiKontakt(index)">Obriši</button>
            </li>
        </ul>
    `
});

new Vue({
    el: '#app',
    data: {
        naslov: 'Telefonski Imenik',
        imenik: []
    },
    mounted() {
        // Učitaj kontakte iz lokalnog skladišta prilikom pokretanja aplikacije
        const sacuvaniKontakti = localStorage.getItem('imenik');
        if (sacuvaniKontakti) {
            this.imenik = JSON.parse(sacuvaniKontakti);
        }
    },
    methods: {
        dodajKontakt(noviKontakt) {
            this.imenik.push(noviKontakt);

            // Sačuvaj kontakte u lokalnom skladištu
            localStorage.setItem('imenik', JSON.stringify(this.imenik));
        },
        obrisiKontakt(index) {
            this.imenik.splice(index, 1);

            // Sačuvaj promenjeni imenik u lokalnom skladištu
            localStorage.setItem('imenik', JSON.stringify(this.imenik));
        }
    }
});