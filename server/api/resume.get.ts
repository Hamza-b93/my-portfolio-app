import { marked, type Token } from 'marked'
import { readFile } from 'fs/promises'
import { resolve } from 'path'

// Strip markdown syntax to plain text
function plain(text: string): string {
  return text
    .replace(/\*\*/g, '')
    .replace(/\*/g, '')
    .replace(/_/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .trim()
}

// Group all tokens into buckets by their parent ## section heading
function groupSections(tokens: Token[]): Record<string, Token[]> {
  const sections: Record<string, Token[]> = { header: [] }
  let current = 'header'
  for (const t of tokens) {
    if (t.type === 'heading' && (t as any).depth === 2) {
      current = (t as any).text.toLowerCase()
      sections[current] = []
    } else {
      sections[current].push(t)
    }
  }
  return sections
}

function parseHeader(tokens: Token[]) {
  const h = { name: '', title: '', email: '', phone: '', location: '', linkedin: '', github: '' }
  for (const t of tokens) {
    if (t.type === 'heading' && (t as any).depth === 1) {
      h.name = plain((t as any).text)
    } else if (t.type === 'paragraph') {
      const text: string = (t as any).text
      if (text.startsWith('**') && !text.includes('📧')) {
        h.title = plain(text)
      } else if (text.includes('📧')) {
        for (const line of text.split('\n')) {
          const l = line.trim()
          if (l.startsWith('📧')) h.email = l.replace('📧', '').trim()
          else if (l.startsWith('📱')) h.phone = l.replace('📱', '').trim()
          else if (l.startsWith('📍')) h.location = l.replace('📍', '').trim()
          else if (l.startsWith('🔗')) {
            const url = l.replace('🔗', '').trim()
            if (url.includes('linkedin')) h.linkedin = url
            else if (url.includes('github')) h.github = url
          }
        }
      }
    }
  }
  return h
}

function parseSummary(tokens: Token[]): string {
  for (const t of tokens) {
    if (t.type === 'paragraph') return (t as any).text.trim()
  }
  return ''
}

function parseSkillList(tokens: Token[]): string[] {
  for (const t of tokens) {
    if (t.type === 'paragraph') {
      return (t as any).text.split(',').map((s: string) => s.trim()).filter(Boolean)
    }
  }
  return []
}

function parseKeyAchievements(tokens: Token[]): string[] {
  for (const t of tokens) {
    if (t.type === 'list') {
      return (t as any).items.map((item: any) => plain(item.text))
    }
  }
  return []
}

function skipSpaces(tokens: Token[], i: number): number {
  while (i < tokens.length && (tokens[i] as any).type === 'space') i++
  return i
}

function parseExperience(tokens: Token[]) {
  const jobs: any[] = []
  let currentJob: any = null
  let currentProject: any = null
  let i = 0

  while (i < tokens.length) {
    const t = tokens[i] as any

    if (t.type === 'heading' && t.depth === 3) {
      const [role, company] = t.text.split(' | ')
      currentJob = { role: role.trim(), company: (company || '').trim(), dates: '', note: '', projects: [] }
      jobs.push(currentJob)
      currentProject = null
      i = skipSpaces(tokens, i + 1)

      // Next paragraph is the date range
      if (i < tokens.length && (tokens[i] as any).type === 'paragraph') {
        currentJob.dates = plain((tokens[i] as any).text)
        i = skipSpaces(tokens, i + 1)
      }
      // Optional promotion note (_text_)
      if (i < tokens.length && (tokens[i] as any).type === 'paragraph' && (tokens[i] as any).text.startsWith('_')) {
        currentJob.note = plain((tokens[i] as any).text)
        i = skipSpaces(tokens, i + 1)
      }

    } else if (t.type === 'heading' && t.depth === 4) {
      currentProject = { name: t.text, stack: '', bullets: [] }
      currentJob?.projects.push(currentProject)
      i = skipSpaces(tokens, i + 1)

      // Optional tech stack paragraph — recognised by starting with *(
      if (i < tokens.length && (tokens[i] as any).type === 'paragraph' && (tokens[i] as any).text.startsWith('*')) {
        const raw: string = (tokens[i] as any).text
        currentProject.stack = raw.replace(/^\*\(/, '').replace(/\)\*\s*$/, '').trim()
        i = skipSpaces(tokens, i + 1)
      }
      // Bullet list
      if (i < tokens.length && (tokens[i] as any).type === 'list') {
        currentProject.bullets = (tokens[i] as any).items.map((item: any) => plain(item.text))
        i = skipSpaces(tokens, i + 1)
      }

    } else {
      i++ // skip hr, space, etc.
    }
  }

  return jobs
}

function parseEducation(tokens: Token[]) {
  const entries: any[] = []
  let current: any = null

  for (const t of tokens as any[]) {
    if (t.type === 'heading' && t.depth === 3) {
      current = { degree: t.text, institution: '', period: '', description: '', skills: [], project: '' }
      entries.push(current)
    } else if (t.type === 'paragraph' && current) {
      const text: string = t.text
      if (text.includes(' | ') && text.startsWith('**')) {
        // "**Forman Christian College** | 2016 – 2020"
        const [instPart, period] = text.split(' | ')
        current.institution = plain(instPart)
        current.period = period.trim()
      } else if (text.startsWith('**Skills:**')) {
        current.skills = text.replace('**Skills:**', '').trim().split(',').map((s: string) => s.trim()).filter(Boolean)
      } else if (text.startsWith('**Final Year Project:**')) {
        current.project = text.replace('**Final Year Project:**', '').trim()
      } else {
        current.description = text.trim()
      }
    }
  }

  return entries
}

function parseCertificationsAndAchievements(tokens: Token[]) {
  const certifications: any[] = []
  const achievements: any[] = []
  let subsection = ''
  let currentItem: any = null

  for (const t of tokens as any[]) {
    if (t.type === 'heading' && t.depth === 3) {
      subsection = t.text.toLowerCase()
      currentItem = null
    } else if (t.type === 'heading' && t.depth === 4) {
      currentItem = { title: t.text, institution: '', platform: '', event: '' }
      if (subsection === 'certifications') certifications.push(currentItem)
      else if (subsection === 'achievements') achievements.push(currentItem)
    } else if (t.type === 'paragraph' && currentItem) {
      for (const line of t.text.split('\n')) {
        const l = line.trim()
        if (l.startsWith('**Institution:**')) currentItem.institution = plain(l.replace('**Institution:**', '').trim())
        else if (l.startsWith('**Platform:**')) currentItem.platform = plain(l.replace('**Platform:**', '').trim())
        else if (l.startsWith('**Event:**')) currentItem.event = plain(l.replace('**Event:**', '').trim())
      }
    }
  }

  return { certifications, achievements }
}

function parseAdditionalInfo(tokens: Token[]) {
  const info = { languages: '', interests: [] as string[] }
  for (const t of tokens as any[]) {
    if (t.type === 'paragraph' && t.text.startsWith('**Languages:**')) {
      info.languages = t.text.replace('**Languages:**', '').trim()
    } else if (t.type === 'list') {
      info.interests = t.items.map((item: any) => plain(item.text))
    }
  }
  return info
}

export default defineEventHandler(async () => {
  const markdown = await readFile(resolve(process.cwd(), 'cv-resume.md'), 'utf-8')
  const tokens = marked.lexer(markdown)
  const sections = groupSections(tokens)

  const { certifications, achievements } = parseCertificationsAndAchievements(
    sections['certifications and achievements'] || []
  )

  return {
    header: parseHeader(sections['header'] || []),
    summary: parseSummary(sections['professional summary'] || []),
    coreSkills: parseSkillList(sections['core strengths and skills'] || []),
    supportingSkills: parseSkillList(sections['supporting skills and strengths'] || []),
    keyAchievements: parseKeyAchievements(sections['key achievements'] || []),
    experience: parseExperience(sections['professional experience'] || []),
    education: parseEducation(sections['education'] || []),
    certifications,
    achievements,
    additionalInfo: parseAdditionalInfo(sections['additional information'] || []),
  }
})
