import * as THREE from 'three'

/**
 * Abstract fractured-light sculpture for the gateway.
 * This is a visual identity element only; it does not depict story canon.
 */
export function mountBrandArtifact(host: HTMLElement): () => void {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40)
  camera.position.set(0, 0, 7)

  const coarse = window.matchMedia('(pointer: coarse)').matches
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: 'low-power', depth: true, stencil: false })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.05 : 1.35))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.15
  renderer.domElement.className = 'brand-artifact-canvas'
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.appendChild(renderer.domElement)

  const sculpture = new THREE.Group()
  scene.add(sculpture)

  const crystal = new THREE.MeshPhysicalMaterial({ color: 0x8f234f, metalness: 0.78, roughness: 0.16, clearcoat: 1, clearcoatRoughness: 0.08, emissive: 0x270713, emissiveIntensity: 0.55 })
  const shadow = new THREE.MeshPhysicalMaterial({ color: 0x27203f, metalness: 0.84, roughness: 0.22, clearcoat: 0.8 })
  const edgeMaterial = new THREE.LineBasicMaterial({ color: 0xff526f, transparent: true, opacity: 0.8 })

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05, 0), crystal)
  core.rotation.set(0.2, 0.4, -0.15)
  sculpture.add(core)

  const shards: THREE.Mesh[] = []
  const shardData = [
    { x: -1.18, y: 0.34, z: 0.18, rx: 0.2, ry: -0.45, rz: 0.48, scale: 0.8 },
    { x: 1.1, y: 0.72, z: -0.2, rx: -0.5, ry: 0.6, rz: -0.3, scale: 0.66 },
    { x: 0.92, y: -0.9, z: 0.36, rx: 0.6, ry: 0.1, rz: 0.9, scale: 0.72 },
    { x: -0.82, y: -1.05, z: -0.38, rx: -0.2, ry: 0.8, rz: -0.6, scale: 0.55 },
    { x: 0.05, y: 1.42, z: -0.5, rx: 0.3, ry: 0.2, rz: 0.1, scale: 0.48 },
  ]
  for (const item of shardData) {
    const shard = new THREE.Mesh(new THREE.ConeGeometry(0.38, 1.65, 4, 1), shadow)
    shard.position.set(item.x, item.y, item.z)
    shard.rotation.set(item.rx, item.ry, item.rz)
    shard.scale.setScalar(item.scale)
    sculpture.add(shard)
    shards.push(shard)
    const outline = new THREE.LineSegments(new THREE.EdgesGeometry(shard.geometry), edgeMaterial)
    outline.position.copy(shard.position)
    outline.rotation.copy(shard.rotation)
    outline.scale.copy(shard.scale)
    sculpture.add(outline)
  }

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.012, 0.012, 5.8, 8),
    new THREE.MeshBasicMaterial({ color: 0xff284d, transparent: true, opacity: 0.52 }),
  )
  beam.rotation.z = -0.28
  beam.position.set(0.7, 0.1, -1.1)
  sculpture.add(beam)

  const ambient = new THREE.HemisphereLight(0x9a8ab9, 0x080711, 1.1)
  scene.add(ambient)
  const key = new THREE.DirectionalLight(0xffd7e0, 3.3)
  key.position.set(-3, 4, 5)
  scene.add(key)
  const red = new THREE.PointLight(0xff244f, 24, 12, 2)
  red.position.set(2.2, 0.2, 2.5)
  scene.add(red)
  const violet = new THREE.PointLight(0x7754c5, 16, 11, 2)
  violet.position.set(-2.8, -1.2, -1.8)
  scene.add(violet)

  const resize = () => {
    const rect = host.getBoundingClientRect()
    const width = Math.max(1, rect.width)
    const height = Math.max(1, rect.height)
    camera.aspect = width / height
    camera.position.z = width < 620 ? 8.2 : 7
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }
  const observer = new ResizeObserver(resize)
  observer.observe(host)
  resize()

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  const onPointer = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect()
    pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 0.24
    pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18
  }
  const onLeave = () => { pointer.tx = 0; pointer.ty = 0 }
  host.addEventListener('pointermove', onPointer, { passive: true })
  host.addEventListener('pointerleave', onLeave)

  let frame = 0
  let last = 0
  let elapsed = 0
  let destroyed = false
  const draw = (time: number) => {
    if (destroyed || document.visibilityState !== 'visible') return
    frame = requestAnimationFrame(draw)
    if (time - last < 34) return
    const delta = Math.min((time - last) / 1000, 0.05)
    last = time
    elapsed += delta
    pointer.x += (pointer.tx - pointer.x) * 0.035
    pointer.y += (pointer.ty - pointer.y) * 0.035
    sculpture.rotation.y = elapsed * 0.12 + pointer.x
    sculpture.rotation.x = Math.sin(elapsed * 0.22) * 0.08 - pointer.y
    sculpture.rotation.z = Math.sin(elapsed * 0.15) * 0.035
    core.rotation.y = elapsed * -0.08
    shards.forEach((shard, index) => { shard.rotation.y += delta * (index % 2 ? 0.07 : -0.055) })
    renderer.render(scene, camera)
    if (!host.classList.contains('is-rendered')) host.classList.add('is-rendered')
  }
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') cancelAnimationFrame(frame)
    else if (!destroyed) { last = 0; frame = requestAnimationFrame(draw) }
  }
  const onContextLost = (event: Event) => { event.preventDefault(); host.classList.remove('is-rendered'); cancelAnimationFrame(frame) }
  const onContextRestored = () => { if (!destroyed && document.visibilityState === 'visible') frame = requestAnimationFrame(draw) }

  renderer.domElement.addEventListener('webglcontextlost', onContextLost, false)
  renderer.domElement.addEventListener('webglcontextrestored', onContextRestored, false)
  document.addEventListener('visibilitychange', onVisibility)
  frame = requestAnimationFrame(draw)

  return () => {
    destroyed = true
    cancelAnimationFrame(frame)
    observer.disconnect()
    document.removeEventListener('visibilitychange', onVisibility)
    host.removeEventListener('pointermove', onPointer)
    host.removeEventListener('pointerleave', onLeave)
    renderer.domElement.removeEventListener('webglcontextlost', onContextLost)
    renderer.domElement.removeEventListener('webglcontextrestored', onContextRestored)
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) object.geometry.dispose()
    })
    crystal.dispose()
    shadow.dispose()
    edgeMaterial.dispose()
    renderer.dispose()
    renderer.domElement.remove()
    host.classList.remove('is-rendered')
  }
}
