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
  Mail,
  MapPin,
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
const standalonePhoto = ref<{ image: string, alt: string, meta: string } | null>(null)
const pendingHomeSection = ref<string | null>(null)
const catalogDialog = ref<HTMLDialogElement | null>(null)
const photoDialog = ref<HTMLDialogElement | null>(null)
const albumTrack = ref<HTMLElement | null>(null)
const runtimeConfig = useRuntimeConfig()
let revealObserver: IntersectionObserver | null = null

const facebookUrl = 'https://www.facebook.com/profile.php?id=100043191953658'
const emailUrl = 'mailto:sainem38@gmail.com'
const mapUrl = 'https://www.bing.com/maps/default.aspx?v=2&pc=FACEBK&mid=8100&where1=LOT%20455%20A%20STOR%20%28SKLC%20A21%2F5%29%20KAMPUNG%20CHUAH%20CHUAH%2071960%20PORT%20DICKSON%20NEGERI%20SEMBILAN.%2C%20Port%20Dickson%2C%20Malaysia&FORM=FBKPL1'
const siteUrl = String(runtimeConfig.public.siteUrl).replace(/\/+$/, '')
const robotsDirective = runtimeConfig.public.preventIndexing
  ? 'noindex, nofollow, noarchive'
  : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
const facebookPhotos = [
  { image: '/images/album-led-trio-v16.webp' },
  { image: '/images/album-temple-clouds-v16.webp' },
  { image: '/images/album-installation-v16.webp' },
  { image: '/images/album-handmade-trio-v16.webp' },
  { image: '/images/album-ceremony-field-v16.webp' },
  { image: '/images/album-ceremony-row-v16.webp' },
  { image: '/images/album-led-row-v16.webp' },
  { image: '/images/album-led-procession-v16.webp' },
  { image: '/images/album-peach-incense-v16.webp' },
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
      historyLabel: '规格说明',
      usesLabel: '适用场合',
      chooseLabel: '订制须知',
      galleryLabel: '放大实照',
      contactLabel: '不确定应该选几尺？',
      contactText: '把庙宇现场、净高、日期与数量发给我们，再一起确认合适规格。',
      pageEyebrow: '兴耀香品',
      pageTitle: '香品目录',
      pageIntro: '按高度浏览兴耀龙香。点击任何尺寸，查看实照、适用场合与订制前需要确认的资料。',
      viewAll: '进入完整香品目录',
      backHome: '返回首页',
      catalogBack: '返回目录',
      items: [
        {
          no: '08',
          name: '8 尺龙香',
          en: '8 FT DRAGON INCENSE',
          type: '约 2.4 米 · 中型场地',
          text: '比例紧凑，保留完整龙首与彩绘香身，适合净高较有限的庙宇与庆典空间。',
          image: '/images/facebook-dragon-row-close-v15.webp',
          alt: '成排完成彩绘的八尺兴耀龙香',
          summary: '8 尺龙香兼顾仪式感与场地适应性。香身、龙首及固定支架的最终高度须按现场净高确认。',
          history: '标称 8 尺约为 2.4 米；实际成品、木芯与支架高度会因款式与安装方式略有差异。',
          uses: ['庙宇神诞与社区庆典', '净高较有限的户外或有棚空间', '多柱排列与成组敬奉'],
          choose: '请提供入口高度、摆放位置、数量和使用日期，并预留稳定支架及安全距离。',
        },
        {
          no: '12',
          name: '12 尺龙香',
          en: '12 FT DRAGON INCENSE',
          type: '约 3.7 米 · 庙庆常用',
          text: '高度与造型更有存在感，适合庙前主场、神诞与重要酬神仪式。',
          image: '/images/facebook-dragon-temple-front-v15.webp',
          alt: '庙宇前安装完成的十二尺兴耀龙香',
          summary: '12 尺规格适合希望龙香清楚成为仪式焦点，同时兼顾一般庙前场地与运输安排的项目。',
          history: '标称 12 尺约为 3.7 米。龙头位置、彩龙走势与底部固定结构会按现场条件配置。',
          uses: ['神诞、酬神与祈福仪式', '庙门前或庆典主场', '日间展示与夜间灯饰款'],
          choose: '确认场地净高、进场路线与电源位置；如需灯饰，请在订制时一并说明。',
        },
        {
          no: '16',
          name: '16 尺大龙香',
          en: '16 FT GRAND DRAGON INCENSE',
          type: '约 4.9 米 · 大型庆典',
          text: '更长香身可呈现完整盘龙层次，适合空间开阔的大型庙庆与主坛前陈设。',
          image: '/images/facebook-dragon-temple-yard-v15.webp',
          alt: '庙宇广场上成列摆放的十六尺大龙香',
          summary: '16 尺大龙香以更高香身承载盘龙、祥云与火焰造型，视觉比例更庄严，也需要更完整的现场安装规划。',
          history: '标称 16 尺约为 4.9 米。成品运输、竖立方式和抗风固定都应在制作前确认。',
          uses: ['大型庙庆与神诞主香', '开阔庙埕和户外庆典', '需要远距离辨识度的仪式场地'],
          choose: '请提供现场照片、地面情况、净空范围与预计数量，以评估支架、运输和安装。',
        },
        {
          no: '18',
          name: '18 尺龙香',
          en: '18 FT DRAGON INCENSE',
          type: '约 5.5 米 · 高身主香',
          text: '高身比例带来庄严主视觉，适合大型仪式与具备充足净空的庙宇场地。',
          image: '/images/album-storm-sky-v16.webp',
          alt: '户外支架上竖立的十八尺兴耀龙香',
          summary: '18 尺龙香强调向上的气势与完整龙形，适合作为庆典主香。高身规格必须结合现场净高、风向和固定方式评估。',
          history: '标称 18 尺约为 5.5 米。实际高度、龙形比例与装饰配置以当次确认图和现场条件为准。',
          uses: ['大型神诞、法会与酬神庆典', '庙宇主入口或主坛前', '需要高身主视觉的户外仪式'],
          choose: '需较早确认制作期、运输路线、吊立或人力安排，并确保周边没有电线或低矮遮棚。',
        },
        {
          no: '21',
          name: '21 尺订制龙香',
          en: '21 FT CUSTOM DRAGON INCENSE',
          type: '约 6.4 米 · 需现场确认',
          text: '高身订制规格，按庙宇净空、结构支撑与安装条件评估后制作。',
          image: '/images/facebook-dragon-five-sky-v15.webp',
          alt: '晴天下高身兴耀订制龙香',
          summary: '21 尺属于需要逐案确认的高身规格。网页作为尺寸查询入口，最终能否制作、造型比例与安装方法须由兴耀按现场评估。',
          history: '标称 21 尺约为 6.4 米，属于逐案规划的订制规格；款式、结构和安装方法会按场地重新确认。',
          uses: ['高净空的大型庙庆场地', '需要特别高度与盘龙比例的订制项目', '具备安全安装范围的户外仪式'],
          choose: '查询时请先发送场地全景、净高、地面、周边电线、日期和数量，待确认后才安排制作。',
        },
        {
          no: '22',
          name: '22 尺龙香',
          en: '22 FT DRAGON INCENSE',
          type: '约 6.7 米 · 超高规格',
          text: '专为开阔庆典场地规划的超高龙香，需完整考虑运输、竖立与稳固。',
          image: '/images/facebook-dragon-row-palms-v15.webp',
          alt: '户外完成安装的二十二尺兴耀龙香',
          summary: '22 尺龙香拥有更强的远距视觉效果，同时对场地、支架、风况和安装团队有更高要求。',
          history: '标称 22 尺约为 6.7 米；龙身比例、支架结构与现场竖立方法会按项目配置。',
          uses: ['大型庙庆、神诞与酬神仪式', '开阔户外主场与庙宇广场', '需要成组高身龙香的庆典'],
          choose: '必须先确认运输车辆可达、竖立范围、支架固定点、电线距离与当地天气条件。',
        },
        {
          no: '24',
          name: '24 尺龙香',
          en: '24 FT DRAGON INCENSE',
          type: '约 7.3 米 · 最大型项目',
          text: '适合具备充足净空和安装条件的大型庆典，属于需要提前规划的项目规格。',
          image: '/images/facebook-dragon-row-road-v15.webp',
          alt: '道路旁高身排列的二十四尺兴耀龙香',
          summary: '24 尺龙香以大型仪式为前提，从香身制作、干燥、运输到现场竖立都需要充足准备时间。',
          history: '标称 24 尺约为 7.3 米；每批均按活动规模、场地条件与确认款式安排制作。',
          uses: ['大型庙会与重要庆典主香', '具备宽阔净空的户外场地', '需要强烈仪式视觉的特别项目'],
          choose: '请尽早提供活动日期与现场资料；制作安排须视数量、天气、运输和安装条件确认。',
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
      title: '兴耀龙香作品',
      intro: 'Kampung Chuah 工坊、安装过程与庙庆现场记录。滑动浏览，点击照片可放大。',
      previous: '上一组照片',
      next: '下一组照片',
      enlarge: '放大查看',
      close: '关闭相册',
      position: '第 {current} / {total} 张',
      items: [
        '夜间完成装灯的三柱大型龙香',
        '庙宇前迎着云层竖立的彩绘龙香',
        '工作人员在现场安装大型龙香',
        '亮灯前完成彩绘与造型的三柱龙香',
        '庆典场地整批排列的大型龙香',
        '红灯笼下等待仪式使用的龙香阵列',
        '夜间庙庆中成排亮灯的龙香',
        '庆典仪式中高身龙香与灯饰',
        '工坊中完成彩绘的八尺桃香',
      ],
      meta: [
        'KAMPUNG CHUAH · 夜间装灯',
        'PORT DICKSON · 庙前安香',
        'KAMPUNG CHUAH · 现场安装',
        'KAMPUNG CHUAH · 手工完成',
        '森美兰 · 庆典准备',
        '森美兰 · 庙庆现场',
        '庙庆记录 · 夜间灯饰',
        '庆典记录 · 仪式现场',
        'KAMPUNG CHUAH · 工坊记录',
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
      title: '把场地与日期，\n交给我们确认。',
      body: '查询龙香时，请发送庙宇现场、所需尺数、数量与使用日期。兴耀会从 WhatsApp 回复制作与安排。',
      button: 'WhatsApp 查询',
      whatsappMeta: '016-363 3329',
      facebookButton: 'Facebook 专页',
      facebookMeta: '查看更多作品记录',
      addressLabel: '工坊地址',
      address: 'Lot 455A, Stor (SKLC A21/5), Kampung Chuah, 71960 Port Dickson, Negeri Sembilan',
      mapAction: '打开地图',
      emailLabel: '电邮',
      email: 'sainem38@gmail.com',
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
      historyLabel: 'Size notes',
      usesLabel: 'Suitable occasions',
      chooseLabel: 'Before ordering',
      galleryLabel: 'Open photograph',
      contactLabel: 'Not sure which height fits?',
      contactText: 'Send us venue photographs, clear height, event date and quantity so the suitable size can be confirmed.',
      pageEyebrow: 'Heng Yau incense',
      pageTitle: 'Incense Catalogue',
      pageIntro: 'Browse Heng Yau dragon incense by height. Open any size for a real photograph, suitable occasions and the details needed before ordering.',
      viewAll: 'Open the full catalogue',
      backHome: 'Back to homepage',
      catalogBack: 'Back to catalogue',
      items: [
        {
          no: '08',
          name: '8 ft Dragon Incense',
          en: '8 尺龙香',
          type: 'Approx. 2.4 m · Medium venues',
          text: 'A compact proportion with a complete dragon head and painted incense body for temples with more limited clear height.',
          image: '/images/facebook-dragon-row-close-v15.webp',
          alt: 'A row of completed eight-foot Heng Yau dragon incense',
          summary: 'The 8 ft format balances ceremonial presence with easier venue planning. Final incense, core and support height must still be checked against the actual site.',
          history: 'The nominal 8 ft height is about 2.4 metres. The finished product, timber core and stand may vary slightly with the selected design and installation method.',
          uses: ['Temple birthdays and community festivals', 'Outdoor or sheltered spaces with lower clearance', 'Grouped or multi-piece offerings'],
          choose: 'Share the entrance height, intended position, quantity and event date, and allow room for a stable support and safe clearance.',
        },
        {
          no: '12',
          name: '12 ft Dragon Incense',
          en: '12 尺龙香',
          type: 'Approx. 3.7 m · Popular festival size',
          text: 'A stronger ceremonial presence for temple forecourts, deity celebrations and important thanksgiving rites.',
          image: '/images/facebook-dragon-temple-front-v15.webp',
          alt: 'Twelve-foot Heng Yau dragon incense installed in front of a temple',
          summary: 'The 12 ft format creates a clear focal point while remaining practical for many temple entrance spaces and transport arrangements.',
          history: 'The nominal 12 ft height is about 3.7 metres. Dragon placement, colour flow and base support are configured for the venue.',
          uses: ['Deity birthdays, thanksgiving and blessing ceremonies', 'Temple entrances and main festival areas', 'Daytime presentation or illuminated night designs'],
          choose: 'Confirm clear height, access route and power location. Mention any lighting requirement when making the enquiry.',
        },
        {
          no: '16',
          name: '16 ft Grand Dragon Incense',
          en: '16 尺大龙香',
          type: 'Approx. 4.9 m · Large festivals',
          text: 'A taller incense body provides more room for the coiling dragon and suits large temple festivals in open settings.',
          image: '/images/facebook-dragon-temple-yard-v15.webp',
          alt: 'Sixteen-foot grand dragon incense arranged in a temple courtyard',
          summary: 'The 16 ft format carries a fuller dragon, cloud and flame composition and requires a more complete installation plan.',
          history: 'The nominal 16 ft height is about 4.9 metres. Transport, lifting method and wind-resistant support should be settled before production.',
          uses: ['Large temple festivals and principal offerings', 'Open forecourts and outdoor celebrations', 'Venues needing strong visibility from a distance'],
          choose: 'Send venue photographs, ground conditions, clear space and quantity so transport, stands and installation can be assessed.',
        },
        {
          no: '18',
          name: '18 ft Dragon Incense',
          en: '18 尺龙香',
          type: 'Approx. 5.5 m · Tall principal offering',
          text: 'A tall, dignified centrepiece for major ceremonies and temple venues with generous clear height.',
          image: '/images/album-storm-sky-v16.webp',
          alt: 'Eighteen-foot Heng Yau dragon incense raised on outdoor supports',
          summary: 'The 18 ft format has a strong vertical silhouette and suits a principal festival offering. Height, wind and anchoring must be assessed together.',
          history: 'The nominal 18 ft height is about 5.5 metres. Final dimensions, dragon proportions and decoration depend on the confirmed venue and order.',
          uses: ['Major deity celebrations and thanksgiving festivals', 'Temple entrances and principal ceremonial areas', 'Outdoor events requiring a tall visual anchor'],
          choose: 'Plan production time, transport route and lifting arrangements early, with adequate distance from overhead wires and low shelters.',
        },
        {
          no: '21',
          name: '21 ft Custom Dragon Incense',
          en: '21 尺订制龙香',
          type: 'Approx. 6.4 m · Site assessment required',
          text: 'A tall custom specification considered only after checking venue clearance, structural support and installation conditions.',
          image: '/images/facebook-dragon-five-sky-v15.webp',
          alt: 'Tall custom Heng Yau dragon incense beneath a clear sky',
          summary: 'The 21 ft option is assessed per project. The site serves as an enquiry guide; feasibility, proportions and installation method must be confirmed by Heng Yau.',
          history: 'The nominal 21 ft height is about 6.4 metres. This custom size is planned case by case, including its design, structure and installation method.',
          uses: ['Large temple grounds with generous clearance', 'Custom projects needing a particular height and dragon proportion', 'Outdoor ceremonies with a safe installation zone'],
          choose: 'First send a wide venue view, clear height, ground condition, nearby wires, event date and quantity for assessment.',
        },
        {
          no: '22',
          name: '22 ft Dragon Incense',
          en: '22 尺龙香',
          type: 'Approx. 6.7 m · Extra-tall format',
          text: 'An extra-tall offering planned for open festival grounds with proper transport, lifting and support.',
          image: '/images/facebook-dragon-row-palms-v15.webp',
          alt: 'Twenty-two-foot Heng Yau dragon incense installed outdoors',
          summary: 'The 22 ft format creates a powerful long-distance presence and places greater demands on the venue, stands, wind planning and installation team.',
          history: 'The nominal 22 ft height is about 6.7 metres. Dragon proportions, support structure and on-site raising method are configured for each project.',
          uses: ['Large temple festivals and thanksgiving rites', 'Open outdoor courts and temple grounds', 'Celebrations using several tall dragon incense offerings'],
          choose: 'Confirm vehicle access, lifting zone, anchor points, distance from wires and expected weather before production.',
        },
        {
          no: '24',
          name: '24 ft Dragon Incense',
          en: '24 尺龙香',
          type: 'Approx. 7.3 m · Largest projects',
          text: 'A project-scale offering for events with extensive clear space and enough time for production and installation planning.',
          image: '/images/facebook-dragon-row-road-v15.webp',
          alt: 'Twenty-four-foot Heng Yau dragon incense arranged beside an access road',
          summary: 'The 24 ft format is planned as a large ceremonial project, with adequate lead time required for forming, drying, transport and raising on site.',
          history: 'The nominal 24 ft height is about 7.3 metres. Each order is planned around the ceremony scale, venue conditions and confirmed design.',
          uses: ['Major temple festivals and principal offerings', 'Outdoor venues with extensive clear space', 'Special projects requiring a strong ceremonial landmark'],
          choose: 'Share the event date and complete venue information early. Availability depends on quantity, weather, transport and installation conditions.',
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
      title: 'Heng Yau Dragon Incense Works',
      intro: 'Records from the Kampung Chuah workshop, installations and temple festivals. Swipe to browse and tap any photograph to enlarge it.',
      previous: 'Previous photographs',
      next: 'Next photographs',
      enlarge: 'Open larger view',
      close: 'Close album',
      position: 'Photograph {current} of {total}',
      items: [
        'Three monumental dragon incense poles with their lights completed',
        'Painted dragon incense standing outside a temple beneath the clouds',
        'Craftspeople installing monumental dragon incense on site',
        'Three hand-finished dragon incense poles before their lights are switched on',
        'A large ceremonial field filled with dragon incense',
        'Rows of dragon incense prepared beneath traditional red lanterns',
        'Rows of illuminated dragon incense at a night festival',
        'Tall dragon incense and lights during a temple celebration',
        'Eight-foot peach incense freshly painted in the workshop',
      ],
      meta: [
        'KAMPUNG CHUAH · NIGHT INSTALLATION',
        'PORT DICKSON · TEMPLE INSTALLATION',
        'KAMPUNG CHUAH · ON-SITE WORK',
        'KAMPUNG CHUAH · HAND FINISHED',
        'NEGERI SEMBILAN · FESTIVAL PREPARATION',
        'NEGERI SEMBILAN · TEMPLE FESTIVAL',
        'FESTIVAL RECORD · NIGHT LIGHTS',
        'CELEBRATION RECORD · CEREMONY',
        'KAMPUNG CHUAH · WORKSHOP RECORD',
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
      title: 'Share the venue\nand required date.',
      body: 'For a dragon incense enquiry, send the temple site, preferred height, quantity and event date. Heng Yau will respond through WhatsApp.',
      button: 'Enquire on WhatsApp',
      whatsappMeta: '016-363 3329',
      facebookButton: 'Facebook page',
      facebookMeta: 'Browse more work records',
      addressLabel: 'Workshop address',
      address: 'Lot 455A, Stor (SKLC A21/5), Kampung Chuah, 71960 Port Dickson, Negeri Sembilan',
      mapAction: 'Open map',
      emailLabel: 'Email',
      email: 'sainem38@gmail.com',
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
  standalonePhoto.value
    ? { image: standalonePhoto.value.image }
    : selectedPhotoIndex.value === null
      ? null
      : facebookPhotos[selectedPhotoIndex.value]
))
const selectedPhotoAlt = computed(() => (
  standalonePhoto.value?.alt
    ?? (selectedPhotoIndex.value === null ? '' : t.value.facebook.items[selectedPhotoIndex.value])
))
const selectedPhotoMeta = computed(() => standalonePhoto.value?.meta
  ?? (selectedPhotoIndex.value === null ? '' : t.value.facebook.meta[selectedPhotoIndex.value]))
const selectedPhotoPosition = computed(() => standalonePhoto.value
  ? ''
  : t.value.facebook.position
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
  standalonePhoto.value = null
  selectedPhotoIndex.value = index
  nextTick(() => {
    if (!photoDialog.value?.open) photoDialog.value?.showModal()
  })
}

const openImage = (image: string, alt: string, meta = '') => {
  const albumIndex = facebookPhotos.findIndex(photo => photo.image === image)
  if (albumIndex >= 0) {
    openPhoto(albumIndex)
    return
  }

  selectedPhotoIndex.value = null
  standalonePhoto.value = { image, alt, meta }
  nextTick(() => {
    if (!photoDialog.value?.open) photoDialog.value?.showModal()
  })
}

const closePhoto = () => {
  if (photoDialog.value?.open) photoDialog.value.close()
  selectedPhotoIndex.value = null
  standalonePhoto.value = null
}

const stepPhoto = (direction: -1 | 1) => {
  if (selectedPhotoIndex.value === null) return
  selectedPhotoIndex.value = (
    selectedPhotoIndex.value + direction + facebookPhotos.length
  ) % facebookPhotos.length
}

const openProduct = (index: number) => {
  selectedProductIndex.value = index
  nextTick(() => {
    if (!catalogDialog.value?.open) catalogDialog.value?.showModal()
  })
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
      description: 'Heng Yau Enterprise makes 8 ft to 24 ft monumental dragon incense in Kampung Chuah, Port Dickson, Malaysia for temple festivals and major worship ceremonies.',
      keywords: 'Heng Yau Enterprise, dragon incense Malaysia, 18 ft dragon incense, 21 ft dragon incense, temple incense, Port Dickson, Kampung Chuah, 龙香, 兴耀企业',
      imageAlt: 'Heng Yau Enterprise monumental dragon incense illuminated for a temple celebration',
    }
  }

  return {
    title: currentView.value === 'catalog'
      ? '香品目录｜兴耀企业龙香与寺庙用香'
      : '兴耀企业｜马来西亚龙香、庙庆与寺庙用香',
    description: '兴耀企业位于森美兰 Port Dickson Kampung Chuah，制作 8 尺至 24 尺龙香及庙庆订制龙香，适用于神诞、酬神与重要祭祀。',
    keywords: '兴耀企业, 龙香, 18尺龙香, 21尺龙香, 24尺龙香, 马来西亚龙香, Kampung Chuah, Port Dickson, 庙庆龙香, Heng Yau Enterprise',
    imageAlt: '兴耀企业为庙宇庆典制作并点亮的高身龙香',
  }
})

const structuredData = computed(() => ({
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': `${siteUrl}/#organization`,
      name: '兴耀企业',
      alternateName: 'Heng Yau Enterprise',
      url: siteUrl,
      logo: `${siteUrl}/images/heng-yau-logo-transparent-v6.webp`,
      image: `${siteUrl}/images/facebook-led-dragon-night-v14.webp`,
      description: '马来西亚传统龙香、庙庆订制龙香与寺庙用香制作企业。',
      telephone: '+60 16-363 3329',
      email: 'sainem38@gmail.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Lot 455A, Stor (SKLC A21/5), Kampung Chuah',
        postalCode: '71960',
        addressLocality: 'Port Dickson',
        addressRegion: 'Negeri Sembilan',
        addressCountry: 'MY',
      },
      hasMap: mapUrl,
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
          <button class="language-button" type="button" :aria-label="locale === 'zh' ? 'Switch to English' : '切换至中文'" @click="switchLanguage">
            <span :class="{ 'is-active': locale === 'zh' }">中</span>
            <i aria-hidden="true" />
            <span :class="{ 'is-active': locale === 'en' }">EN</span>
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
        <a :href="facebookUrl" target="_blank" rel="noopener">
          <FacebookIcon :size="18" />
          {{ t.contact.facebookButton }}
          <ArrowUpRight :size="16" />
        </a>
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
              <button type="button" class="image-open-trigger" :aria-label="`${t.facebook.enlarge}: ${t.dragon.ceremonyAlt}`" @click="openImage('/images/facebook-dragon-perspective-v15.webp', t.dragon.ceremonyAlt, 'KAMPUNG CHUAH')">
                <img src="/images/facebook-dragon-perspective-v15.webp" :alt="t.dragon.ceremonyAlt">
                <span><Maximize2 :size="18" /></span>
              </button>
            </figure>
            <figure class="collage-detail">
              <button type="button" class="image-open-trigger" :aria-label="`${t.facebook.enlarge}: ${t.dragon.craftAlt}`" @click="openImage('/images/facebook-dragon-temple-vertical-v15.webp', t.dragon.craftAlt, 'PORT DICKSON')">
                <img src="/images/facebook-dragon-temple-vertical-v15.webp" :alt="t.dragon.craftAlt">
                <span><Maximize2 :size="18" /></span>
              </button>
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
              <button type="button" class="image-open-trigger" :aria-label="`${t.facebook.enlarge}: ${t.dragon.ceremonyAlt}`" @click="openImage('/images/facebook-dragon-field-row-v15.webp', t.dragon.ceremonyAlt, 'KAMPUNG CHUAH')">
                <img src="/images/facebook-dragon-field-row-v15.webp" :alt="t.dragon.ceremonyAlt" loading="lazy">
                <span><Maximize2 :size="18" /></span>
              </button>
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
              <p class="album-intro">{{ t.facebook.intro }}</p>
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
                <span class="album-zoom" aria-hidden="true"><Maximize2 :size="19" /></span>
                <span class="album-photo-caption">
                  <small>{{ t.facebook.meta[index] }}</small>
                  <strong>{{ t.facebook.items[index] }}</strong>
                </span>
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
          <div class="contact-heading">
            <p class="eyebrow eyebrow-light">{{ t.contact.label }}</p>
            <h2 class="preserve-lines">{{ t.contact.title }}</h2>
            <p>{{ t.contact.body }}</p>
          </div>
          <div class="contact-action">
            <a :href="whatsappUrl" class="whatsapp-button" target="_blank" rel="noopener">
              <span class="contact-channel-icon"><WhatsAppIcon :size="25" /></span>
              <span class="contact-channel-copy">
                <strong>{{ t.contact.button }}</strong>
                <small>{{ t.contact.whatsappMeta }}</small>
              </span>
              <ArrowUpRight :size="20" />
            </a>

            <div class="contact-details">
              <a :href="mapUrl" target="_blank" rel="noopener">
                <MapPin :size="21" />
                <span>
                  <small>{{ t.contact.addressLabel }}</small>
                  <strong>{{ t.contact.address }}</strong>
                  <em>{{ t.contact.mapAction }} ↗</em>
                </span>
              </a>
              <a :href="emailUrl">
                <Mail :size="21" />
                <span>
                  <small>{{ t.contact.emailLabel }}</small>
                  <strong>{{ t.contact.email }}</strong>
                </span>
              </a>
              <a :href="facebookUrl" target="_blank" rel="noopener" :aria-label="t.contact.facebookAria">
                <FacebookIcon :size="21" />
                <span>
                  <small>{{ t.contact.facebookButton }}</small>
                  <strong>{{ t.contact.facebookMeta }}</strong>
                </span>
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
                  <img class="product-image-backdrop" :src="item.image" alt="" aria-hidden="true">
                  <img class="product-image-main" :src="item.image" :alt="item.alt" loading="lazy">
                  <span class="product-number">{{ item.no }}<small>{{ locale === 'zh' ? '尺' : 'FT' }}</small></span>
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
          <img class="product-image-backdrop" :src="selectedProduct.image" alt="" aria-hidden="true">
          <button type="button" class="catalog-hero-photo" :aria-label="`${t.facebook.enlarge}: ${selectedProduct.alt}`" @click="openImage(selectedProduct.image, selectedProduct.alt, selectedProduct.type)">
            <img class="product-image-main" :src="selectedProduct.image" :alt="selectedProduct.alt">
            <span><Maximize2 :size="19" /> {{ t.products.galleryLabel }}</span>
          </button>
          <div class="catalog-detail-shade" />
          <div class="catalog-detail-title">
            <p>{{ selectedProduct.type }}</p>
            <h2>{{ selectedProduct.name }}</h2>
            <span>{{ selectedProduct.en }}</span>
          </div>
        </div>

        <div class="catalog-detail-body">
          <p class="catalog-lede">{{ selectedProduct.summary }}</p>

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
        <button v-if="selectedPhotoIndex !== null" type="button" class="photo-step photo-step-previous" :aria-label="t.facebook.previous" @click="stepPhoto(-1)">
          <ChevronLeft :size="29" />
        </button>
        <figure>
          <img :src="selectedPhoto.image" :alt="selectedPhotoAlt">
          <figcaption>
            <div>
              <small v-if="selectedPhotoMeta">{{ selectedPhotoMeta }}</small>
              <p>{{ selectedPhotoAlt }}</p>
            </div>
            <span v-if="selectedPhotoPosition">{{ selectedPhotoPosition }}</span>
          </figcaption>
        </figure>
        <button v-if="selectedPhotoIndex !== null" type="button" class="photo-step photo-step-next" :aria-label="t.facebook.next" @click="stepPhoto(1)">
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

  </div>
</template>
