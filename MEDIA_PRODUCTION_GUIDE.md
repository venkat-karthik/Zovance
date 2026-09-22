# ZOVANCE — Media Asset Production Specification & Generation Guide
*Inspired by the Editorial, High-Impact Media Architecture of Apple.com*

---

## 1. Executive Summary & Aesthetic Paradigm

Apple's web architecture relies on **visual supremacy with editorial economy**:
1. **Less Text, Massive Impact**: Short, poetic headlines (3–7 words) paired with edge-to-edge cinematic media.
2. **Video vs. Photo Hierarchy**:
   - **Hero Stage**: Autoplaying, muted, looping ambient video (16:9 or 21:9) with interactive pause/play and full-screen modal expansion.
   - **Capabilities / Pillars**: High-contrast, hyper-detailed photography highlighting humans and architectural systems working harmoniously.
   - **Galleries / Case Studies**: 16:10 video preview cards with distinct play badges and duration stamps.
3. **Color Palette & Treatment**:
   - **Primary**: Cloud White (`#FFFFFF`), Soft Sky (`#F2FAFD`), Navy (`#102C42`), Slate (`#526673`).
   - **Accent**: Grass Green (`#38A85B`), Deep Sky Blue (`#3E9FD0`).
   - **Image Grade**: Clean, daylight, natural soft shadows, neutral skin tones, architectural symmetry. Strictly no cheesy purple neon, sci-fi robotics, or dark hacker themes.

---

## 2. Master Media Inventory & Generation Prompts

### Asset #1: Hero Ambient Brand Film (Autoplaying Video)
* **Location**: `src/pages/website/HomePage.jsx` — Stage 1 (Hero Cinematic Canvas)
* **Element Type**: `<video autoPlay loop muted playsInline>` with interactive play/pause and full-screen trigger
* **Dimensions & Format**: 3840 × 2160 (4K UHD) or 1920 × 1080 (Full HD), 60fps or 30fps, MP4 (H.265 / H.264), bitrate ~8-12 Mbps, silent/muted.
* **Duration**: 8 to 15 seconds seamless loop.
* **Visual Direction**:
  - Sweeping, ultra-smooth drone shot gliding forward over a tranquil alpine lake surrounded by pine forests, transitioning toward an elegant, floor-to-ceiling glass modern architectural pavilion at morning golden hour.
  - Soft sunlight reflections on clear water, subtle movement of mist and leaves. Evokes clarity, intelligence, and calmness.
* **AI Video Generation Prompt (Runway Gen-3 / Sora / Pika)**:
  > `"Cinematic 4K drone shot gliding slowly forward over a serene mist-covered alpine lake at sunrise. In the distance, an ultra-modern minimalist glasshouse pavilion stands with warm interior ambient light. Glass reflections, crystal clear water ripples, gentle breeze in pine trees. Apple-grade color grade, shot on Arri Alexa LF 35mm lens, natural daylight, photorealistic, pristine, serene, 60fps."`
* **Fallback Poster Image Prompt (Midjourney v6 / DALL-E 3)**:
  > `"Panoramic view of an ultra-modern minimalist architectural glass pavilion overlooking a pristine alpine lake at dawn. Crisp natural daylight, glass reflections of calm water and mountain mist, Apple-inspired editorial photography, ultra-detailed 8K, architectural digest cover style --ar 16:9 --style raw --v 6.0"`

---

### Asset #2: Architectural Philosophy Glasshouse (Hero Photo)
* **Location**: `src/pages/website/HomePage.jsx` — Stage 3 ("Who We Are")
* **Element Type**: High-Resolution Photography (`<img>`) with darkened subtle bottom gradient overlay
* **Dimensions & Format**: 3840 × 1645 (21:9 Ultra-Wide aspect), WebP / AVIF, ~300KB compressed.
* **Visual Direction**:
  - A breathtaking wide architectural shot of a modern workspace with 20-foot floor-to-ceiling windows overlooking lush green trees.
  - Natural light pouring in across warm oak tables and clean matte steel surfaces. 2–3 people collaborating in the distance with genuine smiles and natural postures.
* **AI Image Generation Prompt (Midjourney v6 / Imagen 3)**:
  > `"Wide architectural photo of an ultra-spacious, daylight-filled modern innovation studio. Double-height ceilings with massive floor-to-ceiling glass windows showing vibrant green foliage outside. Minimalist Scandinavian oak furniture, soft natural daylight, quiet elegance. Two thoughtful professionals collaborating at a long wooden table in the background. Shot on Hasselblad H6D-100c, 24mm f/8, crisp textures, Apple aesthetic --ar 21:9 --style raw --v 6.0"`

---

### Asset #3: Capability 01 — Voice AI (Photo / Video Clip)
* **Location**: `src/pages/website/HomePage.jsx` — Stage 4 ("What We Do" Panel 1)
* **Element Type**: High-Detail Editorial Portrait / Interactive Video
* **Dimensions & Format**: 1920 × 1080 (16:9) or 1400 × 900 (7:5 split ratio), WebP / MP4.
* **Visual Direction**:
  - A poised, professional woman wearing a discreet, modern wireless earbud in a sunlit boutique hotel or executive office, conversing naturally while glancing at an iPad.
  - Warm, human-first composition emphasizing effortless communication.
* **AI Image Generation Prompt**:
  > `"Editorial portrait of a warm, professional Asian-American woman in her early 30s speaking naturally with a discreet wireless earbud in an upscale sunlit boutique lobby. Soft natural rim light, authentic friendly expression, clean blurred background of contemporary interior design. Shot on Leica SL2 50mm f/1.4, cinematic natural color palette, high fashion technology editorial --ar 16:10 --v 6.0"`

---

### Asset #4: Capability 02 — AI & Automation (Architectural Photo)
* **Location**: `src/pages/website/HomePage.jsx` — Stage 4 ("What We Do" Panel 2)
* **Element Type**: High-Detail Structural Systems Photography
* **Dimensions & Format**: 1920 × 1080 (16:9), WebP.
* **Visual Direction**:
  - Complex yet orderly modern glass-and-steel architectural facades intersecting cleanly against a soft sky.
  - Symbolizes interconnected systems, data harmony, and friction-free flow.
* **AI Image Generation Prompt**:
  > `"Minimalist architectural photo looking up at two intersecting modern glass-and-steel towers against a pale soft sky. Clean geometrical lines, precision engineering, subtle reflections of clouds on tinted glass panels. High dynamic range, crisp sharp details, architectural harmony, Apple-style corporate visual --ar 16:10 --style raw --v 6.0"`

---

### Asset #5: Capability 03 — Business Platforms & Digital Engineering
* **Location**: `src/pages/website/HomePage.jsx` — Stage 4 ("What We Do" Panel 3)
* **Element Type**: High-Detail Candid Technology Work
* **Dimensions & Format**: 1920 × 1080 (16:9), WebP.
* **Visual Direction**:
  - Close candid of product designers and systems architects gathered around a sleek high-resolution display reviewing clean interface topography.
  - Warm coffee cups on desk, hands gesturing thoughtfully. Focus on craftsmanship.
* **AI Image Generation Prompt**:
  > `"Candid cinematic photo of two software architects in a bright, modern studio collaborating over an ultra-thin monitor displaying minimal system diagrams. Focused, calm expressions, natural daylight from a side window, warm oak wood desk, premium craftsmanship. 35mm film aesthetic, clean depth of field, authentic moment --ar 16:10 --v 6.0"`

---

### Asset #6: Capability 04 — Enterprise Reliability & Infrastructure
* **Location**: `src/pages/website/HomePage.jsx` — Stage 4 ("What We Do" Panel 4)
* **Element Type**: Global Data Connectivity / Sustainable Tech Photography
* **Dimensions & Format**: 1920 × 1080 (16:9), WebP.
* **Visual Direction**:
  - An expansive aerial view of illuminated city grids at twilight connecting like organic neural pathways, meeting an ocean coastline.
  - Conveys resilience, global scale, and continuous uptime.
* **AI Image Generation Prompt**:
  > `"Breathtaking high-altitude night aerial view of an enlightened coastal metropolis, roads and optical fiber lines glowing with soft warm gold and deep navy hues like quiet organic circuits. Ocean on one side reflecting moonlight. Clean crisp exposure, zero noise, high technological scale, elegant and calm --ar 16:10 --v 6.0"`

---

### Asset #7 to #10: "A Glimpse into Zovance" (4 Interactive Gallery Cards)
* **Location**: `src/pages/website/HomePage.jsx` — Stage 5 (Everyday Moments in Motion)
* **Element Type**: 4:3 Aspect Photography with hover video play button

| Card | Subject | Visual Description | Midjourney Generation Prompt |
| :--- | :--- | :--- | :--- |
| **Card 1: Smarter Businesses** | Operations & Flow | An executive reviewing automated inventory telemetry on a tablet in a sun-drenched cafe. | `"Clean documentary photo of a modern entrepreneur reviewing metrics on a slim tablet in a bright sunlit cafe. Natural morning light, calm coffee steam, minimalist setting --ar 4:3 --v 6.0"` |
| **Card 2: Better Conversations** | Conversational Voice AI | Front desk manager smiling warmly as automated voice system syncs hotel guest check-in. | `"Warm candid photograph of a hotel hospitality manager in a luxury resort lobby welcoming guests, smiling warmly with tablet on desk, lush tropical courtyard visible in background --ar 4:3 --v 6.0"` |
| **Card 3: Connected Work** | Synchronized Teams | Diverse team members laughing during a collaborative whiteboard session in an open loft. | `"Authentic documentary photograph of three engineers laughing and collaborating around a glass whiteboard in an airy industrial modern loft studio. Daylight, vibrant energy --ar 4:3 --v 6.0"` |
| **Card 4: Intelligent Platforms** | Cloud & Speed | Modern server blade or abstract precision optical fiber pulsing softly with green status light. | `"Macro photograph of high-end aerospace-grade server enclosure with subtle emerald green indicator light. Brushed aluminum, extreme precision engineering, Apple Mac Pro aesthetic --ar 4:3 --v 6.0"` |

---

### Asset #11 to #13: Case Study Films (3 Video Previews)
* **Location**: `src/pages/website/HomePage.jsx` — Stage 6 (Inside the Systems)
* **Element Type**: 16:10 Aspect Ratio Interactive Video Thumbnail with Play Button

| Film | Duration | Video Content Preview | Generation Prompt |
| :--- | :--- | :--- | :--- |
| **Film 1: "A business that never misses a conversation"** | 01:30 | Fast-paced montage: incoming call waveform converting to confirmed booking across three time zones. | `"Cinematic teaser frame: montage of modern city streets at twilight with graphic overlay of voice audio frequencies and a luxury hospitality suite. 4K film still --ar 16:10 --v 6.0"` |
| **Film 2: "A team that works smarter"** | 02:05 | Documenting an operations team whose manual invoice processing dropped from 4 hours to 30 seconds. | `"Documentary film still: healthcare clinic manager looking relieved and happy while walking down a sunlit hallway with an iPad. Natural daylight --ar 16:10 --v 6.0"` |
| **Film 3: "A better way to serve customers"** | 01:50 | Customer experience story following a retail consumer receiving an instant, intelligent resolution. | `"Cinematic film frame: close-up of a smiling customer on the phone outside a modern glass retail flagship store, beautiful afternoon sunlight and bokeh --ar 16:10 --v 6.0"` |

---

### Asset #14: High-Fidelity Video Modal Stream (Active Film)
* **Location**: `src/pages/website/HomePage.jsx` — Modal Container
* **Element Type**: Full 16:9 HTML5 `<video controls autoPlay>`
* **Specifications**: 4K UHD (3840 × 2160) or 1080p, 24fps cinematic shutter speed, stereo sound with gentle ambient synth score (Apple Keynote style), crisp voiceover narration.
* **Script Summary**:
  > *"We didn’t build Zovance to add more noise to your day. We built it to quiet the room. To turn hours of clerical drag into instantaneous momentum. Because when machines handle the routine, people are free to imagine what’s next. Zovance: People. Ideas. Impact."*

---

## 3. Implementation Summary & Code Status
All components on `src/pages/website/HomePage.jsx` are fully organized into Apple's proven **7-stage visual rhythm**:
1. **Hero Stage**: Autoplaying background video + live pause/play button + full-screen modal trigger.
2. **Vision Marquee**: Editorial headline statement with zero clutter.
3. **Who We Are**: 21:9 daylight glasshouse architecture window + 4 principle pills.
4. **What We Do (4 Split Panels)**: Alternating 16:10 visual storytelling panels covering Voice AI, Automation, Digital Platforms, and Enterprise Reliability.
5. **A Glimpse into Zovance**: 4 interactive gallery cards with category tags and play triggers.
6. **Case Study Films**: 3 high-contrast 16:10 film cards with duration badges.
7. **Final CTA Stage**: Atmospheric soft-sky radial glow with primary green pill button.
