<template>

  <div class="media-gallery">
    <MediaPicture
        v-for="post in state.post"
        :image="post.image"
        :title="post.title"
        :user="post.user"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, reactive} from "vue";
import MediaPicture from "../components/common/MediaPicture.vue";

export default defineComponent({
  name: "New",
  components: {MediaPicture},
  setup() {
    const state = reactive({
      post: [
        {
          image: 'https://source.unsplash.com/collection/190727/400x400?1',
          title: "Delicious",
          user: "Fadwa"
        },
        {
          image: 'https://source.unsplash.com/collection/190727/400x400?2',
          title: "Tasty",
          user: "Grant"
        },
        {
          image: 'https://source.unsplash.com/collection/190727/400x400?3',
          title: "Scrumptious",
          user: "Cameron"
        },
        {
          image: 'https://source.unsplash.com/collection/190727/400x400?4',
          title: "Delectible",
          user: "Jenny"
        }
      ]
    })

    return {
      state,
    }
  },
})
</script>

<style scoped>

.media-gallery {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  margin: 1rem auto;
  max-width: 80vmin;
}

img {
  border-radius: .5rem;
  display: block;
}

figcaption {
  margin: 1rem 1rem 0;
}

h2 {
  font-size: 1.6rem;
  line-height: 1;
}

em {
  font-size: 1rem;
}

</style>
