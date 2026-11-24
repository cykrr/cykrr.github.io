export const haLiteTranslations = {
  es: {
    'ha_lite.eyebrow': 'Caso de estudio · Rust · Hogar',
    'ha_lite.title': 'ha-lite: no necesitas Home Assistant para encender una luz.',
    'ha_lite.lede': 'Dos luces y un sensor BTHome. Eso era todo lo que quería controlar. Home Assistant habría significado otro contenedor, una base de datos y una interfaz para administrar tres dispositivos. ha-lite es un binario en Rust que habla MQTT, descubre lo que ya tengo y sirve una UI mínima, sin base de datos ni integración con HA.',
    'ha_lite.alt': 'La interfaz de ha-lite con 26,9 °C y 41% de humedad del sensor, y dos luces apagadas',
    'ha_lite.status': 'Código abierto (GPL-2.0). En uso diario en mi homelab.',
    'ha_lite.repo': 'Ver en GitHub',

    'ha_lite.problem.title': 'el problema',
    'ha_lite.problem.p1': 'La casa tiene dos luces y un sensor Xiaomi Miya 3 que reporta temperatura y humedad por BTHome. No hay automatizaciones, ni historial, ni usuarios, ni app móvil que justifiquen un servidor de domótica completo. Solo hay que encender una luz y leer 26,9 °C.',
    'ha_lite.problem.p2': 'Home Assistant es excelente cuando el problema crece: automatizaciones, dashboards, integraciones, historial. Para este caso, la instalación pesaba más que la tarea. Un contenedor más, una base de datos que respaldar y actualizar, y una UI grande para tres dispositivos.',

    'ha_lite.constraint.title': 'la restricción',
    'ha_lite.constraint.p1': 'El reemplazo no podía exigir hardware nuevo. Las luces ya estaban en MQTT: una se anuncia por descubrimiento de Home Assistant, la otra por Tasmota. El sensor ya publica BTHome. Cualquier herramienta que empezara pidiendo migrar todo a su propio formato no servía.',
    'ha_lite.constraint.p2': 'Por eso ha-lite trata el descubrimiento como una capa de compatibilidad: escucha lo que los dispositivos ya anuncian y se adapta, en vez de pedirles que hablen un protocolo nuevo.',

    'ha_lite.features.title': 'qué hace',
    'ha_lite.features.sensors.title': 'Sensores:',
    'ha_lite.features.sensors.text': 'BTHome v2 por MQTT o por BLE local. Decodifica temperatura y humedad, y marca el dato como viejo si deja de llegar.',
    'ha_lite.features.lights.title': 'Luces:',
    'ha_lite.features.lights.text': 'Luces e interruptores por descubrimiento de Home Assistant y Tasmota, incluidos los relés múltiples que comparten un tópico de estado. También entiende la convención antigua <code>lights/&lt;id&gt;/state</code>.',
    'ha_lite.features.ui.title': 'Interfaz:',
    'ha_lite.features.ui.text': 'Una página sin build ni framework: sensores arriba, luces abajo, estado en vivo cada dos segundos. El HTML viaja embebido en el binario.',
    'ha_lite.features.api.title': 'API:',
    'ha_lite.features.api.text': 'GET <code>/api/state</code> y POST <code>/api/lights/:id/on|off</code>, suficiente para un script o un panel. Sin base de datos: el estado vive en memoria y se pierde al reiniciar, que es exactamente lo que un espejo de MQTT debería perder.',

    'ha_lite.eng.title': 'decisiones de ingeniería',
    'ha_lite.eng.discovery.title': 'Compatibilidad en vez de integración.',
    'ha_lite.eng.discovery.text': 'No hay una integración con Home Assistant que mantener. ha-lite lee los mismos tópicos de descubrimiento que HA y Tasmota ya publican, guarda el tópico que anunció cada entidad y lo usa para retirarla cuando llega un config vacío. Un dispositivo que cambia de nodo se vuelve a registrar sin duplicados.',
    'ha_lite.eng.sensors.title': 'Dos caminos para el mismo sensor.',
    'ha_lite.eng.sensors.text': 'BTHome puede llegar por MQTT o por un adaptador Bluetooth local. El camino MQTT no necesita BlueZ y es el normal; el BLE local sirve cuando el sensor no pasa por el broker. La UI no distingue: ambos terminan en la misma estructura con <code>last_seen</code>.',
    'ha_lite.eng.state.title': 'Sin base de datos, a propósito.',
    'ha_lite.eng.state.text': 'El estado es memoria compartida bajo un <code>RwLock</code> y se serializa directamente bajo el lock de lectura para no clonar todo en cada poll de la UI. Un reinicio lo deja vacío hasta que el broker reenvía los retained o el sensor vuelve a reportar. Es una decisión de producto, no una omisión.',
    'ha_lite.eng.honesty.title': 'Los comandos no mienten.',
    'ha_lite.eng.honesty.text': 'Al tocar una luz, la UI pinta el estado pedido de inmediato; si el publish al broker falla, la API responde 502 y el estado vuelve atrás. Los endpoints <code>on</code>/<code>off</code> son idempotentes y llevan el estado deseado, no un toggle: un doble toque o un segundo cliente convergen en vez de deshacer el primero.',
    'ha_lite.eng.security.title': 'Superficie chica, también en seguridad.',
    'ha_lite.eng.security.text': 'No hay login y no pretende haberlo: está pensado para una red de confianza. Aun así, los POST exigen <code>X-Requested-With: ha-lite</code>, un header que un formulario HTML no puede poner; así un sitio cualquiera en la LAN no puede apagar las luces con un formulario. El bind se puede cerrar a localhost.',
    'ha_lite.eng.lifecycle.title': 'Morir bien también importa.',
    'ha_lite.eng.lifecycle.text': 'El proceso atiende SIGTERM y Ctrl-C, compite ambos contra el cierre ordenado y libera el escaneo BLE. Si una tarea crítica como MQTT o BLE muere, termina con código distinto de cero para que systemd lo reinicie, con un límite de 10 segundos para no quedar colgado esperando conexiones keep-alive.',

    'ha_lite.boundary.title': 'lo que deliberadamente no construí',
    'ha_lite.boundary.p1': 'Tampoco hay dashboards configurables, usuarios ni TLS. Cada una de esas funciones habría convertido a ha-lite en un Home Assistant peor. La regla fue simple: si la necesito, uso HA; si no, no la agrego.',

    'ha_lite.use.title': 'cuándo usar cuál',
    'ha_lite.use.p1': 'Si quieres automatizaciones, historial, integraciones o que otra persona de la casa administre el sistema sin tocar un archivo de configuración, Home Assistant es la respuesta correcta. ha-lite no compite con eso.',
    'ha_lite.use.p2': 'Si el problema es fijo y chico —dos luces, un sensor, una red de confianza— un binario que se conecta al broker y sirve una página es más fácil de entender, actualizar y respaldar que una plataforma completa. Esa es toda la tesis.',

    'ha_lite.shape.title': 'cómo está armado',
    'ha_lite.shape.text': 'Un binario de Rust sobre tokio y axum, con rumqttc para MQTT y btleplug para BLE. El HTML de la UI va embebido; la configuración sale de variables de entorno o de un <code>.env</code>. Se despliega con una unidad systemd o con el paquete de Arch, y el código está bajo GPL-2.0.',

    'ha_lite.cost.title': 'lo que cuesta',
    'ha_lite.cost.p1': 'Medido en el equipo donde corre: binario de 4,5 MiB, 6,3 MiB de RSS, 5 hilos y 12 descriptores abiertos. En una corrida de 17 h 45 min acumuló 46,9 segundos de CPU —un 0,07% de promedio— con cero reinicios. El pico de memoria fue igual al uso actual, así que no hay crecimiento visible.',
    'ha_lite.cost.p2': 'También cuesta funciones: no hay automatizaciones, ni login, ni historial, ni app móvil. Ese recorte es lo que mantiene el binario pequeño y el comportamiento fácil de auditar.',

    'ha_lite.back': '← Volver al inicio',
  },
  en: {
    'ha_lite.eyebrow': 'Case study · Rust · Home',
    'ha_lite.title': 'ha-lite: you don\'t need Home Assistant to turn on a light.',
    'ha_lite.lede': 'Two lights and one BTHome sensor. That was all I wanted to control. Home Assistant would have meant another container, a database and an interface to administer three devices. ha-lite is a Rust binary that speaks MQTT, discovers what I already have and serves a tiny UI, with no database and no HA integration.',
    'ha_lite.alt': 'The ha-lite UI showing 26.9 °C and 41% humidity from the sensor, and two lights switched off',
    'ha_lite.status': 'Open source (GPL-2.0). In daily use on my homelab.',
    'ha_lite.repo': 'View on GitHub',

    'ha_lite.problem.title': 'the itch',
    'ha_lite.problem.p1': 'The house has two lights and a Xiaomi Miya 3 sensor that reports temperature and humidity over BTHome. There are no automations, no history, no users and no mobile app to justify a full home-automation server. I just need to switch a light and read 26.9 °C.',
    'ha_lite.problem.p2': 'Home Assistant is excellent when the problem grows: automations, dashboards, integrations, history. Here the install weighed more than the task. One more container, a database to back up and upgrade, and a large UI for three devices.',

    'ha_lite.constraint.title': 'the constraint',
    'ha_lite.constraint.p1': 'The replacement could not demand new hardware. The lights were already on MQTT: one announces itself through Home Assistant discovery, the other through Tasmota. The sensor already publishes BTHome. Any tool that started by asking me to migrate everything to its own format was out.',
    'ha_lite.constraint.p2': 'So ha-lite treats discovery as a compatibility layer: it listens to what the devices already announce and adapts, instead of asking them to speak a new protocol.',

    'ha_lite.features.title': 'what it does',
    'ha_lite.features.sensors.title': 'Sensors:',
    'ha_lite.features.sensors.text': 'BTHome v2 over MQTT or a local BLE adapter. It decodes temperature and humidity, and marks the reading as stale when updates stop.',
    'ha_lite.features.lights.title': 'Lights:',
    'ha_lite.features.lights.text': 'Lights and switches through Home Assistant and Tasmota discovery, including multi-relay devices that share a state topic. It also understands the older <code>lights/&lt;id&gt;/state</code> convention.',
    'ha_lite.features.ui.title': 'UI:',
    'ha_lite.features.ui.text': 'One page with no build step or framework: sensors on top, lights below, live state every two seconds. The HTML ships embedded in the binary.',
    'ha_lite.features.api.title': 'API:',
    'ha_lite.features.api.text': 'GET <code>/api/state</code> and POST <code>/api/lights/:id/on|off</code>, enough for a script or a panel. No database: state lives in memory and is lost on restart, which is exactly what an MQTT mirror should lose.',

    'ha_lite.eng.title': 'engineering decisions',
    'ha_lite.eng.discovery.title': 'Compatibility instead of integration.',
    'ha_lite.eng.discovery.text': 'There is no Home Assistant integration to maintain. ha-lite reads the same discovery topics HA and Tasmota already publish, remembers which topic announced each entity, and uses it to remove the entity when an empty config arrives. A device that changes node re-registers without duplicates.',
    'ha_lite.eng.sensors.title': 'Two paths for the same sensor.',
    'ha_lite.eng.sensors.text': 'BTHome can arrive over MQTT or through a local Bluetooth adapter. The MQTT path needs no BlueZ and is the normal one; local BLE covers the case where the sensor does not go through the broker. The UI makes no distinction: both end up in the same structure with <code>last_seen</code>.',
    'ha_lite.eng.state.title': 'No database, on purpose.',
    'ha_lite.eng.state.text': 'State is shared memory behind an <code>RwLock</code> and is serialised directly under the read lock, so a UI poll does not clone everything. A restart leaves it empty until the broker replays retained configs or the sensor reports again. That is a product decision, not an omission.',
    'ha_lite.eng.honesty.title': 'Commands do not lie.',
    'ha_lite.eng.honesty.text': 'Tapping a light paints the requested state immediately; if the publish to the broker fails, the API returns 502 and the state rolls back. The <code>on</code>/<code>off</code> endpoints are idempotent and carry the desired state, not a toggle: a double tap or a second client converges instead of undoing the first command.',
    'ha_lite.eng.security.title': 'A small surface, security included.',
    'ha_lite.eng.security.text': 'There is no login and no pretence of one: this is built for a trusted network. Even so, POSTs require <code>X-Requested-With: ha-lite</code>, a header an HTML form cannot set, so a random site on the LAN cannot switch the lights with a form. The bind address can be closed to localhost.',
    'ha_lite.eng.lifecycle.title': 'Dying well matters too.',
    'ha_lite.eng.lifecycle.text': 'The process handles SIGTERM and Ctrl-C, races both against a graceful shutdown and releases the BLE scan. If a critical task such as MQTT or BLE dies, it exits non-zero so systemd restarts it, with a 10-second cap so it cannot hang waiting for keep-alive connections.',

    'ha_lite.boundary.title': 'what I deliberately did not build',
    'ha_lite.boundary.p1': 'There are no configurable dashboards, users or TLS either. Each of those would have turned ha-lite into a worse Home Assistant. The rule was simple: if I need it, I use HA; if not, I do not add it.',

    'ha_lite.use.title': 'when to use which',
    'ha_lite.use.p1': 'If you want automations, history, integrations, or someone else in the house to administer the system without touching a config file, Home Assistant is the right answer. ha-lite does not compete with that.',
    'ha_lite.use.p2': 'If the problem is fixed and small — two lights, one sensor, a trusted network — a binary that connects to the broker and serves a page is easier to understand, update and back up than a full platform. That is the whole thesis.',

    'ha_lite.shape.title': 'how it is built',
    'ha_lite.shape.text': 'One Rust binary on tokio and axum, with rumqttc for MQTT and btleplug for BLE. The UI HTML is embedded; configuration comes from environment variables or a <code>.env</code>. It deploys as a systemd unit or an Arch package, and the code is GPL-2.0.',

    'ha_lite.cost.title': 'what it costs',
    'ha_lite.cost.p1': 'Measured on the machine it runs on: a 4.5 MiB binary, 6.3 MiB RSS, 5 threads and 12 open file descriptors. Over a 17 h 45 min run it used 46.9 seconds of CPU — 0.07% on average — with zero restarts. Peak memory equalled current memory, so there is no visible growth.',
    'ha_lite.cost.p2': 'It also costs features: no automations, no login, no history, no mobile app. That subtraction is what keeps the binary small and the behaviour easy to audit.',

    'ha_lite.back': '← Back home',
  },
} as const;
