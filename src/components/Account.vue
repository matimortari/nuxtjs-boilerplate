<template>
  <form @submit.prevent="updateProfile">
    <div>
      <label for="email">Email</label>
      <input id="email" type="text" :value="session.user.email" disabled>
    </div>

    <div>
      <label for="name">Name</label>
      <input id="name" v-model="name" type="text">
    </div>

    <input type="submit" class="btn">
  </form>
</template>

<script setup lang="ts">
import { supabase } from "~/lib/supabase"

const props = defineProps({
  session: {
    type: Object,
    required: true
  }
})

const { session } = toRefs(props)

const name = ref("")

onMounted(() => {
  getProfile()
})

async function getProfile() {
  try {
    const { user } = session.value

    const { data, error, status } = await supabase
      .from("profiles")
      .select("name")
      .eq("id", user.id)
      .single()

    if (error && status !== 406)
      throw error

    if (data) {
      name.value = data.name
    }
  }
  catch (error) {
    // eslint-disable-next-line no-alert
    alert((error as Error).message)
  }
}

async function updateProfile() {
  try {
    const { user } = session.value

    const updates = {
      id: user.id,
      user: user.value,
      updated_at: new Date()
    }

    const { error } = await supabase.from("profiles").upsert(updates)

    if (error)
      throw error
  }
  catch (error) {
    // eslint-disable-next-line no-alert
    alert((error as Error).message)
  }
}
</script>
