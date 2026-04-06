import jsPDF from 'jspdf';
import { marked } from 'marked';
import font from './NotoSans-Regular-normal.js'; // base64 encoded font file

export function usePdfGenerator() {
    const generatePdf = async () => {
        let markdownContent = '';

        try {
            const response = await fetch('/cv-resume.md');
            if (!response.ok) throw new Error('Failed to fetch markdown');
            markdownContent = await response.text();
        } catch (error) {
            console.error('Error fetching cv-resume.md:', error);
            return;
        }

        // Convert Markdown → HTML
        const htmlContent = `
      <html>
        <head>
          <style>
            body { font-family: NotoSans; font-size: 11px; line-height: 1.5; color: #000; padding: 10px; }
            h1 { font-size: 22px; color: #1976d2; border-bottom: 2px solid #1976d2; padding-bottom: 5px; }
            h2 { font-size: 16px; color: #1976d2; margin-top: 15px; margin-bottom: 5px; }
            h3 { font-size: 13px; margin-top: 10px; margin-bottom: 4px; }
            p, li { color: #000; }
            ul { margin-left: 15px; padding-left: 10px; }
            strong { font-weight: bold; }
            hr { border-top: 1px solid #ccc; margin: 10px 0; }
            a { color: #1976d2; text-decoration: none; }
          </style>
        </head>
        <body>
          ${marked.parse(markdownContent)}
        </body>
      </html>
    `;

        // Load UTF-8 font
        jsPDF.API.addFileToVFS('NotoSans-Regular.ttf', font);
        jsPDF.API.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');

        const doc = new jsPDF({ unit: 'mm', format: 'a4' });
        doc.setFont('NotoSans');

        await doc.html(htmlContent, {
            x: 10,
            y: 10,
            width: 190,
            windowWidth: 800,
            autoPaging: 'text',
            callback: function (doc) {
                const totalPages = doc.getNumberOfPages();

                for (let i = 1; i <= totalPages; i++) {
                    doc.setPage(i);
                    doc.setFontSize(9);
                    doc.setTextColor(0);
                    const pageHeight = doc.internal.pageSize.getHeight();
                    const pageWidth = doc.internal.pageSize.getWidth();

                    doc.text(`Generated on ${new Date().toLocaleDateString()}`, 10, pageHeight - 10);
                    doc.text(`Page ${i} of ${totalPages}`, pageWidth - 40, pageHeight - 10);
                }

                doc.save('Hamza_Butt_Resume.pdf');
            }
        });
    };

    return { generatePdf };
}