export type Project = { id: string; number: string; title: string; eyebrow: string; description: string; tags: string[]; repo?: string; certificate?: string; problem: string; approach: string[]; architecture: string[]; result?: string; }

export const projects: Project[] = [
  {
    id: 'privacy-publishing', number: '01', title: 'Privacy-Preserving Data Publishing', eyebrow: 'RESEARCH · IIIT PUNE',
    description: 'A privacy-preserving machine learning pipeline for publishing and modeling sensitive structured data while retaining analytical utility.',
    tags: ['Python', 'XGBoost', 'Federated Learning', 'k-Anonymity', 'l-Diversity', 'Differential Privacy'],
    repo: 'https://github.com/karthikmateti/Privacy-Detector', certificate: 'https://drive.google.com/file/d/1Q_qWM9o4Pq15AJGTIbwvJlbVrcxm8-Dq/view?usp=sharing',
    problem: 'Sensitive records can be useful for analysis while exposing personal information. The work examined ways to reduce disclosure risk without losing the signal needed by machine-learning workflows.',
    approach: ['Explore privacy-attribute detection with XGBoost.', 'Apply k-anonymity, l-diversity and differential privacy concepts to structured data.', 'Study federated learning and review the privacy/utility trade-offs in the literature.'],
    architecture: ['STRUCTURED DATA', 'PRIVACY ATTRIBUTE ANALYSIS', 'ANONYMIZATION / PRIVACY MECHANISMS', 'MODEL UTILITY REVIEW'],
  },
  {
    id: 'ai-hiring', number: '02', title: 'AI Hiring with LLMs', eyebrow: 'APPLIED AI · ISI KOLKATA',
    description: 'A multi-agent RAG framework that supports context-aware resume screening and explainable candidate evaluation.',
    tags: ['LLM', 'RAG', 'Multi-Agent Systems', 'Explainable AI', 'CareerCorpus', 'LangChain', 'CrewAI'],
    repo: 'https://github.com/karthikmateti/Multi-Agent-Resume-Hiring', certificate: 'https://drive.google.com/file/d/1Zwb8oNpk-I0eROqcF4OAOmL1IdmzLRzB/view?usp=sharing',
    problem: 'Candidate screening needs to connect evidence in resumes to role requirements and make the evaluation process easier to inspect.',
    approach: ['Use retrieval-augmented generation over candidate and role context.', 'Route work through specialist agents for resume understanding, skill matching, evaluation and orchestration.', 'Evaluate on CareerCorpus and compare with a single-LLM baseline using multiple metrics.'],
    architecture: ['RESUME + ROLE CONTEXT', 'RETRIEVAL', 'SPECIALIST LLM AGENTS', 'CANDIDATE EVALUATION', 'EVIDENCE-BASED OUTPUT'],
    result: 'Internship project assessment: 29/30 — Outstanding.',
  },
  {
    id: 'meeting-summarizer', number: '03', title: 'Live Meeting Summarizer', eyebrow: 'PRODUCT · INFOSYS SPRINGBOARD',
    description: 'A Streamlit meeting assistant combining speech-to-text, speaker diarization, NLP and LLM summarization.',
    tags: ['Whisper', 'Vosk', 'NLP', 'LLM', 'Streamlit', 'Hugging Face'],
    repo: 'https://github.com/karthikmateti/Infosys-Internship', certificate: 'https://drive.google.com/file/d/1NdIzCHgdfkWJAxpCirEfDY8U-zy2qZwR/view?usp=sharing',
    problem: 'Meeting recordings are difficult to revisit when decisions and action items are buried in long conversations.',
    approach: ['Transcribe audio with Whisper/Vosk and identify speakers.', 'Generate structured summaries using Hugging Face models and API-based inference.', 'Support meeting management, summary export and email delivery.'],
    architecture: ['MEETING AUDIO', 'TRANSCRIPTION + SPEAKER LABELS', 'NLP / LLM SUMMARY', 'STREAMLIT WORKSPACE', 'EXPORT + EMAIL'],
  },
]
