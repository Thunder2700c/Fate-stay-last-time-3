import * as THREE from 'three'

/**
 * A restrained, procedural 3D signature for the brand gateway.
 * It is deliberately an abstract identity mark, not a depiction of story canon.
 */
export function mountBrandArtifact(host: HTMLElement): () => void {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 30)
  camera.position.set(0, 0, 6.2)

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: false,
    powerPreference: 'low-power',
    stencil: false,
    depth: true,
  })
  const coarse = window.matchMedia('(pointer: coarse)').matches
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, coarse ? 1.15 : 1.5))
  renderer.setClearColor(0x000000, 0)
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05
  renderer.domElement.className = 'brand-artifact-canvas'
  renderer.domElement.setAttribute('aria-hidden', 'true')
  host.appendChild(renderer.domElement)

  const artifact = new THREE.Group()
  scene.add(artifact)

  const body = new THREE.MeshPhysicalMaterial({
    color: 0x75635c,
    metalness: 0.58,
    roughness: 0.29,
    clearcoat: 0.72,
    clearcoatRoughness: 0.22,
  })
  const seam = new THREE.MeshStandardMaterial({
    color: 0xb18b72,
    metalness: 0.72,
    roughness: 0.3,
  })

  // A nearly closed ring: one continuous arc and one separated terminal.
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(1.34, 0.105, 20, 160, Math.PI * 1.72),
    body,
  )
  ring.rotation.set(0.16, 0.08, -0.52)
  artifact.add(ring)

  const terminal = new THREE.Mesh(
    new THREE.TorusGeometry(1.34, 0.105, 20, 36, Math.PI * 0.22),
    seam,
  )
  terminal.rotation.set(0.16, 0.08, -0.52 + Math.PI * 1.72 + 0.045)
  artifact.add(terminal)

  const innerLine = new THREE.Mesh(
    new THREE.TorusGeometry(1.34, 0.012, 8, 160, Math.PI * 1.72),
    seam,
  )
  innerLine.rotation.copy(ring.rotation)
  innerLine.scale.setScalar(0.985)
  artifact.add(innerLine)

  const ambient = new THREE.HemisphereLight(0xf5e9dd, 0x28212a, 1.35)
  scene.add(ambient)
  const key = new THREE.DirectionalLight(0xffe7d4, 3.1)
  key.position.set(-3.5, 4, 5)
  scene.add(key)
  const rim = new THREE.PointLight(0xa5a8c7, 18, 12, 2)
  rim.position.set(3.2, -1.4, -2.4)
  scene.add(rim)

  const resize = () => {
    const rect = host.getBoundingClientRect()
    const width = Math.max(1, rect.width)
    const height = Math.max(1, rect.height)
    camera.aspect = width / height
    camera.position.z = width < 520 ? 7.1 : 6.2
    camera.updateProjectionMatrix()
    renderer.setSize(width, height, false)
  }
  const observer = new ResizeObserver(resize)
  observer.observe(host)
  resize()

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 }
  const onPointer = (event: PointerEvent) => {
    const rect = host.getBoundingClientRect()
    pointer.tx = ((event.clientX - rect.left) / rect.width - 0.5) * 0.32
    pointer.ty = ((event.clientY - rect.top) / rect.height - 0.5) * 0.24
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
    if (time - last < 32) return
    const delta = Math.min((time - last) / 1000, 0.05)
    last = time
    elapsed += delta
    pointer.x += (pointer.tx - pointer.x) * 0.035
    pointer.y += (pointer.ty - pointer.y) * 0.035
    artifact.rotation.y = Math.sin(elapsed * 0.18) * 0.13 + pointer.x
    artifact.rotation.x = Math.cos(elapsed * 0.15) * 0.045 - pointer.y
    artifact.rotation.z = Math.sin(elapsed * 0.11) * 0.025
    renderer.render(scene, camera)
    if (!host.classList.contains('is-rendered')) host.classList.add('is-rendered')
  }
  const onVisibility = () => {
    if (document.visibilityState === 'hidden') cancelAnimationFrame(frame)
    else if (!destroyed) { last = 0; frame = requestAnimationFrame(draw) }
  }
  const onContextLost = (event: Event) => {
    event.preventDefault()
    host.classList.remove('is-rendered')
    cancelAnimationFrame(frame)
  }
  const onContextRestored = () => {
    if (!destroyed && document.visibilityState === 'visible') frame = requestAnimationFrame(draw)
  }

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
    ring.geometry.dispose()
    terminal.geometry.dispose()
    innerLine.geometry.dispose()
    body.dispose()
    seam.dispose()
    renderer.dispose()
    renderer.domElement.remove()
    host.classList.remove('is-rendered')
  }
}
