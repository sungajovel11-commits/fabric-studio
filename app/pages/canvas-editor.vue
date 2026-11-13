<template>
  <div class="studio-shell d-flex flex-column">
    <!-- Compact Top Studio Toolbar -->
    <div class="studio-topbar bg-white border-b px-4 py-2 d-flex flex-wrap align-center justify-space-between ga-2">
      <div class="d-flex align-center ga-2">
        <v-btn
          icon="mdi-arrow-left"
          variant="text"
          size="small"
          to="/"
          title="Back to Dashboard"
        />
        <v-text-field
          v-model="projectTitle"
          density="compact"
          variant="solo-filled"
          flat
          bg-color="grey-lighten-4"
          hide-details
          style="width: 240px;"
          placeholder="Untitled Design"
        />
        <v-chip size="small" color="primary" variant="tonal" class="ml-1">
          {{ objectCount }} objects
        </v-chip>
      </div>

      <!-- Right Save & Export Actions -->
      <div class="d-flex align-center ga-2">
        <v-btn
          color="#2f49eb"
          size="small"
          class="text-white text-none font-weight-bold"
          rounded="lg"
          prepend-icon="mdi-content-save"
          @click="saveCurrentProject"
        >
          Save to Dashboard
        </v-btn>
        <v-btn
          color="success"
          size="small"
          variant="tonal"
          class="text-none font-weight-bold"
          rounded="lg"
          prepend-icon="mdi-download"
          @click="exportPNG"
        >
          Export PNG
        </v-btn>
      </div>
    </div>

    <!-- Main Full-Height Workspace -->
    <div class="studio-body d-flex flex-grow-1 overflow-hidden">
      <!-- 1. Left Icon Rail -->
      <div class="studio-rail bg-white border-r d-flex flex-column align-center py-3 ga-2">
        <button
          type="button"
          class="rail-btn"
          :class="{ active: activeTab === 'shapes' && drawerOpen }"
          @click="toggleTab('shapes')"
        >
          <v-icon icon="mdi-shape-outline" size="22" />
          <span>Shapes</span>
        </button>

        <button
          type="button"
          class="rail-btn"
          :class="{ active: activeTab === 'text' && drawerOpen }"
          @click="toggleTab('text')"
        >
          <v-icon icon="mdi-format-text" size="22" />
          <span>Text</span>
        </button>

        <button
          type="button"
          class="rail-btn"
          :class="{ active: activeTab === 'color' && drawerOpen }"
          @click="toggleTab('color')"
        >
          <v-icon icon="mdi-palette-outline" size="22" />
          <span>Color</span>
        </button>

        <button
          type="button"
          class="rail-btn"
          :class="{ active: activeTab === 'inspector' && drawerOpen }"
          @click="toggleTab('inspector')"
        >
          <v-icon icon="mdi-tune-variant" size="22" />
          <span>Inspector</span>
        </button>
      </div>

      <!-- 2. Collapsible Side Tool Drawer -->
      <div
        v-if="drawerOpen"
        class="studio-drawer bg-white border-r pa-4 d-flex flex-column justify-space-between"
      >
        <!-- Upper Tool Controls -->
        <div class="overflow-y-auto pr-1">
          <div class="d-flex align-center justify-space-between mb-3">
            <span class="text-subtitle-2 font-weight-bold text-uppercase text-grey-darken-2">
              {{ tabTitle }}
            </span>
            <v-btn
              icon="mdi-chevron-left"
              size="x-small"
              variant="text"
              title="Collapse panel"
              @click="drawerOpen = false"
            />
          </div>

          <!-- SHAPES TAB -->
          <div v-if="activeTab === 'shapes'">
            <v-row dense>
              <v-col cols="6">
                <v-btn
                  block
                  size="small"
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-rectangle-outline"
                  class="text-none"
                  @click="addRect"
                >
                  Rectangle
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  size="small"
                  color="primary"
                  variant="tonal"
                  prepend-icon="mdi-square"
                  class="text-none"
                  @click="addSquare"
                >
                  Square
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  size="small"
                  color="secondary"
                  variant="tonal"
                  prepend-icon="mdi-circle"
                  class="text-none"
                  @click="addCircle"
                >
                  Circle
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  size="small"
                  color="secondary"
                  variant="tonal"
                  prepend-icon="mdi-ellipse"
                  class="text-none"
                  @click="addEllipse"
                >
                  Oval
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  size="small"
                  color="teal"
                  variant="tonal"
                  prepend-icon="mdi-triangle"
                  class="text-none"
                  @click="addTriangle"
                >
                  Triangle
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  size="small"
                  color="amber-darken-3"
                  variant="tonal"
                  prepend-icon="mdi-star"
                  class="text-none"
                  @click="addStar"
                >
                  Star
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  size="small"
                  color="purple"
                  variant="tonal"
                  prepend-icon="mdi-cards-diamond"
                  class="text-none"
                  @click="addDiamond"
                >
                  Diamond
                </v-btn>
              </v-col>
              <v-col cols="6">
                <v-btn
                  block
                  size="small"
                  color="cyan-darken-2"
                  variant="tonal"
                  prepend-icon="mdi-hexagon"
                  class="text-none"
                  @click="addHexagon"
                >
                  Hexagon
                </v-btn>
              </v-col>
              <v-col cols="12">
                <v-btn
                  block
                  size="small"
                  color="blue-grey"
                  variant="tonal"
                  prepend-icon="mdi-minus"
                  class="text-none"
                  @click="addLine"
                >
                  Straight Line
                </v-btn>
              </v-col>
            </v-row>
          </div>

          <!-- TEXT TAB -->
          <div v-if="activeTab === 'text'" class="d-flex flex-column ga-3">
            <div class="d-flex flex-column ga-2">
              <v-btn
                block
                color="indigo"
                variant="tonal"
                prepend-icon="mdi-format-header-1"
                class="justify-start text-none"
                @click="addHeadingText"
              >
                Add a Heading
              </v-btn>
              <v-btn
                block
                color="indigo"
                variant="outlined"
                prepend-icon="mdi-format-text"
                class="justify-start text-none"
                @click="addText"
              >
                Add Body Text
              </v-btn>
            </div>

            <v-divider />

            <div>
              <label class="text-caption font-weight-bold text-grey-darken-2 d-block mb-1">
                Font Style (Family)
              </label>
              <v-select
                v-model="selectedFontFamily"
                :items="fontFamilies"
                density="compact"
                variant="outlined"
                hide-details
                @update:model-value="applyTextFormatting"
              />
            </div>

            <div>
              <div class="d-flex justify-space-between align-center mb-1">
                <label class="text-caption font-weight-bold text-grey-darken-2">
                  Font Size
                </label>
                <span class="text-caption font-weight-bold text-primary">
                  {{ selectedFontSize }} px
                </span>
              </div>
              <v-slider
                v-model="selectedFontSize"
                :min="12"
                :max="96"
                :step="2"
                color="#2f49eb"
                density="compact"
                hide-details
                @update:model-value="applyTextFormatting"
              />
            </div>

            <div class="d-flex ga-2">
              <v-btn
                size="small"
                :color="isBold ? '#2f49eb' : 'grey'"
                :variant="isBold ? 'flat' : 'outlined'"
                class="flex-grow-1 text-none"
                prepend-icon="mdi-format-bold"
                @click="toggleBold"
              >
                Bold
              </v-btn>
              <v-btn
                size="small"
                :color="isItalic ? '#2f49eb' : 'grey'"
                :variant="isItalic ? 'flat' : 'outlined'"
                class="flex-grow-1 text-none"
                prepend-icon="mdi-format-italic"
                @click="toggleItalic"
              >
                Italic
              </v-btn>
            </div>
          </div>

          <!-- COLOR TAB -->
          <div v-if="activeTab === 'color'">
            <label class="text-caption text-medium-emphasis d-block mb-2">
              Custom Color Picker
            </label>
            <div class="d-flex align-center ga-3 mb-4">
              <input
                v-model="selectedColor"
                type="color"
                aria-label="Choose shape color"
                style="width: 48px; height: 38px; border: none; cursor: pointer;"
                @input="updateSelectedColor"
              />
              <span class="text-body-2 font-weight-medium">{{ selectedColor.toUpperCase() }}</span>
            </div>

            <label class="text-caption text-medium-emphasis d-block mb-2">
              Quick Swatches
            </label>
            <div class="d-flex flex-wrap ga-2">
              <button
                v-for="swatch in colorSwatches"
                :key="swatch"
                type="button"
                class="swatch-dot"
                :style="{ backgroundColor: swatch }"
                @click="applySwatch(swatch)"
              />
            </div>
          </div>

          <!-- EDITABLE OBJECT INSPECTOR TAB -->
          <div v-if="activeTab === 'inspector'">
            <div v-if="activeObjectInfo" class="d-flex flex-column ga-3">
              <div class="d-flex align-center justify-space-between">
                <span class="text-caption font-weight-bold text-uppercase text-grey-darken-1">
                  Selected Type
                </span>
                <v-chip size="x-small" color="#2f49eb" variant="tonal" class="text-uppercase font-weight-bold">
                  {{ activeObjectInfo.type }}
                </v-chip>
              </div>

              <!-- Editable Size (Width & Height) -->
              <div>
                <label class="text-caption font-weight-bold text-grey-darken-2 d-block mb-1">
                  Size (px)
                </label>
                <v-row dense>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="activeObjectInfo.width"
                      label="Width"
                      type="number"
                      min="5"
                      max="960"
                      density="compact"
                      variant="outlined"
                      hide-details
                      @change="applyDimensionsFromInspector"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="activeObjectInfo.height"
                      label="Height"
                      type="number"
                      min="5"
                      max="560"
                      density="compact"
                      variant="outlined"
                      hide-details
                      @change="applyDimensionsFromInspector"
                    />
                  </v-col>
                </v-row>
              </div>

              <!-- Editable Position (X & Y) -->
              <div>
                <label class="text-caption font-weight-bold text-grey-darken-2 d-block mb-1">
                  Position (px)
                </label>
                <v-row dense>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="activeObjectInfo.left"
                      label="X"
                      type="number"
                      density="compact"
                      variant="outlined"
                      hide-details
                      @change="applyPositionFromInspector"
                    />
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model.number="activeObjectInfo.top"
                      label="Y"
                      type="number"
                      density="compact"
                      variant="outlined"
                      hide-details
                      @change="applyPositionFromInspector"
                    />
                  </v-col>
                </v-row>
              </div>

              <!-- Editable Rotation -->
              <div>
                <div class="d-flex justify-space-between align-center mb-1">
                  <label class="text-caption font-weight-bold text-grey-darken-2">
                    Rotation
                  </label>
                  <span class="text-caption font-weight-bold text-primary">
                    {{ activeObjectInfo.angle }}&deg;
                  </span>
                </div>
                <v-slider
                  v-model="activeObjectInfo.angle"
                  :min="0"
                  :max="360"
                  :step="1"
                  color="#2f49eb"
                  density="compact"
                  hide-details
                  @update:model-value="applyAngleFromInspector"
                />
              </div>

              <!-- Editable Opacity -->
              <div>
                <div class="d-flex justify-space-between align-center mb-1">
                  <label class="text-caption font-weight-bold text-grey-darken-2">
                    Opacity
                  </label>
                  <span class="text-caption font-weight-bold text-primary">
                    {{ activeObjectInfo.opacity }}%
                  </span>
                </div>
                <v-slider
                  v-model="activeObjectInfo.opacity"
                  :min="10"
                  :max="100"
                  :step="5"
                  color="#2f49eb"
                  density="compact"
                  hide-details
                  @update:model-value="applyOpacityFromInspector"
                />
              </div>

              <!-- Layer Order -->
              <div>
                <label class="text-caption font-weight-bold text-grey-darken-2 d-block mb-1">
                  Layer Order
                </label>
                <div class="d-flex ga-2">
                  <v-btn
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    class="flex-grow-1 text-none"
                    prepend-icon="mdi-arrange-bring-forward"
                    @click="bringForward"
                  >
                    Forward
                  </v-btn>
                  <v-btn
                    size="x-small"
                    variant="tonal"
                    color="primary"
                    class="flex-grow-1 text-none"
                    prepend-icon="mdi-arrange-send-backward"
                    @click="sendBackward"
                  >
                    Backward
                  </v-btn>
                </div>
              </div>
            </div>

            <p v-else class="text-caption text-medium-emphasis">
              Click any shape or text on the canvas to edit its exact Width, Height, Position, Rotation, and Opacity.
            </p>
          </div>
        </div>

        <!-- LOWER PART OF SIDE MENU: Delete Selected & Clear All -->
        <div class="pt-3 border-t d-flex flex-column ga-2">
          <v-btn
            block
            size="small"
            color="warning"
            variant="tonal"
            prepend-icon="mdi-delete-outline"
            class="text-none font-weight-bold"
            :disabled="!hasSelection"
            @click="deleteSelected"
          >
            Delete Selected
          </v-btn>

          <v-btn
            block
            size="small"
            color="error"
            variant="outlined"
            prepend-icon="mdi-nuke"
            class="text-none"
            @click="clearCanvas"
          >
            Clear All
          </v-btn>
        </div>
      </div>

      <!-- 3. Full-Screen Centered Canvas Area -->
      <div class="studio-workspace flex-grow-1 d-flex flex-column align-center justify-center pa-4 position-relative">
        <v-alert
          v-if="feedback.message"
          :type="feedback.type"
          variant="elevated"
          density="compact"
          closable
          class="floating-alert"
          @click:close="feedback.message = ''"
        >
          {{ feedback.message }}
        </v-alert>

        <div class="artboard-frame elevation-6">
          <canvas ref="canvasEl" />
        </div>

        <div class="text-caption text-medium-emphasis mt-2">
          Artboard: 960 &times; 560 px &bull; Click an object to resize/drag on canvas or edit exact numbers in <strong>Inspector</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  Canvas,
  Rect,
  Circle,
  Ellipse,
  Triangle,
  Polygon,
  Line,
  IText,
  type FabricObject,
} from 'fabric'
import { useAuth } from '~/composables/useAuth'
import { useProjects } from '~/composables/useProjects'

definePageMeta({
  middleware: 'auth',
})

const route = useRoute()
const { user, initAuth } = useAuth()
const { getProjectById, saveProject } = useProjects()

const canvasEl = ref<HTMLCanvasElement | null>(null)
let fabricCanvas: Canvas | null = null

const drawerOpen = ref(true)
const activeTab = ref<'shapes' | 'text' | 'color' | 'inspector'>('shapes')
const hasSelection = ref(false)

const fontFamilies = [
  'Roboto',
  'Arial',
  'Georgia',
  'Times New Roman',
  'Courier New',
  'Verdana',
  'Impact',
  'Comic Sans MS',
]
const selectedFontFamily = ref('Roboto')
const selectedFontSize = ref(28)
const isBold = ref(false)
const isItalic = ref(false)

const colorSwatches = [
  '#2f49eb',
  '#f59e0b',
  '#10b981',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#0f172a',
  '#64748b',
]

const tabTitle = computed(() => {
  if (activeTab.value === 'shapes') return 'Shapes'
  if (activeTab.value === 'text') return 'Typography'
  if (activeTab.value === 'color') return 'Colors'
  return 'Object Inspector'
})

const toggleTab = (tab: 'shapes' | 'text' | 'color' | 'inspector') => {
  if (activeTab.value === tab) {
    drawerOpen.value = !drawerOpen.value
  } else {
    activeTab.value = tab
    drawerOpen.value = true
  }
}

const projectId = ref<string>(`proj_${Date.now()}`)
const projectTitle = ref<string>((route.query.title as string) || 'Untitled Design')
const selectedColor = ref('#2f49eb')
const objectCount = ref(0)

const feedback = reactive<{ type: 'success' | 'error' | 'info' | 'warning'; message: string }>({
  type: 'info',
  message: '',
})

const activeObjectInfo = ref<{
  type: string
  left: number
  top: number
  width: number
  height: number
  angle: number
  opacity: number
} | null>(null)

const showFeedback = (type: 'success' | 'error' | 'info' | 'warning', message: string) => {
  feedback.type = type
  feedback.message = message
}

const syncCanvasState = () => {
  if (!fabricCanvas) return
  objectCount.value = fabricCanvas.getObjects().length

  const active = fabricCanvas.getActiveObject()
  hasSelection.value = Boolean(active)

  if (active) {
    activeObjectInfo.value = {
      type: active.type || 'object',
      left: Math.round(active.left || 0),
      top: Math.round(active.top || 0),
      width: Math.max(1, Math.round(active.getScaledWidth())),
      height: Math.max(1, Math.round(active.getScaledHeight())),
      angle: Math.round(active.angle || 0),
      opacity: Math.round((active.opacity ?? 1) * 100),
    }

    if (active instanceof IText) {
      selectedFontFamily.value = active.fontFamily || 'Roboto'
      selectedFontSize.value = active.fontSize || 28
      isBold.value = active.fontWeight === 'bold'
      isItalic.value = active.fontStyle === 'italic'
    }
  } else {
    activeObjectInfo.value = null
  }
}

// Apply typed Width & Height from Inspector directly to the selected object
const applyDimensionsFromInspector = () => {
  if (!fabricCanvas || !activeObjectInfo.value) return
  const active = fabricCanvas.getActiveObject()
  if (!active) return

  const newW = Math.max(5, Number(activeObjectInfo.value.width) || 10)
  const newH = Math.max(5, Number(activeObjectInfo.value.height) || 10)

  const baseW = active.width || 1
  const baseH = active.height || 1

  active.set({
    scaleX: newW / baseW,
    scaleY: newH / baseH,
  })
  active.setCoords()
  fabricCanvas.requestRenderAll()
}

// Apply typed X & Y position from Inspector
const applyPositionFromInspector = () => {
  if (!fabricCanvas || !activeObjectInfo.value) return
  const active = fabricCanvas.getActiveObject()
  if (!active) return

  active.set({
    left: Number(activeObjectInfo.value.left) || 0,
    top: Number(activeObjectInfo.value.top) || 0,
  })
  active.setCoords()
  fabricCanvas.requestRenderAll()
}

// Apply Rotation slider from Inspector
const applyAngleFromInspector = () => {
  if (!fabricCanvas || !activeObjectInfo.value) return
  const active = fabricCanvas.getActiveObject()
  if (!active) return

  active.set('angle', Number(activeObjectInfo.value.angle) || 0)
  active.setCoords()
  fabricCanvas.requestRenderAll()
}

// Apply Opacity slider from Inspector
const applyOpacityFromInspector = () => {
  if (!fabricCanvas || !activeObjectInfo.value) return
  const active = fabricCanvas.getActiveObject()
  if (!active) return

  active.set('opacity', (Number(activeObjectInfo.value.opacity) || 100) / 100)
  fabricCanvas.requestRenderAll()
}

// Layer ordering controls
const bringForward = () => {
  if (!fabricCanvas) return
  const active = fabricCanvas.getActiveObject()
  if (!active) return
  fabricCanvas.bringObjectForward(active)
  fabricCanvas.requestRenderAll()
}

const sendBackward = () => {
  if (!fabricCanvas) return
  const active = fabricCanvas.getActiveObject()
  if (!active) return
  fabricCanvas.sendObjectBackwards(active)
  fabricCanvas.requestRenderAll()
}

const handleKeyDown = (e: KeyboardEvent) => {
  const tag = (e.target as HTMLElement)?.tagName
  if (tag === 'INPUT' || tag === 'TEXTAREA') return
  if (!fabricCanvas) return

  const active = fabricCanvas.getActiveObject()
  if (active instanceof IText && active.isEditing) return

  if ((e.key === 'Delete' || e.key === 'Backspace') && active) {
    e.preventDefault()
    deleteSelected()
  }
}

const applyStarterPreset = (preset: string) => {
  if (!fabricCanvas) return

  if (preset === 'poster') {
    fabricCanvas.add(
      new Rect({ left: 90, top: 80, width: 280, height: 390, fill: '#2f49eb', rx: 16, ry: 16 }),
      new Circle({ left: 300, top: 180, radius: 95, fill: '#f59e0b' }),
      new IText('EVENT POSTER', { left: 460, top: 245, fontSize: 42, fill: '#1e293b', fontFamily: 'Roboto' })
    )
  } else if (preset === 'badge') {
    fabricCanvas.add(
      new Circle({ left: 365, top: 145, radius: 115, fill: '#fef3c7' }),
      new Triangle({ left: 415, top: 185, width: 130, height: 110, fill: '#d97706' }),
      new IText('STUDIO LOGO', { left: 385, top: 325, fontSize: 28, fill: '#1e293b', fontFamily: 'Roboto' })
    )
  } else if (preset === 'banner') {
    fabricCanvas.add(
      new Rect({ left: 110, top: 170, width: 740, height: 220, fill: '#ecfdf5', rx: 20, ry: 20 }),
      new IText('Welcome to Fabric Studio', { left: 260, top: 255, fontSize: 38, fill: '#059669', fontFamily: 'Roboto' })
    )
  } else {
    const starterRect = new Rect({
      left: 380,
      top: 210,
      width: 200,
      height: 140,
      fill: '#2f49eb',
      rx: 12,
      ry: 12,
    })
    fabricCanvas.add(starterRect)
    fabricCanvas.setActiveObject(starterRect)
  }
}

onMounted(async () => {
  initAuth()
  window.addEventListener('keydown', handleKeyDown)

  try {
    if (!canvasEl.value) {
      showFeedback('error', 'Canvas element failed to mount in browser.')
      return
    }

    fabricCanvas = new Canvas(canvasEl.value, {
      width: 960,
      height: 560,
      backgroundColor: '#ffffff',
      selection: true,
    })

    const existingId = route.query.id as string | undefined
    if (existingId) {
      const existingProject = getProjectById(existingId)
      if (existingProject) {
        projectId.value = existingProject.id
        projectTitle.value = existingProject.title
        await fabricCanvas.loadFromJSON(JSON.parse(existingProject.canvasJson))
        fabricCanvas.renderAll()
        syncCanvasState()
        showFeedback('info', `Loaded "${existingProject.title}"`)
      }
    } else {
      const preset = (route.query.preset as string) || 'default'
      applyStarterPreset(preset)
      syncCanvasState()
    }

    fabricCanvas.on('object:moving', syncCanvasState)
    fabricCanvas.on('object:scaling', syncCanvasState)
    fabricCanvas.on('object:rotating', syncCanvasState)
    fabricCanvas.on('selection:created', syncCanvasState)
    fabricCanvas.on('selection:updated', syncCanvasState)
    fabricCanvas.on('selection:cleared', syncCanvasState)
  } catch (err) {
    showFeedback('error', 'Failed to initialize Fabric.js canvas.')
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', handleKeyDown)
  if (fabricCanvas) {
    fabricCanvas.dispose()
    fabricCanvas = null
  }
})

const saveCurrentProject = () => {
  if (!fabricCanvas || !user.value?.email) {
    showFeedback('error', 'Unable to save project. Please sign in first.')
    return
  }

  fabricCanvas.discardActiveObject()
  fabricCanvas.renderAll()
  syncCanvasState()

  const thumbnail = fabricCanvas.toDataURL({
    format: 'png',
    multiplier: 0.4,
  })

  saveProject({
    id: projectId.value,
    ownerEmail: user.value.email,
    title: projectTitle.value.trim() || 'Untitled Design',
    width: fabricCanvas.getWidth(),
    height: fabricCanvas.getHeight(),
    thumbnail,
    canvasJson: JSON.stringify(fabricCanvas.toJSON()),
    objectCount: fabricCanvas.getObjects().length,
    updatedAt: new Date().toISOString(),
  })

  showFeedback('success', `Saved "${projectTitle.value}" to Dashboard!`)
}

const placeOnCanvas = (obj: FabricObject) => {
  if (!fabricCanvas) return
  fabricCanvas.add(obj)
  fabricCanvas.setActiveObject(obj)
  fabricCanvas.requestRenderAll()
  syncCanvasState()
}

const addRect = () => {
  placeOnCanvas(
    new Rect({
      left: 220 + Math.random() * 320,
      top: 130 + Math.random() * 220,
      width: 170,
      height: 100,
      fill: selectedColor.value,
      rx: 8,
      ry: 8,
    })
  )
}

const addSquare = () => {
  placeOnCanvas(
    new Rect({
      left: 240 + Math.random() * 320,
      top: 140 + Math.random() * 220,
      width: 120,
      height: 120,
      fill: selectedColor.value,
      rx: 6,
      ry: 6,
    })
  )
}

const addCircle = () => {
  placeOnCanvas(
    new Circle({
      left: 250 + Math.random() * 320,
      top: 140 + Math.random() * 220,
      radius: 60,
      fill: selectedColor.value,
    })
  )
}

const addEllipse = () => {
  placeOnCanvas(
    new Ellipse({
      left: 240 + Math.random() * 320,
      top: 150 + Math.random() * 220,
      rx: 85,
      ry: 48,
      fill: selectedColor.value,
    })
  )
}

const addTriangle = () => {
  placeOnCanvas(
    new Triangle({
      left: 250 + Math.random() * 320,
      top: 140 + Math.random() * 220,
      width: 130,
      height: 115,
      fill: selectedColor.value,
    })
  )
}

const addStar = () => {
  const spikes = 5
  const outerR = 65
  const innerR = 28
  const points: { x: number; y: number }[] = []
  for (let i = 0; i < spikes * 2; i++) {
    const r = i % 2 === 0 ? outerR : innerR
    const angle = (Math.PI / spikes) * i - Math.PI / 2
    points.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r })
  }
  placeOnCanvas(
    new Polygon(points, {
      left: 360 + Math.random() * 180,
      top: 180 + Math.random() * 140,
      fill: selectedColor.value,
    })
  )
}

const addDiamond = () => {
  const points = [
    { x: 0, y: -65 },
    { x: 55, y: 0 },
    { x: 0, y: 65 },
    { x: -55, y: 0 },
  ]
  placeOnCanvas(
    new Polygon(points, {
      left: 360 + Math.random() * 180,
      top: 180 + Math.random() * 140,
      fill: selectedColor.value,
    })
  )
}

const addHexagon = () => {
  const points: { x: number; y: number }[] = []
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 3) * i
    points.push({ x: Math.cos(angle) * 60, y: Math.sin(angle) * 60 })
  }
  placeOnCanvas(
    new Polygon(points, {
      left: 360 + Math.random() * 180,
      top: 180 + Math.random() * 140,
      fill: selectedColor.value,
    })
  )
}

const addLine = () => {
  placeOnCanvas(
    new Line([280, 260, 560, 260], {
      stroke: selectedColor.value,
      strokeWidth: 6,
      strokeLineCap: 'round',
    })
  )
}

const addHeadingText = () => {
  placeOnCanvas(
    new IText('Add a Heading', {
      left: 310,
      top: 220,
      fontSize: 44,
      fontWeight: 'bold',
      fontStyle: isItalic.value ? 'italic' : 'normal',
      fontFamily: selectedFontFamily.value,
      fill: selectedColor.value,
    })
  )
}

const addText = () => {
  placeOnCanvas(
    new IText('Double-click to edit text', {
      left: 330,
      top: 260,
      fontSize: selectedFontSize.value,
      fontWeight: isBold.value ? 'bold' : 'normal',
      fontStyle: isItalic.value ? 'italic' : 'normal',
      fontFamily: selectedFontFamily.value,
      fill: selectedColor.value,
    })
  )
}

const applyTextFormatting = () => {
  if (!fabricCanvas) return
  const active = fabricCanvas.getActiveObject()
  if (active instanceof IText) {
    active.set({
      fontFamily: selectedFontFamily.value,
      fontSize: selectedFontSize.value,
      fontWeight: isBold.value ? 'bold' : 'normal',
      fontStyle: isItalic.value ? 'italic' : 'normal',
    })
    fabricCanvas.requestRenderAll()
    syncCanvasState()
  }
}

const toggleBold = () => {
  isBold.value = !isBold.value
  applyTextFormatting()
}

const toggleItalic = () => {
  isItalic.value = !isItalic.value
  applyTextFormatting()
}

const applySwatch = (hex: string) => {
  selectedColor.value = hex
  updateSelectedColor()
}

const updateSelectedColor = () => {
  if (!fabricCanvas) return
  const active = fabricCanvas.getActiveObject() as FabricObject | undefined
  if (!active) {
    showFeedback('warning', 'Select a shape or text on the canvas first to change its color.')
    return
  }
  if (active.type === 'line') {
    active.set('stroke', selectedColor.value)
  } else {
    active.set('fill', selectedColor.value)
  }
  fabricCanvas.requestRenderAll()
}

const deleteSelected = () => {
  if (!fabricCanvas) return
  const activeObj = fabricCanvas.getActiveObject()
  const activeGroup = fabricCanvas.getActiveObjects()

  if (!activeObj && activeGroup.length === 0) {
    showFeedback('error', 'Click an object on the canvas first to select and delete it.')
    return
  }

  if (activeGroup.length > 0) {
    activeGroup.forEach((obj) => fabricCanvas?.remove(obj))
  } else if (activeObj) {
    fabricCanvas.remove(activeObj)
  }

  fabricCanvas.discardActiveObject()
  fabricCanvas.requestRenderAll()
  syncCanvasState()
  showFeedback('info', 'Selected object deleted.')
}

const clearCanvas = () => {
  if (!fabricCanvas) return
  if (fabricCanvas.getObjects().length === 0) {
    showFeedback('warning', 'The canvas is already empty.')
    return
  }
  fabricCanvas.clear()
  fabricCanvas.backgroundColor = '#ffffff'
  fabricCanvas.requestRenderAll()
  syncCanvasState()
  showFeedback('info', 'All objects cleared from canvas.')
}

const exportPNG = () => {
  if (!fabricCanvas) return
  if (fabricCanvas.getObjects().length === 0) {
    showFeedback('error', 'Cannot export an empty canvas. Add at least one shape first.')
    return
  }
  fabricCanvas.discardActiveObject()
  fabricCanvas.requestRenderAll()

  const dataUrl = fabricCanvas.toDataURL({
    format: 'png',
    multiplier: 2,
  })
  const link = document.createElement('a')
  link.download = `${projectTitle.value.toLowerCase().replace(/\s+/g, '-') || 'fabric-canvas'}.png`
  link.href = dataUrl
  link.click()
  showFeedback('success', 'Canvas exported as PNG image!')
}
</script>

<style scoped>
.studio-shell {
  height: calc(100vh - 64px);
  width: 100%;
  background-color: #ebedf0;
}

.studio-rail {
  width: 72px;
  min-width: 72px;
  z-index: 2;
}

.rail-btn {
  width: 58px;
  height: 58px;
  border-radius: 12px;
  border: none;
  background: transparent;
  color: #475569;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.15s ease;
}

.rail-btn:hover {
  background-color: #f1f5f9;
  color: #2f49eb;
}

.rail-btn.active {
  background-color: #eef2ff;
  color: #2f49eb;
  font-weight: 700;
}

.studio-drawer {
  width: 260px;
  min-width: 260px;
  height: 100%;
}

.studio-workspace {
  overflow: auto;
  background-color: #ebedf0;
}

.artboard-frame {
  background: #ffffff;
  line-height: 0;
  border-radius: 4px;
  overflow: hidden;
}

.floating-alert {
  position: absolute;
  top: 14px;
  z-index: 10;
  max-width: 460px;
}

.swatch-dot {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  box-shadow: 0 0 0 1px #cbd5e1;
  cursor: pointer;
}
</style>