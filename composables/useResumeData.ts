export const useResumeData = () =>
  useAsyncData('resume', () => $fetch<ResumeData>('/api/resume'))

export interface ResumeHeader {
  name: string
  title: string
  email: string
  phone: string
  location: string
  linkedin: string
  github: string
}

export interface ResumeProject {
  name: string
  stack: string
  bullets: string[]
}

export interface ResumeJob {
  role: string
  company: string
  dates: string
  note: string
  projects: ResumeProject[]
}

export interface ResumeEducation {
  degree: string
  institution: string
  period: string
  description: string
  skills: string[]
  project: string
}

export interface ResumeCertification {
  title: string
  institution: string
  platform: string
}

export interface ResumeAchievement {
  title: string
  event: string
}

export interface ResumeAdditionalInfo {
  languages: string
  interests: string[]
}

export interface ResumeData {
  header: ResumeHeader
  summary: string
  coreSkills: string[]
  supportingSkills: string[]
  keyAchievements: string[]
  experience: ResumeJob[]
  education: ResumeEducation[]
  certifications: ResumeCertification[]
  achievements: ResumeAchievement[]
  additionalInfo: ResumeAdditionalInfo
}
