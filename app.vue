<script setup lang="ts">
import {
  ArrowDown,
  ArrowLeft,
  ArrowUpRight,
  BookOpen,
  Brush,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Flame,
  Hand,
  HeartHandshake,
  Languages,
  Maximize2,
  Menu,
  Ruler,
  Sparkles,
  Wind,
  X,
} from '@lucide/vue'

type Locale = 'zh' | 'en'
type View = 'home' | 'catalog'

const locale = ref<Locale>('zh')
const currentView = ref<View>('home')
const menuOpen = ref(false)
const scrolled = ref(false)
const scrollProgress = ref(0)
const viewportWidth = ref<number | null>(null)
const selectedProductIndex = ref<number | null>(null)
const selectedPhotoIndex = ref<number | null>(null)
const pendingHomeSection = ref<string | null>(null)
const catalogDialog = ref<HTMLDialogElement | null>(null)
const photoDialog = ref<HTMLDialogElement | null>(null)
const albumTrack = ref<HTMLElement | null>(null)
const runtimeConfig = useRuntimeConfig()
let revealObserver: IntersectionObserver | null = null

const facebookUrl = 'https://www.facebook.com/profile.php?id=100043191953658'
const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/+$/, '')
const robotsDirective = runtimeConfig.public.preventIndexing
  ? 'noindex, nofollow, noarchive'
  : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const facebookPhotos = [
  { image: '/images/album-led-trio-v16.webp' },
  { image: '/images/album-storm-sky-v16.webp' },
  { image: '/images/album-temple-clouds-v16.webp' },
  { image: '/images/album-installation-v16.webp' },
  { image: '/images/album-handmade-trio-v16.webp' },
  { image: '/images/album-ceremony-field-v16.webp' },
  { image: '/images/album-ceremony-row-v16.webp' },
  { image: '/images/album-peach-incense-v16.webp' },
  { image: '/images/album-fortune-incense-v16.webp' },
  { image: '/images/album-green-incense-v16.webp' },
] as const

const copy = {
  zh: {
    nav: { aria: '主要导航', dragon: '龙香', products: '香品目录', craft: '手艺', story: '品牌', contact: '联络' },
    header: { homeLabel: '回到兴耀企业首页', menuLabel: '开启或关闭菜单', facebookLabel: '前往兴耀企业 Facebook 专页', descriptor: 'HENG YAU ENTERPRISE' },
    hero: {
      kicker: '兴耀企业 · 马来西亚传统制香',
      title: '龙香起，',
      accent: '香火续。',
      text: '一柱龙香，一份敬意。为神诞、庙庆与重要祭祀，手工塑出庄严气韵。',
      primary: '看我们的龙香',
      secondary: 'WhatsApp 联络',
      note: '尺寸 · 款式 · 庙庆订制',
      imageAlt: '兴耀企业制作并点亮灯饰的高身龙香',
      productLabel: '龙香',
      productEn: 'DRAGON INCENSE',
      scroll: '向下看',
    },
    ribbon: ['龙香', '寺庙用香', '手工塑龙', '兴耀企业', '香火传承'],
    dragon: {
      label: '我们的主香',
      title: '先是一支香，\n再塑一条龙。',
      body: '粗红香身由香粉压制，顶端可以燃点并留下香灰；彩龙、火焰与祥云只沿香身局部手工固定。看得见香材与香芯，也看得见兴耀的造型手艺。',
      tags: ['庙庆神诞', '多款高度', '手工造型'],
      craftAlt: '工坊中横放制作的长型龙香',
      ceremonyAlt: '庙宇前排列的多柱高身龙香',
      stamp: '主力\n龙香',
    },
    products: {
      label: '香品目录',
      title: '从一柱龙香，\n读懂每一份心意。',
      intro: '点击每项香品，了解它的形制、文化脉络、用途与订制方式。',
      explore: '查看完整介绍',
      enquire: 'WhatsApp 查询',
      dialogClose: '关闭介绍',
      historyLabel: '文化与沿革',
      usesLabel: '香的作用',
      chooseLabel: '如何选择',
      galleryLabel: '香品实照',
      contactLabel: '需要适合的尺寸？',
      contactText: '把用途、场地、日期和数量发给我们，即可协助建议。',
      pageEyebrow: '兴耀香品',
      pageTitle: '香品目录',
      pageIntro: '独立浏览各类香品。点击任何一项，即可阅读形制、文化沿革、用途与选择建议。',
      viewAll: '进入完整香品目录',
      backHome: '返回首页',
      catalogBack: '返回目录',
      items: [
        {
          no: '01',
          name: '传统龙香',
          en: 'Monumental Dragon Incense',
          type: '兴耀主力香品',
          text: '整支红香可以燃点，龙身、火焰与祥云沿着香身而上。',
          image: '/images/album-temple-clouds-v16.webp',
          alt: '庙宇前按兴耀传统彩绘制作的三柱龙香',
          gallery: ['/images/album-storm-sky-v16.webp', '/images/album-ceremony-row-v16.webp'],
          summary: '龙香先以香粉制成粗长、可燃点的红色香身，再把手工龙饰固定在香身外侧。顶端点燃后会留下香灰并持续冒烟，因此它首先是一支香，而不是装饰柱。',
          history: '在华人敬香传统中，香是表达敬意与祈愿的重要媒介。龙香把龙、祥云与火焰等吉祥纹样立体化，在马来西亚庙庆、神诞与大型法会中，渐渐成为具有场面与礼仪感的主香。',
          uses: ['庙庆与神诞的主香', '大型祭祀、酬神与祈福场合', '庙宇门前或庆典主场的仪式布置'],
          choose: '先确认场地净高、室外摆放位置、计划燃点时间与所需数量。龙香需稳固支架与充足安全距离，尺寸应以现场条件为准。',
        },
        {
          no: '02',
          name: '庆典订制龙香',
          en: 'Custom Festival Dragon Incense',
          type: '庙宇与节庆订制',
          text: '按庙宇场地、节庆主题与视觉需求订制龙身色彩。',
          image: '/images/album-led-trio-v16.webp',
          alt: '夜间亮起彩色灯饰的三柱庆典订制龙香',
          gallery: ['/images/album-handmade-trio-v16.webp', '/images/album-installation-v16.webp'],
          summary: '订制龙香保留完整的粗红香身，再根据场合调整龙头位置、鳞片色彩、火焰与祥云。装饰不会遮盖整支香，让人一眼仍能看出香身、燃点端和实际制作结构。',
          history: '庙庆不只是敬香，也是社群共同参与的仪式。当龙香的高度、色彩与庙宇布置相呼应，它便成为庆典现场最具辨识度的主视觉之一。',
          uses: ['九皇爷诞、神诞、盂兰胜会等节庆', '夜间庆典与庙宇门前陈设', '需要指定色系、龙身形制或数量的项目'],
          choose: '订制时请提供使用日期、庙宇现场照片、可用高度、需要数量与偏好色系。若使用灯饰，也需预留安装与电源位置。',
        },
        {
          no: '03',
          name: '手工彩龙香',
          en: 'Hand-finished Dragon Incense',
          type: '香身与彩龙手工制作',
          text: '从粗红香身、香芯到彩龙装饰，都能看见真实手作痕迹。',
          image: '/images/album-installation-v16.webp',
          alt: '工作人员在现场竖立安装兴耀手工彩龙香',
          gallery: ['/images/album-handmade-trio-v16.webp', '/images/album-led-trio-v16.webp'],
          summary: '从工坊成形、手工彩绘，到现场竖立安装，每一柱龙香都会保留香粉压制的质感与手作痕迹。彩龙部件逐一固定在香身外侧，再按场地完成稳固与检查。',
          history: '大型龙香结合传统制香与节庆造型手艺。先制成能够稳定燃烧的香身，再逐步完成龙首、龙鳞、火焰与祥云，让实用香品拥有庙庆所需的礼仪气势。',
          uses: ['庙庆、神诞与大型酬神活动', '希望呈现手工特色的主香', '按场地和色系制作的节庆香品'],
          choose: '可提供现场高度、摆放方式、数量和参考色彩。大型香品需预留制作、干燥、运输及安装时间。',
        },
        {
          no: '04',
          name: '大型立香',
          en: 'Large Upright Incense',
          type: '大型敬奉与户外使用',
          text: '大型香身可配合用途加入吉祥色彩与图纹，适合较长时间敬奉。',
          image: '/images/album-green-incense-v16.webp',
          alt: '工坊中完成传统吉祥图纹的绿色大型立香',
          gallery: ['/images/album-peach-incense-v16.webp', '/images/album-fortune-incense-v16.webp'],
          summary: '大型立香以可燃香粉制成，体积和燃点时间都比日常线香更大，并可依敬奉用途加入吉祥配色与图纹。香身的粗度、干燥程度与直度都是制作重点。',
          history: '立香是常见的敬香形制，从个人上香使用的小规格，到庙宇仪式采用的大规格，各自配合不同空间、香炉与仪式流程。',
          uses: ['户外香炉与较大型敬奉', '初一十五、节庆与祭祀', '需要较长燃点时间的场合'],
          choose: '请说明香炉尺寸、室内或室外、期望燃点时间与数量，以便选择适合的粗度和长度。',
        },
        {
          no: '05',
          name: '盘香',
          en: 'Coil Incense',
          type: '持续燃点用香',
          text: '盘旋香体节省空间，适合需要较长时间持续燃点的场所。',
          image: '/images/coil-incense-catalog.webp',
          alt: '点燃后缓缓冒烟的传统盘香',
          gallery: ['/images/incense-hero.webp', '/images/stick-incense-catalog.webp'],
          summary: '盘香把较长的香体卷成螺旋形，以悬挂或香架承托方式缓慢燃烧。它占用空间较集中，适合希望延长燃点时间的环境。',
          history: '盘香是传统香品常见形制之一。螺旋结构让较长香体能够收纳在有限范围内，并随着燃烧形成缓慢、连续的香烟。',
          uses: ['庙宇持续燃香', '神坛与固定敬奉空间', '需要较长燃点时间的日常使用'],
          choose: '选择时应考虑空间通风、香架尺寸、燃点时长与日常更换频率，并保持足够安全距离。',
        },
        {
          no: '06',
          name: '线香',
          en: 'Traditional Incense Sticks',
          type: '日常敬奉用香',
          text: '方便依仪式上香，适合庙宇、神坛与日常敬奉。',
          image: '/images/stick-incense-catalog.webp',
          alt: '香炉中燃点的传统线香',
          gallery: ['/images/incense-hero.webp', '/images/coil-incense-catalog.webp'],
          summary: '线香以细长香体稳定燃烧，是日常敬香最常见的形制之一。规格、香气与燃点时间可按使用场所和习惯选择。',
          history: '线香便于持香、插香与依仪式分次敬奉，因此广泛用于庙宇、家中神坛和传统节日祭祀。',
          uses: ['庙宇日常敬奉与信众上香', '家中神坛与传统节日', '清明、初一十五及祭祀使用'],
          choose: '请说明使用地点、香炉大小、偏好燃点时间及日常数量，我们可以协助建议适合规格。',
        },
      ],
    },
    craft: {
      label: '制香之道',
      title: '一双手，\n把龙塑进香里。',
      body: '由香身到龙鳞，每一道都讲究比例、结构与耐心。',
      steps: [
        { no: '01', title: '调香', text: '挑选并调配香材', icon: Sparkles },
        { no: '02', title: '成柱', text: '稳固香身与尺寸', icon: Hand },
        { no: '03', title: '塑龙', text: '手工塑出龙首龙鳞', icon: Brush },
        { no: '04', title: '阴干', text: '耐心检查再出厂', icon: Wind },
      ],
      imageAlt: '开放式工坊中正在制作的长型龙香',
    },
    story: {
      label: '品牌标志 · 兴耀企业',
      title: '兴耀企业，\n一眼认出我们的龙香。',
      body: '新版标志延续原来流线龙与香烟的轮廓，以红金线条写出「香」的神韵。主品牌始终是兴耀企业。',
      quote: '龙随烟起，香承心意。',
      markAlt: '兴耀企业新版龙香标志',
    },
    facebook: {
      label: '作品相册',
      title: '真实制作，真实现场。',
      previous: '上一组照片',
      next: '下一组照片',
      enlarge: '放大查看',
      close: '关闭相册',
      position: '第 {current} / {total} 张',
      items: [
        '夜间完成装灯的三柱大型龙香',
        '乌云天空下竖立的三柱手工龙香',
        '庙宇前迎着云层竖立的彩绘龙香',
        '工作人员在现场安装大型龙香',
        '亮灯前完成彩绘与造型的三柱龙香',
        '庆典场地整批排列的大型龙香',
        '红灯笼下等待仪式使用的龙香阵列',
        '工坊中完成彩绘的八尺桃香',
        '工坊中手工制作的吉祥立体香品',
        '工坊中完成图纹的绿色大型立香',
      ],
    },
    ceremony: {
      label: '香火成景',
      title: '为重要日子，\n立一柱庄严龙香。',
      action: '询问龙香规格',
      imageAlt: '庙宇庆典中的大型龙香',
    },
    contact: {
      label: '直接查询',
      title: '告诉我们，\n您需要哪一种香。',
      body: '发送用途、尺寸、数量和使用日期，我们会通过 WhatsApp 回复；也可以从 Facebook 专页查看作品并联络。',
      button: 'WhatsApp 查询',
      whatsappMeta: '016-363 3329',
      facebookButton: 'Facebook 联络',
      facebookMeta: '查看作品与发送信息',
      prompt: '您好，我想查询兴耀企业的龙香／寺庙用香。',
      aria: '通过 WhatsApp 联络兴耀企业',
      facebookAria: '通过 Facebook 联络兴耀企业',
    },
    footer: {
      descriptor: '龙香 · 寺庙用香 · 传统制香',
      rights: '兴耀企业 Heng Yau Enterprise',
      top: '回到顶部',
    },
  },
  en: {
    nav: { aria: 'Main navigation', dragon: 'Dragon Incense', products: 'Catalogue', craft: 'Craft', story: 'Brand', contact: 'Contact' },
    header: { homeLabel: 'Return to the Heng Yau Enterprise homepage', menuLabel: 'Open or close menu', facebookLabel: 'Visit Heng Yau Enterprise on Facebook', descriptor: 'HENG YAU ENTERPRISE · DRAGON INCENSE' },
    hero: {
      kicker: 'HENG YAU ENTERPRISE · MALAYSIAN INCENSE MAKERS',
      title: 'The dragon rises.',
      accent: 'Tradition endures.',
      text: 'A monumental incense offering, shaped by hand for temple festivals, celebrations and meaningful ceremonies.',
      primary: 'Discover dragon incense',
      secondary: 'Contact on WhatsApp',
      note: 'Sizes · Styles · Temple orders',
      imageAlt: 'Heng Yau LED-lit monumental dragon incense at night',
      productLabel: 'Dragon Incense',
      productEn: '龙香',
      scroll: 'Explore',
    },
    ribbon: ['Dragon incense', 'Temple incense', 'Sculpted by hand', 'Heng Yau Enterprise', 'Living tradition'],
    dragon: {
      label: 'Our signature',
      title: 'Incense first.\nThen the dragon takes form.',
      body: 'The rough red body is pressed from burnable incense powder, with an exposed lighting end that turns to ash. Dragons, flames and clouds are attached by hand only along part of the surface, keeping the incense itself unmistakable.',
      tags: ['Temple festivals', 'Multiple heights', 'Hand sculpted'],
      craftAlt: 'Long dragon incense poles laid across a working workshop',
      ceremonyAlt: 'Monumental dragon incense at a temple',
      stamp: 'Our\nsignature',
    },
    products: {
      label: 'Incense catalogue',
      title: 'Begin with the incense.\nDiscover the meaning.',
      intro: 'Open each item to learn its form, cultural context, purpose and how to order.',
      explore: 'Read full introduction',
      enquire: 'WhatsApp enquiry',
      dialogClose: 'Close introduction',
      historyLabel: 'Culture and history',
      usesLabel: 'What it is used for',
      chooseLabel: 'How to choose',
      galleryLabel: 'Product photographs',
      contactLabel: 'Need help with sizing?',
      contactText: 'Send us the occasion, venue, date and quantity, and we will help with a suitable recommendation.',
      pageEyebrow: 'Heng Yau incense',
      pageTitle: 'Incense Catalogue',
      pageIntro: 'Browse each incense category in a dedicated catalogue. Open an item for its form, cultural background, uses and selection guidance.',
      viewAll: 'Open the full catalogue',
      backHome: 'Back to homepage',
      catalogBack: 'Back to catalogue',
      items: [
        {
          no: '01',
          name: 'Monumental Dragon Incense',
          en: '传统龙香',
          type: 'Heng Yau signature incense',
          text: 'A complete burnable red incense body, finished with a dragon, flames and clouds.',
          image: '/images/album-temple-clouds-v16.webp',
          alt: 'Three Heng Yau dragon incense offerings with traditional hand-painted details outside a temple',
          gallery: ['/images/album-storm-sky-v16.webp', '/images/album-ceremony-row-v16.webp'],
          summary: 'Dragon incense begins as a thick, elongated body made from burnable incense powder. Handmade dragon details are fixed along its outer surface. Once the top is lit, ash and smoke remain clearly visible—this is first and foremost an incense offering, not a decorative column.',
          history: 'Incense has long been used to express respect, remembrance and prayer in Chinese worship. Dragon incense gives that offering a monumental ceremonial form, combining the dragon, clouds and flames in a craft associated with temple festivals and major community observances in Malaysia.',
          uses: ['A principal incense offering for temple festivals', 'Major worship, thanksgiving and blessing ceremonies', 'A ceremonial focal point at a temple entrance or main event area'],
          choose: 'Confirm the clear height, outdoor position, intended lighting time and quantity first. A monumental dragon incense requires a stable support frame and generous safety clearance, so its final dimensions should match the actual site.',
        },
        {
          no: '02',
          name: 'Custom Festival Dragon Incense',
          en: '庆典订制龙香',
          type: 'Made for temples and festivals',
          text: 'Dragon colours and decorative details can be tailored to the temple setting and occasion.',
          image: '/images/album-led-trio-v16.webp',
          alt: 'Three custom dragon incense offerings illuminated with colourful lights at night',
          gallery: ['/images/album-handmade-trio-v16.webp', '/images/album-installation-v16.webp'],
          summary: 'Custom dragon incense keeps its complete, rough red incense body while adapting the dragon head, scales, flames and clouds to the occasion. Decoration leaves the burnable body, lighting end and practical handmade construction easy to recognise.',
          history: 'Temple festivals are both acts of worship and shared community occasions. When the size and colour of dragon incense respond to the temple setting, the offering also becomes one of the clearest visual anchors of the celebration.',
          uses: ['Nine Emperor Gods Festival, deity birthdays and Ullambana observances', 'Night-time festivals and temple entrance displays', 'Projects requiring coordinated colour, form or quantities'],
          choose: 'Share the event date, venue photographs, usable height, quantity and preferred colour direction. Lighting also requires advance planning for mounting and access to a power source.',
        },
        {
          no: '03',
          name: 'Hand-finished Dragon Incense',
          en: '手工彩龙香',
          type: 'Handmade incense and dragon finishing',
          text: 'The rough red incense body, core and hand-painted dragon details remain visible.',
          image: '/images/album-installation-v16.webp',
          alt: 'Craftspeople raising and installing Heng Yau dragon incense on site',
          gallery: ['/images/album-handmade-trio-v16.webp', '/images/album-led-trio-v16.webp'],
          summary: 'From forming and hand-painting in the workshop to raising each piece on site, every dragon incense retains the texture and small irregularities of genuine handwork. Dragon details are fixed individually before the final support and safety checks.',
          history: 'Monumental dragon incense combines incense making with festival decorative craft. A stable burnable body is formed first, followed by the dragon head, scales, flames and clouds needed for ceremonial presence.',
          uses: ['Temple festivals and deity celebrations', 'A principal offering with visible handcraft', 'Festival incense made to suit a venue and colour direction'],
          choose: 'Share the available height, mounting method, quantity and preferred colours. Large incense also needs enough lead time for making, drying, transport and installation.',
        },
        {
          no: '04',
          name: 'Large Upright Incense',
          en: '大型立香',
          type: 'Large outdoor offerings',
          text: 'A substantial incense body finished with auspicious colours and motifs for longer ceremonial offerings.',
          image: '/images/album-green-incense-v16.webp',
          alt: 'Large green upright incense completed with traditional auspicious motifs in the workshop',
          gallery: ['/images/album-peach-incense-v16.webp', '/images/album-fortune-incense-v16.webp'],
          summary: 'Large upright incense is formed from burnable incense powder and is thicker and longer-burning than everyday sticks. Auspicious colours and motifs can be added for the intended offering, while straightness, drying and a consistent incense body remain essential.',
          history: 'Upright incense ranges from small personal offerings to larger temple formats, each suited to a different burner, space and ceremonial rhythm.',
          uses: ['Outdoor incense burners and larger offerings', 'Lunar observances, festivals and ceremonies', 'Occasions requiring a longer burn time'],
          choose: 'Share the burner size, indoor or outdoor setting, desired burn time and quantity so the length and thickness can be matched appropriately.',
        },
        {
          no: '05',
          name: 'Coil Incense',
          en: '盘香',
          type: 'Extended burning incense',
          text: 'A space-efficient spiral form for places needing a longer continuous burn.',
          image: '/images/coil-incense-catalog.webp',
          alt: 'Traditional coil incense burning with a quiet stream of smoke',
          gallery: ['/images/incense-hero.webp', '/images/stick-incense-catalog.webp'],
          summary: 'Coil incense winds a long incense body into a spiral and burns slowly from a hanging point or supporting stand. Its compact footprint makes it useful when a longer burn is preferred.',
          history: 'The spiral is a familiar traditional incense form, fitting a longer incense body within a limited area while producing a steady, gradual trail of smoke.',
          uses: ['Continuous incense in temples', 'Shrines and fixed worship spaces', 'Everyday use requiring a longer burn'],
          choose: 'Consider ventilation, the incense holder, desired burn time and replacement routine, and always allow safe clearance around the burning coil.',
        },
        {
          no: '06',
          name: 'Traditional Incense Sticks',
          en: '线香',
          type: 'Everyday worship incense',
          text: 'Easy to offer during a ritual and suitable for temples, shrines and daily worship.',
          image: '/images/stick-incense-catalog.webp',
          alt: 'Traditional incense sticks burning in a small incense holder',
          gallery: ['/images/incense-hero.webp', '/images/coil-incense-catalog.webp'],
          summary: 'Incense sticks have a slim, even body that burns steadily and remains one of the most familiar forms for daily worship. Size, fragrance and burn time can be chosen to suit the setting.',
          history: 'Their simple shape makes incense sticks convenient to hold, place in a burner and offer in ritual sequence, so they are widely used in temples, home shrines and festival observances.',
          uses: ['Daily temple worship and visitor offerings', 'Home shrines and traditional festivals', 'Qingming, lunar observances and ceremonies'],
          choose: 'Tell us the setting, burner size, preferred burn time and typical quantity, and we can suggest a suitable specification.',
        },
      ],
    },
    craft: {
      label: 'Our craft',
      title: 'Made by hand,\nthe dragon enters the incense.',
      body: 'From the incense body to every dragon scale, proportion, structure and patience matter.',
      steps: [
        { no: '01', title: 'Blend', text: 'Prepare the incense materials', icon: Sparkles },
        { no: '02', title: 'Form', text: 'Form the incense body to size', icon: Hand },
        { no: '03', title: 'Sculpt', text: 'Shape the dragon by hand', icon: Brush },
        { no: '04', title: 'Dry', text: 'Rest, inspect and finish', icon: Wind },
      ],
      imageAlt: 'Long dragon incense poles being made in an open workshop',
    },
    story: {
      label: 'THE MARK OF HENG YAU',
      title: 'Heng Yau Enterprise,\nrecognised by our dragon.',
      body: 'Our renewed mark keeps the flowing dragon and rising smoke of the original. Rendered in red and gold, it carries the spirit of incense while Heng Yau Enterprise remains the main name.',
      quote: 'The dragon follows the smoke; incense carries the heart.',
      markAlt: 'Heng Yau Enterprise dragon incense logo',
    },
    facebook: {
      label: 'Works album',
      title: 'Real craft. Real occasions.',
      previous: 'Previous photographs',
      next: 'Next photographs',
      enlarge: 'Open larger view',
      close: 'Close album',
      position: 'Photograph {current} of {total}',
      items: [
        'Three monumental dragon incense poles with their lights completed',
        'Three handmade dragon incense poles beneath a stormy sky',
        'Painted dragon incense standing outside a temple beneath the clouds',
        'Craftspeople installing monumental dragon incense on site',
        'Three hand-finished dragon incense poles before their lights are switched on',
        'A large ceremonial field filled with dragon incense',
        'Rows of dragon incense prepared beneath traditional red lanterns',
        'Eight-foot peach incense freshly painted in the workshop',
        'Handmade auspicious sculptural incense in the workshop',
        'Large green incense poles completed with traditional motifs',
      ],
    },
    ceremony: {
      label: 'A ceremonial presence',
      title: 'For an important day,\nraise a remarkable offering.',
      action: 'Ask about dragon incense',
      imageAlt: 'Monumental dragon incense at a temple celebration',
    },
    contact: {
      label: 'Enquiries',
      title: 'Tell us what incense\nyou need.',
      body: 'Send us the occasion, size, quantity and required date on WhatsApp, or view our work and message us through Facebook.',
      button: 'Enquire on WhatsApp',
      whatsappMeta: '016-363 3329',
      facebookButton: 'Message on Facebook',
      facebookMeta: 'View recent work and send a message',
      prompt: 'Hello, I would like to enquire about dragon incense or temple incense from Heng Yau Enterprise.',
      aria: 'Contact Heng Yau Enterprise on WhatsApp',
      facebookAria: 'Contact Heng Yau Enterprise on Facebook',
    },
    footer: {
      descriptor: 'Dragon incense · Temple incense · Traditional craft',
      rights: 'Heng Yau Enterprise',
      top: 'Back to top',
    },
  },
} as const

const t = computed(() => copy[locale.value])
const isMobileViewport = computed(() => viewportWidth.value !== null && viewportWidth.value <= 820)
const isNarrowViewport = computed(() => viewportWidth.value !== null && viewportWidth.value <= 590)
const selectedProduct = computed(() => (
  selectedProductIndex.value === null
    ? null
    : t.value.products.items[selectedProductIndex.value]
))
const selectedPhoto = computed(() => (
  selectedPhotoIndex.value === null
    ? null
    : facebookPhotos[selectedPhotoIndex.value]
))
const selectedPhotoAlt = computed(() => (
  selectedPhotoIndex.value === null
    ? ''
    : t.value.facebook.items[selectedPhotoIndex.value]
))
const selectedPhotoPosition = computed(() => t.value.facebook.position
  .replace('{current}', String((selectedPhotoIndex.value ?? 0) + 1))
  .replace('{total}', String(facebookPhotos.length)))

const whatsappUrl = computed(() => {
  const number = String(runtimeConfig.public.whatsappNumber || '').replace(/\D/g, '')
  const base = number ? `https://wa.me/${number}` : 'https://api.whatsapp.com/send'
  return `${base}?text=${encodeURIComponent(t.value.contact.prompt)}`
})

const switchLanguage = () => {
  locale.value = locale.value === 'zh' ? 'en' : 'zh'
  document.documentElement.lang = locale.value === 'zh' ? 'zh-Hans' : 'en'
  menuOpen.value = false
}

const scrollAlbum = (direction: -1 | 1) => {
  albumTrack.value?.scrollBy({
    left: direction * Math.max(albumTrack.value.clientWidth * 0.82, 320),
    behavior: 'smooth',
  })
}

const openPhoto = (index: number) => {
  selectedPhotoIndex.value = index
  nextTick(() => photoDialog.value?.showModal())
}

const closePhoto = () => {
  if (photoDialog.value?.open) photoDialog.value.close()
  selectedPhotoIndex.value = null
}

const stepPhoto = (direction: -1 | 1) => {
  if (selectedPhotoIndex.value === null) return
  selectedPhotoIndex.value = (
    selectedPhotoIndex.value + direction + facebookPhotos.length
  ) % facebookPhotos.length
}

const openProduct = (index: number) => {
  selectedProductIndex.value = index
  nextTick(() => catalogDialog.value?.showModal())
}

const closeProduct = () => {
  if (catalogDialog.value?.open) catalogDialog.value.close()
  selectedProductIndex.value = null
}

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

const showHomeSection = (id: string) => {
  const isAlreadyHome = currentView.value === 'home'
  currentView.value = 'home'
  menuOpen.value = false
  closeProduct()

  if (!isAlreadyHome) {
    pendingHomeSection.value = id
    return
  }

  nextTick(() => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setupRevealAnimations()
  })
}

const showCatalog = () => {
  const isAlreadyCatalog = currentView.value === 'catalog'
  currentView.value = 'catalog'
  menuOpen.value = false
  pendingHomeSection.value = null
  closeProduct()

  if (!isAlreadyCatalog) return

  nextTick(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    setupRevealAnimations()
  })
}

const onViewEntered = () => {
  nextTick(() => {
    setupRevealAnimations()

    if (currentView.value === 'catalog') {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const id = pendingHomeSection.value
    pendingHomeSection.value = null
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  })
}

const onScroll = () => {
  scrolled.value = window.scrollY > 28
  const scrollable = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)
  scrollProgress.value = Math.min((window.scrollY / scrollable) * 100, 100)
}

const syncViewport = () => {
  viewportWidth.value = Math.round(window.visualViewport?.width ?? window.innerWidth)
  if (viewportWidth.value > 1080) menuOpen.value = false
}

const setupRevealAnimations = () => {
  revealObserver?.disconnect()
  const elements = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]

  if (!('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('is-visible'))
    return
  }

  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return
      entry.target.classList.add('is-visible')
      revealObserver?.unobserve(entry.target)
    })
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 })

  elements.forEach((element, index) => {
    element.classList.remove('is-visible')
    element.style.setProperty('--reveal-delay', `${Math.min(index % 5, 4) * 70}ms`)
    revealObserver?.observe(element)
  })
}

onMounted(() => {
  document.documentElement.lang = 'zh-Hans'
  document.documentElement.classList.add('motion-ready')
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', syncViewport, { passive: true })
  window.addEventListener('orientationchange', syncViewport, { passive: true })
  window.visualViewport?.addEventListener('resize', syncViewport, { passive: true })
  syncViewport()
  onScroll()
  nextTick(setupRevealAnimations)
})

onBeforeUnmount(() => {
  document.documentElement.classList.remove('motion-ready')
  revealObserver?.disconnect()
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', syncViewport)
  window.removeEventListener('orientationchange', syncViewport)
  window.visualViewport?.removeEventListener('resize', syncViewport)
})

const seo = computed(() => {
  if (locale.value === 'en') {
    return {
      title: currentView.value === 'catalog'
        ? 'Incense Catalogue | Heng Yau Enterprise'
        : 'Heng Yau Enterprise | Handmade Dragon Incense Malaysia',
      description: 'Heng Yau Enterprise makes monumental dragon incense and traditional temple incense in Malaysia for temple festivals, deity celebrations and worship.',
      keywords: 'Heng Yau Enterprise, dragon incense Malaysia, temple incense, monumental incense, custom festival incense, 龙香, 兴耀企业',
      imageAlt: 'Heng Yau Enterprise monumental dragon incense illuminated for a temple celebration',
    }
  }

  return {
    title: currentView.value === 'catalog'
      ? '香品目录｜兴耀企业龙香与寺庙用香'
      : '兴耀企业｜马来西亚龙香、庙庆与寺庙用香',
    description: '兴耀企业在马来西亚手工制作龙香、庙庆订制龙香及传统寺庙用香，适用于神诞、酬神、祈福与重要祭祀。',
    keywords: '兴耀企业, 龙香, 马来西亚龙香, 寺庙用香, 庙庆龙香, 神诞用香, 手工龙香, Heng Yau Enterprise',
    imageAlt: '兴耀企业为庙宇庆典制作并点亮的高身龙香',
  }
})

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: '兴耀企业',
      alternateName: 'Heng Yau Enterprise',
      url: siteUrl,
      logo: `${siteUrl}/images/heng-yau-logo-transparent-v6.webp`,
      image: `${siteUrl}/images/facebook-led-dragon-night-v14.webp`,
      description: '马来西亚传统龙香、庙庆订制龙香与寺庙用香制作企业。',
      telephone: '+60 16-363 3329',
      areaServed: { '@type': 'Country', name: 'Malaysia' },
      sameAs: [facebookUrl],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+60 16-363 3329',
        contactType: 'customer enquiries',
        availableLanguage: ['Chinese', 'English'],
      },
      knowsAbout: ['龙香', 'Dragon incense', '寺庙用香', 'Temple incense', '庙庆订制香', 'Traditional incense craft'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: '兴耀企业香品目录',
        itemListElement: copy.zh.products.items.map((item, index) => ({
          '@type': 'Offer',
          position: index + 1,
          itemOffered: {
            '@type': 'Product',
            name: item.name,
            alternateName: copy.en.products.items[index]?.name,
            description: item.text,
            image: `${siteUrl}${item.image}`,
            brand: { '@id': `${siteUrl}/#organization` },
          },
        })),
      },
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: '兴耀企业｜Heng Yau Enterprise',
      publisher: { '@id': `${siteUrl}/#organization` },
      inLanguage: ['zh-Hans', 'en'],
    },
    {
      '@type': 'FAQPage',
      '@id': `${siteUrl}/#dragon-incense-faq`,
      inLanguage: 'zh-Hans',
      mainEntity: [
        {
          '@type': 'Question',
          name: '什么是龙香？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '龙香以可燃香粉制成粗长香身，再沿香身手工塑制龙首、龙鳞、火焰与祥云。顶端燃点后会留下香灰并持续冒烟。',
          },
        },
        {
          '@type': 'Question',
          name: '龙香适合哪些场合？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '龙香常用于庙庆、神诞、大型祭祀、酬神与祈福场合，也可按庙宇场地、主题色彩和数量订制。',
          },
        },
        {
          '@type': 'Question',
          name: '如何向兴耀企业查询龙香？',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '通过 WhatsApp 016-363 3329 发送用途、场地、所需日期、尺寸与数量，即可查询合适的龙香规格。',
          },
        },
      ],
    },
  ],
}))

useSeoMeta({
  title: () => seo.value.title,
  description: () => seo.value.description,
  robots: robotsDirective,
  ogType: 'website',
  ogSiteName: '兴耀企业 Heng Yau Enterprise',
  ogTitle: () => seo.value.title,
  ogDescription: () => seo.value.description,
  ogUrl: siteUrl,
  ogImage: `${siteUrl}/images/facebook-led-dragon-night-v14.webp`,
  ogImageAlt: () => seo.value.imageAlt,
  ogLocale: () => locale.value === 'zh' ? 'zh_MY' : 'en_MY',
  twitterCard: 'summary_large_image',
  twitterTitle: () => seo.value.title,
  twitterDescription: () => seo.value.description,
  twitterImage: `${siteUrl}/images/facebook-led-dragon-night-v14.webp`,
})

useHead(() => ({
  htmlAttrs: { lang: locale.value === 'zh' ? 'zh-Hans' : 'en' },
  link: [{ rel: 'canonical', href: siteUrl }],
  meta: [
    { name: 'keywords', content: seo.value.keywords },
    { name: 'author', content: '兴耀企业 Heng Yau Enterprise' },
    { property: 'og:locale:alternate', content: locale.value === 'zh' ? 'en_MY' : 'zh_MY' },
  ],
  script: [
    {
      key: 'heng-yau-structured-data',
      type: 'application/ld+json',
      textContent: JSON.stringify(structuredData.value),
    },
  ],
}))
</script>

<template>
  <div
    class="site-shell"
    :class="{
      'is-english': locale === 'en',
      'menu-is-open': menuOpen,
      'is-mobile-viewport': isMobileViewport,
      'is-narrow-viewport': isNarrowViewport,
    }"
  >
    <header class="site-header" :class="{ 'is-scrolled': scrolled }">
      <div class="container header-inner">
        <button type="button" class="compact-brand" :aria-label="t.header.homeLabel" @click="showHomeSection('top')">
          <span class="header-logo-frame">
            <img src="/images/heng-yau-logo-transparent-v6.webp" alt="">
          </span>
          <span class="compact-words">
            <strong>兴耀企业</strong>
            <small>{{ t.header.descriptor }}</small>
          </span>
        </button>

        <nav class="desktop-nav" :aria-label="t.nav.aria">
          <button type="button" @click="showHomeSection('dragon')">{{ t.nav.dragon }}</button>
          <button type="button" :class="{ 'is-active': currentView === 'catalog' }" @click="showCatalog">{{ t.nav.products }}</button>
          <button type="button" @click="showHomeSection('craft')">{{ t.nav.craft }}</button>
          <button type="button" @click="showHomeSection('story')">{{ t.nav.story }}</button>
          <button type="button" @click="showHomeSection('contact')">{{ t.nav.contact }}</button>
        </nav>

        <div class="header-actions">
          <button class="language-button" type="button" @click="switchLanguage">
            <Languages :size="17" />
            <span>{{ locale === 'zh' ? 'EN' : '中文' }}</span>
          </button>
          <a class="header-whatsapp" :href="whatsappUrl" target="_blank" rel="noopener" :aria-label="t.contact.aria">
            <WhatsAppIcon :size="20" />
          </a>
          <a class="header-facebook" :href="facebookUrl" target="_blank" rel="noopener" :aria-label="t.header.facebookLabel">
            <FacebookIcon :size="21" />
          </a>
          <button class="menu-button" type="button" :aria-label="t.header.menuLabel" :aria-expanded="menuOpen" @click="menuOpen = !menuOpen">
            <X v-if="menuOpen" :size="24" />
            <Menu v-else :size="24" />
          </button>
        </div>
      </div>

      <nav class="mobile-nav" :class="{ 'is-open': menuOpen }" :aria-label="t.nav.aria">
        <button type="button" @click="showHomeSection('dragon')">{{ t.nav.dragon }}</button>
        <button type="button" @click="showCatalog">{{ t.nav.products }}</button>
        <button type="button" @click="showHomeSection('craft')">{{ t.nav.craft }}</button>
        <button type="button" @click="showHomeSection('story')">{{ t.nav.story }}</button>
        <button type="button" @click="showHomeSection('contact')">{{ t.nav.contact }}</button>
      </nav>
      <div class="scroll-progress" aria-hidden="true"><span :style="{ width: `${scrollProgress}%` }" /></div>
    </header>

    <Transition name="page-switch" mode="out-in" @after-enter="onViewEntered">
      <main v-if="currentView === 'home'">
      <section id="top" class="hero">
        <img class="hero-image" src="/images/facebook-led-dragon-night-v14.webp" :alt="t.hero.imageAlt">
        <div class="hero-shade" />
        <div class="ember-glow" />
        <div class="incense-smoke-plumes hero-smoke-plumes" aria-hidden="true">
          <span /><span /><span />
        </div>

        <div class="container hero-layout">
          <div class="hero-copy" data-reveal="hero">
            <p class="hero-kicker">{{ t.hero.kicker }}</p>
            <h1>
              <span>{{ t.hero.title }}</span>
              <em>{{ t.hero.accent }}</em>
            </h1>
            <p class="hero-text">{{ t.hero.text }}</p>
            <div class="hero-actions">
              <button type="button" class="button button-primary" @click="showHomeSection('dragon')">
                {{ t.hero.primary }}
                <ArrowDown :size="18" />
              </button>
              <a :href="whatsappUrl" class="button button-ghost" target="_blank" rel="noopener">
                <WhatsAppIcon :size="19" />
                {{ t.hero.secondary }}
              </a>
            </div>
            <div class="hero-note">
              <Flame :size="18" />
              <span>{{ t.hero.note }}</span>
            </div>
          </div>

          <p class="hero-product-note">{{ t.hero.productLabel }}<br><span>{{ t.hero.productEn }}</span></p>
        </div>

        <button type="button" class="scroll-cue" @click="showHomeSection('dragon')">
          <span>{{ t.hero.scroll }}</span>
          <ArrowDown :size="17" />
        </button>
      </section>

      <div class="brand-ribbon" aria-hidden="true">
        <div class="ribbon-track">
          <template v-for="repeat in 2" :key="repeat">
            <template v-for="item in t.ribbon" :key="`${repeat}-${item}`">
              <span>{{ item }}</span>
              <i>香</i>
            </template>
          </template>
        </div>
      </div>

      <section id="dragon" class="dragon-feature section-pad">
        <div class="container dragon-grid">
          <div class="dragon-copy" data-reveal="left">
            <p class="eyebrow">{{ t.dragon.label }}</p>
            <h2 class="preserve-lines">{{ t.dragon.title }}</h2>
            <p class="large-body">{{ t.dragon.body }}</p>
            <div class="feature-tags">
              <span v-for="tag in t.dragon.tags" :key="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="dragon-collage" data-reveal="right">
            <figure class="collage-main">
              <img src="/images/facebook-dragon-perspective-v15.webp" :alt="t.dragon.ceremonyAlt">
            </figure>
            <figure class="collage-detail">
              <img src="/images/facebook-dragon-temple-vertical-v15.webp" :alt="t.dragon.craftAlt">
            </figure>
            <div class="round-stamp">{{ t.dragon.stamp }}</div>
            <span class="collage-line line-one" />
            <span class="collage-line line-two" />
          </div>
        </div>
      </section>

      <section class="catalogue-teaser section-pad">
        <div class="container catalogue-teaser-grid">
          <div class="catalogue-teaser-copy" data-reveal="left">
            <p class="eyebrow">{{ t.products.label }}</p>
            <h2 class="preserve-lines">{{ t.products.title }}</h2>
            <p>{{ t.products.intro }}</p>
            <button type="button" class="button button-primary" @click="showCatalog">
              <BookOpen :size="19" />
              {{ t.products.viewAll }}
              <ArrowUpRight :size="17" />
            </button>
          </div>
          <div class="catalogue-teaser-photos" data-reveal="right">
            <figure class="teaser-photo-large">
              <img src="/images/facebook-dragon-field-row-v15.webp" :alt="t.dragon.ceremonyAlt" loading="lazy">
            </figure>
          </div>
        </div>
      </section>

      <section id="facebook" class="facebook-gallery-section section-pad">
        <div class="container">
          <div class="album-heading" data-reveal>
            <div>
              <p class="eyebrow eyebrow-light">{{ t.facebook.label }}</p>
              <h2>{{ t.facebook.title }}</h2>
            </div>
            <div class="album-controls">
              <button type="button" :aria-label="t.facebook.previous" @click="scrollAlbum(-1)">
                <ChevronLeft :size="22" />
              </button>
              <button type="button" :aria-label="t.facebook.next" @click="scrollAlbum(1)">
                <ChevronRight :size="22" />
              </button>
            </div>
          </div>
          <div ref="albumTrack" class="facebook-photo-grid" tabindex="0" :aria-label="t.facebook.label">
            <figure
              v-for="(photo, index) in facebookPhotos"
              :key="photo.image"
              class="facebook-photo"
              :class="`facebook-photo-${index + 1}`"
              data-reveal="card"
            >
              <button
                type="button"
                class="album-photo-trigger"
                :aria-label="`${t.facebook.enlarge}: ${t.facebook.items[index]}`"
                @click="openPhoto(index)"
              >
                <img :src="photo.image" :alt="t.facebook.items[index]" loading="lazy">
                <span aria-hidden="true"><Maximize2 :size="19" /></span>
              </button>
            </figure>
          </div>
        </div>
      </section>

      <section id="craft" class="craft-section">
        <img class="craft-backdrop" src="/images/facebook-dragon-workshop-v14.webp" :alt="t.craft.imageAlt" loading="lazy">
        <div class="craft-overlay" />
        <div class="container craft-layout">
          <div class="craft-copy" data-reveal>
            <p class="eyebrow eyebrow-light">{{ t.craft.label }}</p>
            <h2 class="preserve-lines">{{ t.craft.title }}</h2>
            <p>{{ t.craft.body }}</p>
          </div>
          <div class="craft-steps">
            <article v-for="step in t.craft.steps" :key="step.no" data-reveal="card">
              <span class="step-number">{{ step.no }}</span>
              <component :is="step.icon" :size="25" :stroke-width="1.5" />
              <div>
                <h3>{{ step.title }}</h3>
                <p>{{ step.text }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="story" class="story-section section-pad">
        <div class="container story-layout">
          <div class="logo-showcase" data-reveal="left">
            <span class="corner corner-tl" />
            <span class="corner corner-tr" />
            <span class="corner corner-bl" />
            <span class="corner corner-br" />
            <img src="/images/heng-yau-logo-transparent-v6.webp" :alt="t.story.markAlt" loading="lazy">
          </div>

          <div class="story-copy" data-reveal="right">
            <p class="eyebrow">{{ t.story.label }}</p>
            <h2 class="preserve-lines">{{ t.story.title }}</h2>
            <p>{{ t.story.body }}</p>
            <blockquote>{{ t.story.quote }}</blockquote>
            <div class="identity-line">
              <span>兴耀</span>
              <i />
              <span>兴耀企业</span>
            </div>
          </div>
        </div>
      </section>

      <section class="ceremony-banner">
        <img src="/images/facebook-led-dragon-temple-v15.webp" :alt="t.ceremony.imageAlt" loading="lazy">
        <div class="ceremony-shade" />
        <div class="incense-smoke-plumes ceremony-smoke-plumes" aria-hidden="true">
          <span /><span /><span />
        </div>
        <div class="container ceremony-type" data-reveal>
          <p class="eyebrow eyebrow-light">{{ t.ceremony.label }}</p>
          <h2 class="preserve-lines">{{ t.ceremony.title }}</h2>
          <a :href="whatsappUrl" class="button button-light" target="_blank" rel="noopener">
            <WhatsAppIcon :size="19" />
            {{ t.ceremony.action }}
          </a>
        </div>
      </section>

      <section id="contact" class="contact-section section-pad">
        <div class="container contact-layout" data-reveal>
          <div>
            <p class="eyebrow eyebrow-light">{{ t.contact.label }}</p>
            <h2 class="preserve-lines">{{ t.contact.title }}</h2>
          </div>
          <div class="contact-action">
            <p>{{ t.contact.body }}</p>
            <div class="contact-buttons">
              <a :href="whatsappUrl" class="whatsapp-button" target="_blank" rel="noopener">
                <span class="contact-channel-icon"><WhatsAppIcon :size="25" /></span>
                <span class="contact-channel-copy">
                  <strong>{{ t.contact.button }}</strong>
                  <small>{{ t.contact.whatsappMeta }}</small>
                </span>
                <ArrowUpRight :size="20" />
              </a>
              <a :href="facebookUrl" class="facebook-contact-button" target="_blank" rel="noopener" :aria-label="t.contact.facebookAria">
                <span class="contact-channel-icon"><FacebookIcon :size="23" /></span>
                <span class="contact-channel-copy">
                  <strong>{{ t.contact.facebookButton }}</strong>
                  <small>{{ t.contact.facebookMeta }}</small>
                </span>
                <ArrowUpRight :size="20" />
              </a>
            </div>
          </div>
        </div>
      </section>
      </main>

      <main v-else class="catalog-page">
      <section class="catalog-page-hero">
        <img src="/images/album-temple-clouds-v16.webp" :alt="t.dragon.ceremonyAlt">
        <div class="catalog-page-shade" />
        <div class="container catalog-page-heading" data-reveal>
          <button type="button" class="catalog-page-back" @click="showHomeSection('top')">
            <ArrowLeft :size="18" />
            {{ t.products.backHome }}
          </button>
          <p class="eyebrow eyebrow-light">{{ t.products.pageEyebrow }}</p>
          <h1>{{ t.products.pageTitle }}</h1>
          <p>{{ t.products.pageIntro }}</p>
        </div>
      </section>

      <section class="products-section catalog-page-products section-pad">
        <div class="container">
          <div class="catalog-page-lead" data-reveal>
            <p>{{ t.products.intro }}</p>
          </div>

          <div class="product-gallery">
            <article
              v-for="(item, index) in t.products.items"
              :key="item.name"
              class="product-card"
              data-reveal="card"
            >
              <button class="catalog-card-trigger" type="button" @click="openProduct(index)">
                <div class="product-image-wrap">
                  <img :src="item.image" :alt="item.alt" loading="lazy">
                  <span class="product-number">{{ item.no }}</span>
                </div>
                <div class="product-info">
                  <div>
                    <p class="product-type">{{ item.type }}</p>
                    <h3>{{ item.name }}</h3>
                    <small>{{ item.en }}</small>
                  </div>
                  <p>{{ item.text }}</p>
                  <span class="catalog-card-action">
                    <BookOpen :size="18" />
                    {{ t.products.explore }}
                    <ArrowUpRight :size="17" />
                  </span>
                </div>
              </button>
            </article>
          </div>
        </div>
      </section>
      </main>
    </Transition>

    <dialog
      ref="catalogDialog"
      class="catalog-dialog"
      :aria-label="selectedProduct?.name"
      @click.self="closeProduct"
      @close="selectedProductIndex = null"
    >
      <article v-if="selectedProduct" class="catalog-detail">
        <button
          type="button"
          class="catalog-dialog-close"
          :aria-label="t.products.dialogClose"
          @click="closeProduct"
        >
          <X :size="22" />
        </button>

        <div class="catalog-detail-hero">
          <img :src="selectedProduct.image" :alt="selectedProduct.alt">
          <div class="catalog-detail-shade" />
          <div class="catalog-detail-title">
            <p>{{ selectedProduct.type }}</p>
            <h2>{{ selectedProduct.name }}</h2>
            <span>{{ selectedProduct.en }}</span>
          </div>
        </div>

        <div class="catalog-detail-body">
          <p class="catalog-lede">{{ selectedProduct.summary }}</p>

          <div class="catalog-photo-story">
            <p class="catalog-photo-label">{{ t.products.galleryLabel }}</p>
            <div class="catalog-photo-grid">
              <figure v-for="(image, galleryIndex) in selectedProduct.gallery" :key="image">
                <img :src="image" :alt="`${selectedProduct.alt} ${galleryIndex + 1}`" loading="lazy">
              </figure>
            </div>
          </div>

          <div class="catalog-detail-grid">
            <section>
              <span class="catalog-detail-icon"><Clock3 :size="21" /></span>
              <p class="catalog-detail-label">{{ t.products.historyLabel }}</p>
              <p>{{ selectedProduct.history }}</p>
            </section>
            <section>
              <span class="catalog-detail-icon"><HeartHandshake :size="21" /></span>
              <p class="catalog-detail-label">{{ t.products.usesLabel }}</p>
              <ul>
                <li v-for="use in selectedProduct.uses" :key="use">{{ use }}</li>
              </ul>
            </section>
            <section>
              <span class="catalog-detail-icon"><Ruler :size="21" /></span>
              <p class="catalog-detail-label">{{ t.products.chooseLabel }}</p>
              <p>{{ selectedProduct.choose }}</p>
            </section>
          </div>

          <aside class="catalog-contact">
            <div>
              <strong>{{ t.products.contactLabel }}</strong>
              <p>{{ t.products.contactText }}</p>
            </div>
            <a :href="whatsappUrl" target="_blank" rel="noopener">
              <WhatsAppIcon :size="22" />
              {{ t.products.enquire }}
            </a>
          </aside>
        </div>
      </article>
    </dialog>

    <dialog
      ref="photoDialog"
      class="photo-dialog"
      :aria-label="selectedPhotoAlt"
      @click.self="closePhoto"
      @close="selectedPhotoIndex = null"
      @keydown.left.prevent="stepPhoto(-1)"
      @keydown.right.prevent="stepPhoto(1)"
    >
      <article v-if="selectedPhoto" class="photo-lightbox">
        <button type="button" class="photo-dialog-close" :aria-label="t.facebook.close" @click="closePhoto">
          <X :size="23" />
        </button>
        <button type="button" class="photo-step photo-step-previous" :aria-label="t.facebook.previous" @click="stepPhoto(-1)">
          <ChevronLeft :size="29" />
        </button>
        <figure>
          <img :src="selectedPhoto.image" :alt="selectedPhotoAlt">
          <figcaption>
            <p>{{ selectedPhotoAlt }}</p>
            <span>{{ selectedPhotoPosition }}</span>
          </figcaption>
        </figure>
        <button type="button" class="photo-step photo-step-next" :aria-label="t.facebook.next" @click="stepPhoto(1)">
          <ChevronRight :size="29" />
        </button>
      </article>
    </dialog>

    <footer class="site-footer">
      <div class="container footer-main">
        <div class="footer-brand">
          <span class="footer-logo-frame">
            <img src="/images/heng-yau-logo-transparent-v6.webp" alt="">
          </span>
          <div>
            <strong>兴耀企业</strong>
            <p>{{ t.footer.descriptor }}</p>
          </div>
        </div>
        <div class="footer-wordmark">
          <strong>兴耀企业</strong>
          <small>HENG YAU ENTERPRISE</small>
          <a :href="facebookUrl" target="_blank" rel="noopener" :aria-label="t.header.facebookLabel">
            <FacebookIcon :size="17" />
            Facebook
          </a>
        </div>
      </div>
      <div class="container footer-bottom">
        <p>© {{ new Date().getFullYear() }} {{ t.footer.rights }}</p>
        <button type="button" @click="scrollToTop">
          {{ t.footer.top }}
          <ArrowDown :size="15" />
        </button>
      </div>
    </footer>

    <a :href="whatsappUrl" class="floating-whatsapp" target="_blank" rel="noopener" :aria-label="t.contact.aria">
      <WhatsAppIcon :size="29" />
    </a>
  </div>
</template>
