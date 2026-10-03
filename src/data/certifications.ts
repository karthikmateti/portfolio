export type CertificateCategory = 'Hackathon' | 'Competition' | 'AI/ML' | 'Course' | 'Professional' | 'Job Simulation'
export type Certification = {
  id: string; title: string; issuer: string; date: string; category: CertificateCategory; group?: string
  variants?: { title: string }[]; featured?: boolean; highlight?: string
}

export const certifications: Certification[] = [
  { id: 'adobe-hack', title: 'Adobe India Hackathon', issuer: 'Adobe', date: 'August 2026', category: 'Hackathon', featured: true },
  { id: 'cloud-ai-challenge', title: 'National Cloud & AI Innovation Challenge', issuer: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH)', date: 'August 2026', category: 'Hackathon' },
  { id: '3svk-one', title: '3SVK Season -1', issuer: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH)', date: 'August 2026', category: 'Hackathon' },
  { id: '3svk-two', title: '3SVK season-2', issuer: 'Jawaharlal Nehru Technological University Hyderabad (JNTUH)', date: 'August 2026', category: 'Hackathon' },
  { id: 'vibe2ship', title: 'VIbe2Ship', issuer: 'Google for Developers', date: 'July 2026', category: 'Hackathon' },
  { id: 'quizcred', title: 'QuizCred BuildFest', issuer: 'QuizCred', date: 'July 2026', category: 'Competition' },
  { id: 'codequest', title: 'Bharat Academix CodeQuest', issuer: 'Bharat Academix', date: 'July 2026', category: 'Competition' },
  { id: 'devfusion', title: 'DevFusion IIT Bombay Hackathon', issuer: 'Indian Institute of Technology, Bombay', date: 'June 2026', category: 'Hackathon', featured: true, variants: [{ title: 'DevFusion Round 1' }, { title: 'DevFusion Round 2' }, { title: 'DevFusion Round 3' }] },
  { id: 'bounty-quest', title: 'Bounty Quest - 2026 National Institute of Technology (NIT), Tiruchirappalli', issuer: 'National Institute of Technology Tiruchirappalli', date: 'February 2026', category: 'Hackathon' },
  { id: 'idea-sprint', title: 'Idea Sprint - Indian Institute of Technology (IIT), Tirupati', issuer: 'E-CELL IIT TIRUPATI', date: 'February 2026', category: 'Hackathon' },
  { id: 'execute', title: "Execute 5.0 E-Summit'26 - Delhi Technological University (DTU), New Delhi", issuer: 'Delhi Technological University, New Delhi', date: 'February 2026', category: 'Hackathon' },
  { id: 'convolve', title: 'Convolve 4.0 - A Pan-IIT AI/ML Hackathon', issuer: 'IIT Guwahati', date: 'February 2026', category: 'Hackathon', featured: true, highlight: 'Semi-Finalist', variants: [{ title: 'Convolve 4.0 Semi-Finalist' }, { title: 'Convolve 4.0 Participation' }] },
  { id: 'iaeng', title: 'International Association of Engineers', issuer: 'International Association of Engineers (IAENG)', date: 'July 2026', category: 'Professional', variants: [{ title: 'IAENG Membership 1' }, { title: 'IAENG Membership 2' }] },
  { id: 'cpp', title: 'Problem Solving Through C++ Programming', issuer: 'Indian Institute of Technology, Bombay', date: 'June 2026', category: 'Course' },
  { id: 'sparq', title: 'ISI SPARQ Senior Category Top 20', issuer: 'Indian Statistical Institute, Kolkata', date: 'February 2026', category: 'Competition', featured: true, highlight: 'Top 20' },
  { id: 'genai-sim', title: 'GenAI Powered Data Analytics Job Simulation', issuer: 'Tata Group', date: 'July 2025', category: 'Job Simulation' },
  ...[
    'Introduction to Artificial Intelligence', 'Introduction to Data Science', 'Artificial Intelligence', 'Introduction to Deep Learning',
    'Artificial Intelligence Primer Certification', 'Agile Scrum in Practice', 'OpenAI Generative Pre-trained Transformer 3 (GPT-3) for developers',
    'Generative models for developers', 'Prompt Engineering', 'Introduction to Natural Language Processing', 'High Impact Presentations',
    'Principles of Generative AI Certification', 'Introduction to Robotic Process Automation', 'Deep Learning for Developers',
    'Time Management', 'Introduction to OpenAI GPT Models', 'Computer Vision', 'Email Writing Skills',
  ].map((title, index) => ({ id: `infosys-${index + 1}`, title, issuer: 'Infosys Springboard', date: 'June 2025', category: 'Course' as const, group: 'Infosys Springboard' })),
]

export const certificationFilters = ['All', 'Hackathon', 'Competition', 'AI/ML', 'Course', 'Professional', 'Job Simulation'] as const
