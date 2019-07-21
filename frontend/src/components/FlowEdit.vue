<template>
  <div>
    <div class="columns">
      <div class="column is-12">
        <div class="card">
          <div class="card-content">
            <p class="title" style="margin-bottom: 15px;">{{ name }}</p>
            <p class="content">{{ description }}</p>
            <div class="field is-grouped">
              <p class="control">
                <button v-on:click="save" class="button is-link">Save</button>
              </p>
              <p class="control">
                <button class="button is-text">Cancel</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-narrow">
        <div class="card is-shadowless sidenav">
          <div class="card-content">
            <p class="title is-4">Action Blocks</p>
            <div>
              <div class="tabs" style="margin-bottom: 0;">
                <ul>
                  <li class="is-active">
                    <a>Blocks</a>
                  </li>
                  <!-- <li class="is-active">
                    <a>Trigger</a>
                  </li>
                  <li>
                    <a>Action</a>
                  </li>
                  <li>
                    <a>Checkpoint</a>
                  </li> -->
                </ul>
              </div>
            </div>
            <draggable
              id="blocks"
              :list="blocks"
              :sort="false"
              :group="{ name: 'blocks', pull: 'clone', put: false }"
            >
              <div v-for="block in blocks" v-bind:class="[block.style, 'message', 'item']">
                <div class="message-body">
                  <p class="title is-6">{{ block.name }}</p>
                   <p class="subtitle is-7">{{ block.category ? block.category.join(' · ') : '' }}</p>
                </div>
              </div>
            </draggable>
          </div>
        </div>
      </div>
      <div class="column">
        <div class="box is-shadowless">
          <ul
            class="steps has-content-centered is-small is-vertical is-light"
            style="position: relative; left: 25px;"
          >
            <template v-for="step in flow">
              <li class="steps-segment" v-if="step.trigger.name">
                <span class="steps-marker"></span>
                <div class="steps-content">
                  <p class="is-size-4">{{ step.trigger.name }}</p>
                  <div
                    style="margin: 10px 0px; position: relative; left: -50px; right: -50px; z-index: 9;"
                  >
                    <draggable
                      class="block-list"
                      :list="[step.trigger.subscribeTo]"
                      :sort="false"
                      draggable=".item"
                      group="blocks"
                    >
                      <div
                        v-for="(block, idx) in [step.trigger.subscribeTo]"
                        :class="['message', 'item', block.style]"
                      >
                        <div class="message-body">
                          <p class="title is-5">{{ block.name }}</p>
                          <p v-if="block.always" class="subtitle is-6">{{ block.always }}</p>
                          <p class="content" style="white-space: pre-line;">{{ block.message }}</p>
                          <div class="field is-grouped">
                            <p class="control">
                              <button
                                class="button is-small is-light is-inverted is-outlined"
                                @click="toggleModal"
                              >Edit</button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </draggable>
                  </div>
                </div>
              </li>
              <li class="steps-segment">
                <span class="steps-marker"></span>
                <div class="steps-content">
                  <p class="is-size-4">{{ step.name }}</p>
                  <div style="margin: 10px 0px; position: relative; left: -50px; z-index: 9;">
                    <draggable
                      class="block-list"
                      :list="step.blocks"
                      :sort="false"
                      draggable=".item"
                      group="blocks"
                    >
                      <div
                        v-for="(block, idx) in step.blocks"
                        :key="block.id"
                        v-bind:class="['message', 'item', block.style]"
                      >
                        <div class="message-body">
                          <p class="title is-5">{{ block.name }}</p>
                          <p v-if="block.always" class="subtitle is-6">{{ block.always }}</p>
                          <p class="content" style="white-space: pre-line;">{{ block.message }}</p>
                          <p class="content">
                            <b>On:</b>
                            {{ block.output.join(' · ') }}
                          </p>
                          <div class="field is-grouped">
                            <p class="control">
                              <button
                                class="button is-small is-light is-inverted is-outlined"
                                @click="toggleModal"
                              >Edit</button>
                            </p>
                            <p class="control">
                              <button
                                class="button is-small is-light is-inverted is-outlined"
                                @click="removeAt(step, idx)"
                              >Remove</button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </draggable>
                  </div>
                </div>
              </li>
            </template>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  data() {
    return {
      name: '',
      description: '',
      flow: [],
      blocks: [],
    };
  },
  methods: {
    save() {
      this.$router.push('/flow');
    },
    removeAt(step, idx) {
      step.blocks.splice(idx, 1);
    },
    toggleModal(ev) {
      let el = ev.target.parentElement.closest('.message');
      [el] = el.getElementsByClassName('modal');
      // console.log(el)
      el.classList.toggle('is-active');
    },
  },
  async mounted() {
    let resp = await fetch('//localhost:3030/api/_plan/blocks');
    this.blocks = await resp.json();
    resp = await fetch('//localhost:3030/api/_plan/plan1');
    const flow1 = await resp.json();
    this.name = flow1.name;
    this.description = flow1.description;
    this.flow = flow1.phases;
  },
};
</script>

<style scoped>
.sidenav {
  position: sticky;
  top: 0px;
  width: 400px;
  height: 100vh;
}
.card.sidenav > .card-content {
  padding-bottom: 0;
  height: 100%;
  display: flex;
  flex-direction: column;
}
#blocks {
  overflow-y: scroll !important;
  /* padding: 20px 30px 10px 0px; */
  padding-right: 25px;
}
.item {
  cursor: grab;
}
.item:active {
  cursor: grabbing;
}
.block-list {
  background: #ffffff99;
  z-index: 8;
  border-radius: 0;
}
.message,
.message-body {
  border-radius: 4px;
}
.message-body {
  border: none;
}
.message {
  box-shadow: none !important;
  border: 1px solid #dee2e6;
}
.message {
  margin: 10px 0px;
}
.phase-title {
  position: sticky;
  top: -1px;
  z-index: 9;
  padding: 20px 0 40px 0;
  border-bottom: 1px solid #e3e3e3;
  height: 50px;
  display: block;
  background: #fff;
}
</style>
