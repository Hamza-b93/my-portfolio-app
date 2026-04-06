import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { marked } from 'marked';

export function usePdfGenerator() {
  const generatePdf = async () => {
    // Fetch the markdown file content
    let markdownContent = '';
    
    try {
      const response = await fetch('/cv-resume.md');
      if (response.ok) {
        markdownContent = await response.text();
      } else {
        console.error('Could not fetch cv-resume.md');
        // Fallback content
        markdownContent = `
# HAMZA BUTT  
**Senior Backend / Platform Engineer**

📧 hamza.b93@protonmail.com  
📱 +92-319-5040505  
📍 Pakistan  

---

## PROFESSIONAL SUMMARY

Backend / Platform Engineer with 4+ years of experience building scalable Node.js systems. Specialized in high-throughput data pipelines and multi-tenant architectures.

---

## CORE TECHNICAL SKILLS

**Backend:** Node.js, Express.js, Fastify, TypeScript, REST APIs, JWT  
**Databases:** PostgreSQL, MySQL, MongoDB, Prisma, Sequelize  
**Cloud & DevOps:** AWS (S3, EC2), Docker, Podman, GitHub Actions, CI/CD, Linux  
**Frontend:** Vue.js, Nuxt.js, Tailwind CSS  
**Other:** MQTT, WebSockets, Multi-tenant Architecture, System Design  

---
`;
      }
    } catch (error) {
      console.error('Error fetching cv-resume.md:', error);
      // Fallback content
      markdownContent = `
# HAMZA BUTT  
**Software Engineer**

📧 hamza.b93@protonmail.com  
📱 +92-319-5040505  
📍 Pakistan  

---

## PROFESSIONAL SUMMARY

Software Engineer with 4+ years of experience building scalable Node.js systems. Specialized in high-throughput data pipelines and multi-tenant architectures.

---

## CORE TECHNICAL SKILLS

**Backend:** Node.js, Express.js, Fastify, TypeScript, REST APIs, JWT  
**Databases:** PostgreSQL, MySQL, MongoDB, Prisma, Sequelize  
**Cloud & DevOps:** AWS (S3, EC2), Docker, Podman, GitHub Actions, CI/CD, Linux  
**Frontend:** Vue.js, Nuxt.js, Tailwind CSS  
**Other:** MQTT, WebSockets, Multi-tenant Architecture, System Design  

---
`;
    }
    
    // Custom renderer to extract text content from markdown
    const renderer = new marked.Renderer();
    
    // Override heading methods to return plain text
    renderer.heading = function(text, level) {
      return `[HEADING-${level}]${text}[/HEADING-${level}]`;
    };
    
    renderer.paragraph = function(text) {
      return `[PARAGRAPH]${text}[/PARAGRAPH]`;
    };
    
    renderer.list = function(body, ordered, start) {
      return `[LIST]${body}[/LIST]`;
    };
    
    renderer.listitem = function(text) {
      return `[LIST_ITEM]${text}[/LIST_ITEM]`;
    };
    
    renderer.codespan = function(code) {
      return code;
    };
    
    renderer.code = function(code, lang, escaped) {
      return `[CODE]${code}[/CODE]`;
    };
    
    renderer.blockquote = function(quote) {
      return `[BLOCKQUOTE]${quote}[/BLOCKQUOTE]`;
    };
    
    renderer.link = function(href, title, text) {
      return text || href;
    };
    
    renderer.image = function(href, title, text) {
      return text || '';
    };
    
    renderer.strong = function(text) {
      return `[STRONG]${text}[/STRONG]`;
    };
    
    renderer.em = function(text) {
      return `[EM]${text}[/EM]`;
    };
    
    // Parse markdown to our custom format
    marked.use({ renderer });
    const parsedMarkdown = marked.parse(markdownContent);
    
    // Create new PDF document with better formatting
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    // Set document properties
    doc.setProperties({
      title: "Hamza Butt - Professional Portfolio",
      subject: "Software Engineer Portfolio",
      author: "Hamza Butt",
      keywords: "software engineer, portfolio, resume, cv",
      creator: "Generated with jsPDF"
    });
    
    // Add custom fonts and styling
    const pageWidth = doc.internal.pageSize.width;
    const pageHeight = doc.internal.pageSize.height;
    const margin = 20;
    
    // Set default font
    doc.setFont('helvetica');
    
    // Process the parsed markdown content
    let yPos = 20;
    
    // Split by our custom tags to separate content blocks
    const blocks = parsedMarkdown.split(/(\[\/?(?:HEADING|PARAGRAPH|LIST|LIST_ITEM|CODE|BLOCKQUOTE|STRONG|EM)\][^[]*)/);
    
    for (const block of blocks) {
      if (!block.trim()) continue;
      
      // Handle headings
      if (block.startsWith('[HEADING-1]')) {
        const content = block.replace('[HEADING-1]', '').replace('[/HEADING-1]', '');
        doc.setFontSize(24);
        doc.setTextColor(25, 118, 210); // Blue color
        doc.setFont(undefined, 'bold');
        
        // Draw header background
        doc.setFillColor(235, 245, 255);
        doc.rect(0, yPos - 8, pageWidth, 16, 'F');
        
        // Add name to header
        const lines = doc.splitTextToSize(content, pageWidth - 2 * margin);
        doc.text(lines, margin, yPos);
        yPos += 10;
      } 
      else if (block.startsWith('[HEADING-2]')) {
        const content = block.replace('[HEADING-2]', '').replace('[/HEADING-2]', '');
        doc.setFontSize(18);
        doc.setTextColor(25, 118, 210); // Blue color
        doc.setFont(undefined, 'bold');
        const lines = doc.splitTextToSize(content, pageWidth - 2 * margin);
        doc.text(lines, margin, yPos);
        yPos += 8;
      }
      else if (block.startsWith('[HEADING-3]')) {
        const content = block.replace('[HEADING-3]', '').replace('[/HEADING-3]', '');
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0); // Black color
        doc.setFont(undefined, 'bold');
        const lines = doc.splitTextToSize(content, pageWidth - 2 * margin);
        doc.text(lines, margin, yPos);
        yPos += 7;
      }
      // Handle paragraphs
      else if (block.startsWith('[PARAGRAPH]')) {
        const content = block.replace('[PARAGRAPH]', '').replace('[/PARAGRAPH]', '');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0); // Black color
        doc.setFont(undefined, 'normal');
        
        // Check if this is contact info (starts with emoji icons)
        if (content.trim().startsWith('📧') || content.trim().startsWith('📱') || 
            content.trim().startsWith('📍') || content.trim().startsWith('🔗')) {
          // Format contact info in two columns
          const contactItems = content.trim().split('  '); // Split by double space or newlines
          let colX = margin;
          
          for (let i = 0; i < contactItems.length; i++) {
            const item = contactItems[i].trim();
            if (!item) continue;
            
            if (i % 2 === 0) {
              // Left column
              doc.text(item, colX, yPos);
            } else {
              // Right column
              doc.text(item, pageWidth / 2, yPos);
              yPos += 6; // Move down after each pair
            }
          }
          
          // If odd number of items, move down after last item
          if (contactItems.length % 2 === 1) {
            yPos += 6;
          }
        } else {
          // Regular paragraph
          const lines = doc.splitTextToSize(content, pageWidth - 2 * margin);
          for (const line of lines) {
            doc.text(line, margin, yPos);
            yPos += 6;
            
            // Add new page if needed
            if (yPos > pageHeight - 30) {
              doc.addPage();
              yPos = 20;
            }
          }
        }
      }
      // Handle list items
      else if (block.startsWith('[LIST_ITEM]')) {
        const content = block.replace('[LIST_ITEM]', '').replace('[/LIST_ITEM]', '');
        doc.setFontSize(11);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        
        // Process bold text inside the list item
        const boldRegex = /\[STRONG\](.*?)\[\/STRONG\]/g;
        let lastIndex = 0;
        let currentX = margin + 5; // Indent for list items
        
        // Find all bold sections
        let match;
        const parts = [];
        
        while ((match = boldRegex.exec(content)) !== null) {
          // Add text before bold
          if (match.index > lastIndex) {
            parts.push({ text: content.substring(lastIndex, match.index), bold: false });
          }
          // Add bold text
          parts.push({ text: match[1], bold: true });
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text after last bold
        if (lastIndex < content.length) {
          parts.push({ text: content.substring(lastIndex), bold: false });
        }
        
        // Render the parts
        for (const part of parts) {
          doc.setFont(undefined, part.bold ? 'bold' : 'normal');
          
          // For the first part, add the bullet point
          if (part === parts[0]) {
            doc.text('• ' + part.text, currentX, yPos);
          } else {
            // For subsequent parts in the same line, continue without bullet
            const textWidth = doc.getStringUnitWidth(part.text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
            doc.text(part.text, currentX, yPos);
            currentX += textWidth;
          }
        }
        
        doc.setFont(undefined, 'normal');
        yPos += 5;
      }
      // Handle horizontal rules (represented as ---)
      else if (block.includes('---')) {
        // Add a separator line
        doc.setDrawColor(200); // Gray line
        doc.line(margin, yPos, pageWidth - margin, yPos);
        yPos += 10;
      }
      // Handle regular content that doesn't match our custom tags
      else {
        // Check if this is a simple line of text
        if (!block.startsWith('[') && block.trim() !== '') {
          doc.setFontSize(11);
          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, 'normal');
          
          // Split and render as normal text
          const lines = doc.splitTextToSize(block, pageWidth - 2 * margin);
          for (const line of lines) {
            doc.text(line, margin, yPos);
            yPos += 6;
            
            // Add new page if needed
            if (yPos > pageHeight - 30) {
              doc.addPage();
              yPos = 20;
            }
          }
        }
      }
      
      // Add new page if needed
      if (yPos > pageHeight - 30) {
        doc.addPage();
        yPos = 20;
      }
    }
    
    // Add footer with correct page numbering
    const totalPages = doc.internal.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      const footerY = pageHeight - 10;
      doc.setFontSize(10);
      doc.setTextColor(150, 150, 150);
      doc.setFont(undefined, 'normal');
      doc.text("Generated on " + new Date().toLocaleDateString(), margin, footerY);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - margin - 30, footerY);
    }
    
    // Save the PDF
    doc.save("Hamza_Butt_Professional_Resume.pdf");
  };
  
  return {
    generatePdf
  };
}