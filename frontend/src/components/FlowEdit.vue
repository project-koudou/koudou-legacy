<template>
  <div>
    <nav
      v-if="this.$route.query.wizard"
      class="breadcrumb has-arrow-separator"
      aria-label="breadcrumbs"
    >
      <ul>
        <li>
          <router-link to="/plan-wizard/select">Select a plan template</router-link>
        </li>
        <li>
          <a href="#">Name & describe your plan</a>
        </li>
        <li class="is-active">
          <router-link :to="this.$route.path">Edit and save the plan</router-link>
        </li>
      </ul>
    </nav>
    <nav v-else class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <router-link to="/">
            <span class="icon">
              <i class="fas fa-bars"></i>
            </span>Back to List
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="columns">
      <div class="column is-12">
        <div class="card">
          <div class="card-content">
            <p class="title" style="margin-bottom: 15px;">{{ plan.name }}</p>
            <p class="content">{{ plan.description }}</p>
            <div class="field is-grouped">
              <p class="control">
                <button @click="save" class="button is-link">Save</button>
              </p>
              <p class="control">
                <button @click="remove" class="button is-text">Delete</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="columns">
      <div class="column is-narrow">
        <div class="card is-shadowless sidenav">
          <div class="card-content" style="padding-top: 0;">
            <!-- <p class="title is-4">Action Blocks</p> -->
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
                  </li>-->
                </ul>
              </div>
            </div>
            <draggable
              id="blocks"
              :list="blocks"
              :sort="false"
              :move="checkMove"
              :group="{ name: 'blocks', pull: 'clone', put: false }"
            >
              <div
                v-for="block in blocks"
                :key="block.name"
                :class="[block.style, 'message', 'item']"
              >
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
            <template v-for="(step, stepIdx) in plan.phases">
              <li class="steps-segment" v-if="step.trigger.name" :key="`${stepIdx}-trigger`">
                <span class="steps-marker"></span>
                <div class="steps-content">
                  <p class="is-size-4">{{ step.trigger.name }}</p>
                  <div
                    style="margin: 10px 0px; position: relative; left: -50px; right: -50px; z-index: 9;"
                  >
                    <div
                      v-for="(block, idx) in [step.trigger.subscribeTo]"
                      :key="idx"
                      :class="['message', 'item', block.style]"
                    >
                      <div class="message-body">
                        <p class="title is-5">{{ block.name }}</p>
                        <p v-if="block.always" class="subtitle is-6">{{ block.always }}</p>
                        <p class="content">
                          <span v-html="block.message"></span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="steps-segment" :key="stepIdx">
                <span class="steps-marker"></span>
                <div class="steps-content">
                  <p class="is-size-4">{{ step.name }}</p>
                  <div style="margin: 10px 0px; position: relative; left: -50px; z-index: 9;">
                    <draggable
                      class="block-list"
                      :list="step.blocks"
                      :sort="true"
                      filter="textarea"
                      :preventOnFilter="false"
                      draggable=".item"
                      group="blocks"
                    >
                      <div
                        v-for="(block, idx) in step.blocks"
                        :key="block.id"
                        :class="['message', 'item', block.style]"
                      >
                        <div class="message-body">
                          <p class="title is-5">{{ block.name }}</p>
                          <p v-if="block.always" class="subtitle is-6 is-size-7">{{ block.always }}</p>
                          <p class="content">
                            <span v-html="block.message"></span>
                          </p>
                          <p class="content">
                            <b>On:</b>
                            {{ block.output.map(x => x.name).join(' · ') }}
                          </p>
                          <div class="field is-grouped">
                            <p class="control" v-if="block.editableParamKeys">
                              <button
                                class="button is-small is-text"
                                :class="{ 'is-active': block.isEditing }"
                                @click="toggleEdit(block)"
                              >Edit</button>
                            </p>
                            <p class="control" v-else>
                              <button class="button is-small is-text" disabled>No editable settings</button>
                            </p>
                            <p class="control" v-show="!block.always">
                              <button
                                class="button is-small is-text"
                                @click="removeAt(step, idx)"
                              >Remove</button>
                            </p>
                          </div>
                          <div v-show="block.isEditing">
                            <div class="field" v-for="name in block.editableParamKeys" :key="name">
                              <label class="label is-small">{{ name }}</label>
                              <div class="content" v-if="Array.isArray(block.params[name])">
                                <ul>
                                  <textarea
                                    class="textarea"
                                    placeholder="Check X, Do Y, ..."
                                    :value="stringify(block.params[name])"
                                    @input="block.params[name] = destringify($event.target.value, block.params[name])"
                                  ></textarea>
                                </ul>
                              </div>
                              <div class="control" v-else>
                                <textarea class="textarea" v-model="block.params[name]"></textarea>
                              </div>
                            </div>
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
      blocks: [],
      plan: {},
    };
  },
  methods: {
    async save() {
      console.log(JSON.stringify(this.plan, null, '  '));
      await $client.service('api/plan').update(this.plan.id, this.plan);
      this.$router.push(`/plan/${this.$route.params.id}`);
    },
    async remove() {
      await $client.service('api/plan').remove(this.plan.id);
      this.$router.push('/');
    },
    checkMove(evt) {
      return !evt.relatedContext.list.map(x => x.id).includes(evt.draggedContext.element.id);
    },
    removeAt(step, idx) {
      step.blocks.splice(idx, 1);
    },
    toggleEdit(block) {
      this.$set(block, 'isEditing', !block.isEditing);
    },
    log(block, name) {
      console.log(block.params[name]);
    },
    stringify(obj) {
      if (Array.isArray(obj)) {
        return obj.join(', ');
      }
      return '';
    },
    destringify(text, refObj) {
      if (Array.isArray(refObj)) {
        return text.split(', ');
      }
      return null;
    },
  },
  async mounted() {
    const blockResp = await fetch('//localhost:3030/api/_plan/blocks', { headers: { "Accept": "application/json" } });
    this.blocks = await blockResp.json();
    const plan = await $client.service('api/plan').get(this.$route.params.id);
    console.log(plan);
    this.plan = plan;
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
  padding-top: 5px;
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
