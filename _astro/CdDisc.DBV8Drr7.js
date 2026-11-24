import{W as E,c as W,S as A,P as V,d as F,D as B,e as H,a as D,C as j,G,j as I}from"./three.module.CjffdGb1.js";import{r as S}from"./index.RH_Wq4ov.js";const O=`
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vUv = uv;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`,U=`
  precision highp float;

  uniform float uTime;
  uniform float uHighlight;
  uniform float uAlpha;
  uniform vec3 uPaletteTL;
  uniform vec3 uPaletteBR;

  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying vec3 vWorldNormal;

  // Clean visible-spectrum approximation (t in [0, 1])
  vec3 spectral_color(float x) {
    float t = clamp(x, 0.0, 1.0);
    float r = clamp(1.5 - abs(4.0 * t - 3.0), 0.0, 1.0)
      + 0.35 * clamp(1.0 - abs(6.0 * t - 0.6), 0.0, 1.0);
    float g = clamp(1.5 - abs(4.0 * t - 2.0), 0.0, 1.0);
    float b = clamp(1.5 - abs(4.0 * t - 1.0), 0.0, 1.0);
    float envelope = smoothstep(0.0, 0.12, t) * (1.0 - smoothstep(0.85, 1.0, t));
    return vec3(r, g, b) * envelope;
  }

  // Procedural studio reflection matching the dark WiiFlow environment
  vec3 cd_env_reflection(vec3 refl, vec3 pal_tl, vec3 pal_br) {
    float up = clamp(refl.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 env = mix(vec3(0.07, 0.08, 0.11), vec3(0.22, 0.25, 0.32), up);
    env += mix(pal_br, pal_tl, up) * 0.08;
    float overhead = smoothstep(0.45, 0.92, refl.y) * 0.55;
    float horizon = exp(-abs(refl.y) * 14.0) * 0.18;
    return env + vec3(overhead + horizon);
  }

  void main() {
    // Screen-space derivative in uniform control flow for crisp AA edges
    float aa = max(length(fwidth(vUv)) * 1.25, 0.002);

    vec2 p = vUv * 2.0 - vec2(1.0, 1.0);
    float r = length(p);
    float r_aa = max(fwidth(r), 0.0008);

    vec3 N = normalize(vWorldNormal);
    if (!gl_FrontFacing) {
      N = -N;
    }

    // Directional lighting from top-right-front
    vec3 light_dir = normalize(vec3(0.35, 0.75, 0.55));
    float ambient = 0.50;
    float diffuse = max(dot(N, light_dir), 0.0) * 0.50;
    float light_factor = ambient + diffuse + uHighlight * 0.20;

    vec3 base_color = vec3(0.1, 0.1, 0.12);
    float final_alpha = uAlpha;

    // Circular disc cutout & spindle hole
    if (r > 1.0 || r < 0.125) {
      discard;
    }

    vec3 V = normalize(cameraPosition - vWorldPos);
    float NdotV = max(dot(N, V), 0.0);
    float fresnel = pow(1.0 - NdotV, 4.0);

    // Local tangent basis for radial & tangential groove vectors
    vec3 up_ref = abs(N.y) > 0.99 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
    vec3 T_x = normalize(cross(up_ref, N));
    vec3 T_y = cross(N, T_x);
    vec2 p_dir = p / max(r, 1e-4);
    vec3 R_dir = normalize(T_x * p_dir.x + T_y * p_dir.y); // Outward radial
    vec3 T_dir = normalize(-T_x * p_dir.y + T_y * p_dir.x); // Along circular grooves

    // Subtle breathing shimmer rather than a flat pinwheel spin
    vec3 wobble = vec3(
      sin(uTime * 0.6) * 0.08,
      cos(uTime * 0.45) * 0.05,
      0.0
    );
    vec3 L1 = normalize(light_dir + wobble);
    vec3 L2 = normalize(vec3(-0.55, -0.30, 0.75) - wobble * 0.5);
    vec3 H1 = normalize(L1 + V);
    vec3 H2 = normalize(L2 + V);

    vec3 refl = reflect(-V, N);
    vec3 env_col = cd_env_reflection(refl, uPaletteTL, uPaletteBR);

    float outer_aa = 1.0 - smoothstep(1.0 - r_aa * 1.5, 1.0, r);
    float inner_aa = smoothstep(0.125, 0.125 + r_aa * 1.5, r);
    float edge_mask = outer_aa * inner_aa;

    if (r < 0.275) {
      // 1. Clear polycarbonate inner hub + molded 3D stacking ring
      vec2 light_2d = normalize(vec2(0.45, 0.85));
      float bevel_dir = dot(p_dir, light_2d);

      // Spindle hole wall thickness (r = 0.125 .. 0.138)
      float hole_wall = 1.0 - smoothstep(0.125, 0.138, r);
      float hole_rim = 1.0 - smoothstep(0.0, 0.004 + r_aa, abs(r - 0.136));

      // Molded stacking ring ridge (r = 0.236) with directional top/bottom bevel
      float stack_dist = (r - 0.236) / 0.009;
      float stack_profile = exp(-stack_dist * stack_dist * 2.2);
      float stack_slope = -stack_dist * stack_profile;

      // Optical step where clear polycarbonate meets the inner edge of the aluminum layer
      float alum_step = smoothstep(0.264, 0.275, r);

      vec3 glass_base = mix(
        vec3(0.62, 0.66, 0.72),
        env_col + vec3(0.38),
        0.45 + fresnel * 0.55
      );
      float stack_light = stack_profile * 0.22 + stack_slope * bevel_dir * 0.28;
      float inner_bevel = hole_wall * (0.20 + 0.22 * bevel_dir) + hole_rim * 0.18;
      float outer_step = alum_step * (0.14 + 0.20 * bevel_dir);
      float spec_glint = pow(max(dot(N, H1), 0.0), 64.0) * 0.45;

      base_color = glass_base + vec3(stack_light + inner_bevel + outer_step + spec_glint);
      float hub_alpha =
        0.46 + fresnel * 0.30 + stack_profile * 0.28 + hole_wall * 0.22 + alum_step * 0.18;
      final_alpha = uAlpha * clamp(hub_alpha, 0.0, 0.94) * edge_mask;
    } else if (r > 0.968) {
      // 5. Outer clear beveled rim
      vec2 light_2d = normalize(vec2(0.45, 0.85));
      float rim_lit = 0.5 + 0.5 * dot(p_dir, light_2d);
      float rim_edge = smoothstep(0.968, 0.992, r);
      base_color = env_col * 0.8 + vec3(0.35 + 0.45 * rim_lit * rim_edge);
      final_alpha = uAlpha * (0.35 + 0.45 * rim_edge) * edge_mask;
    } else {
      // Metallic base (shared by mirror band & data area)
      float aniso1 = pow(clamp(1.0 - abs(dot(T_dir, H1)), 0.0, 1.0), 14.0)
        * max(dot(N, L1), 0.0);
      float aniso2 = pow(clamp(1.0 - abs(dot(T_dir, H2)), 0.0, 1.0), 10.0)
        * max(dot(N, L2), 0.0);
      vec3 spec_white = vec3(0.95, 0.97, 1.0) * (aniso1 * 0.85 + aniso2 * 0.30);

      vec3 clearcoat = vec3(0.85, 0.90, 1.0) * fresnel * 0.30;

      vec3 col = env_col * 1.15 + spec_white + clearcoat;

      if (r < 0.375) {
        // 2. Smooth sputtered-aluminum mirror band (no data pits)
        vec2 light_2d = normalize(vec2(0.45, 0.85));
        float bevel_dir = dot(p_dir, light_2d);

        float m_aniso1 = pow(clamp(1.0 - abs(dot(T_dir, H1)), 0.0, 1.0), 36.0)
          * max(dot(N, L1), 0.0);
        float m_aniso2 = pow(clamp(1.0 - abs(dot(T_dir, H2)), 0.0, 1.0), 24.0)
          * max(dot(N, L2), 0.0);
        float m_broad = pow(clamp(1.0 - abs(dot(T_dir, H1)), 0.0, 1.0), 6.0) * 0.14;
        vec3 m_spec = vec3(0.96, 0.98, 1.0)
          * (m_aniso1 * 1.15 + m_aniso2 * 0.38 + m_broad);

        float lathe = 0.97 + 0.03 * sin(r * 620.0);
        col = (env_col * 0.68 + m_spec + clearcoat * 0.85) * lathe;

        // Inner aluminum boundary lip at r = 0.275
        float inner_lip = 1.0 - smoothstep(0.275, 0.275 + 0.005 + r_aa, r);
        col += vec3(inner_lip * (0.06 + 0.16 * bevel_dir));

        // Two hair-thin concentric stamper grooves (r = 0.294 and 0.354)
        float g1_d = (r - 0.294) / max(0.0022, r_aa);
        float g2_d = (r - 0.354) / max(0.0022, r_aa);
        float g1 = exp(-g1_d * g1_d * 2.0);
        float g2 = exp(-g2_d * g2_d * 2.0);
        col += vec3(
          (g1 * (-g1_d) + g2 * (-g2_d)) * bevel_dir * 0.22 - (g1 + g2) * 0.05
        );

        // Subtle rotating matrix / IFPI barcode arc confined to one sector
        float rot_angle = atan(p.y, p.x) + uTime * 0.35;
        float arc_wrap = atan(sin(rot_angle), cos(rot_angle));
        float in_arc = 1.0 - smoothstep(0.50, 0.65, abs(arc_wrap));
        float matrix_band = 1.0 - smoothstep(0.0, 0.007 + r_aa, abs(r - 0.324));
        float bar_pattern = step(0.15, sin(arc_wrap * 140.0) * cos(arc_wrap * 53.0));
        col -= vec3(in_arc * matrix_band * bar_pattern * 0.11);

        // Clean lead-in step into the pitted data zone at r = 0.375
        float lead_in = smoothstep(0.375 - 0.004 - r_aa, 0.375, r);
        col += vec3(lead_in * (0.01 + 0.12 * bevel_dir));
      } else {
        // 3. Data zone: physically-inspired radial diffraction grating
        float grat1 = abs(dot(R_dir, L1 + V));
        float grat2 = abs(dot(R_dir, L2 + V));

        // 1st and 2nd diffraction orders
        vec3 rainbow1 = spectral_color((grat1 - 0.18) * 1.55)
          + spectral_color((grat1 - 0.72) * 1.40) * 0.45;
        vec3 rainbow2 = spectral_color((grat2 - 0.22) * 1.55) * 0.55;

        // Broad radial butterfly envelope
        float lobe1 = pow(clamp(1.0 - abs(dot(T_dir, H1)), 0.0, 1.0), 3.0);
        float lobe2 = pow(clamp(1.0 - abs(dot(T_dir, H2)), 0.0, 1.0), 3.0);

        // Subtle burned/unburned data-zone boundary around r = 0.83
        float burned_band = smoothstep(0.825, 0.835, r);
        float diff_strength = mix(0.82, 0.62, burned_band);
        float band_tint = mix(1.0, 1.08, burned_band);

        // Very subtle high-frequency micro-sheen (no chunky vinyl rings)
        float micro = 0.985 + 0.015 * sin(r * 750.0);

        col = col * band_tint * micro
          + (rainbow1 * lobe1 + rainbow2 * lobe2) * diff_strength;
      }

      // Slight boost when the parent album is highlighted
      base_color = col * (1.0 + uHighlight * 0.18);
      final_alpha = uAlpha * edge_mask;
    }

    gl_FragColor = vec4(base_color, final_alpha);
  }
`;function q({label:C="Procedural compact disc"}){const g=S.useRef(null);return S.useEffect(()=>{const e=g.current;if(!e)return;let a;try{a=new E({antialias:!0,alpha:!0,powerPreference:"high-performance"})}catch{return}a.setPixelRatio(Math.min(window.devicePixelRatio||1,2)),a.setClearColor(0,0),a.outputColorSpace=W;const i=new A,l=new V(32,1,.1,100);l.position.set(0,.05,5);const n={uTime:{value:0},uHighlight:{value:0},uAlpha:{value:1},uPaletteTL:{value:new H(.42,.48,1)},uPaletteBR:{value:new H(1,.4,.6)}},b=new F({vertexShader:O,fragmentShader:U,uniforms:n,transparent:!0,depthWrite:!1,side:B}),s=new D(new j(1.35,192),b),r=new G;r.rotation.set(-.42,.3,0),r.add(s),i.add(r),e.appendChild(a.domElement);const w=window.matchMedia("(prefers-reduced-motion: reduce)").matches,x=()=>{const o=e.clientWidth||1,t=e.clientHeight||1;a.setSize(o,t,!1),l.aspect=o/t,l.updateProjectionMatrix(),w&&a.render(i,l)},y=new ResizeObserver(x);y.observe(e),x();let d=!0,m=0,T=0,c=0,p=0,_=0,v=0,f=0,h=0;const R=r.rotation.x,M=r.rotation.y,z=o=>{m=requestAnimationFrame(z);const t=c?Math.min((o-c)/1e3,.05):0;if(c=o,!d||document.hidden)return;T+=t*.22,s.rotation.z=T;const u=1-Math.pow(.001,t);f+=(p-f)*u,h+=(_-h)*u,r.rotation.x=R+f,r.rotation.y=M+h,n.uTime.value+=t,n.uHighlight.value+=(v-n.uHighlight.value)*u,a.render(i,l)},P=o=>{const t=e.getBoundingClientRect();p=((o.clientY-t.top)/t.height-.5)*.28,_=((o.clientX-t.left)/t.width-.5)*.42},L=()=>{v=.35},N=()=>{p=0,_=0,v=0};w?a.render(i,l):(e.addEventListener("pointermove",P),e.addEventListener("pointerenter",L),e.addEventListener("pointerleave",N),m=requestAnimationFrame(z));const k=new IntersectionObserver(([o])=>{d=o.isIntersecting,d&&(c=0)},{threshold:.01});return k.observe(e),()=>{cancelAnimationFrame(m),k.disconnect(),y.disconnect(),e.removeEventListener("pointermove",P),e.removeEventListener("pointerenter",L),e.removeEventListener("pointerleave",N),s.geometry.dispose(),b.dispose(),a.dispose(),a.domElement.parentNode===e&&e.removeChild(a.domElement)}},[]),I.jsx("div",{className:"cd-disc",ref:g,role:"img","aria-label":C})}export{q as default};
