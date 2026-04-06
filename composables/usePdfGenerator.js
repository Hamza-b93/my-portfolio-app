import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
    
    // Parse the markdown content
    const lines = markdownContent.split('\n');
    
    // Start position
    let yPos = 20;
    
    // Process each line of the markdown
    for (const line of lines) {
      // Skip horizontal rules
      if (line.trim() === '---') continue;
      
      // Handle headers
      if (line.startsWith('# ')) {
        // Main header (Name and title)
        if (yPos === 20) {
          // Add header with name
          doc.setFillColor(25, 118, 210); // Blue background
          doc.rect(0, 0, pageWidth, 40, 'F'); // Draw rectangle
          
          doc.setFontSize(28);
          doc.setTextColor(255, 255, 255); // White text
          doc.setFont(undefined, 'bold');
          
          // Extract just the name from the line
          const namePart = line.substring(2).trim(); // Remove "# "
          const name = namePart.split('\n')[0].split('|')[0].replace(/\*\*.*?\*\*/g, '').trim();
          doc.text(name, 20, 25);
          
          // Look for the title in the next lines
          let titleFound = false;
          for (const nextLine of lines.slice(lines.indexOf(line) + 1)) {
            if (nextLine.trim().startsWith('**') && nextLine.includes('Engineer')) {
              const title = nextLine.replace(/\*\*/g, '').trim();
              doc.setFontSize(16);
              doc.setTextColor(255, 255, 255);
              doc.setFont(undefined, 'normal');
              doc.text(title, 20, 35);
              titleFound = true;
              break;
            }
          }
          if (!titleFound) {
            doc.setFontSize(16);
            doc.setTextColor(255, 255, 255);
            doc.setFont(undefined, 'normal');
            doc.text("Software Engineer", 20, 35);
          }
          
          yPos = 50;
          continue;
        } else {
          // Section header
          const sectionTitle = line.substring(2).replace(/\*\*.*?\*\*/g, '').trim();
          if (sectionTitle) {
            doc.setFontSize(20);
            doc.setTextColor(25, 118, 210);
            doc.setFont(undefined, 'bold');
            doc.text(sectionTitle, 20, yPos);
            yPos += 10;
          }
        }
      } 
      // Handle subheaders (###)
      else if (line.startsWith('### ')) {
        const subHeader = line.substring(4).replace(/\*\*.*?\*\*/g, '').trim();
        if (subHeader) {
          doc.setFontSize(14);
          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, 'bold');
          doc.text(subHeader, 20, yPos);
          yPos += 7;
        }
      } 
      // Handle list items
      else if (line.startsWith('- ') || line.startsWith('* ')) {
        let listItem = line.substring(2).trim();
        
        // Process bold text (remove ** and make note of it)
        const boldRegex = /\*\*(.*?)\*\*/g;
        let match;
        let lastIndex = 0;
        const parts = [];
        
        while ((match = boldRegex.exec(listItem)) !== null) {
          // Add text before bold
          if (match.index > lastIndex) {
            parts.push({ text: listItem.substring(lastIndex, match.index), bold: false });
          }
          // Add bold text
          parts.push({ text: match[1], bold: true });
          lastIndex = match.index + match[0].length;
        }
        
        // Add remaining text after last bold
        if (lastIndex < listItem.length) {
          parts.push({ text: listItem.substring(lastIndex), bold: false });
        }
        
        // Render the parts
        let currentX = 25;
        let firstLine = true;
        
        for (const part of parts) {
          doc.setFont(undefined, part.bold ? 'bold' : 'normal');
          
          // Split the text to fit the page width
          const textLines = doc.splitTextToSize(part.text, pageWidth - currentX - 10);
          
          for (let i = 0; i < textLines.length; i++) {
            const textLine = textLines[i];
            if (firstLine && i === 0) {
              // Add bullet point only to the first line
              doc.text('• ' + textLine, currentX, yPos);
            } else {
              // For continuation lines, align to the same indentation
              doc.text(textLine, 25, yPos);
            }
            
            // Move to next line if this wasn't the last line of this part
            if (i < textLines.length - 1 || !firstLine) {
              yPos += 6;
              currentX = 25;
            }
            firstLine = false;
          }
        }
        
        doc.setFont(undefined, 'normal');
        yPos += 2; // Small gap after list item
      } 
      // Handle contact info
      else if (line.trim().startsWith('📧') || line.trim().startsWith('📱') || 
               line.trim().startsWith('📍') || line.trim().startsWith('🔗')) {
        if (yPos > 45 && yPos < 60) {
          // This is the contact info section right after the header
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, 'normal');
          
          // Format contact info in two columns
          if (line.includes('📧') || line.includes('📱')) {
            doc.text(line.trim(), 20, yPos);
          } else {
            doc.text(line.trim(), pageWidth/2, yPos);
            if (line.includes('📍') || line.includes('🔗')) {
              yPos += 7; // Move to next line after location/link
            }
          }
        } else {
          // This is in another section, treat as regular text
          doc.setFontSize(12);
          doc.setTextColor(0, 0, 0);
          doc.setFont(undefined, 'normal');
          const lines = doc.splitTextToSize(line.trim(), pageWidth - 20);
          lines.forEach(textLine => {
            doc.text(textLine, 20, yPos);
            yPos += 6;
          });
        }
      } 
      // Handle regular text (positions, dates, descriptions)
      else if (line.trim() !== '') {
        // Check if it's a position with company and date
        if (line.includes('|') && line.includes('*')) {
          // Format: Position Name | Company Name *Date*
          const parts = line.split('|');
          if (parts.length >= 2) {
            const position = parts[0].trim().replace(/\*\*.*?\*\*/g, '');
            
            // Position title
            doc.setFontSize(14);
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'bold');
            doc.text(position, 20, yPos);
            yPos += 7;
            
            // Process the company and date part
            let companyAndDate = parts.slice(1).join('|').trim();
            
            // Extract dates in asterisks
            const dateRegex = /\*(.*?)\*/g;
            let match;
            let lastIndex = 0;
            const segments = [];
            
            while ((match = dateRegex.exec(companyAndDate)) !== null) {
              if (match.index > lastIndex) {
                segments.push({ text: companyAndDate.substring(lastIndex, match.index), bold: false });
              }
              segments.push({ text: match[1], bold: true }); // Dates in bold
              lastIndex = match.index + match[0].length;
            }
            
            if (lastIndex < companyAndDate.length) {
              segments.push({ text: companyAndDate.substring(lastIndex), bold: false });
            }
            
            // Render company and date
            doc.setFontSize(12);
            doc.setFont(undefined, 'normal');
            let currentX = 20;
            
            for (const segment of segments) {
              doc.setFont(undefined, segment.bold ? 'bold' : 'normal');
              doc.text(segment.text, currentX, yPos);
              
              const textWidth = doc.getStringUnitWidth(segment.text) * doc.internal.getFontSize() / doc.internal.scaleFactor;
              currentX += textWidth;
            }
            
            doc.setFont(undefined, 'normal');
            yPos += 7;
          } else {
            // Regular text
            const cleanLine = line.replace(/\*\*.*?\*\*/g, '').trim();
            if (cleanLine) {
              doc.setFontSize(12);
              doc.setTextColor(0, 0, 0);
              doc.setFont(undefined, 'normal');
              const lines = doc.splitTextToSize(cleanLine, pageWidth - 20);
              lines.forEach(textLine => {
                doc.text(textLine, 20, yPos);
                yPos += 6;
              });
            }
          }
        } else {
          // Regular text
          const cleanLine = line.replace(/\*\*.*?\*\*/g, '').trim();
          if (cleanLine) {
            doc.setFontSize(12);
            doc.setTextColor(0, 0, 0);
            doc.setFont(undefined, 'normal');
            const lines = doc.splitTextToSize(cleanLine, pageWidth - 20);
            lines.forEach(textLine => {
              doc.text(textLine, 20, yPos);
              yPos += 6;
            });
          }
        }
      }
      
      // Add new page if we're getting close to the bottom
      if (yPos > 250) {
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
      doc.text("Generated on " + new Date().toLocaleDateString(), 20, footerY);
      doc.text(`Page ${i} of ${totalPages}`, pageWidth - 40, footerY);
    }
    
    // Save the PDF
    doc.save("Hamza_Butt_Professional_Resume.pdf");
  };
  
  return {
    generatePdf
  };
}