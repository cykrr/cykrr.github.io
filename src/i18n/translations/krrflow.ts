export const krrflowTranslations = {
  es: {
    'krrflow.eyebrow': 'Caso de estudio · Rust · Windows',
    'krrflow.title': 'krrflow: una estantería de música en 3D para el sillón.',
    'krrflow.lede': 'Un reproductor local que reemplaza la lista de archivos por un carrusel estilo Cover Flow sobre un piso reflectante. Álbumes ordenados como discos en un estante, por artista o por década, y un HUD pensado para leerse desde tres metros.',
    'krrflow.alt': 'krrflow mostrando un carrusel de portadas con Random Access Memories al centro, un CD asomando a la derecha y el reproductor abajo',
    'krrflow.status': 'Código privado por ahora. Desarrollo activo desde fines de octubre de 2026.',

    'krrflow.idea.title': 'la idea',
    'krrflow.idea.p1': 'Escuchar música en un PC conectado al televisor suele significar un reproductor de escritorio con botones diminutos. krrflow parte al revés: el álbum central <strong>es</strong> el disco. Al darle play se expulsa a la tornamesa, gira, y el progreso, la lista de pistas y el transporte se controlan con teclado, rueda del mouse o gamepad.',
    'krrflow.idea.p2': 'Importar no requiere un administrador de archivos: se elige una carpeta desde el HUD o se arrastra sobre la ventana. Cada carpeta con audio se vuelve un álbum, y los nombres de carpeta sirven de respaldo cuando faltan las etiquetas.',

    'krrflow.eng.title': 'decisiones de ingeniería',
    'krrflow.eng.cache.title': 'Un anillo de texturas, no una textura por álbum.',
    'krrflow.eng.cache.text': 'El carrusel dibuja unas trece portadas a la vez. En vez de subir cada carátula a la GPU, mantengo un anillo de 32 capas de 1024×1024 que se reciclan al desplazarse. Una biblioteca de cualquier tamaño cabe en unos 128 MiB y el arranque solo decodifica lo que muestra el primer cuadro.',
    'krrflow.eng.decode.title': 'Nada pesado en el hilo del frame.',
    'krrflow.eng.decode.text': 'La lectura, decodificación y reescalado de portadas ocurre en un hilo aparte, y las subidas a la GPU tienen un presupuesto por cuadro, así que un salto largo se reparte en varios frames en lugar de producir un tirón. SQLite también quedó fuera del bucle de render.',
    'krrflow.eng.pool.title': 'Un pozo direccionado por contenido.',
    'krrflow.eng.pool.text': 'Las portadas se copian a un pool indexado por hash BLAKE3, así que la estantería conserva el arte aunque la carpeta de origen se mueva. El audio, por defecto, se referencia donde está; <code>--copy</code> lo guarda también en el pool.',
    'krrflow.eng.audio.title': 'Reproducción sin cortes.',
    'krrflow.eng.audio.text': 'El motor de audio es su propio crate, probado detrás de una interfaz de salida, con reproducción gapless: el progreso se calcula a partir del audio realmente consumido, no de un temporizador.',
    'krrflow.eng.look.title': 'Cuidar el aspecto.',
    'krrflow.eng.look.text': 'Shaders propios para el CD (zonas metálicas y difracción radial), bordes de portada con anti-aliasing analítico, reflejo de piso que rota junto con la portada y un interruptor de MSAA 4×. Las tarjetas divisoras de cada grupo se pintan con una fuente bitmap integrada.',
    'krrflow.eng.profile.title': 'Medir antes de adivinar.',
    'krrflow.eng.profile.text': 'Un modo de desarrollo trae perfilado de CPU y GPU por frame y atribuye los frames lentos al intervalo entre cuadros, no solo a <code>render()</code>, y muestra por qué el bucle de eventos sigue despierto.',

    'krrflow.shape.title': 'cómo está armado',
    'krrflow.shape.text': 'Un workspace de Rust con cinco crates (protocolo, núcleo, audio, interfaz y CLI), unas 14.000 líneas y más de 150 pruebas. CI en Ubuntu con <code>fmt</code>, <code>clippy -D warnings</code> y la suite completa. La deuda técnica se lleva en un registro con prioridad y esfuerzo por ítem, bajo la regla de pagarla cuando bloquea una función, no en una reescritura masiva. Objetivo de producto: Windows 10/11 con DirectX 12, con Vulkan como respaldo.',

    'krrflow.back': '← Volver al inicio',
  },
  en: {
    'krrflow.eyebrow': 'Case study · Rust · Windows',
    'krrflow.title': 'krrflow: a 3D music shelf for the couch.',
    'krrflow.lede': 'A local music player that swaps the file list for a Cover Flow-style carousel on a reflective floor. Albums are arranged like records in a rack, by artist or by decade, with a HUD built to be read from ten feet away.',
    'krrflow.alt': 'krrflow showing a carousel of album covers with Random Access Memories in the centre, a CD peeking out on the right and the player below',
    'krrflow.status': 'Private code for now. Under active development since late October 2026.',

    'krrflow.idea.title': 'the idea',
    'krrflow.idea.p1': 'Playing music on a PC wired to the TV usually means a desktop player with tiny buttons. krrflow starts from the other end: the centred album <strong>is</strong> the disc. Press play and it ejects onto the turntable and spins, while progress, the track list and transport work from the keyboard, the mouse wheel or a gamepad.',
    'krrflow.idea.p2': 'Importing needs no file manager: pick a folder from the HUD or drag one onto the window. Each folder containing audio becomes an album, with folder names as the fallback when tags are missing.',

    'krrflow.eng.title': 'engineering decisions',
    'krrflow.eng.cache.title': 'A ring of textures, not a texture per album.',
    'krrflow.eng.cache.text': 'The carousel draws about thirteen covers at once. Instead of uploading every cover to the GPU, I keep a ring of 32 layers at 1024×1024 that get recycled as you scroll. A library of any size fits in roughly 128 MiB, and startup only decodes what the first frame shows.',
    'krrflow.eng.decode.title': 'Nothing heavy on the frame thread.',
    'krrflow.eng.decode.text': 'Reading, decoding and resizing cover art happens on a worker thread, and GPU uploads have a per-frame budget, so a long jump spreads over a few frames instead of causing a hitch. SQLite was also moved off the render loop.',
    'krrflow.eng.pool.title': 'A content-addressed pool.',
    'krrflow.eng.pool.text': 'Cover art is copied into a pool indexed by BLAKE3 hash, so the shelf keeps its artwork even if the source folder moves. Audio is referenced where it lives by default; <code>--copy</code> stores it in the pool too.',
    'krrflow.eng.audio.title': 'Gapless playback.',
    'krrflow.eng.audio.text': 'The audio engine is its own crate, tested behind an output interface, with gapless playback: progress is derived from audio actually consumed, not from a timer.',
    'krrflow.eng.look.title': 'Caring about the look.',
    'krrflow.eng.look.text': 'Custom shaders for the CD (metallic zones and radial diffraction), cover rims with analytic anti-aliasing, a floor reflection that rotates with the cover, and a 4× MSAA toggle. Each group\'s divider card is painted with a built-in bitmap font.',
    'krrflow.eng.profile.title': 'Measure before guessing.',
    'krrflow.eng.profile.text': 'A developer build ships per-frame CPU and GPU profiling, attributes slow frames to the gap between frames rather than only <code>render()</code>, and shows why the event loop is awake.',

    'krrflow.shape.title': 'how it is built',
    'krrflow.shape.text': 'A Rust workspace of five crates (protocol, core, audio, UI and CLI), around 14,000 lines and over 150 tests. CI on Ubuntu runs <code>fmt</code>, <code>clippy -D warnings</code> and the full suite. Technical debt lives in a register with priority and effort per item, under the rule of paying it down when it blocks a feature, not in a big-bang rewrite. Product target: Windows 10/11 on DirectX 12, with Vulkan as a fallback.',

    'krrflow.back': '← Back home',
  },
} as const;
