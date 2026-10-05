/* =========================================================
       BOTANIGRAPH CONFIGURATION
       =========================================================

       Paste your Supabase project credentials into these two
       strings. The application works locally even if they remain
       empty; only shared leaderboard/realtime synchronization is
       disabled in that case.
    ========================================================== */

const SUPABASE_URL = "https://sspvnzqbzbkcfgnjnqqw.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_BaSt4pKfeJ9Lqz0BOrY2YQ_JsQIQ2Kk";

/* =========================================================
       SUPABASE INITIALIZATION
    ========================================================== */

let supabaseClient = null;

if (SUPABASE_URL.trim() && SUPABASE_ANON_KEY.trim() && window.supabase) {
    supabaseClient = window.supabase.createClient(SUPABASE_URL.trim(), SUPABASE_ANON_KEY.trim());
}

/* =========================================================
       BOTANICAL DATASET
       =========================================================

       Taxonomic structure:

       Kingdom Plantae
         ├── Angiosperms
         │     ├── Solanaceae
         │     ├── Fabaceae
         │     ├── Lamiaceae
         │     ├── Asteraceae
         │     ├── Brassicaceae
         │     └── Anacardiaceae
         │
         └── Seed Plants
               └── Santalaceae

       Pterocarpus santalinus is deliberately placed under
       Fabaceae because it is botanically a member of Fabaceae,
       despite its common name "Red Sandalwood".
    ========================================================== */

const botanicalData = {
    root: {
        id: "plantae",
        label: "Kingdom Plantae",
        rank: "Kingdom",
        type: "root"
    },

    clades: [
        {
            id: "tracheophytes",
            label: "Tracheophytes",
            rank: "Clade",
            type: "clade",
            parent: "plantae"
        },

        {
            id: "lycophytes",
            label: "Lycophytes",
            rank: "Clade",
            type: "clade",
            parent: "tracheophytes"
        },

        {
            id: "euphyllophytes",
            label: "Euphyllophytes",
            rank: "Clade",
            type: "clade",
            parent: "tracheophytes"
        },

        {
            id: "ferns",
            label: "Ferns",
            rank: "Clade",
            type: "clade",
            parent: "euphyllophytes"
        },

        {
            id: "spermatophytes",
            label: "Spermatophytes (Seed Plants)",
            rank: "Clade",
            type: "clade",
            parent: "euphyllophytes"
        },

        {
            id: "gymnosperms",
            label: "Gymnosperms",
            rank: "Clade",
            type: "clade",
            parent: "spermatophytes"
        },

        {
            id: "angiosperms",
            label: "Angiosperms",
            rank: "Clade",
            type: "clade",
            parent: "spermatophytes"
        },

        {
            id: "monocots",
            label: "Monocots",
            rank: "Clade",
            type: "clade",
            parent: "angiosperms"
        },

        {
            id: "eudicots",
            label: "Eudicots",
            rank: "Clade",
            type: "clade",
            parent: "angiosperms"
        }
    ],

    families: [
        {
            id: "solanaceae",
            label: "Solanaceae",
            rank: "Family",
            type: "family",
            parent: "eudicots"
        },

        {
            id: "fabaceae",
            label: "Fabaceae",
            rank: "Family",
            type: "family",
            parent: "eudicots"
        },

        {
            id: "lamiaceae",
            label: "Lamiaceae",
            rank: "Family",
            type: "family",
            parent: "eudicots"
        },

        {
            id: "asteraceae",
            label: "Asteraceae",
            rank: "Family",
            type: "family",
            parent: "eudicots"
        },

        {
            id: "brassicaceae",
            label: "Brassicaceae",
            rank: "Family",
            type: "family",
            parent: "eudicots"
        },

        {
            id: "anacardiaceae",
            label: "Anacardiaceae",
            rank: "Family",
            type: "family",
            parent: "eudicots"
        },

        {
            id: "santalaceae",
            label: "Santalaceae",
            rank: "Family",
            type: "family",
            parent: "eudicots"
        }
    ],

    genera: [
        {
            id: "solanum",
            label: "Solanum",
            family: "solanaceae"
        },
        {
            id: "capsicum",
            label: "Capsicum",
            family: "solanaceae"
        },
        {
            id: "glycine",
            label: "Glycine",
            family: "fabaceae"
        },
        {
            id: "cicer",
            label: "Cicer",
            family: "fabaceae"
        },
        {
            id: "pisum",
            label: "Pisum",
            family: "fabaceae"
        },
        {
            id: "pterocarpus",
            label: "Pterocarpus",
            family: "fabaceae"
        },
        {
            id: "ocimum",
            label: "Ocimum",
            family: "lamiaceae"
        },
        {
            id: "mentha",
            label: "Mentha",
            family: "lamiaceae"
        },
        {
            id: "tridax",
            label: "Tridax",
            family: "asteraceae"
        },
        {
            id: "helianthus",
            label: "Helianthus",
            family: "asteraceae"
        },
        {
            id: "brassica",
            label: "Brassica",
            family: "brassicaceae"
        },
        {
            id: "mangifera",
            label: "Mangifera",
            family: "anacardiaceae"
        },
        {
            id: "santalum",
            label: "Santalum",
            family: "santalaceae"
        }
    ],

    species: [
        {
            id: "solanum-lycopersicum",
            genus: "solanum",
            family: "Solanaceae",
            scientific: "Solanum lycopersicum",
            common: "Tomato",
            taxonomicRank: "Family: Solanaceae · Genus: Solanum · Species: S. lycopersicum",
            description:
                "Herbaceous plant with alternate, pinnately compound to deeply divided leaves bearing glandular hairs. Inflorescences are cymose; flowers are actinomorphic, bisexual and pentamerous, with a persistent 5-lobed calyx and fused 5-lobed rotate corolla. Stamens 5 are epipetalous with anthers forming a cone around the style; ovary is superior and bicarpellary, developing into a fleshy berry.",
            habitat:
                "Native to western South America, especially the Andean region; now widely cultivated in tropical, subtropical and temperate agricultural zones.",
            westernGhats: false
        },
        {
            id: "solanum-tuberosum",
            genus: "solanum",
            family: "Solanaceae",
            scientific: "Solanum tuberosum",
            common: "Potato",
            taxonomicRank: "Family: Solanaceae · Genus: Solanum · Species: S. tuberosum",
            description:
                "Herbaceous perennial with alternate, pinnately compound leaves. Underground stems form tubers with distinct 'eyes' representing buds. Flowers are actinomorphic and pentamerous, with a 5-lobed calyx, sympetalous rotate corolla, 5 epipetalous stamens and a superior bicarpellary ovary. The inflorescence is cymose.",
            habitat:
                "Native to the Andes of South America; cultivated extensively in cool highland and temperate agricultural regions worldwide.",
            westernGhats: false
        },
        {
            id: "capsicum-annuum",
            genus: "capsicum",
            family: "Solanaceae",
            scientific: "Capsicum annuum",
            common: "Chilli Pepper",
            taxonomicRank: "Family: Solanaceae · Genus: Capsicum · Species: C. annuum",
            description:
                "Annual or short-lived perennial herb with simple, entire, alternate leaves. Flowers are solitary or paired, actinomorphic and bisexual, typically with a 5-lobed persistent calyx and a rotate 5-lobed sympetalous corolla. Five epipetalous stamens surround a superior bicarpellary ovary; fruit is a characteristic berry.",
            habitat:
                "Native to tropical and subtropical regions of the Americas; cultivated widely across warm agricultural regions including the Indian subcontinent.",
            westernGhats: false
        },

        {
            id: "glycine-max",
            genus: "glycine",
            family: "Fabaceae",
            scientific: "Glycine max",
            common: "Soybean",
            taxonomicRank: "Family: Fabaceae · Genus: Glycine · Species: G. max",
            description:
                "Annual herb with trifoliate, alternate compound leaves and stipules. Flowers are zygomorphic and papilionaceous, with a standard, two wings and fused keel petals; calyx is gamosepalous with 5 teeth. Stamens are typically diadelphous (9+1), and the superior monocarpellary ovary contains marginal ovules.",
            habitat:
                "Originates in East Asia and is now cultivated extensively in subtropical and temperate agricultural zones.",
            westernGhats: false
        },
        {
            id: "cicer-arietinum",
            genus: "cicer",
            family: "Fabaceae",
            scientific: "Cicer arietinum",
            common: "Chickpea",
            taxonomicRank: "Family: Fabaceae · Genus: Cicer · Species: C. arietinum",
            description:
                "Annual glandular herb with pinnate leaves ending in a terminal leaflet or tendril-like structure. Flowers are zygomorphic and papilionaceous; calyx is 5-lobed, corolla has standard, wings and keel, and stamens are generally diadelphous. The superior monocarpellary ovary matures into a legume containing usually one or two seeds.",
            habitat:
                "Originated in the Fertile Crescent and is cultivated extensively in semi-arid and subtropical agricultural regions, including India.",
            westernGhats: false
        },
        {
            id: "pisum-sativum",
            genus: "pisum",
            family: "Fabaceae",
            scientific: "Pisum sativum",
            common: "Garden Pea",
            taxonomicRank: "Family: Fabaceae · Genus: Pisum · Species: P. sativum",
            description:
                "Annual climbing herb with compound paripinnate leaves, foliaceous stipules and terminal tendrils. Flowers are zygomorphic and papilionaceous, with a 5-toothed gamosepalous calyx and differentiated standard, wings and keel. Stamens are diadelphous (9+1); the superior monocarpellary ovary forms a legume.",
            habitat:
                "Native to the Mediterranean region and western Asia; cultivated in temperate and cool-season agricultural zones.",
            westernGhats: false
        },
        {
            id: "pterocarpus-santalinus",
            genus: "pterocarpus",
            family: "Fabaceae",
            scientific: "Pterocarpus santalinus",
            common: "Red Sandalwood",
            taxonomicRank: "Family: Fabaceae · Genus: Pterocarpus · Species: P. santalinus",
            description:
                "Deciduous tree with imparipinnate leaves bearing alternate leaflets. Flowers are zygomorphic and papilionaceous, with a 5-toothed calyx, differentiated standard, wings and keel, and a typically diadelphous staminal arrangement. The fruit is a distinctive indehiscent, winged pod (samara-like), characteristic of Pterocarpus.",
            habitat:
                "Endemic to the southern Eastern Ghats of India, especially the dry hill forests of Andhra Pradesh; associated with tropical dry deciduous woodland.",
            westernGhats: false
        },

        {
            id: "ocimum-tenuiflorum",
            genus: "ocimum",
            family: "Lamiaceae",
            scientific: "Ocimum tenuiflorum",
            common: "Holy Basil / Tulsi",
            taxonomicRank: "Family: Lamiaceae · Genus: Ocimum · Species: O. tenuiflorum",
            description:
                "Aromatic branched herb with opposite, decussate, simple leaves and glandular trichomes. Stem is commonly quadrangular. Flowers are zygomorphic and bilabiate, arranged in verticillasters; calyx is gamosepalous and typically bilabiate, while the corolla is 5-lobed and bilabiate. Stamens are 4, didynamous, and ovary is deeply 4-lobed with a gynobasic style.",
            habitat:
                "Native to tropical and subtropical Asia and Australia; widely cultivated and naturalized around human habitation throughout South Asia.",
            westernGhats: false
        },
        {
            id: "mentha-arvensis",
            genus: "mentha",
            family: "Lamiaceae",
            scientific: "Mentha arvensis",
            common: "Corn Mint",
            taxonomicRank: "Family: Lamiaceae · Genus: Mentha · Species: M. arvensis",
            description:
                "Aromatic perennial herb with opposite, decussate leaves and a distinctly quadrangular stem. Flowers are zygomorphic and bilabiate, borne in dense axillary clusters; calyx is 5-toothed and gamosepalous. Corolla is sympetalous and bilabiate, with 4 epipetalous stamens and a deeply four-lobed superior ovary with gynobasic style.",
            habitat:
                "Widely distributed across temperate and subtropical Eurasia, including moist habitats and cultivated areas of the Indian subcontinent.",
            westernGhats: false
        },

        {
            id: "tridax-procumbens",
            genus: "tridax",
            family: "Asteraceae",
            scientific: "Tridax procumbens",
            common: "Coat Buttons",
            taxonomicRank: "Family: Asteraceae · Genus: Tridax · Species: T. procumbens",
            description:
                "Prostrate to ascending herb with opposite, simple, often serrate leaves. Inflorescences are capitula surrounded by involucral bracts. The ray florets are zygomorphic and ligulate, while the central disc florets are actinomorphic and tubular. Ovary is inferior and unilocular with a single ovule; fruit is a cypsela often bearing a pappus.",
            habitat:
                "Native to tropical America but now widespread in tropical and subtropical regions, including disturbed habitats throughout India.",
            westernGhats: true
        },
        {
            id: "helianthus-annuus",
            genus: "helianthus",
            family: "Asteraceae",
            scientific: "Helianthus annuus",
            common: "Common Sunflower",
            taxonomicRank: "Family: Asteraceae · Genus: Helianthus · Species: H. annuus",
            description:
                "Robust annual herb with alternate, broad, ovate to cordate leaves. The inflorescence is a large capitulum with involucral bracts; peripheral ray florets are zygomorphic and female or sterile, whereas disc florets are actinomorphic and bisexual. Ovary is inferior and the fruit is a cypsela.",
            habitat:
                "Native to North America; widely cultivated in temperate and subtropical regions for seed and oil production.",
            westernGhats: false
        },

        {
            id: "brassica-juncea",
            genus: "brassica",
            family: "Brassicaceae",
            scientific: "Brassica juncea",
            common: "Indian Mustard",
            taxonomicRank: "Family: Brassicaceae · Genus: Brassica · Species: B. juncea",
            description:
                "Annual herb with alternate leaves; lower leaves are often lyrate or pinnatifid. Flowers are actinomorphic, bisexual and arranged in racemes. The calyx consists of 4 sepals arranged in two whorls, and the corolla has 4 free, clawed, cruciform petals. Six tetradynamous stamens surround a superior bicarpellary ovary that develops into a siliqua.",
            habitat:
                "Cultivated widely in South Asia and other temperate to subtropical agricultural zones; associated with fertile cultivated soils.",
            westernGhats: false
        },
        {
            id: "brassica-oleracea",
            genus: "brassica",
            family: "Brassicaceae",
            scientific: "Brassica oleracea",
            common: "Wild Cabbage",
            taxonomicRank: "Family: Brassicaceae · Genus: Brassica · Species: B. oleracea",
            description:
                "Biennial to perennial herb with alternate, simple leaves. Flowers are actinomorphic and tetramerous with four sepals and four free cruciform petals. Six stamens are tetradynamous; the superior bicarpellary ovary has parietal placentation and develops into a siliqua.",
            habitat:
                "Native to coastal Europe and the Mediterranean region; cultivated globally and adapted to temperate and cool subtropical agricultural conditions.",
            westernGhats: false
        },

        {
            id: "mangifera-indica",
            genus: "mangifera",
            family: "Anacardiaceae",
            scientific: "Mangifera indica",
            common: "Mango",
            taxonomicRank: "Family: Anacardiaceae · Genus: Mangifera · Species: M. indica",
            description:
                "Large evergreen tree with alternate, simple, leathery, lanceolate leaves. Inflorescences are terminal panicles. Flowers are small and generally actinomorphic, with a 4–5-part perianth and a superior ovary; stamens are reduced in number and a prominent disc occurs within the floral structure. Fruit is a large fleshy drupe.",
            habitat:
                "Native to the Indian subcontinent and adjoining regions of Southeast Asia; widely cultivated throughout tropical and subtropical regions.",
            westernGhats: true
        },

        {
            id: "santalum-album",
            genus: "santalum",
            family: "Santalaceae",
            scientific: "Santalum album",
            common: "Indian Sandalwood",
            taxonomicRank: "Family: Santalaceae · Genus: Santalum · Species: S. album",
            description:
                "Small evergreen tree with opposite, simple, entire, glabrous leaves. Flowers occur in terminal or axillary cymose inflorescences and are typically actinomorphic with a perianth that becomes enlarged after anthesis. The ovary is inferior and unilocular with a single ovule; the fruit is a globose drupe.",
            habitat:
                "Native to parts of the Indian subcontinent and Malesia; occurs in dry deciduous and mixed woodland and is cultivated in tropical regions.",
            westernGhats: true
        }
    ]
};
/*--------------------------------------------------------------------------------------*/

/* =========================================================
   STUDENT LEARNING DATA
   ========================================================= */

const studentClassification = {
    // =========================================================
    // ROOT
    // =========================================================

    plantae: {
        id: "plantae",
        parent: null,
        label: "Botany & Taxonomy",
        rank: "Subject",
        type: "root",
        icon: "🌿",

        title: "Botany & Plant Taxonomy",

        definition:
            "Botany is the scientific study of plants. Plant taxonomy deals with the identification, naming and classification of plants.",

        keyPoints: [
            "Botany = study of plants",
            "Taxonomy = identification, nomenclature and classification",
            "Systematics studies diversity and evolutionary relationships",
            "Plants can be studied using traditional and modern classification systems"
        ],

        examPoints: [
            "Botany → study of plants",
            "Taxonomy → identification + nomenclature + classification",
            "Systematics → diversity + relationships"
        ],

        groups: [
            "taxonomy_basics",
            "taxonomic_hierarchy",
            "plant_kingdom",
            "plant_families",
            "taxonomic_evidence",
            "nomenclature",
            "taxonomic_aids",
            "plant_identification",
            "exam_mode"
        ],

        memoryTip: "BOTANY = plants. TAXONOMY = identify, name and classify."
    },

    // =========================================================
    // 1. TAXONOMY BASICS
    // =========================================================

    taxonomy_basics: {
        id: "taxonomy_basics",
        parent: "plantae",
        label: "Taxonomy Basics",
        rank: "Foundation",
        type: "category",
        icon: "🧠",

        title: "Foundations of Taxonomy",

        definition: "Taxonomy provides the basic framework for identifying, naming and classifying organisms.",

        keyPoints: [
            "Taxonomy is a basic branch of systematic biology",
            "Identification determines what an organism is",
            "Nomenclature gives organisms scientific names",
            "Classification places organisms into groups"
        ],

        groups: ["taxonomy", "systematics", "classification", "identification", "nomenclature"],

        memoryTip: "Remember the three core ideas: IDENTIFY → NAME → CLASSIFY."
    },

    taxonomy: {
        id: "taxonomy",
        parent: "taxonomy_basics",
        label: "Taxonomy",
        rank: "Concept",
        type: "lesson",
        icon: "🔬",

        title: "Science of Classification",

        definition:
            "Taxonomy is the branch of biology concerned with the identification, nomenclature and classification of organisms.",

        keyPoints: [
            "Deals with identification",
            "Deals with scientific naming",
            "Deals with classification",
            "Uses observable and other taxonomic characters"
        ],

        examPoints: ["Taxonomy = identification + nomenclature + classification"],

        examples: ["Identifying a plant", "Giving it a scientific name", "Placing it in a family and genus"],

        keywords: ["taxonomy", "classification", "identification", "nomenclature"],

        memoryTip: "TAXONOMY = Identify + Name + Classify."
    },

    systematics: {
        id: "systematics",
        parent: "taxonomy_basics",
        label: "Systematics",
        rank: "Concept",
        type: "lesson",
        icon: "🧬",

        title: "Study of Diversity and Relationships",

        definition:
            "Systematics is the study of biological diversity and the relationships among organisms, including their evolutionary relationships.",

        keyPoints: [
            "Studies biological diversity",
            "Studies relationships among organisms",
            "Modern systematics considers evolutionary history",
            "Uses morphological, anatomical, genetic and molecular evidence"
        ],

        examPoints: [
            "Systematics is broader than traditional taxonomy",
            "Evolutionary relationships are important in modern systematics"
        ],

        memoryTip: "SYSTEMATICS → think SYSTEM + RELATIONSHIPS."
    },

    classification: {
        id: "classification",
        parent: "taxonomy_basics",
        label: "Classification",
        rank: "Concept",
        type: "lesson",
        icon: "🗂️",

        title: "Grouping Organisms",

        definition:
            "Classification is the arrangement of organisms into groups based on similarities, differences and, in modern systems, evolutionary relationships.",

        keyPoints: [
            "Organisms are arranged into groups",
            "Similar organisms are grouped together",
            "Modern classification considers evolutionary relationships",
            "Classification makes identification and study easier"
        ],

        examPoints: ["Classification = systematic arrangement into groups"],

        memoryTip: "CLASSIFICATION = putting organisms into meaningful groups."
    },

    identification: {
        id: "identification",
        parent: "taxonomy_basics",
        label: "Identification",
        rank: "Concept",
        type: "lesson",
        icon: "🔎",

        title: "Finding the Identity of an Organism",

        definition:
            "Identification is the process of determining the identity of an unknown organism by comparing its characters with known organisms or using identification keys.",

        keyPoints: [
            "Used for unknown organisms",
            "Characters are observed and compared",
            "Identification keys can be used",
            "May lead from family to genus and species"
        ],

        examPoints: ["Identification → determining the identity of an organism"],

        memoryTip: "IDENTIFICATION = What organism is this?"
    },

    nomenclature: {
        id: "nomenclature",
        parent: "taxonomy_basics",
        label: "Nomenclature",
        rank: "Concept",
        type: "lesson",
        icon: "📖",

        title: "Scientific Naming",

        definition: "Nomenclature is the system and rules used for assigning scientific names to organisms.",

        keyPoints: [
            "Provides standardized scientific names",
            "Reduces confusion caused by local names",
            "Plant names follow internationally accepted rules",
            "Binomial nomenclature uses two parts"
        ],

        examPoints: ["Nomenclature = scientific naming", "Plants follow the International Code of Nomenclature"],

        memoryTip: "NOMEN = NAME → nomenclature means naming."
    },

    // =========================================================
    // 2. TAXONOMIC HIERARCHY
    // =========================================================

    taxonomic_hierarchy: {
        id: "taxonomic_hierarchy",
        parent: "plantae",
        label: "Taxonomic Hierarchy",
        rank: "Foundation",
        type: "category",
        icon: "🧬",

        title: "Ranks from Kingdom to Species",

        definition:
            "Taxonomic hierarchy is the ordered arrangement of taxonomic categories from broad groups to increasingly specific groups.",

        keyPoints: [
            "Each level is called a taxonomic rank",
            "Higher ranks contain many lower groups",
            "Species is a fundamental unit of classification",
            "Plant taxonomy commonly uses Division instead of Phylum"
        ],

        groups: [
            "kingdom_rank",
            "division_rank",
            "class_rank",
            "order_rank",
            "family_rank",
            "genus_rank",
            "species_rank"
        ],

        examPoints: ["Kingdom → Division → Class → Order → Family → Genus → Species"],

        memoryTip: "King Philip Came Over For Good Soup."
    },

    kingdom_rank: {
        id: "kingdom_rank",
        parent: "taxonomic_hierarchy",
        label: "Kingdom",
        rank: "Taxonomic Rank",
        type: "lesson",
        icon: "👑",

        title: "Broad Taxonomic Rank",

        definition: "Kingdom is a high-level taxonomic rank containing large groups of organisms.",

        examples: ["Plantae"],

        examPoints: ["Kingdom is above Division", "Plantae is the plant kingdom"],

        memoryTip: "KINGDOM = a very broad group."
    },

    division_rank: {
        id: "division_rank",
        parent: "taxonomic_hierarchy",
        label: "Division / Phylum",
        rank: "Taxonomic Rank",
        type: "lesson",
        icon: "🌿",

        title: "Major Subdivision",

        definition:
            "Division is commonly used in plant classification for a major taxonomic rank below Kingdom. Phylum is the corresponding term commonly used in zoology.",

        examPoints: ["Plants → Division", "Animals → commonly Phylum"],

        memoryTip: "Plants usually say DIVISION; animals commonly say PHYLUM."
    },

    class_rank: {
        id: "class_rank",
        parent: "taxonomic_hierarchy",
        label: "Class",
        rank: "Taxonomic Rank",
        type: "lesson",
        icon: "📚",

        title: "Class",

        definition: "Class is a taxonomic rank below Division and above Order.",

        examPoints: ["Division → Class → Order"],

        memoryTip: "Class comes between Division and Order."
    },

    order_rank: {
        id: "order_rank",
        parent: "taxonomic_hierarchy",
        label: "Order",
        rank: "Taxonomic Rank",
        type: "lesson",
        icon: "📋",

        title: "Order",

        definition: "Order is a taxonomic rank below Class and above Family.",

        examPoints: ["Class → Order → Family"],

        memoryTip: "Order comes before Family."
    },

    family_rank: {
        id: "family_rank",
        parent: "taxonomic_hierarchy",
        label: "Family",
        rank: "Taxonomic Rank",
        type: "lesson",
        icon: "🌳",

        title: "Family",

        definition: "Family is a taxonomic rank containing one or more related genera.",

        examPoints: ["Family contains related genera", "Plant family names commonly end in -aceae"],

        examples: ["Solanaceae", "Fabaceae", "Poaceae"],

        memoryTip: "FAMILY → related GENERA."
    },

    genus_rank: {
        id: "genus_rank",
        parent: "taxonomic_hierarchy",
        label: "Genus",
        rank: "Taxonomic Rank",
        type: "lesson",
        icon: "🌱",

        title: "Genus",

        definition: "Genus is a taxonomic rank below Family and above Species. It contains closely related species.",

        examPoints: ["Family → Genus → Species", "Genus name is the first part of a scientific name"],

        examples: ["Solanum", "Mangifera", "Brassica"],

        memoryTip: "GENUS = group of closely related species."
    },

    species_rank: {
        id: "species_rank",
        parent: "taxonomic_hierarchy",
        label: "Species",
        rank: "Taxonomic Rank",
        type: "lesson",
        icon: "🔬",

        title: "Fundamental Unit",

        definition:
            "Species is a fundamental unit of biological classification. In many organisms, members of a species are capable of interbreeding and producing fertile offspring, although species concepts vary among organisms.",

        keyPoints: [
            "Species is a basic unit of classification",
            "Species are given scientific names",
            "Species concepts can vary",
            "Species names are used in binomial nomenclature"
        ],

        examPoints: ["Species is the basic/fundamental unit of classification", "Scientific names identify species"],

        memoryTip: "SPECIES = the specific organism group being identified."
    },

    // =========================================================
    // 3. PLANT KINGDOM
    // =========================================================

    plant_kingdom: {
        id: "plant_kingdom",
        parent: "plantae",
        label: "Plant Kingdom",
        rank: "Major Topic",
        type: "category",
        icon: "🌱",

        title: "Classification of the Plant Kingdom",

        definition:
            "The plant kingdom contains a wide diversity of photosynthetic organisms. Students commonly encounter both traditional school-level classifications and modern evolutionary classifications.",

        groups: ["traditional_classification", "modern_classification"],

        examPoints: ["Traditional and modern classifications should not be treated as identical systems"],

        memoryTip: "STUDENT VIEW = traditional exam classification; MODERN VIEW = evolutionary relationships."
    },

    // =========================================================
    // TRADITIONAL CLASSIFICATION
    // =========================================================

    traditional_classification: {
        id: "traditional_classification",
        parent: "plant_kingdom",
        label: "Traditional Classification",
        rank: "Traditional Scheme",
        type: "category",
        icon: "📚",

        title: "Traditional School-Level Classification",

        definition:
            "A traditional school-level scheme divides plants broadly into Cryptogamae and Phanerogamae, followed by several familiar groups.",

        keyPoints: [
            "Traditional educational classification",
            "Cryptogamae are seedless/spore-bearing",
            "Phanerogamae are seed-bearing",
            "This scheme is useful for understanding traditional exam terminology"
        ],

        groups: ["cryptogamae", "phanerogamae"],

        memoryTip: "Traditional tree → CRYPTOGAMAE + PHANEROGAMAE."
    },

    cryptogamae: {
        id: "cryptogamae",
        parent: "traditional_classification",
        label: "Cryptogamae",
        rank: "Traditional Group",
        type: "clade",
        icon: "🌿",

        title: "Seedless / Spore-bearing Plants",

        definition:
            "Cryptogamae is a traditional group of plants that do not produce seeds and commonly reproduce by spores.",

        keyPoints: [
            "Seeds absent",
            "Flowers absent",
            "Reproduction commonly by spores",
            "Traditionally includes Thallophyta, Bryophyta and Pteridophyta"
        ],

        groups: ["thallophyta", "bryophyta", "pteridophyta"],

        examPoints: ["Cryptogamae → seedless", "Main groups → Thallophyta + Bryophyta + Pteridophyta"],

        memoryTip: "CRYPTO = hidden → seedless/spore-bearing plants."
    },

    thallophyta: {
        id: "thallophyta",
        parent: "cryptogamae",
        label: "Thallophyta",
        rank: "Traditional Group",
        type: "division",
        icon: "🟢",

        title: "Simple Thallus Body",

        definition:
            "Thallophyta is a traditional group characterized by a simple body called a thallus that is not differentiated into true roots, stems and leaves.",

        keyPoints: [
            "Body called thallus",
            "No true roots",
            "No true stems",
            "No true leaves",
            "Traditional examples include algae"
        ],

        examples: ["Spirogyra", "Ulothrix", "Chara"],

        examPoints: [
            "Thallus → undifferentiated body",
            "True root → absent",
            "True stem → absent",
            "True leaf → absent"
        ],

        memoryTip: "THALLOPHYTA → THALLUS → no true root, stem or leaf."
    },

    bryophyta: {
        id: "bryophyta",
        parent: "cryptogamae",
        label: "Bryophyta",
        rank: "Division",
        type: "division",
        icon: "🌱",

        title: "Amphibians of the Plant Kingdom",

        definition:
            "Bryophytes are small, non-vascular plants that generally live in moist habitats and reproduce through spores.",

        keyPoints: [
            "Non-vascular",
            "Xylem absent",
            "Phloem absent",
            "True roots absent",
            "Rhizoids present",
            "Reproduce by spores",
            "Water is required for sexual reproduction"
        ],

        examples: ["Funaria", "Marchantia", "Sphagnum"],

        examPoints: [
            "Bryophytes → non-vascular",
            "Rhizoids → present",
            "Seeds → absent",
            "Water → required for sexual reproduction"
        ],

        memoryTip: "BRYOPHYTES = amphibians → land plants that need water for reproduction."
    },

    pteridophyta: {
        id: "pteridophyta",
        parent: "cryptogamae",
        label: "Pteridophyta",
        rank: "Traditional Division",
        type: "division",
        icon: "🌿",

        title: "Seedless Vascular Plants",

        definition:
            "Pteridophytes are seedless vascular plants with true roots, stems and leaves. They reproduce by spores.",

        keyPoints: [
            "Vascular tissue present",
            "Xylem present",
            "Phloem present",
            "True roots present",
            "True stems present",
            "True leaves present",
            "Seeds absent",
            "Reproduce by spores"
        ],

        examples: ["Fern", "Selaginella", "Equisetum"],

        examPoints: [
            "Vascular → present",
            "True roots → present",
            "True stems → present",
            "True leaves → present",
            "Seeds → absent",
            "Spores → present"
        ],

        memoryTip: "PTERIDOPHYTA = VASCULAR but SEEDLESS."
    },

    // =========================================================
    // PHANEROGAMAE
    // =========================================================

    phanerogamae: {
        id: "phanerogamae",
        parent: "traditional_classification",
        label: "Phanerogamae",
        rank: "Traditional Group",
        type: "clade",
        icon: "🌳",

        title: "Seed-bearing Plants",

        definition:
            "Phanerogamae is a traditional group of seed-bearing plants containing Gymnosperms and Angiosperms.",

        keyPoints: [
            "Seeds present",
            "Traditional group of seed-bearing plants",
            "Includes Gymnosperms",
            "Includes Angiosperms"
        ],

        groups: ["gymnosperms", "angiosperms"],

        examPoints: ["Phanerogamae → seed-bearing", "Gymnosperms + Angiosperms"],

        memoryTip: "PHANEROGAMAE → seed-bearing plants."
    },

    gymnosperms: {
        id: "gymnosperms",
        parent: "phanerogamae",
        label: "Gymnosperms",
        rank: "Traditional Group",
        type: "division",
        icon: "🌲",

        title: "Naked-Seed Plants",

        definition:
            "Gymnosperms are seed plants whose ovules are not enclosed within an ovary and whose seeds are therefore described as naked.",

        keyPoints: [
            "Seeds present",
            "Seeds are naked",
            "Ovules are not enclosed in an ovary",
            "True fruits are absent",
            "Many are cone-bearing",
            "Typical flowers are absent"
        ],

        examples: ["Pinus", "Cycas", "Cedrus"],

        examPoints: ["Seed → present", "Seed → naked", "Fruit → absent", "Common structure → cones"],

        memoryTip: "GYMNO = NAKED → naked seeds."
    },

    angiosperms: {
        id: "angiosperms",
        parent: "phanerogamae",
        label: "Angiosperms",
        rank: "Major Group",
        type: "division",
        icon: "🌸",

        title: "Flowering Plants",

        definition:
            "Angiosperms are flowering seed plants in which the ovules are enclosed within an ovary. After fertilization, the ovary generally develops into a fruit.",

        keyPoints: [
            "Flowering plants",
            "Seeds enclosed",
            "Ovules enclosed within an ovary",
            "Fruits generally develop from ovaries after fertilization",
            "Extremely diverse group of plants"
        ],

        groups: ["monocotyledons", "dicotyledons"],

        examPoints: ["Flower → present", "Ovary → present", "Seed → enclosed", "Fruit → generally present"],

        memoryTip: "ANGIO = enclosed → seeds are enclosed within the fruit."
    },

    monocotyledons: {
        id: "monocotyledons",
        parent: "angiosperms",
        label: "Monocotyledons",
        rank: "Traditional Class",
        type: "division",
        icon: "🌾",

        title: "One Cotyledon",

        definition:
            "Monocotyledons are a traditional school-level group of flowering plants whose seeds typically contain one cotyledon.",

        keyPoints: [
            "One cotyledon",
            "Usually parallel leaf venation",
            "Usually fibrous root system",
            "Floral parts commonly in multiples of 3",
            "Vascular bundles in stems are generally scattered"
        ],

        examples: ["Maize", "Wheat", "Rice", "Grass", "Banana"],

        examPoints: [
            "Cotyledons → 1",
            "Venation → usually parallel",
            "Root → usually fibrous",
            "Floral parts → commonly multiples of 3"
        ],

        memoryTip: "MONO = ONE → one cotyledon."
    },

    dicotyledons: {
        id: "dicotyledons",
        parent: "angiosperms",
        label: "Dicotyledons",
        rank: "Traditional Class",
        type: "division",
        icon: "🌺",

        title: "Two Cotyledons",

        definition:
            "Dicotyledons are a traditional school-level group of flowering plants whose seeds typically contain two cotyledons.",

        keyPoints: [
            "Two cotyledons",
            "Usually reticulate leaf venation",
            "Usually taproot system",
            "Floral parts commonly in multiples of 4 or 5",
            "Vascular bundles in stems are generally arranged in a ring"
        ],

        examples: ["Pea", "Tomato", "Bean", "Mango"],

        examPoints: [
            "Cotyledons → 2",
            "Venation → usually reticulate",
            "Root → usually taproot",
            "Floral parts → commonly multiples of 4 or 5"
        ],

        memoryTip: "DI = TWO → two cotyledons."
    },

    // =========================================================
    // 4. MODERN CLASSIFICATION
    // =========================================================

    modern_classification: {
        id: "modern_classification",
        parent: "plant_kingdom",
        label: "Modern Classification",
        rank: "Modern Approach",
        type: "category",
        icon: "🧬",

        title: "Modern Evolutionary Classification",

        definition:
            "Modern plant classification emphasizes evolutionary relationships and uses evidence from morphology, anatomy, genetics and molecular biology.",

        keyPoints: [
            "Based strongly on evolutionary relationships",
            "Uses multiple lines of evidence",
            "Molecular data are important",
            "Traditional groups may not correspond exactly to modern clades"
        ],

        groups: [
            "vascular_plants",
            "seed_plants",
            "modern_gymnosperms",
            "modern_angiosperms",
            "modern_monocots",
            "eudicots"
        ],

        examPoints: [
            "Modern taxonomy → evolutionary relationships",
            "Molecular evidence → important",
            "Traditional Dicotyledons should not automatically be equated with Eudicots"
        ],

        memoryTip: "MODERN TAXONOMY = relationships + evolution + evidence."
    },

    vascular_plants: {
        id: "vascular_plants",
        parent: "modern_classification",
        label: "Vascular Plants",
        rank: "Major Group",
        type: "lesson",
        icon: "🌿",

        title: "Plants with Vascular Tissue",

        definition:
            "Vascular plants possess specialized conducting tissues, mainly xylem and phloem, for transporting water, minerals and organic substances.",

        keyPoints: [
            "Xylem present",
            "Phloem present",
            "More complex body organization",
            "Includes seedless vascular plants and seed plants"
        ],

        examples: ["Ferns", "Gymnosperms", "Angiosperms"],

        memoryTip: "VASCULAR = XYLEM + PHLOEM."
    },

    seed_plants: {
        id: "seed_plants",
        parent: "modern_classification",
        label: "Seed Plants",
        rank: "Major Group",
        type: "lesson",
        icon: "🌱",

        title: "Plants that Produce Seeds",

        definition:
            "Seed plants are vascular plants that reproduce through seeds and include gymnosperms and angiosperms.",

        keyPoints: ["Vascular plants", "Produce seeds", "Includes gymnosperms", "Includes angiosperms"],

        memoryTip: "SEED PLANTS = Gymnosperms + Angiosperms."
    },

    modern_gymnosperms: {
        id: "modern_gymnosperms",
        parent: "modern_classification",
        label: "Gymnosperms",
        rank: "Seed Plant Group",
        type: "lesson",
        icon: "🌲",

        title: "Gymnosperms in Modern Classification",

        definition: "Modern gymnosperms are seed plants with ovules and seeds that are not enclosed within an ovary.",

        keyPoints: [
            "Seed plants",
            "Naked seeds",
            "Do not form fruits from ovaries",
            "Represent several living lineages"
        ],

        examples: ["Pinus", "Cycas", "Ginkgo", "Gnetum"],

        memoryTip: "Gymnosperm → naked seed."
    },

    modern_angiosperms: {
        id: "modern_angiosperms",
        parent: "modern_classification",
        label: "Angiosperms",
        rank: "Clade",
        type: "lesson",
        icon: "🌸",

        title: "Flowering Plant Clade",

        definition:
            "Angiosperms are flowering plants whose ovules are enclosed within carpels and whose seeds develop within fruits.",

        keyPoints: [
            "Flowers present",
            "Ovules enclosed in carpels",
            "Seeds enclosed in fruits",
            "Double fertilization is a characteristic feature",
            "Extremely diverse"
        ],

        examples: ["Rice", "Maize", "Tomato", "Mango"],

        memoryTip: "ANGIOSPERMS = flowers + enclosed seeds + fruits."
    },

    modern_monocots: {
        id: "modern_monocots",
        parent: "modern_classification",
        label: "Monocots",
        rank: "Clade",
        type: "lesson",
        icon: "🌾",

        title: "Modern Monocot Clade",

        definition:
            "Monocots are a major angiosperm clade characterized ancestrally by a single cotyledon and several associated features.",

        keyPoints: [
            "One cotyledon",
            "Many have parallel venation",
            "Many have fibrous or adventitious root systems",
            "Many have floral parts in threes"
        ],

        examples: ["Rice", "Maize", "Wheat", "Lily", "Banana"],

        memoryTip: "MONOCOT → ONE cotyledon."
    },

    eudicots: {
        id: "eudicots",
        parent: "modern_classification",
        label: "Eudicots",
        rank: "Clade",
        type: "lesson",
        icon: "🌺",

        title: "Major Modern Angiosperm Clade",

        definition:
            "Eudicots are a major clade of flowering plants characterized by tricolpate or derived pollen and containing many familiar plants traditionally called dicots.",

        keyPoints: [
            "Modern evolutionary clade",
            "Includes many traditional dicot plants",
            "Tricolpate pollen is a key characteristic",
            "Not identical to the old broad category Dicotyledons"
        ],

        examples: ["Tomato", "Pea", "Sunflower", "Mango", "Mustard"],

        examPoints: ["Eudicots → modern clade", "Traditional Dicots ≠ exactly the same as Eudicots"],

        memoryTip: "EUDICOTS = modern evolutionary group containing most familiar dicot plants."
    },

    // =========================================================
    // 5. PLANT FAMILIES
    // =========================================================

    plant_families: {
        id: "plant_families",
        parent: "plantae",
        label: "Important Plant Families",
        rank: "Taxonomic Families",
        type: "category",
        icon: "🌸",

        title: "Major Plant Families for Students",

        definition:
            "Plant families group related genera and are important for plant identification, classification and botanical study.",

        keyPoints: [
            "Family is above Genus",
            "Family names commonly end in -aceae",
            "Family identification often uses floral and vegetative characters"
        ],

        groups: [
            "poaceae",
            "fabaceae",
            "solanaceae",
            "asteraceae",
            "lamiaceae",
            "brassicaceae",
            "malvaceae",
            "cucurbitaceae",
            "apiaceae",
            "liliaceae",
            "arecaceae",
            "rosaceae",
            "rutaceae",
            "euphorbiaceae",
            "anacardiaceae"
        ],

        memoryTip: "FAMILY → related GENERA → related SPECIES."
    },

    poaceae: {
        id: "poaceae",
        parent: "plant_families",
        label: "Poaceae",
        rank: "Family",
        type: "family",
        icon: "🌾",

        title: "Grass Family",

        definition: "Poaceae is the grass family and contains many economically important monocot plants.",

        keyPoints: [
            "Mostly grasses",
            "Monocot family",
            "Leaves commonly narrow with parallel venation",
            "Inflorescence commonly spikelet-based",
            "Fruit is typically a caryopsis"
        ],

        examples: ["Rice", "Wheat", "Maize", "Sugarcane", "Bamboo"],

        examPoints: ["Poaceae → grass family", "Monocot", "Fruit → caryopsis"],

        memoryTip: "POACEAE → grasses → rice, wheat, maize."
    },

    fabaceae: {
        id: "fabaceae",
        parent: "plant_families",
        label: "Fabaceae",
        rank: "Family",
        type: "family",
        icon: "🫘",

        title: "Pea / Legume Family",

        definition:
            "Fabaceae is a large family containing many legumes and economically important food and crop plants.",

        keyPoints: [
            "Many are herbs, shrubs or trees",
            "Roots may contain nitrogen-fixing nodules",
            "Fruit commonly a legume",
            "Many members are important food crops",
            "Flowers are often papilionaceous in subfamily Faboideae"
        ],

        examples: ["Pea", "Chickpea", "Soybean", "Bean", "Groundnut"],

        examPoints: ["Fabaceae → legume family", "Fruit → legume", "Root nodules → common in many members"],

        memoryTip: "FABACEAE → FAB beans → legumes."
    },

    solanaceae: {
        id: "solanaceae",
        parent: "plant_families",
        label: "Solanaceae",
        rank: "Family",
        type: "family",
        icon: "🍅",

        title: "Nightshade Family",

        definition: "Solanaceae is a flowering plant family containing many food, medicinal and ornamental plants.",

        keyPoints: [
            "Flowers commonly bisexual",
            "Five fused sepals are common",
            "Five fused petals are common",
            "Stamens commonly 5",
            "Ovary commonly superior",
            "Fruit commonly berry or capsule"
        ],

        examples: ["Tomato", "Potato", "Chilli", "Brinjal", "Petunia"],

        examPoints: [
            "Solanaceae → potato, tomato, chilli",
            "Fruit → berry or capsule",
            "Five stamens commonly present"
        ],

        memoryTip: "SOLANACEAE → SOLANUM → tomato + potato."
    },

    asteraceae: {
        id: "asteraceae",
        parent: "plant_families",
        label: "Asteraceae",
        rank: "Family",
        type: "family",
        icon: "🌻",

        title: "Sunflower Family",

        definition:
            "Asteraceae is a large flowering plant family characterized by a composite head or capitulum made up of many small florets.",

        keyPoints: [
            "Inflorescence → capitulum",
            "Many small florets form one head",
            "Ray and disc florets may occur",
            "Anthers commonly fused around the style",
            "Fruit commonly cypsela"
        ],

        examples: ["Sunflower", "Tridax", "Marigold", "Daisy"],

        examPoints: ["Asteraceae → capitulum", "Sunflower → classic example", "Fruit → cypsela"],

        memoryTip: "ASTERACEAE → one flower-looking HEAD made of many florets."
    },

    lamiaceae: {
        id: "lamiaceae",
        parent: "plant_families",
        label: "Lamiaceae",
        rank: "Family",
        type: "family",
        icon: "🌿",

        title: "Mint Family",

        definition:
            "Lamiaceae is a family commonly containing aromatic herbs and shrubs, many of which have essential oils.",

        keyPoints: [
            "Many members are aromatic",
            "Stem commonly quadrangular",
            "Leaves commonly opposite",
            "Flowers commonly bilaterally symmetrical",
            "Fruit commonly splits into four nutlets"
        ],

        examples: ["Tulsi", "Mint", "Basil", "Salvia"],

        examPoints: ["Lamiaceae → mint family", "Aromatic plants", "Opposite leaves", "Quadrangular stem common"],

        memoryTip: "LAMIACEAE → MINT → aromatic + opposite leaves."
    },

    brassicaceae: {
        id: "brassicaceae",
        parent: "plant_families",
        label: "Brassicaceae",
        rank: "Family",
        type: "family",
        icon: "🥦",

        title: "Mustard Family",

        definition:
            "Brassicaceae is a flowering plant family that includes mustard and many important vegetable crops.",

        keyPoints: [
            "Flowers commonly have four petals",
            "Six stamens commonly present",
            "Four are long and two are short",
            "Fruit commonly siliqua or silicula"
        ],

        examples: ["Mustard", "Cabbage", "Radish", "Turnip"],

        examPoints: [
            "Brassicaceae → mustard family",
            "Stamens → 6, commonly tetradynamous",
            "Fruit → siliqua or silicula"
        ],

        memoryTip: "BRASSICACEAE → mustard → 4 petals + 6 stamens."
    },

    malvaceae: {
        id: "malvaceae",
        parent: "plant_families",
        label: "Malvaceae",
        rank: "Family",
        type: "family",
        icon: "🌺",

        title: "Hibiscus Family",

        definition: "Malvaceae is a flowering plant family that includes hibiscus, cotton and okra.",

        keyPoints: [
            "Flowers commonly bisexual",
            "Petals commonly five",
            "Stamens may be numerous",
            "Stamens commonly form a staminal column in Hibiscus",
            "Fruit varies among members"
        ],

        examples: ["Hibiscus", "Cotton", "Okra", "Lady's finger"],

        examPoints: ["Malvaceae → Hibiscus + cotton", "Staminal column → characteristic in Hibiscus"],

        memoryTip: "MALVACEAE → MALLOW → Hibiscus and cotton."
    },

    cucurbitaceae: {
        id: "cucurbitaceae",
        parent: "plant_families",
        label: "Cucurbitaceae",
        rank: "Family",
        type: "family",
        icon: "🥒",

        title: "Gourd Family",

        definition:
            "Cucurbitaceae is a family of mostly herbaceous plants that commonly have tendrils and include many cultivated gourds.",

        keyPoints: [
            "Mostly climbing or trailing herbs",
            "Tendrils commonly present",
            "Flowers commonly unisexual",
            "Ovary usually inferior",
            "Fruit commonly pepo"
        ],

        examples: ["Cucumber", "Pumpkin", "Bottle gourd", "Bitter gourd", "Watermelon"],

        examPoints: ["Cucurbitaceae → gourd family", "Tendrils → common", "Fruit → pepo"],

        memoryTip: "CUCURBITACEAE → CUCUMBER → tendrils + pepo."
    },

    apiaceae: {
        id: "apiaceae",
        parent: "plant_families",
        label: "Apiaceae",
        rank: "Family",
        type: "family",
        icon: "🥕",

        title: "Carrot Family",

        definition:
            "Apiaceae is a flowering plant family that includes carrot, coriander, cumin and other aromatic plants.",

        keyPoints: [
            "Inflorescence commonly umbel",
            "Flowers usually small",
            "Ovary inferior",
            "Fruit commonly schizocarpic"
        ],

        examples: ["Carrot", "Coriander", "Cumin", "Fennel"],

        examPoints: ["Apiaceae → carrot family", "Inflorescence → umbel"],

        memoryTip: "APIACEAE → UMBEL → carrot and coriander."
    },

    liliaceae: {
        id: "liliaceae",
        parent: "plant_families",
        label: "Liliaceae",
        rank: "Family",
        type: "family",
        icon: "🌷",

        title: "Lily Family",

        definition: "Liliaceae is a traditional monocot family containing many perennial herbaceous plants.",

        keyPoints: [
            "Monocot family",
            "Leaves commonly parallel-veined",
            "Flowers commonly trimerous",
            "Perianth commonly in two whorls",
            "Ovary commonly superior"
        ],

        examples: ["Lily", "Aloe", "Asparagus", "Tulip"],

        examPoints: ["Liliaceae → monocot family", "Floral parts commonly in multiples of 3"],

        memoryTip: "LILIACEAE → LILY → monocot + floral parts in 3s."
    },

    arecaceae: {
        id: "arecaceae",
        parent: "plant_families",
        label: "Arecaceae",
        rank: "Family",
        type: "family",
        icon: "🌴",

        title: "Palm Family",

        definition: "Arecaceae is the palm family and contains characteristic monocot trees and shrubs.",

        keyPoints: [
            "Monocot family",
            "Usually unbranched stems",
            "Large leaves commonly clustered near the top",
            "Inflorescences commonly branched",
            "Important tropical plants"
        ],

        examples: ["Coconut", "Date palm", "Areca palm", "Oil palm"],

        examPoints: ["Arecaceae → palms", "Monocot family"],

        memoryTip: "ARECACEAE → PALMS."
    },

    rosaceae: {
        id: "rosaceae",
        parent: "plant_families",
        label: "Rosaceae",
        rank: "Family",
        type: "family",
        icon: "🌹",

        title: "Rose Family",

        definition:
            "Rosaceae is a diverse flowering plant family containing many ornamental and fruit-producing plants.",

        keyPoints: [
            "Flowers commonly bisexual",
            "Petals commonly five",
            "Stamens often numerous",
            "Many economically important fruits"
        ],

        examples: ["Rose", "Apple", "Pear", "Strawberry", "Peach"],

        examPoints: ["Rosaceae → rose family", "Many important fruit crops"],

        memoryTip: "ROSACEAE → ROSE + many fruit plants."
    },

    rutaceae: {
        id: "rutaceae",
        parent: "plant_families",
        label: "Rutaceae",
        rank: "Family",
        type: "family",
        icon: "🍋",

        title: "Citrus Family",

        definition: "Rutaceae is a flowering plant family containing citrus plants and many aromatic species.",

        keyPoints: [
            "Many plants contain aromatic oils",
            "Glands may contain essential oils",
            "Flowers commonly bisexual",
            "Citrus is an important genus"
        ],

        examples: ["Lemon", "Orange", "Citrus", "Curry leaf"],

        examPoints: ["Rutaceae → citrus family", "Essential oils common"],

        memoryTip: "RUTACEAE → CITRUS → lemon and orange."
    },

    euphorbiaceae: {
        id: "euphorbiaceae",
        parent: "plant_families",
        label: "Euphorbiaceae",
        rank: "Family",
        type: "family",
        icon: "🌿",

        title: "Spurge Family",

        definition:
            "Euphorbiaceae is a large flowering plant family containing herbs, shrubs and trees, many of which produce latex.",

        keyPoints: [
            "Wide variety of growth forms",
            "Latex commonly present in many members",
            "Flowers may be highly reduced",
            "Some species are economically important"
        ],

        examples: ["Euphorbia", "Castor", "Cassava", "Hevea"],

        examPoints: ["Euphorbiaceae → spurge family", "Latex → common in many members"],

        memoryTip: "EUPHORBIACEAE → SPURGE → latex."
    },

    anacardiaceae: {
        id: "anacardiaceae",
        parent: "plant_families",
        label: "Anacardiaceae",
        rank: "Family",
        type: "family",
        icon: "🥭",

        title: "Mango / Cashew Family",

        definition: "Anacardiaceae is a flowering plant family containing economically important trees and shrubs.",

        keyPoints: [
            "Many members are trees or shrubs",
            "Several species produce edible fruits",
            "Resins or aromatic substances occur in many members"
        ],

        examples: ["Mango", "Cashew", "Pistachio", "Anacardium"],

        examPoints: ["Anacardiaceae → mango + cashew family"],

        memoryTip: "ANACARDIACEAE → MANGO + CASHEW."
    },

    // =========================================================
    // 6. TAXONOMIC EVIDENCE
    // =========================================================

    taxonomic_evidence: {
        id: "taxonomic_evidence",
        parent: "plantae",
        label: "Taxonomic Evidence",
        rank: "Major Topic",
        type: "category",
        icon: "🔬",

        title: "Evidence Used in Classification",

        definition:
            "Taxonomists use different kinds of biological evidence to identify organisms and determine relationships among them.",

        groups: [
            "morphology",
            "anatomy",
            "cytology",
            "genetics",
            "biochemistry",
            "molecular_data",
            "palynology",
            "fossils"
        ],

        memoryTip: "Taxonomy uses MANY lines of evidence, not just appearance."
    },

    morphology: {
        id: "morphology",
        parent: "taxonomic_evidence",
        label: "Morphology",
        rank: "Evidence",
        type: "lesson",
        icon: "🌿",

        title: "External Structure",

        definition: "Morphology is the study of the external form and visible structures of organisms.",

        examples: ["Root", "Stem", "Leaf", "Flower", "Fruit", "Seed"],

        examPoints: ["Morphology → external characters"],

        memoryTip: "MORPHOLOGY = what you can observe from the outside."
    },

    anatomy: {
        id: "anatomy",
        parent: "taxonomic_evidence",
        label: "Anatomy",
        rank: "Evidence",
        type: "lesson",
        icon: "🔬",

        title: "Internal Structure",

        definition: "Anatomy studies the internal structure of organisms and their organs.",

        examples: ["Tissue arrangement", "Vascular bundles", "Leaf anatomy", "Stem anatomy"],

        examPoints: ["Anatomy → internal structure"],

        memoryTip: "ANATOMY = inside structure."
    },

    cytology: {
        id: "cytology",
        parent: "taxonomic_evidence",
        label: "Cytology",
        rank: "Evidence",
        type: "lesson",
        icon: "🧫",

        title: "Cellular Evidence",

        definition:
            "Cytology is the study of cells and cellular features that can provide useful taxonomic information.",

        keyPoints: ["Chromosome number", "Chromosome structure", "Cellular characteristics"],

        examPoints: ["Cytology → cells and chromosomes"],

        memoryTip: "CYTO = CELL."
    },

    genetics: {
        id: "genetics",
        parent: "taxonomic_evidence",
        label: "Genetics",
        rank: "Evidence",
        type: "lesson",
        icon: "🧬",

        title: "Genetic Evidence",

        definition: "Genetic information can reveal similarities, differences and relationships among organisms.",

        keyPoints: [
            "DNA differences can be compared",
            "Genetic relationships help classification",
            "Useful for studying evolutionary relationships"
        ],

        memoryTip: "GENETICS → compare inherited information."
    },

    biochemistry: {
        id: "biochemistry",
        parent: "taxonomic_evidence",
        label: "Biochemistry",
        rank: "Evidence",
        type: "lesson",
        icon: "⚗️",

        title: "Chemical Evidence",

        definition:
            "Biochemical characteristics such as proteins, pigments and secondary metabolites can provide taxonomic information.",

        examples: ["Proteins", "Pigments", "Secondary metabolites"],

        memoryTip: "BIOCHEMISTRY → compare chemical characteristics."
    },

    molecular_data: {
        id: "molecular_data",
        parent: "taxonomic_evidence",
        label: "Molecular Data",
        rank: "Evidence",
        type: "lesson",
        icon: "🧬",

        title: "DNA and Molecular Evidence",

        definition:
            "Modern taxonomy uses molecular data, especially DNA sequences, to investigate relationships among organisms.",

        keyPoints: [
            "DNA sequences can be compared",
            "Molecular evidence can reveal evolutionary relationships",
            "Widely used in modern systematics"
        ],

        examPoints: ["Molecular taxonomy → DNA and molecular evidence"],

        memoryTip: "MOLECULAR → DNA tells the evolutionary story."
    },

    palynology: {
        id: "palynology",
        parent: "taxonomic_evidence",
        label: "Palynology",
        rank: "Evidence",
        type: "lesson",
        icon: "🌾",

        title: "Study of Pollen",

        definition:
            "Palynology is the study of pollen grains and spores, including their structure and characteristics.",

        keyPoints: [
            "Pollen morphology can be taxonomically useful",
            "Pollen characters can help distinguish plant groups"
        ],

        memoryTip: "PALYNOLOGY → POLLEN."
    },

    fossils: {
        id: "fossils",
        parent: "taxonomic_evidence",
        label: "Fossils",
        rank: "Evidence",
        type: "lesson",
        icon: "🦴",

        title: "Evidence from the Past",

        definition:
            "Fossils provide evidence about ancient organisms and can help scientists understand the history and evolution of plant groups.",

        keyPoints: [
            "Provide historical evidence",
            "Help reconstruct evolutionary history",
            "Useful for understanding extinct plant groups"
        ],

        memoryTip: "FOSSILS → evidence from ancient life."
    },

    // =========================================================
    // 7. NOMENCLATURE
    // =========================================================

    nomenclature_section: {
        id: "nomenclature_section",
        parent: "plantae",
        label: "Nomenclature",
        rank: "Major Topic",
        type: "category",
        icon: "📖",

        title: "Scientific Naming of Plants",

        definition:
            "Plant nomenclature deals with the rules and principles used to assign scientific names to plants, algae and fungi covered by the relevant international code.",

        groups: ["binomial_nomenclature", "scientific_names", "author_citation", "type_specimen", "icn"],

        memoryTip: "NOMENCLATURE = rules for scientific names."
    },

    binomial_nomenclature: {
        id: "binomial_nomenclature",
        parent: "nomenclature_section",
        label: "Binomial Nomenclature",
        rank: "Naming System",
        type: "lesson",
        icon: "✍️",

        title: "Two-Part Scientific Name",

        definition:
            "Binomial nomenclature gives a species a two-part scientific name consisting of its genus name followed by its specific epithet.",

        examples: ["Mangifera indica", "Solanum tuberosum", "Oryza sativa"],

        examPoints: [
            "Two parts → Genus + specific epithet",
            "Genus begins with a capital letter",
            "Specific epithet begins with a lowercase letter",
            "Printed scientific names are conventionally italicized"
        ],

        memoryTip: "BI = TWO → two-part scientific name."
    },

    scientific_names: {
        id: "scientific_names",
        parent: "nomenclature_section",
        label: "Scientific Names",
        rank: "Naming",
        type: "lesson",
        icon: "🔤",

        title: "Universal Plant Names",

        definition:
            "Scientific names provide standardized names that can be used internationally instead of relying only on local or common names.",

        keyPoints: [
            "Reduce confusion between common names",
            "Used internationally",
            "Usually based on Latin or Latinized forms",
            "Species names use binomial nomenclature"
        ],

        examples: ["Mangifera indica", "Azadirachta indica", "Oryza sativa"],

        memoryTip: "Scientific name = universal botanical identity."
    },

    author_citation: {
        id: "author_citation",
        parent: "nomenclature_section",
        label: "Author Citation",
        rank: "Nomenclature",
        type: "lesson",
        icon: "👨‍🔬",

        title: "Name of the Author",

        definition:
            "Author citation records the botanist or botanists associated with the publication of a scientific plant name.",

        keyPoints: [
            "May appear after the scientific name",
            "Helps trace nomenclatural history",
            "Abbreviations are used according to accepted standards"
        ],

        memoryTip: "AUTHOR CITATION → who published or established the name."
    },

    type_specimen: {
        id: "type_specimen",
        parent: "nomenclature_section",
        label: "Type Specimen",
        rank: "Nomenclature",
        type: "lesson",
        icon: "🗃️",

        title: "Reference for a Name",

        definition:
            "A type specimen serves as the nomenclatural reference point to which the name of a taxon is permanently attached under the rules of botanical nomenclature.",

        keyPoints: [
            "Provides a nomenclatural reference",
            "Important for applying names consistently",
            "Associated with herbarium collections"
        ],

        examPoints: ["Type → nomenclatural reference for a name"],

        memoryTip: "TYPE = reference point for the name."
    },

    icn: {
        id: "icn",
        parent: "nomenclature_section",
        label: "ICN",
        rank: "Code",
        type: "lesson",
        icon: "📜",

        title: "International Code of Nomenclature",

        definition:
            "The International Code of Nomenclature for algae, fungi, and plants provides internationally accepted rules and recommendations for scientific naming.",

        keyPoints: [
            "Provides rules for scientific names",
            "Promotes stability and consistency",
            "Applies to algae, fungi and plants within its scope"
        ],

        examPoints: ["ICN → International Code of Nomenclature for algae, fungi, and plants"],

        memoryTip: "ICN = INTERNATIONAL naming rules."
    },

    // =========================================================
    // 8. TAXONOMIC AIDS
    // =========================================================

    taxonomic_aids: {
        id: "taxonomic_aids",
        parent: "plantae",
        label: "Taxonomic Aids",
        rank: "Major Topic",
        type: "category",
        icon: "🗂️",

        title: "Tools Used in Taxonomy",

        definition:
            "Taxonomic aids are resources and institutions that help scientists and students identify, compare, document and study organisms.",

        groups: ["herbarium", "botanical_gardens", "museums", "floras", "monographs", "manuals", "identification_keys"],

        memoryTip: "Taxonomic aids = tools that HELP identify and study organisms."
    },

    herbarium: {
        id: "herbarium",
        parent: "taxonomic_aids",
        label: "Herbarium",
        rank: "Taxonomic Aid",
        type: "lesson",
        icon: "🍂",

        title: "Collection of Preserved Plant Specimens",

        definition:
            "A herbarium is a collection of preserved, dried and mounted plant specimens arranged for study and reference.",

        keyPoints: [
            "Specimens are dried and pressed",
            "Specimens are mounted on sheets",
            "Labels contain collection information",
            "Used for identification and research"
        ],

        examPoints: ["Herbarium → preserved plant specimens"],

        memoryTip: "HERBARIUM = library of preserved plants."
    },

    botanical_gardens: {
        id: "botanical_gardens",
        parent: "taxonomic_aids",
        label: "Botanical Gardens",
        rank: "Taxonomic Aid",
        type: "lesson",
        icon: "🌳",

        title: "Living Plant Collections",

        definition:
            "Botanical gardens maintain living collections of plants for research, education, conservation and identification.",

        keyPoints: [
            "Plants are maintained alive",
            "Useful for education",
            "Useful for research",
            "Can support conservation"
        ],

        memoryTip: "BOTANICAL GARDEN = living plant collection."
    },

    museums: {
        id: "museums",
        parent: "taxonomic_aids",
        label: "Museums",
        rank: "Taxonomic Aid",
        type: "lesson",
        icon: "🏛️",

        title: "Collections for Study",

        definition:
            "Biological museums preserve and display specimens and materials that support scientific study and education.",

        keyPoints: ["Preserve specimens", "Support teaching", "Provide reference material"],

        memoryTip: "MUSEUM = preserved reference collections."
    },

    floras: {
        id: "floras",
        parent: "taxonomic_aids",
        label: "Floras",
        rank: "Taxonomic Aid",
        type: "lesson",
        icon: "📚",

        title: "Plants of a Region",

        definition:
            "A flora is a publication or account describing the plants occurring in a particular geographical region.",

        keyPoints: [
            "Usually regional",
            "Contains descriptions of plants",
            "May include identification information",
            "Useful for field identification"
        ],

        memoryTip: "FLORA = plants of a REGION."
    },

    monographs: {
        id: "monographs",
        parent: "taxonomic_aids",
        label: "Monographs",
        rank: "Taxonomic Aid",
        type: "lesson",
        icon: "📖",

        title: "Detailed Study of a Taxon",

        definition: "A monograph is a detailed scientific treatment of a particular taxonomic group.",

        keyPoints: [
            "Detailed treatment",
            "Focuses on a particular taxon",
            "May cover identification, classification, descriptions and distribution"
        ],

        memoryTip: "MONOGRAPH = detailed study of ONE taxonomic group."
    },

    manuals: {
        id: "manuals",
        parent: "taxonomic_aids",
        label: "Manuals",
        rank: "Taxonomic Aid",
        type: "lesson",
        icon: "📘",

        title: "Identification Guides",

        definition:
            "Taxonomic manuals provide practical information and identification guidance for organisms in a particular region or group.",

        keyPoints: ["Useful for identification", "Usually practical in format", "Can contain descriptions and keys"],

        memoryTip: "MANUAL = practical identification guide."
    },

    identification_keys: {
        id: "identification_keys",
        parent: "taxonomic_aids",
        label: "Identification Keys",
        rank: "Taxonomic Aid",
        type: "lesson",
        icon: "🔑",

        title: "Tools for Identification",

        definition:
            "Identification keys use observable characters to help determine the identity of an unknown organism.",

        keyPoints: [
            "Use observable characters",
            "Often provide two contrasting choices",
            "Lead the user step-by-step toward identification"
        ],

        examPoints: ["Key → identification tool", "Dichotomous key → two contrasting alternatives at each step"],

        memoryTip: "KEY = unlock the identity of an unknown organism."
    },

    // =========================================================
    // 9. PLANT IDENTIFICATION
    // =========================================================

    plant_identification: {
        id: "plant_identification",
        parent: "plantae",
        label: "Plant Identification",
        rank: "Practical Skill",
        type: "category",
        icon: "🔎",

        title: "How to Identify a Plant",

        definition:
            "Plant identification involves observing plant characters and comparing them with descriptions, specimens, databases or identification keys.",

        groups: ["dichotomous_keys", "morphological_characters", "family_identification"],

        memoryTip: "OBSERVE → COMPARE → IDENTIFY."
    },

    dichotomous_keys: {
        id: "dichotomous_keys",
        parent: "plant_identification",
        label: "Dichotomous Keys",
        rank: "Identification Tool",
        type: "lesson",
        icon: "🔑",

        title: "Two-Choice Identification",

        definition:
            "A dichotomous key identifies an organism through a sequence of paired, contrasting choices based on observable characters.",

        keyPoints: [
            "Uses paired alternatives",
            "Each choice leads to another step",
            "Continues until the organism is identified",
            "Useful for field and laboratory identification"
        ],

        examPoints: ["Dichotomous = divided into two", "Each step provides two contrasting alternatives"],

        memoryTip: "DI = TWO → two choices at each step."
    },

    morphological_characters: {
        id: "morphological_characters",
        parent: "plant_identification",
        label: "Morphological Characters",
        rank: "Identification",
        type: "lesson",
        icon: "🌿",

        title: "Characters Used for Identification",

        definition:
            "Plant identification commonly begins by observing external characters such as habit, leaves, flowers, fruits and seeds.",

        keyPoints: [
            "Plant habit",
            "Leaf arrangement",
            "Leaf shape",
            "Inflorescence",
            "Flower structure",
            "Fruit type",
            "Seed characters"
        ],

        memoryTip: "Look at the WHOLE PLANT, not just the flower."
    },

    family_identification: {
        id: "family_identification",
        parent: "plant_identification",
        label: "Family Identification",
        rank: "Practical Skill",
        type: "lesson",
        icon: "🌸",

        title: "Identify the Plant Family",

        definition:
            "Family identification uses combinations of vegetative and reproductive characters to determine which plant family an unknown specimen belongs to.",

        keyPoints: [
            "Flowers are often highly informative",
            "Inflorescence can be important",
            "Fruit characters can be useful",
            "Vegetative characters may also help"
        ],

        examPoints: ["Family identification → compare diagnostic characters"],

        memoryTip: "FLOWER + INFLORESCENCE + FRUIT = powerful family clues."
    },

    // =========================================================
    // 10. EXAM MODE
    // =========================================================

    exam_mode: {
        id: "exam_mode",
        parent: "plantae",
        label: "Exam Mode",
        rank: "Practice",
        type: "category",
        icon: "📝",

        title: "Botany & Taxonomy Exam Practice",

        definition:
            "Exam Mode converts taxonomy lessons into active practice so students can test recall, classification, identification and understanding.",

        groups: [
            "mcqs",
            "true_false",
            "fill_blanks",
            "match_following",
            "identify_family",
            "identify_taxon",
            "classification_questions",
            "revision_tests"
        ],

        keyPoints: [
            "Practice improves recall",
            "Questions can test definitions",
            "Questions can test classification",
            "Questions can test plant families",
            "Questions can test scientific names"
        ],

        memoryTip: "LEARN → PRACTICE → REVISE → MASTER."
    },

    mcqs: {
        id: "mcqs",
        parent: "exam_mode",
        label: "MCQs",
        rank: "Exam Practice",
        type: "exam",
        icon: "❓",

        title: "Multiple Choice Questions",

        definition: "MCQs test recognition and understanding by providing multiple answer choices.",

        examPoints: ["Useful for rapid revision", "Can test facts, concepts and application"],

        memoryTip: "Read every option before choosing."
    },

    true_false: {
        id: "true_false",
        parent: "exam_mode",
        label: "True / False",
        rank: "Exam Practice",
        type: "exam",
        icon: "✅",

        title: "True or False",

        definition: "True/False questions test whether students can recognize correct and incorrect statements.",

        memoryTip: "Watch for words like ALWAYS, NEVER and ONLY."
    },

    fill_blanks: {
        id: "fill_blanks",
        parent: "exam_mode",
        label: "Fill in the Blanks",
        rank: "Exam Practice",
        type: "exam",
        icon: "✏️",

        title: "Recall Practice",

        definition: "Fill-in-the-blank questions test precise recall of important terms, names and concepts.",

        examples: [
            "Taxonomy = identification + ______ + classification",
            "Gymnosperms have ______ seeds",
            "Bryophytes are ______ plants"
        ],

        memoryTip: "Use exact scientific terms."
    },

    match_following: {
        id: "match_following",
        parent: "exam_mode",
        label: "Match the Following",
        rank: "Exam Practice",
        type: "exam",
        icon: "🔗",

        title: "Match Concepts and Examples",

        definition:
            "Matching questions test whether students can connect plant groups, families, examples and characteristics.",

        examples: ["Solanaceae → Tomato", "Poaceae → Wheat", "Asteraceae → Sunflower", "Fabaceae → Pea"],

        memoryTip: "Connect the FAMILY with its signature example."
    },

    identify_family: {
        id: "identify_family",
        parent: "exam_mode",
        label: "Identify the Family",
        rank: "Exam Practice",
        type: "exam",
        icon: "🌸",

        title: "Family Identification Questions",

        definition:
            "Students identify a plant family using diagnostic morphological, floral, inflorescence and fruit characters.",

        examples: [
            "Capitulum → Asteraceae",
            "Tetradynamous stamens → Brassicaceae",
            "Pepo → Cucurbitaceae",
            "Caryopsis → Poaceae"
        ],

        memoryTip: "Learn each family's SIGNATURE CHARACTERS."
    },

    identify_taxon: {
        id: "identify_taxon",
        parent: "exam_mode",
        label: "Identify the Taxon",
        rank: "Exam Practice",
        type: "exam",
        icon: "🔬",

        title: "Taxonomic Identification",

        definition:
            "Questions ask students to identify the appropriate taxonomic group from a description or set of characters.",

        memoryTip: "Look for the strongest diagnostic character first."
    },

    classification_questions: {
        id: "classification_questions",
        parent: "exam_mode",
        label: "Classification Questions",
        rank: "Exam Practice",
        type: "exam",
        icon: "🧬",

        title: "Classification Practice",

        definition:
            "Students arrange organisms or taxonomic groups in the correct hierarchical or classification order.",

        examples: [
            "Kingdom → Division → Class → Order → Family → Genus → Species",
            "Cryptogamae → Thallophyta / Bryophyta / Pteridophyta",
            "Phanerogamae → Gymnosperms / Angiosperms"
        ],

        memoryTip: "Always identify the LEVEL before choosing the answer."
    },

    revision_tests: {
        id: "revision_tests",
        parent: "exam_mode",
        label: "Revision Tests",
        rank: "Exam Practice",
        type: "exam",
        icon: "🏆",

        title: "Full Taxonomy Revision",

        definition:
            "Revision tests combine taxonomy basics, hierarchy, classification, nomenclature, plant families and identification.",

        keyPoints: [
            "Tests multiple topics together",
            "Useful before examinations",
            "Helps identify weak areas",
            "Encourages active recall"
        ],

        memoryTip: "REVISION = retrieve information without looking at the answer."
    }
};

// =====================================================
// BUILD STUDENT GRAPH
// =====================================================

function buildStudentGraph() {
    const elements = [];

    Object.values(studentClassification).forEach((item) => {
        elements.push({
            data: {
                id: item.id,
                label: `${item.icon} ${item.label}`,
                rank: item.rank,
                type: item.type,
                parentId: item.parent,
                studentKey: item.id
            }
        });

        if (item.parent) {
            elements.push({
                data: {
                    id: `${item.parent}__${item.id}`,
                    source: item.parent,
                    target: item.id
                }
            });
        }
    });

    return elements;
}

// =====================================================
// BOTANIGRAPH VIEW SWITCHER
// =====================================================

/* =========================================================
   BOTANIGRAPH VIEW SWITCHER
========================================================= */

let currentGraphView = "modern";

function switchGraphView(view) {
    if (!cy) {
        console.error("BotaniGraph: Cytoscape is not initialized.");
        return;
    }

    console.log("Switching graph view:", view);

    currentGraphView = view;

    // Remove the current graph
    cy.elements().remove();

    // ---------------------------------------------
    // ADD SELECTED GRAPH
    // ---------------------------------------------

    if (view === "student") {
        const studentElements = buildStudentGraph();

        console.log("Student graph elements:", studentElements.length);

        cy.add(studentElements);
    } else {
        const modernElements = buildModernGraph();

        console.log("Modern graph elements:", modernElements.length);

        cy.add(modernElements);
    }

    // ---------------------------------------------
    // UPDATE BUTTON STATE
    // ---------------------------------------------

    const modernBtn = document.getElementById("modernViewBtn");

    const studentBtn = document.getElementById("studentViewBtn");

    if (modernBtn) {
        modernBtn.classList.toggle("active", view === "modern");
    }

    if (studentBtn) {
        studentBtn.classList.toggle("active", view === "student");
    }

    // ---------------------------------------------
    // LAYOUT
    // ---------------------------------------------

    cy.layout({
        name: "breadthfirst",
        directed: true,
        roots: "#plantae",
        spacingFactor: view === "student" ? 1.45 : 1.25,
        padding: 60,
        animate: true,
        animationDuration: 500
    }).run();

    // ---------------------------------------------
    // FIT GRAPH
    // ---------------------------------------------

    setTimeout(() => {
        cy.fit(undefined, 50);
    }, 550);

    console.log("BotaniGraph view active:", currentGraphView);
}
/* =========================================================
       DERIVED DATA
    ========================================================== */

const allSpecies = botanicalData.species;
const speciesById = new Map(allSpecies.map((s) => [s.id, s]));

const familyList = botanicalData.families;
const familyById = new Map(familyList.map((f) => [f.id, f]));

const fabaceaeSpecies = allSpecies.filter((s) => s.family === "Fabaceae");

/* =========================================================
       LOCAL STORAGE STATE
    ========================================================== */

const STORAGE_KEY = "botanigraph_state_v1";
const PROFILE_KEY = "botanigraph_profile_v1";

const defaultState = {
    discovered: [],
    history: [],
    unlockedBadges: [],
    unlockedFamilies: [],
    score: 0
};

function loadState() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return structuredClone(defaultState);

        const parsed = JSON.parse(raw);

        return {
            ...structuredClone(defaultState),
            ...parsed,
            discovered: Array.isArray(parsed.discovered) ? parsed.discovered : [],
            history: Array.isArray(parsed.history) ? parsed.history : [],
            unlockedBadges: Array.isArray(parsed.unlockedBadges) ? parsed.unlockedBadges : [],
            unlockedFamilies: Array.isArray(parsed.unlockedFamilies) ? parsed.unlockedFamilies : []
        };
    } catch {
        return structuredClone(defaultState);
    }
}

let state = loadState();

function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadProfile() {
    try {
        const raw = localStorage.getItem(PROFILE_KEY);
        return raw ? JSON.parse(raw) : null;
    } catch {
        return null;
    }
}

let profile = loadProfile();

/* =========================================================
       BADGES
    ========================================================== */

const badges = {
    // ─────────────────────────────────────────
    // 🌱 BEGINNER BADGES
    // ─────────────────────────────────────────

    firstDiscovery: {
        id: "firstDiscovery",
        icon: "🌱",
        name: "First Discovery",
        description: "Discover your very first plant species.",
        points: 25
    },

    curiousBotanist: {
        id: "curiousBotanist",
        icon: "🔎",
        name: "Curious Botanist",
        description: "Discover 5 different plant species.",
        points: 50
    },

    plantExplorer: {
        id: "plantExplorer",
        icon: "🧭",
        name: "Plant Explorer",
        description: "Discover 10 different plant species.",
        points: 75
    },

    // ─────────────────────────────────────────
    // 👑 BOTANIGRAPH MEMBERSHIP BADGES
    // ─────────────────────────────────────────

    newBotanist: {
        id: "newBotanist",
        icon: "🌱",
        name: "New Botanist",
        description: "Welcome to BotaniGraph. Your botanical journey begins here.",
        points: 0,
        loyalty: true,
        daysRequired: 0
    },

    curiousMember: {
        id: "curiousMember",
        icon: "🔎",
        name: "Curious Member",
        description: "A BotaniGraph member for at least 3 days.",
        points: 0,
        loyalty: true,
        daysRequired: 3
    },

    regularExplorer: {
        id: "regularExplorer",
        icon: "🌿",
        name: "Regular Explorer",
        description: "A BotaniGraph member for at least 7 days.",
        points: 0,
        loyalty: true,
        daysRequired: 7
    },

    dedicatedTaxonomist: {
        id: "dedicatedTaxonomist",
        icon: "🔬",
        name: "Dedicated Taxonomist",
        description: "A BotaniGraph member for at least 30 days.",
        points: 0,
        loyalty: true,
        daysRequired: 30
    },

    botanicalVeteran: {
        id: "botanicalVeteran",
        icon: "🌳",
        name: "Botanical Veteran",
        description: "A BotaniGraph member for at least 90 days.",
        points: 0,
        loyalty: true,
        daysRequired: 90
    },

    botanigraphScholar: {
        id: "botanigraphScholar",
        icon: "🏛️",
        name: "BotaniGraph Scholar",
        description: "A BotaniGraph member for at least 180 days.",
        points: 0,
        loyalty: true,
        daysRequired: 180
    },

    loyalMember: {
        id: "loyalMember",
        icon: "👑",
        name: "Loyal Member",
        description: "A BotaniGraph member for at least one year.",
        points: 0,
        loyalty: true,
        daysRequired: 365
    },

    botanicalLegendMember: {
        id: "botanicalLegendMember",
        icon: "💎",
        name: "Botanical Legend",
        description: "A BotaniGraph member for at least two years.",
        points: 0,
        loyalty: true,
        daysRequired: 730
    },

    // ─────────────────────────────────────────
    // 🧬 TAXONOMY BADGES
    // ─────────────────────────────────────────

    nightshade: {
        id: "nightshade",
        icon: "🧪",
        name: "Nightshade Novice",
        description: "Discover your first Solanaceae taxon.",
        points: 50
    },

    legume: {
        id: "legume",
        icon: "🌾",
        name: "Legume Legend",
        description: "Explore every Fabaceae species in the atlas.",
        points: 150
    },

    familyHunter: {
        id: "familyHunter",
        icon: "🧬",
        name: "Family Hunter",
        description: "Discover plants from 5 different families.",
        points: 150
    },

    familyMaster: {
        id: "familyMaster",
        icon: "🏅",
        name: "Family Master",
        description: "Discover plants from 10 different families.",
        points: 300
    },

    genusExplorer: {
        id: "genusExplorer",
        icon: "🌿",
        name: "Genus Explorer",
        description: "Explore 10 different genera.",
        points: 200
    },

    genusMaster: {
        id: "genusMaster",
        icon: "🌳",
        name: "Genus Master",
        description: "Explore 25 different genera.",
        points: 500
    },

    // ─────────────────────────────────────────
    // 🌍 EXPLORATION BADGES
    // ─────────────────────────────────────────

    westernGhats: {
        id: "westernGhats",
        icon: "⛰️",
        name: "Western Ghats Guardian",
        description: "Discover a species recorded from the Western Ghats.",
        points: 100
    },

    habitatExplorer: {
        id: "habitatExplorer",
        icon: "🌎",
        name: "Habitat Explorer",
        description: "Discover species from 5 different habitats.",
        points: 250
    },

    biodiversityHunter: {
        id: "biodiversityHunter",
        icon: "🌈",
        name: "Biodiversity Hunter",
        description: "Discover species from 10 different habitats or regions.",
        points: 500
    },

    // ─────────────────────────────────────────
    // 🧠 KNOWLEDGE BADGES
    // ─────────────────────────────────────────

    taxonomyTrainee: {
        id: "taxonomyTrainee",
        icon: "📖",
        name: "Taxonomy Trainee",
        description: "Explore 25 distinct species.",
        points: 100
    },

    fieldBotanist: {
        id: "fieldBotanist",
        icon: "🥾",
        name: "Field Botanist",
        description: "Explore 50 distinct species.",
        points: 250
    },

    botanicalScholar: {
        id: "botanicalScholar",
        icon: "🎓",
        name: "Botanical Scholar",
        description: "Explore 100 distinct species.",
        points: 500
    },

    botanicalExpert: {
        id: "botanicalExpert",
        icon: "🧠",
        name: "Botanical Expert",
        description: "Explore 250 distinct species.",
        points: 1000
    },

    // ─────────────────────────────────────────
    // 🌳 PLANT GROUP BADGES
    // ─────────────────────────────────────────

    angiospermExplorer: {
        id: "angiospermExplorer",
        icon: "🌸",
        name: "Angiosperm Explorer",
        description: "Discover 25 flowering plant species.",
        points: 250
    },

    monocotMaster: {
        id: "monocotMaster",
        icon: "🌴",
        name: "Monocot Master",
        description: "Explore 15 different monocot taxa.",
        points: 300
    },

    eudicotElite: {
        id: "eudicotElite",
        icon: "🌺",
        name: "Eudicot Elite",
        description: "Explore 25 different eudicot taxa.",
        points: 400
    },

    ancientPlants: {
        id: "ancientPlants",
        icon: "🦕",
        name: "Ancient Green",
        description: "Discover plants representing an ancient evolutionary lineage.",
        points: 300
    },

    // ─────────────────────────────────────────
    // 🔥 CHALLENGE BADGES
    // ─────────────────────────────────────────

    rapidExplorer: {
        id: "rapidExplorer",
        icon: "⚡",
        name: "Rapid Explorer",
        description: "Discover 10 species in a single exploration session.",
        points: 200
    },

    deepDive: {
        id: "deepDive",
        icon: "🔬",
        name: "Deep Dive",
        description: "Explore a complete path from Kingdom to Species.",
        points: 150
    },

    taxonomicClimber: {
        id: "taxonomicClimber",
        icon: "🧗",
        name: "Taxonomic Climber",
        description: "Navigate through 5 taxonomic levels in one journey.",
        points: 200
    },

    completionist: {
        id: "completionist",
        icon: "💎",
        name: "Completionist",
        description: "Fully explore an entire genus.",
        points: 500
    },

    // ─────────────────────────────────────────
    // 👑 ELITE BADGES
    // ─────────────────────────────────────────

    grandTaxonomist: {
        id: "grandTaxonomist",
        icon: "👑",
        name: "Grand Taxonomist",
        description: "Explore 500 distinct species.",
        points: 2000
    },

    masterBotanist: {
        id: "masterBotanist",
        icon: "🏆",
        name: "Master Botanist",
        description: "Explore 1,000 distinct species.",
        points: 5000
    },

    botanicalLegend: {
        id: "botanicalLegend",
        icon: "🌟",
        name: "Botanical Legend",
        description: "Explore 5,000 distinct species.",
        points: 10000
    },

    guardianOfPlantae: {
        id: "guardianOfPlantae",
        icon: "🌍",
        name: "Guardian of Plantae",
        description: "Explore an extraordinary breadth of the plant kingdom.",
        points: 25000
    }
};

/* =========================================================
       DOM
    ========================================================== */

const graphElement = document.getElementById("graph");
const specimenView = document.getElementById("specimenView");
const badgeGrid = document.getElementById("badgeGrid");
const historyList = document.getElementById("historyList");
const historyCount = document.getElementById("historyCount");
const progressRing = document.getElementById("progressRing");
const progressNumber = document.getElementById("progressNumber");
const progressText = document.getElementById("progressText");

const profileModal = document.getElementById("profileModal");
const profileForm = document.getElementById("profileForm");
const usernameInput = document.getElementById("usernameInput");
const collegeInput = document.getElementById("collegeInput");
const studentChip = document.getElementById("studentChip");
const membershipBadge = document.getElementById("membershipBadge");

const scoreNumber = document.getElementById("scoreNumber");
const scoreBadges = document.getElementById("scoreBadges");
const currentPlacement = document.getElementById("currentPlacement");
const leaderboardList = document.getElementById("leaderboardList");
const syncStatus = document.getElementById("syncStatus");

/* =========================================================
       GRAPH NODE CREATION
    ========================================================== */

function buildModernGraph() {
    const graphElements = [];

    function addNode(node, parentId = null) {
        graphElements.push({
            data: {
                id: node.id,
                label: node.label,
                rank: node.rank,
                type: node.type,
                parentId: parentId
            }
        });

        if (parentId) {
            graphElements.push({
                data: {
                    id: `${parentId}__${node.id}`,
                    source: parentId,
                    target: node.id
                }
            });
        }
    }

    // Root
    addNode(botanicalData.root);

    // Clades
    botanicalData.clades.forEach((clade) => {
        addNode(clade, clade.parent);
    });

    // Families
    botanicalData.families.forEach((family) => {
        addNode(family, family.parent);
    });

    // Genera
    botanicalData.genera.forEach((genus) => {
        addNode(
            {
                ...genus,
                rank: "Genus",
                type: "genus"
            },
            genus.family
        );
    });

    // Species
    botanicalData.species.forEach((species) => {
        addNode(
            {
                id: species.id,
                label: species.scientific,
                rank: "Species",
                type: "species"
            },
            species.genus
        );
    });

    return graphElements;
}

/* =========================================================
       CYTOSCAPE
    ========================================================== */

const cy = cytoscape({
    container: document.getElementById("graph"),
    elements: buildModernGraph(),

    layout: {
        name: "breadthfirst",
        directed: true,
        roots: "#plantae",
        spacingFactor: 1.25,
        padding: 40
    },

    minZoom: 0.25,
    maxZoom: 2.8,

    style: [
        {
            selector: "node",
            style: {
                "background-color": "rgba(19, 35, 23, 0.92)",
                "background-opacity": 0.92,
                "border-width": 1,
                "border-color": "#334d39",
                label: "data(label)",
                color: "#cde1d1",
                "font-size": 9,
                "font-family": "Inter, sans-serif",
                "text-wrap": "wrap",
                "text-max-width": 95,
                "text-valign": "center",
                "text-halign": "center",
                width: 62,
                height: 62,
                "overlay-opacity": 0,
                "transition-property":
                    "background-color, border-color, width, height, color, opacity, shadow-blur, shadow-opacity",
                "transition-duration": 220
            }
        },

        {
            selector: 'node[type = "root"]',
            style: {
                "background-color": "#173a23",
                "border-color": "#75d88e",
                "border-width": 2,
                color: "#dffff0",
                "font-size": 11,
                "font-weight": "bold",
                width: 92,
                height: 92,
                "shadow-color": "#59e781",
                "shadow-blur": 24,
                "shadow-opacity": 0.3
            }
        },

        {
            selector: 'node[type = "clade"]',
            style: {
                "background-color": "#17291d",
                "border-color": "#4f7959",
                "border-width": 1.5,
                color: "#b9d6bf",
                "font-size": 9,
                width: 72,
                height: 72
            }
        },

        {
            selector: 'node[type = "division"]',
            style: {
                "background-color": "#17231a",
                "border-color": "#43634b",
                color: "#b7cfbd",
                "font-size": 9,
                width: 74,
                height: 74
            }
        },

        {
            selector: 'node[type = "family"]',
            style: {
                "background-color": "#15251a",
                "border-color": "#557a5d",
                color: "#c2dcc8",
                "font-size": 9,
                width: 68,
                height: 68
            }
        },

        {
            selector: 'node[type = "genus"]',
            style: {
                "background-color": "#132018",
                "border-color": "#405c47",
                color: "#9fbea6",
                "font-size": 8,
                width: 58,
                height: 58
            }
        },

        {
            selector: 'node[type = "species"]',
            style: {
                "background-color": "#101a13",
                "border-color": "#395340",
                color: "#c4ddca",
                "font-size": 8,
                "font-style": "italic",
                width: 55,
                height: 55
            }
        },

        {
            selector: "edge",
            style: {
                "curve-style": "unbundled-bezier",
                "control-point-distances": 25,
                "control-point-weights": 0.5,
                "line-color": "#1f2922",
                width: 1.2,
                "target-arrow-shape": "none",
                opacity: 0.82
            }
        },

        {
            selector: ".dimmed",
            style: {
                opacity: 0.17
            }
        },

        {
            selector: ".focused",
            style: {
                opacity: 1,
                "border-color": "#8cffb0",
                "shadow-color": "#6cff91",
                "shadow-blur": 25,
                "shadow-opacity": 0.35
            }
        },

        {
            selector: ".root-breathing",
            style: {
                "shadow-color": "#8cffb0",
                "shadow-blur": 30,
                "shadow-opacity": 0.5
            }
        }
    ]
});

/* =========================================================
       ROOT BREATHING
    ========================================================== */

let rootPulse = false;

setInterval(() => {
    rootPulse = !rootPulse;

    cy.$("#plantae").toggleClass("root-breathing", rootPulse);
}, 1900);

/* =========================================================
       GRAPH INTERACTION
    ========================================================== */

cy.on("mouseover", "node", (event) => {
    const node = event.target;

    cy.elements().addClass("dimmed");

    const neighborhood = node.closedNeighborhood();

    neighborhood.removeClass("dimmed");
    neighborhood.addClass("focused");
    node.removeClass("dimmed");

    node.animate(
        {
            style: {
                width: node.data("type") === "root" ? 102 : 78,
                height: node.data("type") === "root" ? 102 : 78
            }
        },
        {
            duration: 180
        }
    );
});

cy.on("mouseout", "node", (event) => {
    const node = event.target;

    cy.elements().removeClass("dimmed").removeClass("focused");

    let size;

    switch (node.data("type")) {
        case "root":
            size = 92;
            break;

        case "clade":
            size = 72;
            break;

        case "family":
            size = 68;
            break;

        case "genus":
            size = 58;
            break;

        case "species":
            size = 55;
            break;

        default:
            size = 62;
    }

    node.animate(
        {
            style: {
                width: size,
                height: size
            }
        },
        {
            duration: 180
        }
    );
});

cy.on("tap", "node", (event) => {
    const node = event.target;
    handleNodeClick(node.id());
});

/* =========================================================
       NODE CLICK LOGIC
    ========================================================== */

function handleNodeClick(nodeId) {
    // =====================================================
    // 📚 STUDENT VIEW
    // =====================================================

    if (currentGraphView === "student") {
        const node = cy.$(`#${CSS.escape(nodeId)}`);

        if (!node.length) {
            return;
        }

        const studentKey = node.data("studentKey");

        const topic = studentClassification[studentKey];

        if (topic) {
            displayStudentLesson(topic);

            focusGraphNode(nodeId);

            return;
        }

        return;
    }

    // =====================================================
    // 🔬 MODERN VIEW
    // =====================================================

    const species = speciesById.get(nodeId);

    if (species) {
        displaySpecies(species);

        registerDiscovery(species);

        focusGraphNode(nodeId);

        return;
    }

    // =====================================================
    // FAMILY
    // =====================================================

    const family = familyById.get(nodeId);

    if (family) {
        displayTaxonomicMessage(
            family.label,
            "Family",
            `Explore the genera and species contained within ${family.label}.`
        );

        registerFamilyDiscovery(family);

        focusGraphNode(nodeId);

        return;
    }

    // =====================================================
    // OTHER MODERN TAXONOMIC NODE
    // =====================================================

    const node = cy.$(`#${CSS.escape(nodeId)}`);

    if (node.length) {
        displayTaxonomicMessage(
            node.data("label"),
            node.data("rank"),
            "Continue down this branch to investigate its subordinate taxa."
        );

        focusGraphNode(nodeId);
    }
}
function displayStudentLesson(topic) {
    const specimenView = document.getElementById("specimenView");

    specimenView.innerHTML = `

        <div class="student-lesson">

            <div class="lesson-title">
                ${topic.icon || "🌿"}
                ${escapeHtml(topic.label)}
            </div>

            <div class="lesson-rank">
                ${escapeHtml(topic.rank)}
            </div>

            <div class="lesson-subtitle">
                ${escapeHtml(topic.title || "")}
            </div>


            <div class="lesson-section">

                <h3>📖 WHAT IS IT?</h3>

                <p>
                    ${escapeHtml(topic.definition || "No definition available.")}
                </p>

            </div>


            ${
                topic.keyPoints && topic.keyPoints.length
                    ? `

                    <div class="lesson-section">

                        <h3>🎯 EXAM FOCUS</h3>

                        <ul>

                            ${topic.keyPoints
                                .map(
                                    (point) => `
                                    <li>
                                        ${escapeHtml(point)}
                                    </li>
                                `
                                )
                                .join("")}

                        </ul>

                    </div>

                    `
                    : ""
            }


            ${
                topic.examples && topic.examples.length
                    ? `

                    <div class="lesson-section">

                        <h3>🌱 EXAMPLES</h3>

                        <div class="example-list">

                            ${topic.examples
                                .map(
                                    (example) => `
                                    <span class="example-chip">
                                        ${escapeHtml(example)}
                                    </span>
                                `
                                )
                                .join("")}

                        </div>

                    </div>

                    `
                    : ""
            }


            ${
                topic.memoryTip
                    ? `

                    <div class="lesson-section memory-tip">

                        <h3>🧠 MEMORY TIP</h3>

                        <p>
                            ${escapeHtml(topic.memoryTip)}
                        </p>

                    </div>

                    `
                    : ""
            }

        </div>
    `;
}

function focusGraphNode(nodeId) {
    const node = cy.$(`#${CSS.escape(nodeId)}`);

    if (!node.length) return;

    cy.animate({
        center: {
            eles: node
        },
        zoom: Math.max(cy.zoom(), node.data("type") === "species" ? 1.25 : 0.95),
        duration: 450
    });
}

/* =========================================================
       SPECIMEN VIEW
    ========================================================== */

function displaySpecies(species) {
    const scholarQuery = encodeURIComponent(`"${species.scientific}" botany morphology taxonomy`);

    const conservationQuery = encodeURIComponent(`"${species.scientific}" conservation habitat distribution`);

    specimenView.innerHTML = `
        <article class="species-header">
          <div class="rank-label">Species Record</div>

          <div class="species-name">
            <i>${escapeHtml(species.scientific)}</i>
          </div>

          <div class="species-common">
            ${escapeHtml(species.common)}
          </div>

          <div class="family-pill">
            ${escapeHtml(species.family)}
          </div>
        </article>

        <div class="field">
          <div class="field-label">Taxonomic Rank</div>
          <div class="field-value">
            ${escapeHtml(species.taxonomicRank)}
          </div>
        </div>

        <div class="field">
          <div class="field-label">Scientific Nomenclature</div>
          <div class="field-value">
            <span class="scientific">
              <i>${escapeHtml(species.scientific)}</i>
            </span>
          </div>
        </div>

        <div class="field">
          <div class="field-label">Common Reference Name</div>
          <div class="field-value">
            ${escapeHtml(species.common)}
          </div>
        </div>

        <div class="field">
          <div class="field-label">Diagnostic Botanical Description</div>
          <div class="field-value">
            ${escapeHtml(species.description)}
          </div>
        </div>

        <div class="field">
          <div class="field-label">Habitable / Native Locations</div>
          <div class="field-value">
            ${escapeHtml(species.habitat)}
          </div>
        </div>

        <div class="search-actions">
          <a
            class="search-btn"
            href="https://scholar.google.com/scholar?q=${scholarQuery}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Scholar ↗
          </a>

          <a
            class="search-btn"
            href="https://www.google.com/search?q=${conservationQuery}"
            target="_blank"
            rel="noopener noreferrer"
          >
            Conservation Search ↗
          </a>
        </div>
      `;
}

function displayTaxonomicMessage(label, rank, description, studentKey = null) {
    const lesson = studentKey ? studentClassification[studentKey] : null;

    if (!lesson) {
        specimenView.innerHTML = `
      <article class="species-header">
        <div class="rank-label">${escapeHtml(rank)}</div>

        <div class="species-name">
          ${escapeHtml(label)}
        </div>

        <div class="species-common">
          Taxonomic branch
        </div>
      </article>

      <div class="field">
        <div class="field-label">Field Note</div>

        <div class="field-value">
          ${escapeHtml(description)}
        </div>
      </div>
    `;

        return;
    }

    specimenView.innerHTML = `

    <article class="species-header">

      <div class="rank-label">
        ${escapeHtml(rank)}
      </div>

      <div class="species-name">
        ${lesson.icon || "🌿"}
        ${escapeHtml(lesson.label)}
      </div>

      <div class="species-common">
        ${escapeHtml(lesson.title)}
      </div>

    </article>

    <div class="field">

      <div class="field-label">
        📖 What is it?
      </div>

      <div class="field-value">
        ${escapeHtml(lesson.definition)}
      </div>

    </div>

    <div class="field">

      <div class="field-label">
        ⭐ Key Features
      </div>

      <div class="field-value">

        <ul class="student-feature-list">

          ${lesson.keyPoints
              .map(
                  (point) => `
              <li>${escapeHtml(point)}</li>
            `
              )
              .join("")}

        </ul>

      </div>

    </div>

    ${
        lesson.examples
            ? `
          <div class="field">

            <div class="field-label">
              🌱 Examples
            </div>

            <div class="field-value">

              ${lesson.examples
                  .map(
                      (example) => `
                  <span class="example-chip">
                    ${escapeHtml(example)}
                  </span>
                `
                  )
                  .join("")}

            </div>

          </div>
        `
            : ""
    }

    ${
        lesson.memoryTip
            ? `
          <div class="student-memory">

            <div class="memory-title">
              🧠 REMEMBER
            </div>

            <div class="memory-text">
              ${escapeHtml(lesson.memoryTip)}
            </div>

          </div>
        `
            : ""
    }

  `;
}

/* =========================================================
       DISCOVERY + SCORING
    ========================================================== */

function registerDiscovery(species) {
    const alreadyDiscovered = state.discovered.includes(species.id);

    if (!alreadyDiscovered) {
        state.discovered.push(species.id);

        state.history.unshift({
            speciesId: species.id,
            scientific: species.scientific,
            common: species.common,
            timestamp: Date.now()
        });

        state.score += 10;

        saveState();

        showToast("🌱", "New species documented", `+10 points · ${species.scientific}`);

        checkBadges(species);
        syncProfile();
    } else {
        checkBadges(species);
    }

    renderAll();
}

function registerFamilyDiscovery(family) {
    if (!state.unlockedFamilies.includes(family.id)) {
        state.unlockedFamilies.push(family.id);
        state.score += 50;

        saveState();

        showToast("🌿", "Family branch unlocked", `+50 points · ${family.label}`);

        syncProfile();
        renderAll();
    }
}

function checkBadges(species) {
    // =====================================================
    // 🌱 FIRST DISCOVERY
    // =====================================================

    if (state.discovered.length >= 1 && !state.unlockedBadges.includes(badges.firstDiscovery.id)) {
        unlockBadge(badges.firstDiscovery);
    }

    // =====================================================
    // 🔎 CURIOUS BOTANIST
    // =====================================================

    if (state.discovered.length >= 5 && !state.unlockedBadges.includes(badges.curiousBotanist.id)) {
        unlockBadge(badges.curiousBotanist);
    }

    // =====================================================
    // 🧭 PLANT EXPLORER
    // =====================================================

    if (state.discovered.length >= 10 && !state.unlockedBadges.includes(badges.plantExplorer.id)) {
        unlockBadge(badges.plantExplorer);
    }

    // =====================================================
    // 📖 TAXONOMY TRAINEE
    // =====================================================

    if (state.discovered.length >= 25 && !state.unlockedBadges.includes(badges.taxonomyTrainee.id)) {
        unlockBadge(badges.taxonomyTrainee);
    }

    // =====================================================
    // 🥾 FIELD BOTANIST
    // =====================================================

    if (state.discovered.length >= 50 && !state.unlockedBadges.includes(badges.fieldBotanist.id)) {
        unlockBadge(badges.fieldBotanist);
    }

    // =====================================================
    // 🎓 BOTANICAL SCHOLAR
    // =====================================================

    if (state.discovered.length >= 100 && !state.unlockedBadges.includes(badges.botanicalScholar.id)) {
        unlockBadge(badges.botanicalScholar);
    }

    // =====================================================
    // 🧠 BOTANICAL EXPERT
    // =====================================================

    if (state.discovered.length >= 250 && !state.unlockedBadges.includes(badges.botanicalExpert.id)) {
        unlockBadge(badges.botanicalExpert);
    }

    // =====================================================
    // 👑 GRAND TAXONOMIST
    // =====================================================

    if (state.discovered.length >= 15 && !state.unlockedBadges.includes(badges.grandTaxonomist.id)) {
        unlockBadge(badges.grandTaxonomist);
    }

    // =====================================================
    // 🏆 MASTER BOTANIST
    // =====================================================

    if (state.discovered.length >= 1000 && !state.unlockedBadges.includes(badges.masterBotanist.id)) {
        unlockBadge(badges.masterBotanist);
    }

    // =====================================================
    // 🌟 BOTANICAL LEGEND
    // =====================================================

    if (state.discovered.length >= 5000 && !state.unlockedBadges.includes(badges.botanicalLegend.id)) {
        unlockBadge(badges.botanicalLegend);
    }

    // =====================================================
    // 🧬 FAMILY HUNTER
    // =====================================================

    const discoveredFamilies = new Set();

    state.discovered.forEach((speciesId) => {
        const discoveredSpecies = speciesById.get(speciesId);

        if (discoveredSpecies && discoveredSpecies.family) {
            discoveredFamilies.add(discoveredSpecies.family);
        }
    });

    if (discoveredFamilies.size >= 5 && !state.unlockedBadges.includes(badges.familyHunter.id)) {
        unlockBadge(badges.familyHunter);
    }

    // =====================================================
    // 🏅 FAMILY MASTER
    // =====================================================

    if (discoveredFamilies.size >= 10 && !state.unlockedBadges.includes(badges.familyMaster.id)) {
        unlockBadge(badges.familyMaster);
    }

    // =====================================================
    // 🌿 GENUS EXPLORER
    // =====================================================

    const discoveredGenera = new Set();

    state.discovered.forEach((speciesId) => {
        const discoveredSpecies = speciesById.get(speciesId);

        if (discoveredSpecies && discoveredSpecies.genus) {
            discoveredGenera.add(discoveredSpecies.genus);
        }
    });

    if (discoveredGenera.size >= 10 && !state.unlockedBadges.includes(badges.genusExplorer.id)) {
        unlockBadge(badges.genusExplorer);
    }

    // =====================================================
    // 🌳 GENUS MASTER
    // =====================================================

    if (discoveredGenera.size >= 25 && !state.unlockedBadges.includes(badges.genusMaster.id)) {
        unlockBadge(badges.genusMaster);
    }

    // =====================================================
    // 🧪 NIGHTSHADE NOVICE
    // =====================================================

    if (species.family === "Solanaceae" && !state.unlockedBadges.includes(badges.nightshade.id)) {
        unlockBadge(badges.nightshade);
    }

    // =====================================================
    // 🌾 LEGUME LEGEND
    // =====================================================

    const allFabaceaeDiscovered =
        fabaceaeSpecies.length > 0 && fabaceaeSpecies.every((item) => state.discovered.includes(item.id));

    if (allFabaceaeDiscovered && !state.unlockedBadges.includes(badges.legume.id)) {
        unlockBadge(badges.legume);
    }

    // =====================================================
    // ⛰️ WESTERN GHATS GUARDIAN
    // =====================================================

    if (species.westernGhats || species.habitat.toLowerCase().includes("western ghats")) {
        if (!state.unlockedBadges.includes(badges.westernGhats.id)) {
            unlockBadge(badges.westernGhats);
        }
    }

    // =====================================================
    // 🌸 ANGIOSPERM EXPLORER
    // =====================================================

    const angiospermSpecies = state.discovered.filter((speciesId) => {
        const item = speciesById.get(speciesId);

        if (!item) return false;

        const genus = botanicalData.genera.find((g) => g.id === item.genus);

        if (!genus) return false;

        const family = botanicalData.families.find((f) => f.id === genus.family);

        if (!family) return false;

        return ["eudicots", "monocots"].includes(family.parent);
    });

    if (angiospermSpecies.length >= 25 && !state.unlockedBadges.includes(badges.angiospermExplorer.id)) {
        unlockBadge(badges.angiospermExplorer);
    }

    // =====================================================
    // 🔬 DEEP DIVE
    // =====================================================

    if (species && species.genus && species.family && !state.unlockedBadges.includes(badges.deepDive.id)) {
        unlockBadge(badges.deepDive);
    }

    // =====================================================
    // 🧗 TAXONOMIC CLIMBER
    // =====================================================

    if (species && species.genus && species.family && !state.unlockedBadges.includes(badges.taxonomicClimber.id)) {
        unlockBadge(badges.taxonomicClimber);
    }

    // =====================================================
    // 💎 COMPLETIONIST
    // =====================================================

    if (species && species.genus) {
        const genusSpecies = allSpecies.filter((item) => item.genus === species.genus);

        const completeGenus =
            genusSpecies.length > 0 && genusSpecies.every((item) => state.discovered.includes(item.id));

        if (completeGenus && !state.unlockedBadges.includes(badges.completionist.id)) {
            unlockBadge(badges.completionist);
        }
    }
}
function unlockBadge(badge) {
    if (state.unlockedBadges.includes(badge.id)) return;

    state.unlockedBadges.push(badge.id);

    if (badge.points > 0) {
        state.score += badge.points;
    }

    saveState();

    showToast(badge.icon, "Achievement Unlocked", `${badge.name}${badge.points ? ` · +${badge.points} points` : ""}`);

    syncProfile();
    renderAll();
}

/* =========================================================
       👑 BOTANIGRAPH MEMBERSHIP SYSTEM
    ========================================================== */

function getMembershipDays() {
    if (!profile || !profile.memberSince) {
        return 0;
    }

    const memberSince = new Date(profile.memberSince);
    const now = new Date();

    if (Number.isNaN(memberSince.getTime())) {
        return 0;
    }

    const difference = now.getTime() - memberSince.getTime();

    return Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));
}

function getCurrentMembershipBadge() {
    const days = getMembershipDays();

    const loyaltyBadges = Object.values(badges)
        .filter((badge) => badge.loyalty)
        .sort((a, b) => b.daysRequired - a.daysRequired);

    return loyaltyBadges.find((badge) => days >= badge.daysRequired) || badges.newBotanist;
}

function checkMembershipBadges() {
    if (!profile || !profile.memberSince) {
        return;
    }

    const membershipDays = getMembershipDays();

    Object.values(badges)
        .filter((badge) => badge.loyalty)
        .forEach((badge) => {
            if (membershipDays >= badge.daysRequired && !state.unlockedBadges.includes(badge.id)) {
                unlockMembershipBadge(badge);
            }
        });
}

function unlockMembershipBadge(badge) {
    if (state.unlockedBadges.includes(badge.id)) {
        return;
    }

    state.unlockedBadges.push(badge.id);

    // Loyalty badges intentionally give 0 points.
    saveState();

    showToast(badge.icon, "Membership Milestone", `${badge.name} unlocked · ${badge.description}`);

    syncProfile();
    renderAll();
}

function ensureMembershipProfile() {
    if (!profile) return;

    let changed = false;

    if (!profile.memberSince) {
        profile.memberSince = new Date().toISOString();
        changed = true;
    }

    if (!profile.lastVisit) {
        profile.lastVisit = new Date().toISOString();
        changed = true;
    }

    if (changed) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
    }
}

function getMembershipBadgeFromDate(memberSince) {
    if (!memberSince) {
        return badges.newBotanist;
    }

    const start = new Date(memberSince);
    const now = new Date();

    if (Number.isNaN(start.getTime())) {
        return badges.newBotanist;
    }

    const difference = now.getTime() - start.getTime();

    const days = Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24)));

    const loyaltyBadges = Object.values(badges)
        .filter((badge) => badge.loyalty)
        .sort((a, b) => b.daysRequired - a.daysRequired);

    return loyaltyBadges.find((badge) => days >= badge.daysRequired) || badges.newBotanist;
}

/* =========================================================
       RENDER LOCAL UI
    ========================================================== */

function renderProgress() {
    const total = allSpecies.length;
    const discovered = state.discovered.length;

    const percentage = total === 0 ? 0 : Math.round((discovered / total) * 100);

    progressRing.style.setProperty("--progress", `${percentage}%`);

    progressNumber.textContent = `${percentage}%`;

    progressText.textContent = `${discovered} of ${total} species documented`;
}

function renderBadges() {
    badgeGrid.innerHTML = Object.values(badges)
        .map((badge) => {
            const unlocked = state.unlockedBadges.includes(badge.id);

            return `
            <div class="badge-card ${unlocked ? "unlocked" : ""} ${badge.loyalty ? "loyalty-badge" : ""}">
              <div class="badge-icon">${badge.icon}</div>
              <div class="badge-name">
                ${escapeHtml(badge.name)}
              </div>
              <div class="badge-desc">
                ${escapeHtml(badge.description)}
              </div>
            </div>
          `;
        })
        .join("");
}

function renderHistory() {
    historyCount.textContent = state.history.length;

    if (!state.history.length) {
        historyList.innerHTML = `
          <div style="
            color:#5e6f63;
            font-size:9px;
            padding:10px 2px;
          ">
            No specimens documented yet.
          </div>
        `;

        return;
    }

    historyList.innerHTML = state.history
        .slice(0, 12)
        .map(
            (item) => `
          <div class="history-item">
            <div class="history-mark"></div>

            <div style="min-width:0;">
              <strong>
                <i>${escapeHtml(item.scientific)}</i>
              </strong>
              <span>
                ${escapeHtml(item.common)}
              </span>
            </div>
          </div>
        `
        )
        .join("");
}

function renderScore() {
    scoreNumber.textContent = state.score;
    scoreBadges.textContent = state.unlockedBadges.length;
}

function renderAll() {
    renderProgress();
    renderBadges();
    renderHistory();
    renderScore();
}

/* =========================================================
       TOAST
    ========================================================== */

function showToast(icon, title, copy) {
    const toast = document.createElement("div");

    toast.className = "toast";

    toast.innerHTML = `
        <div class="toast-icon">${icon}</div>

        <div>
          <div class="toast-kicker">BotaniGraph Achievement</div>
          <div class="toast-title">
            ${escapeHtml(title)}
          </div>
          <div class="toast-copy">
            ${escapeHtml(copy)}
          </div>
        </div>
      `;

    document.getElementById("toastContainer").appendChild(toast);

    setTimeout(() => {
        toast.classList.add("out");

        setTimeout(() => {
            toast.remove();
        }, 350);
    }, 4200);
}

/* =========================================================
       PROFILE
    ========================================================== */

function updateProfileUI() {
    if (!profile) {
        studentChip.textContent = "Guest";
        membershipBadge.textContent = "🌱 New Botanist";
        return;
    }

    // Keep the username exactly as before
    studentChip.textContent = profile.username;

    // Show current membership badge separately
    const membership = getMembershipBadgeFromDate(profile.memberSince);

    membershipBadge.textContent = `${membership.icon} ${membership.name}`;
}
function showProfileModal() {
    profileModal.classList.add("visible");

    setTimeout(() => {
        usernameInput.focus();
    }, 50);
}

profileForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();

    const college = collegeInput.value.trim();

    if (!username || !college) return;

    profile = {
        username,
        college,
        memberSince: new Date().toISOString(),
        lastVisit: new Date().toISOString()
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

    profileModal.classList.remove("visible");

    updateProfileUI();

    await syncProfile();
});

/* =========================================================
       SUPABASE LEADERBOARD
    ========================================================== */

async function syncProfile() {
    if (!profile) return;

    if (!supabaseClient) {
        syncStatus.textContent = "LOCAL";
        syncStatus.style.color = "#6c7c70";
        return;
    }

    try {
        syncStatus.textContent = "SYNCING";
        syncStatus.style.color = "#e5c77a";

        const { error } = await supabaseClient.from("leaderboard").upsert(
            {
                username: profile.username,
                college: profile.college,
                score: state.score,
                badges_count: state.unlockedBadges.length,
                member_since: profile.memberSince
            },
            {
                onConflict: "username"
            }
        );

        if (error) throw error;

        syncStatus.textContent = "LIVE";
        syncStatus.style.color = "#8cffb0";

        await loadLeaderboard();
    } catch (error) {
        console.warn("BotaniGraph Supabase sync:", error);

        syncStatus.textContent = "OFFLINE";
        syncStatus.style.color = "#9a716d";
    }
}

async function loadLeaderboard() {
    if (!supabaseClient) {
        renderOfflineLeaderboard();
        return;
    }

    try {
        const { data, error } = await supabaseClient
            .from("leaderboard")
            .select("username,college,score,badges_count,member_since")
            .order("score", {
                ascending: false
            })
            .limit(10);

        if (error) throw error;

        renderLeaderboard(data || []);

        await calculatePlacement();
    } catch (error) {
        console.warn("BotaniGraph leaderboard:", error);

        renderOfflineLeaderboard();
    }
}

async function calculatePlacement() {
    if (!supabaseClient || !profile) {
        currentPlacement.textContent = "—";
        return;
    }

    try {
        const { count, error } = await supabaseClient
            .from("leaderboard")
            .select("*", {
                count: "exact",
                head: true
            })
            .gt("score", state.score);

        if (error) throw error;

        const placement = (count || 0) + 1;

        currentPlacement.textContent = `#${placement}`;
    } catch {
        currentPlacement.textContent = "—";
    }
}

function renderLeaderboard(rows) {
    if (!rows.length) {
        renderOfflineLeaderboard("No students have synchronized yet.");
        return;
    }

    leaderboardList.innerHTML = rows
        .map((row, index) => {
            const isCurrent = profile && row.username === profile.username;

            const memberBadge = getMembershipBadgeFromDate(row.member_since);

            return `
                <div class="leaderboard-row ${isCurrent ? "current" : ""}">

                    <div class="rank">
                        ${index + 1}
                    </div>

                    <div class="leader-info">

                        <strong>
                            ${escapeHtml(row.username)}
                            ${isCurrent ? " · YOU" : ""}
                        </strong>

                        <span>
                            ${escapeHtml(row.college)}
                            · ${row.badges_count || 0} badges
                        </span>

                        <div class="leader-membership">

                            <span class="membership-icon">
                                ${memberBadge.icon}
                            </span>

                            <span class="membership-name">
                                ${escapeHtml(memberBadge.name)}
                            </span>

                        </div>

                    </div>

                    <div class="leader-score">
                        ${Number(row.score) || 0}
                    </div>

                </div>
            `;
        })
        .join("");
}

function renderOfflineLeaderboard(message = "Configure Supabase to enable the shared leaderboard.") {
    leaderboardList.innerHTML = `
        <div class="empty-state" style="min-height:160px;">
          <div>
            <strong>Leaderboard offline</strong>
            <p>
              ${escapeHtml(message)}
            </p>
          </div>
        </div>
      `;
}

/* =========================================================
       REALTIME SUBSCRIPTION
    ========================================================== */

function startRealtimeLeaderboard() {
    if (!supabaseClient) return;

    supabaseClient
        .channel("botanigraph-leaderboard")
        .on(
            "postgres_changes",
            {
                event: "*",
                schema: "public",
                table: "leaderboard"
            },
            () => {
                loadLeaderboard();
            }
        )
        .subscribe();
}

/* =========================================================
       TABS
    ========================================================== */

document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
        document.querySelectorAll(".tab").forEach((item) => item.classList.remove("active"));

        document.querySelectorAll(".tab-panel").forEach((panel) => panel.classList.remove("active"));

        tab.classList.add("active");

        const target = tab.dataset.tab === "notebook" ? "notebookPanel" : "scoreboardPanel";

        document.getElementById(target).classList.add("active");

        if (tab.dataset.tab === "scoreboard") {
            loadLeaderboard();
        }
    });
});

/* =========================================================
       GRAPH CONTROLS
    ========================================================== */

document.getElementById("fitGraphBtn").addEventListener("click", () => {
    cy.fit(undefined, 65);
});

document.getElementById("resetGraphBtn").addEventListener("click", () => {
    cy.layout({
        name: "breadthfirst",
        directed: true,
        roots: ["plantae"],
        padding: 80,
        spacingFactor: 1.15,
        animate: true,
        animationDuration: 500
    }).run();

    cy.fit(undefined, 65);
});

/* =========================================================
   VIEW BUTTON EVENTS
========================================================= */

const modernViewBtn = document.getElementById("modernViewBtn");

const studentViewBtn = document.getElementById("studentViewBtn");

if (modernViewBtn) {
    modernViewBtn.addEventListener("click", function (event) {
        event.preventDefault();

        console.log("🔬 Modern View button clicked");

        switchGraphView("modern");
    });
} else {
    console.error("❌ modernViewBtn was not found in HTML.");
}

if (studentViewBtn) {
    studentViewBtn.addEventListener("click", function (event) {
        event.preventDefault();

        console.log("📚 Student View button clicked");

        switchGraphView("student");
    });
} else {
    console.error("❌ studentViewBtn was not found in HTML.");
}
/* =========================================================
       HTML ESCAPING
    ========================================================== */

function escapeHtml(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

/* =========================================================
       DATABASE SETUP HELPER
       ==========================================================

       This creates a small visual reminder only if Supabase
       credentials are supplied but the table cannot be reached.
    ========================================================== */

function initializeSupabaseStatus() {
    if (!supabaseClient) {
        syncStatus.textContent = "LOCAL";
        return;
    }

    syncStatus.textContent = "CONNECTING";
    syncStatus.style.color = "#e5c77a";
}

/* =========================================================
       INITIALIZATION
    ========================================================== */

async function initialize() {
    renderAll();
    updateProfileUI();

    cy.ready(() => {
        cy.fit(undefined, 65);
    });

    initializeSupabaseStatus();

    if (!profile) {
        showProfileModal();
    } else {
        // Make sure older profiles receive membership data
        ensureMembershipProfile();

        // Update last visit
        profile.lastVisit = new Date().toISOString();

        localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));

        // Check membership milestones
        checkMembershipBadges();

        await syncProfile();
    }

    if (supabaseClient) {
        startRealtimeLeaderboard();
        await loadLeaderboard();
    } else {
        renderOfflineLeaderboard();
    }
}

initialize();
