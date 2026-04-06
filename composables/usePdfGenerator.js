import jsPDF from 'jspdf';
import { marked } from 'marked';

export function usePdfGenerator() {
    const generatePdf = async () => {
        let markdownContent = '';

        try {
            const response = await fetch('/cv-resume.md');
            if (response.ok) {
                markdownContent = await response.text();
            } else {
                throw new Error('Failed to fetch markdown');
            }
        } catch (error) {
            console.error('Error fetching cv-resume.md:', error);

            // Fallback content
            markdownContent = `
# HAMZA BUTT  
**Senior Backend / Platform Engineer**

📧 hamza.b93@protonmail.com  
📱 +92-319-5040505  
📍 Pakistan  

---

## PROFESSIONAL SUMMARY
Backend / Platform Engineer with 4+ years of experience building scalable Node.js systems.

---

## CORE TECHNICAL SKILLS
- Node.js, Express.js, Fastify
- PostgreSQL, MySQL, MongoDB
- AWS, Docker, CI/CD
      `;
        }

        // Convert Markdown → HTML
        const htmlContent = `
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              font-size: 11px;
              line-height: 1.6;
              color: #000;
              padding: 10px;
            }

            h1 {
              font-size: 22px;
              color: #1976d2;
              border-bottom: 2px solid #1976d2;
              padding-bottom: 5px;
              margin-bottom: 10px;
            }

            h2 {
              font-size: 16px;
              color: #1976d2;
              margin-top: 15px;
              margin-bottom: 5px;
            }

            h3 {
              font-size: 13px;
              margin-top: 10px;
              margin-bottom: 4px;
            }

            p {
              margin: 4px 0;
            }

            ul {
              margin-left: 15px;
              padding-left: 10px;
            }

            li {
              margin-bottom: 3px;
            }

            strong {
              font-weight: bold;
            }

            hr {
              border: none;
              border-top: 1px solid #ccc;
              margin: 10px 0;
            }

            a {
              color: #1976d2;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          ${marked.parse(markdownContent)}
        </body>
      </html>
    `;

        // Create PDF
        const doc = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4'
        });

        // Metadata
        doc.setProperties({
            title: "Hamza Butt - Professional Resume",
            subject: "Resume",
            author: "Hamza Butt",
            creator: "jsPDF"
        });

        // Render HTML into PDF
        await doc.html(htmlContent, {
            x: 10,
            y: 10,
            width: 190,
            windowWidth: 800,
            autoPaging: 'text',

            callback: function (doc) {
                const pageCount = doc.getNumberOfPages();

                // Footer
                for (let i = 1; i <= pageCount; i++) {
                    doc.setPage(i);
                    doc.setFontSize(9);
                    doc.setTextColor(150);

                    doc.text(
                        `Page ${i} of ${pageCount}`,
                        doc.internal.pageSize.getWidth() - 40,
                        doc.internal.pageSize.getHeight() - 10
                    );

                    doc.text(
                        `Generated on ${new Date().toLocaleDateString()}`,
                        10,
                        doc.internal.pageSize.getHeight() - 10
                    );
                }

                doc.save('Hamza_Butt_Resume.pdf');
            }
        });
    };

    return {
        generatePdf
    };
}