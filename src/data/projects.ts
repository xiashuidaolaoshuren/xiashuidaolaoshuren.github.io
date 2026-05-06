export type ProjectStatus = "Completed" | "In Progress" | "Maintainance";

/** Screenshot or diagram: `src` is under `public/` (e.g. `/images/…`). */
export type ProjectEvidenceImage = {
  kind?: "image";
  src: string;
  alt: string;
  caption?: string;
};

/** Self-hosted file video under `public/videos/…`. */
export type ProjectEvidenceVideo = {
  kind: "video";
  src: string;
  alt: string;
  caption?: string;
  /** Still shown before playback */
  poster?: string;
};

/**
 * Embedded YouTube player (use **Unlisted** visibility for portfolio embeds; **Private** blocks most viewers).
 * Set `youtubeId` to the 11-character id from `youtube.com/watch?v=…`.
 */
export type ProjectEvidenceYoutube = {
  kind: "youtube";
  youtubeId: string;
  alt: string;
  caption?: string;
};

export type ProjectEvidence =
  | ProjectEvidenceImage
  | ProjectEvidenceVideo
  | ProjectEvidenceYoutube;

/** Optional benchmark block for project detail (e.g. metrics by category). */
export interface BenchmarkSeries {
  name: string;
  values: number[];
}

export interface ProjectBenchmark {
  metricLabel: string;
  categories: string[];
  series: BenchmarkSeries[];
  /** Context shown under the legend; omit to hide. */
  footnote?: string;
  /** Table column header for the row axis. Defaults to "Category". */
  rowHeader?: string;
  /**
   * Upper bound for bar height scaling. Default `1` (e.g. CSR in [0, 1]).
   * Use `100` when values are percentages like 93.82.
   */
  maxScale?: number;
}

export interface ProjectItem {
  id: string;
  title: string;
  status: ProjectStatus;
  image?: string;
  /** Short text used on listing cards */
  summary: string;
  /** Intro paragraph on the detail page */
  overview: string;
  problem: string;
  approach: string;
  features: string[];
  results: string;
  evidence?: ProjectEvidence[];
  repoUrl: string;
  techStack?: string[];
  /** Benchmark charts in display order (omit when none). */
  benchmarks?: ProjectBenchmark[];
}

export const PROJECTS: ProjectItem[] = [
  {
    id: "llm-hallucination-fyp",
    title: "LLM Hallucination Mitigation (Final Year Project)",
    status: "Completed",
    image: "/images/fyp.jpg",
    summary:
      "A Generator–Retriever–Verifier–Mitigator pipeline for citation-grounded RAG that fuses trainless zero-shot signals—token entropy, retrieval-grounded heuristics, DeBERTa-v3 NLI, and self-agreement—with rule-based aggregation and mitigation (re-rank, re-prompt, filter), evaluated on RAGTruth and CiteBench-style citation workflows.",
    overview:
      "Large language models can sound authoritative while drifting from retrieved evidence. For my final-year project I built an end-to-end, lightweight framework focused on hallucination detection and mitigation around citations—without training a massive LLM-as-a-judge. The design chains hybrid retrieval over Wikipedia, generation with harvested logits, atomic claim extraction, a transparent multi-signal verifier hub, and a mitigation orchestrator that can re-rank evidence, inject verifier critiques into a conservative second-pass generation, or surgically remove contradictory spans. The stack stays modular and reproducible on open-weight models so I could reason about recall-heavy safety defaults versus fluency.",
    problem:
      "In RAG settings, models often interpolate or embellish beyond what passages support; fluent hallucinations erode trust and are costly to catch with opaque judges or bespoke fine-tuned detectors. I needed verification that is interpretable, train-light, and biased toward catching false negatives—letting a wrong claim through is usually worse than over-flagging—while still grounding decisions in evidence and internal uncertainty rather than single black-box scores.",
    approach:
      "I ingest a curated Wikipedia subset with spaCy-based chunking and dual indices: dense vectors from sentence-transformers (all-MiniLM-L6-v2) in a FAISS IndexFlatIP index and a BM25Okapi sparse index. Hybrid retrieval fuses ranks with reciprocal rank fusion before conditioning generation. The generator (Qwen3-4B-Instruct in 8-bit) runs with output_scores enabled so I can align character spans to subword tokens and compute mean Shannon entropy over decoding distributions as an intrinsic uncertainty signal. spaCy fragments outputs into atomic claims paired with evidence candidates. The verifier hub scores each pair with retrieval-grounded heuristics (NER anchors, numeric coverage, ROUGE-L-style overlap), zero-shot NLI via a DeBERTa-v3 cross-encoder (contradiction acts as a hierarchical veto), and self-agreement from high-temperature resamples with semantic clustering. A rule-based aggregator normalizes heterogeneous signals and issues Supported, Contradictory, or Low Confidence verdicts. The mitigation router selects actions by aggregate contradiction and low-confidence ratios across goals (balanced, accuracy-focused, attribution-safety): verifier-informed evidence re-ranking, critique-driven re-prompting at lower temperature, and reverse-order span filtering for stubborn contradictions. I shipped Gradio demos—a sentence-highlight Confidence UI and a three-stage controlled pipeline—for inspection alongside benchmarks on RAGTruth factuality and CiteBench/CiteEval-style citation mitigation.",
    features: [
      "Hybrid dense + sparse retrieval (FAISS + BM25Okapi) with reciprocal rank fusion over embedded Wikipedia chunks",
      "Generator wrapper harvesting logits, token probabilities, and per-token entropy for claim-aligned intrinsic uncertainty",
      "Atomic claim extraction with spaCy dependency parsing, sentence boundaries, and ClaimEvidencePair wiring",
      "Retrieval-grounded heuristics: multi-tier entity matching, numeric anchors, and structural lexical overlap (ROUGE-L)",
      "Zero-shot NLI with MoritzLaurer/DeBERTa-v3-large-mnli-fever-anli-ling-wanli as entailment/contradiction/neutral scorer",
      "Self-agreement via stochastic sampling, semantic clustering, and majority-style support checks",
      "Rule-based aggregation with normalization, safety-first veto logic, and configurable thresholds in YAML-style configs",
      "Mitigation orchestrator: goal-oriented policy routing, retrieval re-ranking fused with verification signals, critique injection re-prompting, and span-preserving contradictory claim filtering",
      "Evaluation split across RAGTruth (claim-level detection against annotations) and CiteBench workflows with deterministic filtering for signal isolation",
      "Gradio Confidence UI (green/red/yellow highlights) and Controlled Pipeline UI (generate → verify → mitigate) inspired by transparent detector tooling",
      "Open-weight stack: PyTorch, Hugging Face Transformers, Sentence-Transformers; Qwen3-4B-Instruct generator; external CiteEval oracle calls per report configuration",
    ],
    results:
      "On RAGTruth, our full trainless verifier traded some overall F1 versus the fine-tuned LettuceDetect baseline but pushed recall to about 0.82 with a deliberate false-negative-minimization stance—184 false negatives versus 576 false positives in the reported aggregate table, reflecting a safety-first preference for surfacing risky claims. NLI drove most detections; lexical grounding acted as a precision guard that cut false positives substantially versus NLI alone with only a handful of lost true positives. Intrinsic entropy and self-agreement did not fire standalone detection paths in our setup; they mainly calibrated confidence inside the ensemble. Task splits were revealing: structured Data2txt favored both pipelines; short QA answers stressed NLI and inflated false positives for our stack; long-form Summary benefited from multi-path aggregation where our full verifier exceeded the baseline F1 by leaning on recall-heavy contradiction and low-confidence coverage routes. On the mitigation side, NLI-guided filtering and re-prompting improved structural citation quality in the CiteEval-family workflow described in the report. The main lesson is that modular, interpretable trainless checks can mirror strong recall-focused auditing, but domain length, claim granularity, and evidence alignment remain the hard limits—future work would tighten QA precision and extend richer citation actuators without blowing up generation variance.",
    evidence: [
      {
        src: "/images/fyp.jpg",
        alt: "Gradio pipeline demonstration interface for the hallucination mitigation system",
        caption:
          "Pipeline demonstration UI: interactive Gradio workflow for generation, verification signals, and mitigation.",
      },
      {
        kind: "youtube",
        youtubeId: "3ulh_HrPxns",
        alt: "Demo video of the hallucination mitigation system",
        caption:
          "Demo video of the hallucination detection and mitigation system.",
      },
    ],
    repoUrl: "https://github.com/xiashuidaolaoshuren/AIST-FYP",
    techStack: [
      "Python",
      "PyTorch",
      "Transformers",
      "Qwen3",
      "DeBERTa-v3",
      "FAISS",
      "BM25",
      "spaCy",
      "Gradio",
      "RAG",
      "NLI",
    ],
    benchmarks: [
      {
        metricLabel: "RAGTruth detection F1 (by task)",
        rowHeader: "Task",
        footnote:
          "F1 scores: full_verifier is the multi-signal trainless ensemble; LettuceDetect is the fine-tuned baseline. Variant-only ablations are omitted here.",
        categories: ["Overall", "Data2txt", "QA", "Summary"],
        series: [
          {
            name: "full_verifier",
            values: [0.6875, 0.821, 0.5333, 0.5361],
          },
          {
            name: "LettuceDetect (baseline)",
            values: [0.7607, 0.8789, 0.6552, 0.5052],
          },
        ],
      },
      {
        metricLabel: "CiteBench — citation quality (normalized %)",
        rowHeader: "Metric",
        maxScale: 100,
        footnote:
          "Normalized to 0–100% for one chart: CE mean sentence rating as (score ÷ 5) × 100; CR IterCoE and CR EditDist as score × 100. Raw CiteEval scales are in the AIST-4999 report (Table 8, §6.3.2). ASQA-oracle / CiteBench, 316 queries; full_verifier + filter vs LettuceDetect baseline.",
        categories: [
          "CE mean sentence rating",
          "CR IterCoE (answer)",
          "CR EditDist (answer)",
        ],
        series: [
          {
            name: "full_verifier + filter",
            values: [55.01, 57.98, 78.49],
          },
          {
            name: "LettuceDetect (baseline)",
            values: [34.06, 92.41, 93.64],
          },
        ],
      },
      {
        metricLabel: "CiteBench — mitigation actuators (normalized %)",
        rowHeader: "Metric",
        maxScale: 100,
        footnote:
          "From Table 14 (§6.3.5), comparing filter-only baseline to the full mitigation stack: statement rating, density, and CA retrieval ratio × 100; CE mean sentence rating as (score ÷ 5) × 100; CR IterCoE and CR EditDist (answer) × 100. Per-actuator ablations (filter / rerank / reprompt only) are omitted here.",
        categories: [
          "Statement",
          "Density",
          "CA retrieval",
          "CE mean",
          "CR IterCoE",
          "CR EditDist",
        ],
        series: [
          {
            name: "full_verifier_filter (baseline)",
            values: [59.34, 82.9, 86.93, 55.01, 57.98, 78.49],
          },
          {
            name: "mitigation_all",
            values: [81.58, 87.88, 86.66, 80.8, 78.24, 84.57],
          },
        ],
      },
    ],
  },
  {
    id: "allergy-guard",
    title: "AllergyGuard",
    status: "Completed",
    image: "/images/allergy_guard-1.png",
    summary:
      "A native Android app that uses CameraX live scanning with ML Kit on-device text recognition and translation, length-aware fuzzy allergen matching against Room-backed profiles and synonyms, plus scan history with Maps-backed location context and offline-first translation models.",
    overview:
      "AllergyGuard helps people interpret ingredient lists and menus when wording, language, or layout gets in the way—especially while traveling. I built it as a native Kotlin app using MVVM so UI, state, and data stay separated. The core loop captures camera frames, recognizes multi-script text with ML Kit, optionally translates non-English content into English for matching, then highlights likely allergens with immediate on-screen feedback—all without sending frames to my own backend, which was an intentional privacy and reliability choice over a thin-client architecture.",
    problem:
      "Food text arrives in small type, stylized fonts, glare, or languages the user does not read fluently. OCR output is noisy; aligning ML Kit bounding boxes with a live CameraX preview requires correct handling of resolution mismatch, fill modes, rotation, and mirrored front cameras. Real-time fuzzy matching on every frame can stall the UI or the preview if not throttled and offloaded. Users still expect responsive scans, trustworthy alerts, and persistent preferences—without leaking imagery to the cloud.",
    approach:
      "I structured the app around MVVM with XML layouts and ViewBinding. The home hub uses Material cards on a constraint-based grid with lightweight entrance motion; navigation uses explicit intents so CameraX preview initialization stays predictable. In the scan flow, CameraX feeds ImageAnalysis with a keep-latest strategy on a dedicated executor; ML Kit Text Recognition extracts blocks and lines, and when text is not English I chain ML Kit language identification and translation so matching logic stays English-centric. Strings pass normalization and CJK-oriented substitutions, then frame- and block-level fuzzy checks against enabled allergens using Levenshtein-style distance with length-dependent thresholds, combining a large built-in synonym map with user aliases stored in Room. A CoordinateTransformer maps OCR coordinates through scale, offset, rotation, and mirror correction onto a custom overlay that pulses red or green. The allergy manager screen persists selections and custom entries via Room with Flow-driven UI updates and a RecyclerView ListAdapter with DiffUtil. Saved scans record text, timestamps, allergen flags, and optional fused-location fixes reverse-geocoded for addresses; history can open Google Maps with markers for notable encounters. Settings orchestrate offline translation model downloads through a TranslationManager, with Wi-Fi-aware connectivity prompts for batch caching. I also wired boot-time reminders and structured notification channels, deferring Android 13+ notification permission prompts until after first paint to avoid startup friction.",
    features: [
      "MVVM with Kotlin, XML, ViewBinding, and Material card-based home navigation without transitions that break CameraX preview",
      "CameraX PreviewView plus ImageAnalysis (keep-latest) on a dedicated executor for stable live capture",
      "ML Kit on-device text recognition across multiple scripts and ML Kit language ID plus translation toward English before allergen matching",
      "Pipeline: OCR blocks → translate if needed → normalization and CJK substitutions → fuzzy Levenshtein matching with length-aware distance limits",
      "200+ built-in allergen synonyms plus user-defined aliases persisted in Room",
      "CoordinateTransformer plus overlay rendering for aligned bounding boxes under FILL_CENTER, rotation, and front-camera mirror",
      "Room database with seeded allergens, reactive Flow collections in ViewModels, and ListAdapter/DiffUtil for efficient lists",
      "Scan history with manual save cooldown, optional fused location, geocoded addresses, and Google Maps markers for saved encounters",
      "TranslationManager and Wi-Fi-aware prompts to cache offline translation models for travel without roaming",
      "BootReceiver engagement reminders, notification channels, and deferred POST_NOTIFICATIONS handling on API 33+",
      "Targets modern SDKs with Google Play Services where needed (Maps, location, ML Kit); Maps API key supplied via local.properties for builds",
    ],
    results:
      "The hardest engineering work was geometric: mapping ML Kit boxes from sensor space to the on-screen preview reliably across rotations and mirror modes. Close behind was performance—running OCR and fuzzy logic on every frame overloaded the device until I throttled analysis frames and pushed heavy work onto background dispatchers away from the main thread. Tuning fuzzy thresholds against real OCR noise took iteration to limit false positives without missing genuine allergens. Relative to the course proposal, I delivered profile management, smart scan, detection, visual alerts, and history with maps; I also extended scope with on-device translation, connectivity-aware model downloads, and broadcast-based reminders—reflecting a deliberate offline-first posture. Future work might explore richer ingredient reasoning or tighter latency, but the shipping app already encodes what I learned about balancing UX, privacy, and systems constraints on Android.",
    evidence: [
      {
        src: "/images/allergy_guard-1.png",
        alt: "AllergyGuard home dashboard with navigation cards",
        caption:
          "Home hub: Material cards for scan, allergy profile, history, and settings.",
      },
      {
        src: "/images/allergy_guard-2.png",
        alt: "AllergyGuard scan flow with camera preview and allergen detection",
        caption:
          "Scan flow: CameraX preview with ML Kit text recognition and allergen detection.",
      },
      {
        src: "/images/allergy_guard-3.png",
        alt: "AllergyGuard allergy profile management with room database",
        caption:
          "Allergy profile management: Room database with seeded allergens and user-defined aliases.",
      },
      {
        kind: "youtube",
        youtubeId: "DGYQ5pnJFo8",
        alt: "AllergyGuard demo video",
        caption:
          "AllergyGuard demo video.",
      }
    ],
    repoUrl: "https://github.com/xiashuidaolaoshuren/allergy_guard",
    techStack: [
      "Kotlin",
      "Android",
      "CameraX",
      "ML Kit",
      "Room",
      "Google Maps",
      "Material Design",
      "Coroutines",
    ],
  },
  {
    id: "gta-v-alpr",
    title: "GTA V ALPR",
    status: "Completed",
    image: "/images/gta_v_alpr-1.jpg",
    summary:
      "A real-time ALPR stack on GTA V gameplay video—YOLOv8 plate detection fine-tuned on my in-domain annotations, PaddleOCR recognition, ByteTrack tracking, and a Streamlit GUI—with clear gains from synthetic-data fine-tuning over a real-world pretrained baseline.",
    overview:
      "I developed and evaluated an Automatic License Plate Recognition system aimed at Grand Theft Auto V footage as a controlled stand-in for urban traffic: stylized rendering, full day–night and weather variation, and repeatable capture make the game a practical sandbox for perception experiments and for thinking about sim-to-real transfer. The design is a modular two-stage pipeline—detect plates, read characters—extended with tracking so OCR is not rerun blindly every frame, wrapped in a Streamlit interface for demos. Conceptually the work sits alongside industry use of large-scale simulation; here the contribution is an end-to-end student-scale pipeline with rigorous annotation and before/after detection metrics on my own GTA V dataset.",
    problem:
      "Real-world ALPR models expect photographic plates and lighting; GTA V’s textures, fonts, and color grading create a domain shift, so a detector pretrained only on real plates misses or mis-localizes plates despite looking ‘photo-realistic.’ Plates also vary in scale, motion blur, occlusion, and visibility across clear, rainy, and night scenes. I needed a pipeline that could localize plates reliably, associate tracks across frames under compute constraints, feed stable crops to OCR, and enforce San Andreas–style plate formatting—while keeping configuration and iteration manageable for coursework.",
    approach:
      "I captured gameplay with OBS Studio at 1080p and 60 FPS, curated roughly 1,200 frames, and annotated plates in Label Studio with YOLO-oriented boxes and a mandatory readability tag (clear, blurred, or occluded). That split let me train detection on all visible plates while exporting high-quality crops only from clear boxes for OCR-style supervision. I converted exports to YOLO labels with a small Python tool, fine-tuned an Ultralytics YOLOv8 detector initialized from a real-world Hugging Face baseline (zero-shot on GTA V exposed the gap), and continued training through longer schedules (including an early ~10-epoch checkpoint with strong precision on validation). For recognition I preprocess crops—perspective correction when needed, grayscale, resize, CLAHE—and run PaddleOCR’s English model without an extra fine-tune in this phase, then filter candidates with GTA V’s plate pattern and a confidence × geometry scoring rule. ByteTrack maintains identities across frames so tracking amortizes OCR cost and stabilizes reads. Parameters live in a centralized pipeline_config.yaml, and I packaged exploration into a Streamlit GUI (upload, overlays, thresholds, device choice, logs). Where deployment mattered, I compared YOLOv8n against YOLOv8m and kept the nano variant for better FPS and footprint alongside the full stack.",
    features: [
      "Gameplay capture with OBS Studio at 1080p / 60 FPS and a ~1,200-frame working set for training and evaluation",
      "Label Studio workflows with YOLO boxes plus readability labels (clear / blurred / occluded) to derive both detection and OCR-oriented datasets",
      "YOLOv8 detection: real-world pretrained baseline vs models fine-tuned on annotated GTA V footage (reported overall detection rate ~77.5% → ~93.8%, average confidence ~0.63 → ~0.87)",
      "OCR path with crop preprocessing (perspective, grayscale, resize, CLAHE) and PaddleOCR recognition with regex and scored candidate selection for GTA plate text",
      "ByteTrack tracking integrated with detections to reduce redundant OCR and smooth outputs across frames",
      "Centralized configuration via pipeline_config.yaml for reproducible experiments",
      "Streamlit GUI: video upload, overlaid boxes and reads, progress, confidence/IOU sliders, CUDA/CPU selection, counters and diagnostics",
      "Deployment-oriented comparison favoring YOLOv8n over YOLOv8m for inference speed and model size on a modest fine-tuning set while retaining strong mAP",
    ],
    results:
      "The quantitative story reinforced one lesson above all: domain matters as much as architecture. Fine-tuning on my GTA V annotations lifted aggregate detection performance well beyond the zero-shot real-world baseline—in my reported evaluation, overall detection rate moved from about 77.5% to about 93.8% with mean confidence rising from roughly 0.63 to 0.87, and difficult slices such as night rain improved sharply compared with the baseline. That aligns with the report’s broader point about synthetic environments as data engines, but also shows that generic sim imagery still requires in-domain labels. Choosing YOLOv8n traded a modest mAP bump from the medium variant for throughput and memory headroom once OCR and tracking sit beside detection—an engineering trade I expect to revisit if the dataset grows. OCR behaved well qualitatively when crops were good; most end-to-end friction traced back to detection quality. Rigorous character-error metrics and fuller tracking evaluation remain natural next steps, but the project already gave me a disciplined loop from capture and annotation through deployment-minded benchmarking.",
    evidence: [
      {
        src: "/images/gta_v_alpr-1.jpg",
        alt: "GTA V ALPR pipeline showing detections and recognized plate text",
        caption:
          "Pipeline output with detected plates and OCR overlays.",
      },
      {
        src: "/images/gta_v_alpr-2.jpg",
        alt: "Streamlit GUI: video upload, overlaid boxes and reads, progress and config settings.",
        caption:
          "Streamlit GUI: video upload, overlaid boxes and reads, progress and config settings. ",
      },
      {
        // Paste the 11-character id from youtube.com/watch?v=… (Unlisted recommended for embeds).
        kind: "youtube",
        youtubeId: "nphb_grmfqQ",
        alt: "Demo video of the GTA V ALPR pipeline.",
        caption: "Demo video of the GTA V ALPR pipeline.",
      },
    ],
    repoUrl: "https://github.com/xiashuidaolaoshuren/ALPR_GTAV",
    techStack: [
      "Python",
      "PyTorch",
      "Ultralytics YOLOv8",
      "PaddleOCR",
      "ByteTrack",
      "Streamlit",
    ],
    benchmarks: [
      {
        metricLabel: "Detection rate (%) by condition",
        maxScale: 100,
        rowHeader: "Condition",
        footnote:
          "Values from the AIST4010 final report (§4.3): baseline is zero-shot performance of the real-world pretrained detector on the GTA V evaluation split; fine-tuned uses in-domain annotated gameplay.",
        categories: [
          "Overall",
          "Day / Clear",
          "Day / Rain",
          "Night / Clear",
          "Night / Rain",
        ],
        series: [
          {
            name: "Baseline",
            values: [77.53, 79.41, 89.47, 76.0, 70.73],
          },
          {
            name: "Fine-tuned",
            values: [93.82, 91.18, 100.0, 96.0, 92.68],
          },
        ],
      },
    ],
  },
  {
    id: "automatic-chord-recognition",
    title: "Audio Chord Estimation",
    status: "Completed",
    image: "/images/chord_recognition-1.png",
    summary:
      "MIREX 2024–style audio chord estimation simplified to chord roots: chromagram features from Beatles, Queen, and Carole King material with Isophonics annotations, comparing Random Forest to a BiLSTM.",
    overview:
      "Audio chord estimation segments a recording and assigns a chord label to each interval—a core Music Information Retrieval (MIR) task with applications in analysis, recommendation, and transcription. This project follows the MIREX 2024 Audio Chord Estimation problem statement but limits recognition to chord roots only (no official MIREX packaging). Tracks are drawn from commercial albums; chord intervals reference Isophonics-style ground truth, projected to roots for training and evaluation. A detector-style workflow loads audio, extracts features, trains or applies either a Random Forest or a BiLSTM, and scores predictions with Chord Symbol Recall (CSR) alongside accuracy.",
    problem:
      "Estimation must stay robust to instrumentation, mix, and residual vocals after separation. Chromagram frames exhibit repetitive temporal structure that frame-wise classifiers can misread. Labels must be aligned in time with dense features, then simplified from full chord symbols to roots. The chosen corpus is weighted toward The Beatles, which biases cross-album generalization; expanding diverse, legally sourced audio remains a practical constraint.",
    approach:
      "End-to-end pipeline: load MP3 with librosa, apply vocal reduction, compute CQT-based chromagrams (including librosa.features.chroma_cqt), align each frame with Isophonics interval annotations, collapse labels to chord roots, and save preprocessed training packs as CSV. Two supervised models are compared: a scikit-learn Random Forest (n_estimators=10, max_depth=10, max_features=\"log2\", random_state=42) and a PyTorch BiLSTM that performed best in tuning with learning rate 0.1, hidden dimension 128, three layers, batch size 8, and bidirectional recurrence. Models are evaluated with accuracy and CSR, including per-album CSR for the Beatles, Queen, and Carole King splits referenced in the coursework report.",
    features: [
      "Root-only labels derived from full chord strings in timed annotation files",
      "Vocal attenuation plus chromagram / CQT feature extraction for frame-level inputs",
      "Random Forest baseline with fixed hyperparameters for reproducible comparison",
      "BiLSTM sequence model with tuned PyTorch settings (lr 0.1, hidden 128, 3 layers, batch 8, bidirectional)",
      "CSV export of processed features and labels for repeatable training",
      "CSR and accuracy reporting with album-wise breakdowns",
    ],
    results:
      "Album-wise numbers are in the CSR chart and table in the section titled “Chord Symbol Recall (CSR) by album”—what follows is reflection, not repeated scores. This was my first deep learning project and the first time I owned an end-to-end pipeline—from audio ingestion and labeling through training to CSR evaluation—which gave me a repeatable workflow I can build on; I consider that hands-on arc a strong foundation for continuing toward an AI-focused career. Technically, I learned that chord estimation is as much a temporal problem as a spectral one: a Random Forest is a useful baseline on isolated frames, but harmony unfolds over time, and a BiLSTM’s memory across chromagram frames better matches that structure. Implementing the BiLSTM introduced PyTorch datasets, dataloaders, and tuning in practice, which made the gap between frame-wise and sequence models tangible. Preprocessing sets much of the ceiling—residual vocals and noise limit CSR even when the architecture is reasonable—which pushed iterative vocal/noise handling after an earlier demo. On data, a Beatles-heavy corpus skews generalization; widening coverage mostly hits licensing and sourcing constraints, not just code. Richer chord representations (e.g. Harte-style ideas) were out of scope so the pipeline stayed understandable and shippable within the course timeline.",
    evidence: [
      {
        src: "/images/chord_recognition-1.png",
        alt: "Chord estimation project visualization",
        caption:
          "A chromagram from a section of the dataset audio.",
      },
      {
        src: "/images/chord_recognition-2.png",
        alt: "Chord Estimation Procedure",
        caption:
          "Chord Estimation Procedure.",
      },
      {
        src: "/images/chord_recognition-3.png",
        alt: "Sample Chord Estimation Results",
        caption:
          "Sample Chord Estimation Results.",
      },
    ],
    repoUrl: "https://github.com/xiashuidaolaoshuren/AIST3110_Proj",
    techStack: [
      "Python",
      "NumPy",
      "Pandas",
      "Librosa",
      "scikit-learn",
      "PyTorch",
      "BiLSTM",
    ],
    benchmarks: [
      {
        metricLabel: "Chord Symbol Recall (CSR) by album",
        rowHeader: "Album",
        footnote:
          "Values are from the AIST3110 coursework report; axis labels abbreviate the source albums.",
        categories: [
          "Please Please Me",
          "With the Beatles",
          "Queen Hits I",
          "Tapestry",
        ],
        series: [
          {
            name: "Random Forest",
            values: [0.44, 0.49, 0.4, 0.4],
          },
          {
            name: "BiLSTM",
            values: [0.8, 0.8, 0.72, 0.69],
          },
        ],
      },
    ],
  },
  {
    id: "hand-gesture-music-controller",
    title: "Sound Synthesis Using Computer Vision",
    status: "Completed",
    image: "/images/hand_gesture-1.jpg",
    summary:
      "Group project: we train a hand-gesture recognizer in Python (MediaPipe landmarks, scikit-learn, Joblib), stream parameters over OSC, and drive real-time synthesis in SuperCollider—including continuous pitch, discrete MIDI-style notes, and a layered composing mode.",
    overview:
      "As a group project for AIST2010: Introduction to Computer Music, we built a program that couples computer vision with SuperCollider so performers can shape sound without a conventional controller. Python handles capture, landmark extraction, gesture classification, and OSC messaging; SuperCollider handles real-time instruments and buffers. The system offers three modes: continuous frequency control, discrete MIDI-note mapping (pitch classes tied to the same hand pose), and a composing mode where short recordings are stacked and looped. We were motivated by expressive hardware-software hybrids such as ROLI Airwave and browser-scale instruments like Google’s Instrument Playground—our aim was to explore the same “gesture as instrument” idea with a stack we could fully program ourselves.",
    problem:
      "Gesture-driven music needs stable perception in live video, a clear mapping from body state to musical parameters, and a low-latency path into an audio engine. We had to choose landmark features that survive jitter, turn them into reliable gesture labels, and translate continuous hand motion—especially vertical position—into pitch while still supporting discrete note choices and a separate performance mode for layering ideas. Bridging two runtimes (Python and SuperCollider) adds integration risk: OSC must stay predictable so synthesis never falls out of sync with vision.",
    approach:
      "We capture frames with OpenCV, detect hands with MediaPipe’s 21-point model, record landmark coordinates for each gesture class, and train a supervised scikit-learn classifier; the serialized model is loaded at runtime with Joblib (the coursework submission emphasized the deployed pipeline rather than shipping training scripts). Recognized gestures and geometry feed a Python OSC client to localhost SuperCollider servers that implement our synths and buffers. For pitch, we track the metacarpophalangeal (MCP) joint of the middle finger so vertical motion maps cleanly while an open palm plays and a closed palm effectively mutes by sending near-zero frequency. Continuous mode drives oscillators directly; sampled material such as our hand-flute-style instrument shifts perceived pitch by adjusting playback rate after we measured source pitch with Sonic Visualiser. Discrete mode maps height to MIDI-style note indices using the usual twelve-tone frequency relationship. Composing mode layers recordings on a stack-inspired structure in SuperCollider until a fist gesture triggers the stop logic described in our report.",
    features: [
      "Three modes: continuous frequency, discrete MIDI-note pitch selection, and composing with stacked / looped recordings",
      "Gesture pipeline: MediaPipe landmarks → labeled dataset → scikit-learn classifier → Joblib-loaded model at inference time",
      "Pitch and mute mapping using the middle-finger MCP joint’s vertical position; closed palm silences output",
      "OSC over localhost between Python and SuperCollider for parameter updates",
      "SuperCollider synthesis paths including sine-based generators and sampled instruments controlled via playback rate",
      "Composing mode with buffer stacking and a fist gesture to stop playback per our SuperCollider design",
      "GUI for choosing modes and instruments during performance (shared implementation across the group)",
    ],
    results:
      "This was my first project involving machine learning and computer vision. My group shipped an end-to-end demo loop that proved gesture recognition can steer serious sound design. Along the way we deepened our applied computer vision practice—landmarks, labeling discipline, and deploying a sklearn model—and contrasted that with building expressive SuperCollider instruments rather than only editing audio offline. Wiring OSC forced us to think in contracts: which parameters cross the language boundary, and how often. Collaborating across CV, synthesis, and interface layers mirrored how interactive music projects tend to split expertise. More broadly, the project reinforced our belief that tightly integrating engineering and musicianship will keep shaping how people perform and prototype sound.",
    evidence: [
      {
        src: "/images/hand_gesture-1.jpg",
        alt: "Camera-driven hand gesture interaction with the music controller",
        caption:
          "Live capture path: hand pose from the camera feeds gesture logic before parameters reach SuperCollider.",
      },
      {
        src: "/images/hand_gesture-2.png",
        alt: "Mediapipe hand landmarks",
        caption:
          "Mediapipe hand landmarks.",
      },
    ],
    repoUrl: "https://github.com/xiashuidaolaoshuren/AIST_2010_Proj",
    techStack: [
      "Python",
      "OpenCV",
      "MediaPipe",
      "NumPy",
      "scikit-learn",
      "Joblib",
      "Python OSC",
      "SuperCollider",
    ],
  },
];

export function getProjectById(id: string): ProjectItem | undefined {
  return PROJECTS.find((p) => p.id === id);
}
