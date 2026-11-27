"use client";
import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import type { Group } from "three";

function Shard({position,rotation,scale=1}:{position:[number,number,number];rotation:[number,number,number];scale?:number}){
  return <mesh position={position} rotation={rotation} scale={scale} castShadow><octahedronGeometry args={[.32,0]}/><meshStandardMaterial color="#6f687f" roughness={.78} metalness={.34} flatShading/></mesh>;
}
function RuinedGate(){
  const group=useRef<Group>(null);
  useFrame((state,delta)=>{if(!group.current)return;group.current.rotation.y+=delta*.045;group.current.position.y=Math.sin(state.clock.elapsedTime*.42)*.055;});
  return <group ref={group}>
    <mesh position={[-1.08,.04,0]} rotation={[0,0,-.035]} castShadow><boxGeometry args={[.34,3.7,.42]}/><meshStandardMaterial color="#282631" roughness:.92 metalness:.18/></mesh>
    <mesh position={[1.05,-.12,0]} rotation={[0,0,.07]} castShadow><boxGeometry args={[.42,3.25,.48]}/><meshStandardMaterial color="#373341" roughness={.9} metalness={.22}/></mesh>
    <mesh position={[-.12,1.78,0]} rotation={[0,0,-.12]}><boxGeometry args={[2.2,.24,.48]}/><meshStandardMaterial color="#302c39" roughness={.86}/></mesh>
    <mesh position={[.3,1.96,.03]} rotation={[0,0,.5]}><boxGeometry args={[.7,.22,.34]}/><meshStandardMaterial color="#4e4659" roughness={.82}/></mesh>
    <mesh position={[-.26,-1.82,0]} rotation={[0,0,.015]}><boxGeometry args={[3.25,.12,1.7]}/><meshStandardMaterial color="#18171d" roughness={.95}/></mesh>
    <mesh position={[.08,.05,.32]} rotation={[0,0,-.4]}><boxGeometry args={[.025,4.1,.025]}/><meshBasicMaterial color="#c94a67"/></mesh>
    <Shard position={[-1.55,1.6,.22]} rotation={[.4,.2,.6]} scale={1.35}/><Shard position={[1.48,1,-.18]} rotation={[.8,.3,-.3}/><Shard position={[1.55,-1.18,.18]} rotation={[.2,.8,.7]} scale={.8}/><Shard position={[-1.25,-1.22,-.22]} rotation={[.5,.1,-.6]} scale={.72}/>
  </group>;
}
function Atmosphere(){
  const points=useRef<Group>(null);
  useFrame((_,delta)=>{if(points.current)points.current.rotation.z+=delta*.008;});
  return <group ref={points}>{Array.from({length:30},(_,i)=>{const angle=i*2.399;const radius=1.8+(i%7)*.31;return <mesh key={i} position={[Math.cos(angle)*radius,Math.sin(angle)*radius*.82,-.8-(i%5)*.22]}><sphereGeometry args={[i%5===0?.025:.012,6,6]}/><meshBasicMaterial color={i%4===0?"#d18b9b":"#77718b"} transparent opacity={.72}/></mesh>;})}</group>;
}
export default function HeroScene(){
  return <Canvas camera={{position:[0,0,7.2],fov:35}} dpr={[1,1.4]} gl={{alpha:true,antialias:false,powerPreference:"low-power"}}><ambientLight intensity={1.05}/><directionalLight position={[3,4,5]} intensity={2.1} color="#d7d1e5"/><pointLight position={[-2,0,2]} intensity={2.7} color="#8d5d96" distance={8}/><pointLight position={[1,1,1]} intensity={1.8} color="#bb4c66" distance={5}/><RuinedGate/><Atmosphere/></Canvas>;
}
