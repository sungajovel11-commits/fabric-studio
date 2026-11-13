<template>
  <v-container class="py-8" max-width="1140">
    <!-- Start a New Design Section -->
    <div class="mb-8">
      <div class="d-flex align-center justify-space-between mb-3">
        <h2 class="text-h6 font-weight-bold text-grey-darken-4">
          Start a New Design
        </h2>
        <span class="text-caption text-medium-emphasis">
          Powered by Fabric.js
        </span>
      </div>

      <v-row>
        <v-col cols="12" sm="6" md="3">
          <v-card
            hover
            rounded="xl"
            elevation="2"
            class="create-card pa-6 d-flex flex-column align-center justify-center text-center h-100"
            @click="openNewProjectModal"
          >
            <v-avatar color="#2f49eb" size="54" class="mb-3">
              <v-icon icon="mdi-plus" size="30" color="white" />
            </v-avatar>
            <div class="text-subtitle-1 font-weight-bold text-grey-darken-4">
              Create Blank Canvas
            </div>
            <div class="text-caption text-medium-emphasis mt-1">
              Custom title &amp; freeform shapes
            </div>
          </v-card>
        </v-col>

        <v-col
          v-for="tpl in starterTemplates"
          :key="tpl.title"
          cols="12"
          sm="6"
          md="3"
        >
          <v-card
            hover
            rounded="xl"
            elevation="2"
            class="pa-5 d-flex flex-column justify-space-between h-100 bg-white"
            @click="createFromTemplate(tpl)"
          >
            <div>
              <div
                class="rounded-lg d-flex align-center justify-center mb-3"
                :style="{ height: '90px', backgroundColor: tpl.bg }"
              >
                <v-icon :icon="tpl.icon" size="40" :color="tpl.iconColor" />
              </div>
              <div class="text-subtitle-2 font-weight-bold text-grey-darken-4">
                {{ tpl.title }}
              </div>
              <div class="text-caption text-medium-emphasis">
                {{ tpl.subtitle }}
              </div>
            </div>
            <div class="mt-3 text-caption font-weight-bold" style="color: #2f49eb;">
              Use template &rarr;
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- Previous / Saved Designs Section -->
    <div>
      <div class="d-flex align-center justify-space-between mb-3">
        <h2 class="text-h6 font-weight-bold text-grey-darken-4">
          Recent Projects ({{ projects.length }})
        </h2>
      </div>

      <v-card
        v-if="projects.length === 0"
        variant="outlined"
        rounded="xl"
        class="pa-10 text-center bg-white"
      >
        <v-icon icon="mdi-folder-open-outline" size="52" color="grey-lighten-1" class="mb-3" />
        <div class="text-subtitle-1 font-weight-bold text-grey-darken-2">
          No saved canvas designs yet
        </div>
        <p class="text-body-2 text-medium-emphasis mb-4">
          Click "Create Blank Canvas" to start designing, then click Save inside the editor to see it here.
        </p>
        <v-btn
          color="#2f49eb"
          class="text-white text-none"
          rounded="lg"
          prepend-icon="mdi-plus"
          @click="openNewProjectModal"
        >
          Create Your First Design
        </v-btn>
      </v-card>

      <v-row v-else>
        <v-col
          v-for="proj in projects"
          :key="proj.id"
          cols="12"
          sm="6"
          md="4"
        >
          <v-card
            hover
            rounded="xl"
            elevation="2"
            class="overflow-hidden bg-white h-100 d-flex flex-column"
          >
            <div
              class="project-thumb d-flex align-center justify-center cursor-pointer"
              @click="openProject(proj.id)"
            >
              <img
                v-if="proj.thumbnail"
                :src="proj.thumbnail"
                :alt="proj.title"
                class="w-100 h-100"
                style="object-fit: contain;"
              />
              <v-icon v-else icon="mdi-image-outline" size="48" color="grey" />
            </div>

            <v-card-text class="pb-2 flex-grow-1">
              <div class="d-flex align-start justify-space-between ga-2">
                <div>
                  <div
                    class="text-subtitle-1 font-weight-bold text-grey-darken-4 cursor-pointer"
                    @click="openProject(proj.id)"
                  >
                    {{ proj.title }}
                  </div>
                  <div class="text-caption text-medium-emphasis">
                    {{ proj.objectCount }} object(s) &bull; Updated {{ formatDate(proj.updatedAt) }}
                  </div>
                </div>

                <v-btn
                  icon="mdi-delete-outline"
                  size="small"
                  variant="text"
                  color="error"
                  title="Delete project"
                  @click.stop="removeProject(proj.id)"
                />
              </div>
            </v-card-text>

            <v-card-actions class="px-4 pb-4 pt-0">
              <v-btn
                block
                color="#2f49eb"
                variant="tonal"
                class="text-none font-weight-bold"
                rounded="lg"
                prepend-icon="mdi-pencil"
                @click="openProject(proj.id)"
              >
                Open &amp; Edit
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <!-- New Project Title Dialog -->
    <v-dialog v-model="newDialog" max-width="420">
      <v-card rounded="xl" class="pa-6">
        <v-card-title class="text-h6 font-weight-bold px-0">
          Create New Canvas Project
        </v-card-title>
        <v-card-text class="px-0">
          <v-text-field
            v-model="newProjectTitle"
            label="Project Name"
            placeholder="e.g. Poster Layout, Logo Concept"
            variant="outlined"
            autofocus
            @keyup.enter="confirmCreateProject"
          />
        </v-card-text>
        <v-card-actions class="px-0 justify-end">
          <v-btn variant="text" class="text-none" @click="newDialog = false">
            Cancel
          </v-btn>
          <v-btn
            color="#2f49eb"
            class="text-white text-none font-weight-bold"
            rounded="lg"
            @click="confirmCreateProject"
          >
            Start Designing
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { useAuth } from '~/composables/useAuth'
import { useProjects } from '~/composables/useProjects'

definePageMeta({
  middleware: 'auth',
})

const { user, initAuth } = useAuth()
const { projects, loadProjects, deleteProject } = useProjects()

const newDialog = ref(false)
const newProjectTitle = ref('Untitled Design')

const starterTemplates = [
  {
    title: 'Poster Layout',
    subtitle: '960 × 560 px • Geometric',
    icon: 'mdi-shape-plus',
    iconColor: '#2f49eb',
    bg: '#eef2ff',
    preset: 'poster',
  },
  {
    title: 'Badge / Logo',
    subtitle: '960 × 560 px • Emblem',
    icon: 'mdi-shield-star-outline',
    iconColor: '#d97706',
    bg: '#fef3c7',
    preset: 'badge',
  },
  {
    title: 'Banner Card',
    subtitle: '960 × 560 px • Typography',
    icon: 'mdi-format-title',
    iconColor: '#059669',
    bg: '#d1fae5',
    preset: 'banner',
  },
]

onMounted(() => {
  initAuth()
  if (user.value?.email) {
    loadProjects(user.value.email)
  }
})

const openNewProjectModal = () => {
  newProjectTitle.value = `Design #${projects.value.length + 1}`
  newDialog.value = true
}

const confirmCreateProject = () => {
  const title = newProjectTitle.value.trim() || 'Untitled Design'
  newDialog.value = false
  navigateTo({
    path: '/canvas-editor',
    query: { title },
  })
}

const createFromTemplate = (tpl: { title: string; preset: string }) => {
  navigateTo({
    path: '/canvas-editor',
    query: {
      title: tpl.title,
      preset: tpl.preset,
    },
  })
}

const openProject = (id: string) => {
  navigateTo({
    path: '/canvas-editor',
    query: { id },
  })
}

const removeProject = (id: string) => {
  if (!user.value?.email) return
  deleteProject(id, user.value.email)
}

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  } catch {
    return 'Recently'
  }
}
</script>

<style scoped>
.create-card {
  border: 2px dashed #2f49eb;
  background-color: #f8faff;
  cursor: pointer;
  transition: transform 0.15s ease;
}
.create-card:hover {
  transform: translateY(-3px);
}
.project-thumb {
  height: 175px;
  background-color: #f1f5f9;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px;
}
</style>