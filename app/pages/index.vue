<template>
  <v-container max-width="1120" class="py-8 px-4">
    <!-- Start a New Design Section -->
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-h6 font-weight-bold text-grey-darken-4">
        Start a New Design
      </h2>
    </div>

    <v-row class="mb-8">
      <!-- Create Blank Canvas -->
      <v-col cols="12" sm="6" md="3">
        <v-card
          elevation="0"
          class="blank-canvas-card pa-6 d-flex flex-column align-center justify-center text-center h-100 cursor-pointer"
          @click="openBlankDialog"
        >
          <v-avatar color="#2f49eb" size="48" class="mb-4">
            <v-icon icon="mdi-plus" color="white" size="26" />
          </v-avatar>
          <div class="text-subtitle-2 font-weight-bold text-grey-darken-4 mb-1">
            Create Blank Canvas
          </div>
          <div class="text-caption text-medium-emphasis">
            Custom title &amp; freeform shapes
          </div>
        </v-card>
      </v-col>

      <!-- Poster Layout Template -->
      <v-col cols="12" sm="6" md="3">
        <v-card
          elevation="2"
          rounded="xl"
          class="template-card pa-5 d-flex flex-column justify-between h-100 cursor-pointer"
          @click="startFromTemplate('poster')"
        >
          <div>
            <div
              class="template-preview rounded-lg d-flex align-center justify-center mb-4"
              style="background-color: #eef2ff; height: 96px;"
            >
              <div class="d-flex flex-column align-center ga-1">
                <div class="d-flex ga-1">
                  <div
                    style="width: 16px; height: 16px; background: #2f49eb; border-radius: 3px;"
                  />
                  <div
                    style="width: 16px; height: 16px; background: #2f49eb; border-radius: 50%;"
                  />
                </div>
                <div class="d-flex align-center ga-1">
                  <div
                    style="width: 0; height: 0; border-left: 8px solid transparent; border-right: 8px solid transparent; border-bottom: 15px solid #2f49eb;"
                  />
                  <v-icon icon="mdi-plus" color="#2f49eb" size="18" />
                </div>
              </div>
            </div>

            <div class="text-subtitle-2 font-weight-bold text-grey-darken-4">
              Poster Layout
            </div>
            <div class="text-caption text-medium-emphasis mb-3">
              960 &times; 560 px &bull; Geometric
            </div>
          </div>

          <div
            class="text-caption font-weight-bold"
            style="color: #2f49eb;"
          >
            Use template &rarr;
          </div>
        </v-card>
      </v-col>

      <!-- Badge / Logo Template -->
      <v-col cols="12" sm="6" md="3">
        <v-card
          elevation="2"
          rounded="xl"
          class="template-card pa-5 d-flex flex-column justify-between h-100 cursor-pointer"
          @click="startFromTemplate('badge')"
        >
          <div>
            <div
              class="template-preview rounded-lg d-flex align-center justify-center mb-4"
              style="background-color: #fef3c7; height: 96px;"
            >
              <v-icon
                icon="mdi-shield-star-outline"
                color="#d97706"
                size="38"
              />
            </div>

            <div class="text-subtitle-2 font-weight-bold text-grey-darken-4">
              Badge / Logo
            </div>
            <div class="text-caption text-medium-emphasis mb-3">
              960 &times; 560 px &bull; Emblem
            </div>
          </div>

          <div
            class="text-caption font-weight-bold"
            style="color: #2f49eb;"
          >
            Use template &rarr;
          </div>
        </v-card>
      </v-col>

      <!-- Banner Card Template -->
      <v-col cols="12" sm="6" md="3">
        <v-card
          elevation="2"
          rounded="xl"
          class="template-card pa-5 d-flex flex-column justify-between h-100 cursor-pointer"
          @click="startFromTemplate('banner')"
        >
          <div>
            <div
              class="template-preview rounded-lg d-flex align-center justify-center mb-4"
              style="background-color: #d1fae5; height: 96px;"
            >
              <v-icon
                icon="mdi-format-title"
                color="#059669"
                size="36"
              />
            </div>

            <div class="text-subtitle-2 font-weight-bold text-grey-darken-4">
              Banner Card
            </div>
            <div class="text-caption text-medium-emphasis mb-3">
              960 &times; 560 px &bull; Typography
            </div>
          </div>

          <div
            class="text-caption font-weight-bold"
            style="color: #2f49eb;"
          >
            Use template &rarr;
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Recent Projects Section -->
    <div class="d-flex justify-space-between align-center mb-4">
      <h2 class="text-h6 font-weight-bold text-grey-darken-4">
        Recent Projects ({{ userProjects.length }})
      </h2>
    </div>

    <!-- Empty State -->
    <v-card
      v-if="userProjects.length === 0"
      elevation="0"
      class="empty-projects-card pa-10 text-center"
    >
      <v-icon
        icon="mdi-folder-outline"
        size="48"
        color="grey-lighten-1"
        class="mb-3"
      />
      <div class="text-subtitle-1 font-weight-bold text-grey-darken-3 mb-1">
        No saved canvas designs yet
      </div>
      <div class="text-body-2 text-medium-emphasis mb-5">
        Click "Create Blank Canvas" to start designing, then click Save inside the editor to see it here.
      </div>
      <v-btn
        color="#2f49eb"
        class="text-white text-none font-weight-bold px-6"
        rounded="lg"
        elevation="0"
        prepend-icon="mdi-plus"
        @click="openBlankDialog"
      >
        Create Your First Design
      </v-btn>
    </v-card>

    <!-- Saved Projects Grid -->
    <v-row v-else>
      <v-col
        v-for="project in userProjects"
        :key="project.id"
        cols="12"
        sm="6"
        md="4"
      >
        <v-card elevation="2" rounded="xl" class="overflow-hidden h-100 d-flex flex-column">
          <div
            class="bg-grey-lighten-4 d-flex align-center justify-center cursor-pointer"
            style="height: 180px; border-bottom: 1px solid #e2e8f0;"
            @click="openExistingProject(project.id)"
          >
            <img
              v-if="project.previewDataUrl"
              :src="project.previewDataUrl"
              :alt="project.title"
              style="width: 100%; height: 100%; object-fit: contain;"
            />
            <v-icon
              v-else
              icon="mdi-image-outline"
              size="44"
              color="grey"
            />
          </div>

          <div class="pa-4 d-flex align-center justify-space-between">
            <div class="overflow-hidden pr-2">
              <div class="text-subtitle-2 font-weight-bold text-truncate">
                {{ project.title }}
              </div>
              <div class="text-caption text-medium-emphasis">
                Updated {{ formatDate(project.updatedAt) }}
              </div>
            </div>

            <div class="d-flex ga-1">
              <v-btn
                icon="mdi-pencil-outline"
                size="small"
                variant="tonal"
                color="#2f49eb"
                @click="openExistingProject(project.id)"
              />
              <v-btn
                icon="mdi-delete-outline"
                size="small"
                variant="tonal"
                color="error"
                @click="confirmDelete(project.id)"
              />
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- New Blank Canvas Title Dialog -->
    <v-dialog v-model="blankDialog" max-width="420">
      <v-card rounded="xl" class="pa-6">
        <h3 class="text-h6 font-weight-bold mb-1">New Blank Canvas</h3>
        <p class="text-caption text-medium-emphasis mb-4">
          Give your design a title before opening the editor.
        </p>

        <v-text-field
          v-model="newProjectTitle"
          label="Project Title"
          variant="outlined"
          density="comfortable"
          autofocus
          @keyup.enter="createBlankProject"
        />

        <div class="d-flex justify-end ga-2 mt-2">
          <v-btn
            variant="text"
            class="text-none"
            @click="blankDialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="#2f49eb"
            class="text-white text-none font-weight-bold"
            elevation="0"
            @click="createBlankProject"
          >
            Open Editor
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { definePageMeta, navigateTo } from '#imports'
import { useAuth } from '~/composables/useAuth'
import { useProjects } from '~/composables/useProjects'

definePageMeta({
  middleware: 'auth',
})

const { user, initAuth } = useAuth()
const { projects, loadProjects, deleteProject } = useProjects()

const blankDialog = ref(false)
const newProjectTitle = ref('Untitled Design')

const userProjects = computed(() => {
  if (!user.value?.email) return []
  return projects.value.filter((p) => p.ownerEmail === user.value?.email)
})

const openBlankDialog = () => {
  newProjectTitle.value = 'Untitled Design'
  blankDialog.value = true
}

const createBlankProject = () => {
  const title = newProjectTitle.value.trim() || 'Untitled Design'
  blankDialog.value = false
  navigateTo({
    path: '/canvas-editor',
    query: { title },
  })
}

const startFromTemplate = (templateKey: string) => {
  const titles: Record<string, string> = {
    poster: 'Poster Layout Design',
    badge: 'Badge / Logo Emblem',
    banner: 'Banner Card Layout',
  }
  navigateTo({
    path: '/canvas-editor',
    query: {
      template: templateKey,
      title: titles[templateKey] || 'Template Design',
    },
  })
}

const openExistingProject = (id: string) => {
  navigateTo({
    path: '/canvas-editor',
    query: { id },
  })
}

const confirmDelete = (id: string) => {
  deleteProject(id)
}

const formatDate = (iso: string) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return ''
  }
}

onMounted(() => {
  initAuth()
  loadProjects()
})
</script>

<style scoped>
.blank-canvas-card {
  border: 2px dashed #2f49eb !important;
  border-radius: 20px !important;
  background-color: #ffffff;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.blank-canvas-card:hover,
.template-card:hover {
  transform: translateY(-3px);
}

.empty-projects-card {
  border: 1px solid #cbd5e1 !important;
  border-radius: 20px !important;
  background-color: #ffffff;
}
</style>