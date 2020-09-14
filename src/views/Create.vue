<template>
  <Container :slim="true">
    <!-- <div class="px-4 px-md-0 mb-3">
      <router-link :to="{ name: 'home' }" class="text-gray">
        <Icon name="back" size="22" class="v-align-middle" />
        {{ namespace.name || _shorten(namespace.token) }}
      </router-link>
    </div> -->
    <div>
      <div class="col-12 col-lg-8 float-left pr-0 pr-lg-5">
        <div class="px-4 px-md-0">
          <div class="d-flex flex-column mb-6">
            <input
              v-autofocus
              v-model="form.name"
              maxlength="128"
              class="mb-md-5 px-md-3 input"
              placeholder="Name of DApp"
            />
            <textarea-autosize
              v-model="form.description"
              maxlength="10240"
              class="mb-md-5 px-md-3 py-md-3 input text-area"
              placeholder="Description of dapp"
            />
            <input
              v-autofocus
              type="url"
              v-model="form.url"
              maxlength="128"
              class=" mb-md-5 px-md-3 input"
              placeholder="URL of DApp"
            />
            <CustomSelect
              v-autofocus
              v-model="form.category"
              maxlength="128"
              class="mb-md-5"
              :options="['DeFi', 'Games & Collectibles', 'Marketplace', 'VR', 'NFT', 'Social Media', 'Other']"
              :placeholder="'Category DApp'" />
            <CustomSelect
              v-autofocus
              v-model="form.builtOn"
              maxlength="128"
              class="mb-md-5"
              :options="['Ethereum', 'EOS', 'Marketplace', 'NEO', 'Tron', 'Telos']"
              :placeholder="'Built on'" />
            <CustomSelect
              v-autofocus
              v-model="form.stage"
              maxlength="128"
              class="mb-md-5"
              :options="['Testnet', 'Alpha', 'Beta', 'Mainnet']"
              :placeholder="'Stage'" />
            <input
              v-autofocus
              type="text"
              v-model="form.contract"
              maxlength="128"
              class=" mb-md-5 px-md-3 input"
              placeholder="Contract addresses"
            />
            <input
              v-autofocus
              type="url"
              v-model="form.avatar"
              maxlength="128"
              class=" mb-md-5 px-md-3 input"
              placeholder="Avatar link"
            />
          </div>
        </div>
        <!-- <Block title="Choices">
          <div v-if="form.choices.length > 0" class="overflow-hidden mb-2">
            <div
              v-for="(choice, i) in form.choices"
              :key="i"
              class="d-flex mb-2"
            >
              <UiButton class="d-flex width-full">
                <span class="mr-4">{{ i + 1 }}</span>
                <input
                  v-model="form.choices[i]"
                  class="input height-full flex-auto text-center"
                />
                <span @click="removeChoice(i)" class="ml-4">
                  <Icon name="close" size="12" />
                </span>
              </UiButton>
            </div>
          </div>
          <UiButton @click="addChoice" class="d-block width-full">
            Add choice
          </UiButton>
        </Block> -->
      </div>
      <div class="col-12 col-lg-4 float-left">
        <Block title="Actions">
          <!-- <div class="mb-2">
            <UiButton
              @click="[(modalOpen = true), (selectedDate = 'start')]"
              class="width-full mb-2"
            >
              <span v-if="!form.start">Select start date</span>
              <span v-else v-text="$d(form.start * 1e3, 'long')" />
            </UiButton>
            <UiButton
              @click="[(modalOpen = true), (selectedDate = 'end')]"
              class="width-full mb-2"
            >
              <span v-if="!form.end">Select end date</span>
              <span v-else v-text="$d(form.end * 1e3, 'long')" />
            </UiButton>
            <UiButton class="width-full mb-2">
              <input
                v-model="form.snapshot"
                type="number"
                class="input width-full text-center"
                placeholder="Snapshot block number"
              />
            </UiButton>
          </div> -->
          <UiButton
            @click="handleSubmit"
            :disabled="!isValid"
            :loading="loading"
            class="d-block width-full button--submit"
          >
            Publish
          </UiButton>
        </Block>
      </div>
    </div>
    <!-- <ModalSelectDate
      :value="form[selectedDate]"
      :selectedDate="selectedDate"
      :open="modalOpen"
      @close="modalOpen = false"
      @input="setDate"
    /> -->
  </Container>
</template>

<script>
import { mapActions } from 'vuex';
import moment from 'moment';
import CustomSelect from '../components/Ui/CustomSelect.vue'

export default {
  data() {
    return {
      // key: this.$route.params.key,
      loading: false,
      form: {
        name: '',
        url: '',
        category: '',
        builtOn: '',
        stage: '',
        description: '',
        contract:'',
        avatar: '',
        start: '',
        end: '',
        snapshot: '',
        metadata: {}
      },
      modalOpen: false,
      selectedDate: ''
    };
  },
  components: {
    CustomSelect
  },
  computed: {
    // namespace() {
    //   return namespaces[this.key]
    //     ? namespaces[this.key]
    //     : { token: this.key, verified: [] };
    // },
    isValid() {
      return true;
      // const ts = (Date.now() / 1e3).toFixed();
      // return (
      //   !this.loading &&
      //   this.web3.account &&
      //   this.form.name &&
      //   this.form.body &&
      //   this.form.start &&
      //   // this.form.start >= ts &&
      //   this.form.end &&
      //   this.form.end > this.form.start &&
      //   this.form.choices.length >= 2 &&
      //   this.form.choices.reduce((a, b) => (!a ? false : b), true)
      // );
    }
  },
  methods: {
    ...mapActions(['send']),
    async handleSubmit() {
      this.loading = true;
      this.form.start = moment()
        .add(1, 'weeks')
        .startOf('isoWeek')
        .unix();

      this.form.end = moment()
        .add(1, 'weeks')
        .endOf('isoWeek')
        .unix();

      try {
        const { ipfsHash } = await this.send({
          type: 'proposal',
          payload: this.form
        });
        this.$router.push({
          name: 'dapp',
          params: {
            id: ipfsHash
          }
        });
      } catch (e) {
        console.error(e);
        this.loading = false;
      }
    }
  }
};
</script>

<style>
  
</style>
