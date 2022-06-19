<template>
  <Nav></Nav>
  <div class="app-container under-nav">
    <div>
      <el-row :gutter="20">

        <el-col :span="6" :xs="24">
          <user-card :user="user"/>
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="动态" name="activity">
                <activity/>
              </el-tab-pane>
              <el-tab-pane label="记录" name="timeline">
                <timeline/>
              </el-tab-pane>
              <el-tab-pane label="账户" name="account">
                <account :user="user"/>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </el-col>

      </el-row>
    </div>
  </div>
</template>

<script setup>
import {useStore} from 'vuex'
import UserCard from './components/UserCard.vue'
import Activity from './components/Activity.vue'
import Timeline from './components/Timeline.vue'
import Account from './components/Account.vue'
import {onMounted, ref, watch} from "vue";
import {key} from "../../../store";
import Nav from "../../nav/Nav.vue";

const store = useStore(key);

const user = ref()
const activeTab = 'activity'


onMounted(() => {
  user.value = store.state.user.userInfo
})
watch(() => store.state.user.userInfo, (newValue) => {
  user.value = newValue
})
</script>
