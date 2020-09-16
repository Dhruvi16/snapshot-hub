<template>
  <Container :slim="true">
    <!-- <div class="px-4 px-md-0 mb-3">
      <router-link :to="{ name: 'home' }" class="text-gray">
        <Icon name="back" size="22" class="v-align-middle" />
        {{ namespace.name || _shorten(namespace.token) }}
      </router-link>
    </div> -->
    <div>
      <div class="col-12 col-lg-8 float-left pr-0 pr-lg-5 pt-8">
        <div class="px-4 px-md-0">
          <div class="d-flex flex-column mb-6">
            <input
              v-autofocus
              v-model="$v.form.name.$model"
              class="px-md-3 input"
              placeholder="Name of DApp"
            />
            <div v-if="errors">
              <p class="error" v-if="!$v.form.name.required">DApp name is required.</p>
            </div>
            <textarea-autosize
              v-model="$v.form.description.$model"
              maxlength="10240"
              class="mt-md-5 px-md-3 py-md-3 input text-area"
              placeholder="Description of dapp"
            />
            <div v-if="errors">
              <p class="error" v-if="!$v.form.description.required">DApp description is required.</p>
            </div>
            <input
              v-autofocus
              type="url"
              v-model="$v.form.url.$model"
              maxlength="128"
              class=" mt-md-5 px-md-3 input"
              placeholder="URL of DApp"
            />
            <div v-if="errors">
              <p class="error" v-if="!$v.form.url.required">URL of the DApp is required.</p>
              <p class="error" v-if="!$v.form.url.url">Please enter an appropriate URL.</p>
            </div>
            <CustomSelect
              v-autofocus
              v-model="$v.form.category.$model"
              maxlength="128"
              class="mt-md-5"
              :options="['DeFi', 'Games & Collectibles', 'Marketplace', 'VR', 'NFT', 'Social Media', 'Other']"
              :placeholder="'Category DApp'" />
            <div v-if="errors">
              <p class="error" v-if="!$v.form.category.required">DApp category is required.</p>
            </div>
            <CustomSelect
              v-autofocus
              v-model="$v.form.builtOn.$model"
              maxlength="128"
              class="mt-md-5"
              :options="['Ethereum', 'EOS', 'Marketplace', 'NEO', 'Tron', 'Telos']"
              :placeholder="'Built on'" />
            <div v-if="errors">
              <p class="error" v-if="!$v.form.builtOn.required">The technology on which DApp is built is required.</p>
            </div>
            <CustomSelect
              v-autofocus
              v-model="$v.form.stage.$model"
              maxlength="128"
              class="mt-md-5"
              :options="['Testnet', 'Alpha', 'Beta', 'Mainnet']"
              :placeholder="'Stage'" />
            <div v-if="errors">
              <p class="error" v-if="!$v.form.stage.required">DApp stage is required.</p>
            </div>
            <input
              v-autofocus
              type="text"
              v-model="$v.form.contract.$model"
              maxlength="128"
              class=" mt-md-5 px-md-3 input"
              placeholder="Contract addresses"
            />
            <div v-if="errors">
              <p class="error" v-if="!$v.form.contract.required">DApp contract addresses is required.</p>
            </div>
            <CustomUpload v-model="$v.form.avatar.$model" class="mt-md-5" />
            <div v-if="errors">
              <p class="error" v-if="!$v.form.avatar.required">DApp avatar is required.</p>
            </div>
            <p v-if="errors" class="error">The form above has errors,
            <br>please get your act together and resubmit
            </p>
            <p v-else-if="empty && uiState === 'submit clicked'" class="error">The form above is empty,
              <br>cmon y'all you can't submit an empty form!
            </p>
            <p v-else-if="uiState === 'form submitted'" class="success">Hooray! Your form was submitted!</p>
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
      <div class="col-12 col-lg-4 float-left pt-8">
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
            @click="submit"
            :loading="loading"
            class="d-block width-full button--submit">
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
import CustomSelect from '../components/Ui/CustomSelect.vue';
import CustomUpload from '../components/Ui/CustomUpload.vue';
import { required, maxLength, url } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      // key: this.$route.params.key,
      uiState: "submit not clicked",
      errors: false,
      empty: true,
      loading: false,
      form: {
        name: null,
        url: null,
        category: null,
        builtOn: null,
        stage: null,
        description: null,
        contract: null,
        avatar: null,
        start: '',
        end: '',
        snapshot: '',
        metadata: {}
      },
      submitStatus: null,
      modalOpen: false,
      selectedDate: ''
    };
  },
  validations: {
    form: {
      name: {
        required,
        maxLength: maxLength(128)
      },
      url: {
        required,
        url
      },
      category: {
        required
      },
      builtOn: {
        required
      },
      stage: {
        required
      },
      description: {
        required
      },
      contract: {
        required
      },
      avatar: {
        required
      }
    }
  },
  components: {
    CustomSelect,
    CustomUpload
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
    submit() {
      this.empty = !this.$v.form.$anyDirty;
      this.errors = this.$v.form.$anyError;
      this.uiState = "submit clicked";
      if (this.errors === false && this.empty === false) {
        //this is where you send the responses
        this.uiState = "form submitted";
        this.handleSubmit();
      }
    },
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
  }
</script>

<style scoped lang="scss">
@import '../vars';

  .error {
    color: $red;
    padding-left: 16px;
    padding-top: 8px;
  }
</style>
