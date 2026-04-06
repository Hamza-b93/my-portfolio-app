import jsPDF from 'jspdf';
import { marked } from 'marked';
import font from '../fonts/NotoSans-Regular.ttf'; // adjust path

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

        const doc = new jsPDF({ unit: 'mm', format: 'a4' });
        doc.addFileToVFS('NotoSans-Regular.ttf', font);
        doc.addFont('NotoSans-Regular.ttf', 'NotoSans', 'normal');
        doc.setFont('NotoSans', 'normal');
        doc.setTextColor(0, 0, 0);

        const pageWidth = doc.internal.pageSize.getWidth();
        const pageHeight = doc.internal.pageSize.getHeight();
        const margin = 15;
        let yPos = margin;
        const lineHeight = 6;

        // Function to handle automatic page breaks
        const addText = (text, fontSize = 11, fontStyle = 'normal', color = [0, 0, 0], xPos = margin) => {
            doc.setFontSize(fontSize);
            doc.setFont('NotoSans', fontStyle);
            doc.setTextColor(...color);

            const lines = doc.splitTextToSize(text, pageWidth - 2 * margin);
            lines.forEach(line => {
                if (yPos + lineHeight > pageHeight - margin) {
                    doc.addPage();
                    yPos = margin;
                }
                doc.text(line, xPos, yPos);
                yPos += lineHeight;
            });
        };

        const tokens = marked.lexer(markdownContent);

        tokens.forEach(token => {
            switch (token.type) {
                case 'heading':
                    const size = token.depth === 1 ? 20 : token.depth === 2 ? 16 : 13;
                    const style = token.depth <= 2 ? 'bold' : 'normal';
                    addText(token.text, size, style, [25, 118, 210]);
                    yPos += 2;
                    break;

                case 'paragraph':
                    const text = token.text.trim();
                    // Handle contact info (emojis like 📧, 📱, 📍, 🔗)
                    if (/^[📧📱📍🔗]/.test(text)) {
                        const items = text.split(/\s{2,}/); // split by 2+ spaces
                        let colY = yPos;
                        items.forEach((item, i) => {
                            const xPos = i % 2 === 0 ? margin : pageWidth / 2;
                            addText(item, 11, 'normal', [0, 0, 0], xPos);
                            if (i % 2 === 1) colY += lineHeight;
                        });
                        yPos = colY + lineHeight;
                    } else {
                        addText(text, 11, 'normal');
                        yPos += 1;
                    }
                    break;

                case 'list':
                    token.items.forEach(item => {
                        addText('• ' + item.text, 11, 'normal');
                    });
                    yPos += 1;
                    break;

                case 'hr':
                    if (yPos + 3 > pageHeight - margin) {
                        doc.addPage();
                        yPos = margin;
                    }
                    doc.setDrawColor(200);
                    doc.line(margin, yPos, pageWidth - margin, yPos);
                    yPos += 4;
                    break;

                default:
                    if (token.text) addText(token.text);
            }
        });

        // Footer with page numbers
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            doc.setFontSize(9);
            doc.setTextColor(120);
            const footerY = pageHeight - 10;
            doc.text(`Generated on ${new Date().toLocaleDateString()}`, margin, footerY);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - 40, footerY);
        }

        doc.save('Hamza_Butt_Resume.pdf');
    };

    return { generatePdf };
}