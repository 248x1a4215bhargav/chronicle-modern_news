import { Article, CategoryInfo, NewsCategory } from '../types/news';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'general',
    label: 'General',
    tagline: 'Leading dispatches, world affairs, and cultural movements',
    rssUrl: 'https://feeds.bbci.co.uk/news/rss.xml',
  },
  {
    id: 'technology',
    label: 'Technology',
    tagline: 'Autonomous systems, silicon design, software craft, and computing architecture',
    rssUrl: 'https://feeds.bbci.co.uk/news/technology/rss.xml',
  },
  {
    id: 'business',
    label: 'Business',
    tagline: 'Global macroeconomic trends, capital allocation, trade, and industrial policy',
    rssUrl: 'https://feeds.bbci.co.uk/news/business/rss.xml',
  },
  {
    id: 'science',
    label: 'Science',
    tagline: 'Deep space astronomy, climate resilience, quantum physics, and biology',
    rssUrl: 'https://feeds.bbci.co.uk/news/science_and_environment/rss.xml',
  },
  {
    id: 'entertainment',
    label: 'Entertainment',
    tagline: 'Cinema retrospectives, architecture, literary criticism, and visual arts',
    rssUrl: 'https://feeds.bbci.co.uk/news/entertainment_and_arts/rss.xml',
  },
  {
    id: 'sports',
    label: 'Sports',
    tagline: 'Championship circuits, athletic physiology, international leagues, and strategy',
    rssUrl: 'https://feeds.bbci.co.uk/sport/rss.xml',
  },
];

export const FALLBACK_ARTICLES: Article[] = [
  // General
  {
    id: 'gen-1',
    title: 'Global Summit Reaches Landmark Accord on Clean Maritime Transit Corridors',
    description: 'International delegations conclude intense multilateral negotiations, committing thirty-eight maritime nations to zero-emission shipping lanes across primary Pacific trade routes.',
    content: `Delegates representing thirty-eight seafaring nations gathered at the international maritime assembly have formalized an unprecedented multilateral treaty aimed at transforming oceanic freight operations. Under the newly ratified agreement, five high-volume Pacific commercial corridors will transition to synthetic methanol, green hydrogen, and electric-assisted hybrid propulsion vessels over the coming decade.

The pact establishes mandatory reporting frameworks for shipping conglomerates, alongside a pooled green infrastructure reserve exceeding sixteen billion dollars. Harbor authorities in Singapore, Tokyo, Los Angeles, and Rotterdam have simultaneously committed to retrofitting deep-water berths with standardized shore-power grid connections.

"Commercial shipping has long stood as an indispensable yet stubborn linchpin of international commerce," remarked maritime policy fellow Dr. Elena Rostova during the concluding plenary session. "Establishing zero-emission corridors removes the collective action dilemma that previously prevented port authorities and vessel operators from making capital-intensive decarbonization investments."

Economic analysts anticipate the shift will accelerate the adoption of hydrodynamic hull retrofits and autonomous sail-assist systems, marking the most significant architectural evolution in oceanic transport since the transition from coal steamships to diesel propulsion in the mid-twentieth century.`,
    url: 'https://www.reuters.com',
    urlToImage: '/src/assets/images/editorial_lead_journal_1793893746143.jpg',
    publishedAt: '2026-11-05T06:30:00Z',
    source: { name: 'Reuters Global' },
    category: 'general',
    author: 'Elena Rostova & Marcus Vance',
    readTimeMinutes: 4,
  },
  {
    id: 'gen-2',
    title: 'Historic Preservation Initiative Restores Architectural Archives in Florence',
    description: 'A multi-year restoration effort uncovers centuries-old architectural schematics and civic records, revealing forgotten master plans of Renaissance urban planning.',
    content: `Curators and conservation specialists at the Tuscan Historical Guild have completed an extensive four-year preservation project encompassing over twelve thousand vulnerable parchment records dating from 1480 to 1620. 

Utilizing non-destructive hyperspectral imaging and gentle cellulose-stabilizing misting chambers, the restoration team salvaged water-damaged city plans, civic canal drainage schematics, and lost construction elevations drafted by apprentices of Filippo Brunelleschi.

The newly digitized archive will be made accessible to researchers worldwide under open institutional licenses. The project illuminates the meticulous engineering frameworks that enabled Italian city-states to manage rapid urban density without compromising structural resilience or public health.`,
    url: 'https://www.theguardian.com',
    urlToImage: 'https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T19:15:00Z',
    source: { name: 'The Guardian' },
    category: 'general',
    author: 'Matteo Bellini',
    readTimeMinutes: 3,
  },
  {
    id: 'gen-3',
    title: 'Urban Forestry Programs Cut Summer Heat Dome Temperatures by 4.2 Degrees',
    description: 'Long-term empirical data from eighteen metropolitan areas demonstrates the measurable cooling impact of contiguous canopy corridors over isolated pocket parks.',
    content: `Urban climatologists tracking temperature anomalies across major northern hemisphere cities have published comprehensive sensor readings demonstrating the profound thermal buffering provided by contiguous tree canopies. 

The study found that linear green corridors connecting residential neighborhoods with urban riverfronts reduce localized surface asphalt temperatures by up to twelve degrees Celsius and ambient air temperatures by 4.2 degrees during extreme heat events.

In contrast, isolated pocket parks of less than half an acre exhibited minimal cooling beyond their immediate perimeter. City planners in Montreal, Vienna, and Seoul are already restructuring their public works budgets to prioritize continuous shade tree networks along high-density pedestrian routes.`,
    url: 'https://www.bbc.com',
    urlToImage: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T14:40:00Z',
    source: { name: 'BBC World' },
    category: 'general',
    author: 'Claire Dufresne',
    readTimeMinutes: 5,
  },

  // Technology
  {
    id: 'tech-1',
    title: 'Optoelectronic Silicon Processors Achieve 10x Energy Efficiency in Matrix Math',
    description: 'Researchers demonstrate a hybrid photonic-electronic compute architecture capable of executing billion-parameter neural operations using fractional milliwatts.',
    content: `In what computer architecture specialists describe as a watershed breakthrough for semiconductor design, a joint consortium of optical physics laboratories has revealed working silicon dies that route mathematical matrix operations via microscopic waveguides of laser light rather than copper traces.

By replacing resistive copper interconnects with low-loss optical conduits, the prototype processors eliminate capacitive charging delays and resistive heat dissipation. Benchmarks confirm a tenfold reduction in electrical energy consumption during high-density matrix multiplications compared to contemporary 3nm lithography accelerators.

"We have hit the thermal barrier of classical copper interconnects," explained lead architect Dr. Hiroshi Tanaka. "Moving photons across silicon at room temperature allows us to scale inference throughput linearly without demanding dedicated liquid cooling manifolds or substation-scale electrical grids."

Commercial fabrication lines are scheduled to begin pilot wafer runs next spring, offering prospective relief to datacenter operators confronting escalating power constraints.`,
    url: 'https://www.nature.com',
    urlToImage: '/src/assets/images/tech_architecture_editorial_1793893746920.jpg',
    publishedAt: '2026-11-05T04:10:00Z',
    source: { name: 'Nature Technology' },
    category: 'technology',
    author: 'Dr. Hiroshi Tanaka',
    readTimeMinutes: 5,
  },
  {
    id: 'tech-2',
    title: 'The Modern Resurgence of Local-First Software and Durable Storage Engines',
    description: 'Engineers are reconsidering cloud dependencies, embracing CRDTs and embedded SQLite databases to build responsive, privacy-preserving desktop and mobile tools.',
    content: `Across the software engineering discipline, an increasing number of developers are rejecting fragile client-server paradigms in favor of "local-first" architectures. By combining Conflict-free Replicated Data Types (CRDTs) with lightweight embedded relational databases, modern applications retain instantaneous response times and full offline utility regardless of internet connectivity.

Users retain immediate ownership of their data in clear, portable local files, while background synchronization protocols handle multi-device reconciliation seamlessly whenever networks become available.

Industry analysts note that this philosophical shift addresses widespread user fatigue over subscription-locked web services, latency spikes, and cloud service deprecations.`,
    url: 'https://arstechnica.com',
    urlToImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T22:00:00Z',
    source: { name: 'Ars Technica' },
    category: 'technology',
    author: 'Julian Shaw',
    readTimeMinutes: 4,
  },
  {
    id: 'tech-3',
    title: 'Next-Generation Solid-State Sodium Batteries Enter Production Testing',
    description: 'Eliminating rare earth minerals, solid-state sodium chemistry achieves energy density comparable to lithium-iron-phosphate at half the raw material expense.',
    content: `Automotive and grid-storage manufacturers are closely watching factory pilot lines in Scandinavia where the first commercial batches of solid-state sodium-ion cells are undergoing rigorous thermal and cycle-life certification.

Unlike conventional lithium-ion batteries that require mined cobalt, nickel, and lithium carbonates, sodium is ubiquitously abundant and environmentally benign to extract. The key breakthrough involves a ceramic electrolyte composite that prevents dendrite formation across thousands of rapid-charge cycles.

Preliminary data indicates that the cells retain 91% capacity after 3,500 full charge-discharge cycles, with an operating temperature window ranging from -35°C to 65°C without requiring active thermal blankets.`,
    url: 'https://www.wired.com',
    urlToImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T11:20:00Z',
    source: { name: 'Wired News' },
    category: 'technology',
    author: 'Astrid Lindholm',
    readTimeMinutes: 4,
  },

  // Business
  {
    id: 'biz-1',
    title: 'Central Banks Navigate Shifting Yield Curves Amid Sustained Productivity Gains',
    description: 'Monetary policy boards recalibrate long-term neutral interest rate assumptions as capital expenditure into automation delivers tangible industrial output.',
    content: `Global central banking committees convened this week in Basel to review shifting sovereign yield curves that suggest a fundamental recalibration of the long-term equilibrium interest rate. 

Statistical offices across industrialized economies reported third-quarter manufacturing productivity gains averaging 3.4% year-over-year, driven primarily by automated logistics chains and precision industrial process optimization.

"We are witnessing the emergence of genuine supply-side expansion," noted senior economic advisor Sarah Sterling. "When productivity advances structurally, monetary authorities can sustain lower inflation without suppressing economic momentum."

Equities markets responded with broad-based rallies across industrial equipment manufacturers and specialized tooling suppliers, while bond traders flattened their exposure to short-duration sovereign debt instruments.`,
    url: 'https://www.ft.com',
    urlToImage: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-05T05:00:00Z',
    source: { name: 'Financial Times' },
    category: 'business',
    author: 'Sarah Sterling & David Croft',
    readTimeMinutes: 4,
  },
  {
    id: 'biz-2',
    title: 'European Industrial Real Estate Pivots Toward Multi-Tier High-Density Hubs',
    description: 'Constrained municipal zoning and rapid urban delivery mandates drive logistics developers to construct multi-story freight distribution facilities.',
    content: `Faced with stringent limits on industrial land expansion surrounding major metropolitan capitals, commercial real estate developers in London, Paris, and Frankfurt are constructing three- and four-story logistics hubs equipped with spiral ramps for commercial electric delivery fleets.

These vertical fulfillment hubs maximize cubic volume efficiency on compact footprints, integrating rooftop solar arrays and automated gantry cranes to process inbound containerized freight in minutes rather than hours.

Investment funds allocated over €8.4 billion into vertical logistics developments this year alone, demonstrating strong institutional appetite for urban infrastructure positioned directly adjacent to consumer density.`,
    url: 'https://www.bloomberg.com',
    urlToImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T16:45:00Z',
    source: { name: 'Bloomberg' },
    category: 'business',
    author: 'Henrik Visser',
    readTimeMinutes: 3,
  },

  // Science
  {
    id: 'sci-1',
    title: 'Deep-Space Observatory Identifies Atmosphere Surrounding Rocky Exoplanet',
    description: 'Spectroscopic measurements confirm water vapor and carbon dioxide molecular signatures in the secondary atmosphere of an Earth-mass planet thirty light-years distant.',
    content: `Astronomers utilizing high-resolution infrared spectrographs have confirmed the unambiguous detection of a stable secondary atmosphere enveloping an Earth-sized rocky exoplanet orbiting within the conservative habitable zone of an M-dwarf star thirty light-years away.

Data collected during twelve planetary transits revealed clear absorption bands corresponding to molecular carbon dioxide, nitrogen, and localized atmospheric water vapor. Importantly, measurements show no catastrophic atmospheric stripping, suggesting a robust planetary magnetosphere shielding the surface against stellar flares.

"For generations, we wondered whether rocky worlds orbiting cool stars could retain substantive atmospheres over cosmological timescales," stated astrophysics department chair Dr. Naomi Thorne. "This observation confirms that secondary atmospheres can endure and evolve, opening an entirely new era in comparative exoplanetology."

Further spectroscopic observing windows scheduled for late autumn will examine the potential presence of atmospheric methane and ozone isotopes.`,
    url: 'https://www.nasa.gov',
    urlToImage: '/src/assets/images/science_observatory_editorial_1793893746789.jpg',
    publishedAt: '2026-11-05T03:30:00Z',
    source: { name: 'Nature Astronomy' },
    category: 'science',
    author: 'Dr. Naomi Thorne',
    readTimeMinutes: 6,
  },
  {
    id: 'sci-2',
    title: 'Marine Biologists Map Complex Whale Cultural Dialects in the South Pacific',
    description: 'A decade of underwater hydrophone array recordings reveals that humpback whale song compositions follow distinct regional dialects with structured grammar.',
    content: `Marine acoustics researchers using deep-sea hydrophone arrays spanning 4,000 kilometers of South Pacific migration corridors have documented structured acoustic motifs among humpback whale pods that exhibit undeniable cultural transmission.

The study demonstrates that novel song themes originate among eastern Australian populations and propagate eastward across Polynesian pods over a two-to-three-year cycle, undergoing subtle improvisational adaptations while maintaining structural syntactical cadence.

Researchers were able to isolate over 180 distinct song phrases, confirming that acoustic variations reflect learned group traditions rather than genetic variation. The findings provide compelling evidence of complex mammalian culture surviving in the open ocean.`,
    url: 'https://www.scientificamerican.com',
    urlToImage: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T09:10:00Z',
    source: { name: 'Scientific American' },
    category: 'science',
    author: 'Liam O’Connor',
    readTimeMinutes: 4,
  },

  // Entertainment
  {
    id: 'ent-1',
    title: 'The Architectural Legacy of 1970s Japanese Brutalism Gains Global Recognition',
    description: 'A major retrospective exhibition spotlights the sculptural concrete civic centers and museums that redefined postwar civic identity in Tokyo and Kyoto.',
    content: `An international touring exhibition opening at the Museum of Contemporary Architecture highlights the profound and often misunderstood sculptural legacy of Japanese Brutalist architecture between 1965 and 1982.

Featuring original hand-drafted pencil blueprints, hand-carved basswood study models, and large-format black-and-white gelatin silver prints, the retrospective re-evaluates civic monuments designed by Kenzo Tange, Sachio Otani, and Kiyonori Kikutake.

Rather than cold utilitarian fortresses, the exhibition illustrates how these masters merged traditional Japanese timber joinery principles and spatial concepts of *ma* (the intentional void) with board-formed architectural concrete. The curators argue that these structures represent an enduring philosophy of civic permanence that contemporary architecture would do well to study.`,
    url: 'https://www.architecturaldigest.com',
    urlToImage: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T18:00:00Z',
    source: { name: 'Architectural Review' },
    category: 'entertainment',
    author: 'Kenji Takahashi',
    readTimeMinutes: 4,
  },
  {
    id: 'ent-2',
    title: 'Independent Cinema Enjoys Golden Age as 35mm Celluloid Screenings Surge',
    description: 'Boutique art-house theaters in Berlin, London, and New York report record box office returns for analog film festivals and director retrospective series.',
    content: `Defying prophecies that streaming video algorithms would permanently diminish communal cinema attendance, independent theaters worldwide are reporting unprecedented attendance figures driven by audiences specifically seeking authentic 35mm and 70mm celluloid screenings.

Independent theater proprietors cite a growing desire for deliberate, focused cultural experiences free from the distractions of domestic screens. Film archives and specialty distributors have responded by restoring rare prints and touring curated retrospectives of twentieth-century cinema masters.

"Audiences appreciate the organic grain, the subtle gate weave, and the irreplaceable communal atmosphere of a physical projection," stated cinematheque director Margot Klein. "Analog cinema is experiencing the same enduring cultural reclamation that vinyl records celebrated a decade ago."`,
    url: 'https://www.variety.com',
    urlToImage: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T12:30:00Z',
    source: { name: 'Sight & Sound' },
    category: 'entertainment',
    author: 'Margot Klein',
    readTimeMinutes: 3,
  },

  // Sports
  {
    id: 'spo-1',
    title: 'Alpine Cycling Classics Redesign Historic Mountain Stages for Spectator Safety',
    description: 'Grand Tour organizers implement advanced telemetry barriers, digital collision sensors, and widened pass descents ahead of the forthcoming championship season.',
    content: `Organizing committees of European cycling’s premier grand tours have published revised safety protocols for iconic alpine mountain passes following extensive consultations with rider unions and team directors.

The new regulations mandate automated warning beacons on technical descents, synchronized real-time speed monitoring for team support convoys, and reinforced inflatable impact dampeners along narrow gravel switchbacks where speeds routinely exceed seventy-five kilometers per hour.

Riders praised the balance between preserving legendary physical climbs like the Col du Galibier and ensuring modern, rigorous protection during high-speed technical descents through inclement weather.`,
    url: 'https://www.cyclingnews.com',
    urlToImage: 'https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-05T01:15:00Z',
    source: { name: 'Peloton Journal' },
    category: 'sports',
    author: 'Lucian Moreau',
    readTimeMinutes: 4,
  },
  {
    id: 'spo-2',
    title: 'The Biomechanical Revolution Transforming Tennis Serve Precision and Longevity',
    description: 'High-speed motion capture and optical force plates help top-ranked players generate maximum rotational power while minimizing shoulder and lumbar strain.',
    content: `Sports science institutes partnering with professional tennis academies have revolutionized how modern tennis serves are engineered, moving away from brute upper-body force toward kinetic chain sequencing through hip rotation and ground reaction forces.

Using millimeter-accurate optical marker arrays recording at 1,000 frames per second, biomechanists identify micro-compensations that historically led to career-threatening rotator cuff inflammation and lumbar disc degeneration.

By optimizing the exact timing between knee flexion, pelvic tilt, and racquet drop, elite competitors are achieving 130 mph first serves with 28% less torque exerted on the shoulder joint, promising unprecedented athletic career longevity for the current generation of athletes.`,
    url: 'https://www.espn.com',
    urlToImage: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=1200&q=80',
    publishedAt: '2026-11-04T15:20:00Z',
    source: { name: 'Athletic Science Review' },
    category: 'sports',
    author: 'Gretchen Bauer',
    readTimeMinutes: 4,
  },
];
