export function usePdfGenerator() {

    // ── Constants ──────────────────────────────────────────────────────────────
    const PAGE_W = 210;
    const PAGE_H = 297;
    const MARGIN_LEFT = 15;
    const MARGIN_RIGHT = 15;
    const MARGIN_TOP = 18;
    const MARGIN_BOTTOM = 18;
    const CONTENT_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT;

    const BLUE = [25, 118, 210];
    const BLACK = [30, 30, 30];
    const GREY = [100, 100, 100];
    const LGREY = [200, 200, 200];

    const SZ = {
        name: 22,
        tagline: 11,
        contact: 9,
        h2: 12,
        h3: 10.5,
        h4: 9.5,
        body: 9,
        small: 8,
    };

    // ── State ──────────────────────────────────────────────────────────────────
    let doc, y, pageNum;

    // ── Helpers ────────────────────────────────────────────────────────────────

    function newPage() {
        doc.addPage();
        pageNum++;
        y = MARGIN_TOP;
    }

    function checkY(needed = 6) {
        if (y + needed > PAGE_H - MARGIN_BOTTOM) newPage();
    }

    function setColor(rgb) {
        doc.setTextColor(...rgb);
    }

    function line(x1, y1, x2, y2, colorRgb = LGREY, lw = 0.3) {
        doc.setDrawColor(...colorRgb);
        doc.setLineWidth(lw);
        doc.line(x1, y1, x2, y2);
    }

    function wrapText(text, maxWidth, fontSize) {
        doc.setFontSize(fontSize);
        return doc.splitTextToSize(text, maxWidth);
    }

    function drawParagraph(text, x, fontSize, color = BLACK, style = 'normal', maxW = null) {
        const mw = maxW || (PAGE_W - x - MARGIN_RIGHT);
        const lines = wrapText(text, mw, fontSize);
        doc.setFont('helvetica', style);
        setColor(color);
        for (const ln of lines) {
            checkY(fontSize * 0.4 + 1);
            doc.text(ln, x, y);
            y += fontSize * 0.38 + 1.5;
        }
        return y;
    }

    function drawRule(color = BLUE, lw = 0.5, marginY = 1.5) {
        y += marginY;
        line(MARGIN_LEFT, y, PAGE_W - MARGIN_RIGHT, y, color, lw);
        y += marginY + 1;
    }

    function drawH2(text) {
        y += 4;
        checkY(10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(SZ.h2);
        setColor(BLUE);
        doc.text(text.toUpperCase(), MARGIN_LEFT, y);
        y += 1.5;
        line(MARGIN_LEFT, y, PAGE_W - MARGIN_RIGHT, y, BLUE, 0.4);
        y += 4;
    }

    function drawJobHeader(role, company, dates) {
        checkY(8);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(SZ.h3);
        setColor(BLACK);
        doc.text(role, MARGIN_LEFT, y);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(SZ.small);
        setColor(GREY);
        const dw = doc.getTextWidth(dates);
        doc.text(dates, PAGE_W - MARGIN_RIGHT - dw, y);

        y += 4.5;

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(SZ.body);
        setColor(BLUE);
        doc.text(company, MARGIN_LEFT, y);
        y += 5;
    }

    function drawProjectHeader(title, stack) {
        checkY(7);
        y += 1;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(SZ.h4);
        setColor(BLACK);
        doc.text(title, MARGIN_LEFT + 2, y);
        y += 4;
        if (stack) {
            doc.setFont('helvetica', 'italic');
            doc.setFontSize(SZ.small);
            setColor(GREY);
            doc.text(stack, MARGIN_LEFT + 2, y);
            y += 4;
        }
    }

    function drawBullet(text, indent = 6) {
        const x = MARGIN_LEFT + indent;
        const maxW = CONTENT_W - indent - 2;
        const lines = wrapText(text, maxW, SZ.body);

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(SZ.body);
        setColor(BLACK);

        for (let i = 0; i < lines.length; i++) {
            checkY(5);
            if (i === 0) {
                doc.setFillColor(...BLUE);
                doc.circle(x - 2.5, y - 1.8, 0.7, 'F');
            }
            doc.text(lines[i], x, y);
            y += 4.2;
        }
    }

    function drawSkillRow(label, value) {
        checkY(5);
        const lx = MARGIN_LEFT;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(SZ.body);
        setColor(BLACK);
        doc.text(`${label}:`, lx, y);

        const lw = doc.getTextWidth(`${label}: `);
        doc.setFont('helvetica', 'normal');
        setColor(BLACK);
        const lines = wrapText(value, CONTENT_W - lw, SZ.body);
        doc.text(lines[0], lx + lw, y);
        y += 4.2;
        for (let i = 1; i < lines.length; i++) {
            checkY(4.5);
            doc.text(lines[i], lx + lw, y);
            y += 4.2;
        }
    }

    function stampPageNumbers(total) {
        for (let i = 1; i <= total; i++) {
            doc.setPage(i);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(SZ.small);
            setColor(GREY);

            const pgStr = `Page ${i} of ${total}`;
            const pw = doc.getTextWidth(pgStr);
            doc.text(pgStr, PAGE_W - MARGIN_RIGHT - pw, PAGE_H - 10);

            line(MARGIN_LEFT, PAGE_H - 13, PAGE_W - MARGIN_RIGHT, PAGE_H - 13, LGREY, 0.3);
        }
    }

    function stripUrl(url) {
        return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
    }

    // ── Main build ─────────────────────────────────────────────────────────────
    async function buildPdf(data) {
        const { default: jsPDF } = await import('jspdf');
        doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
        y = MARGIN_TOP;
        pageNum = 1;

        const { header, summary, coreSkills, supportingSkills, keyAchievements, experience, education, certifications, achievements, additionalInfo } = data;

        // ── HEADER ──────────────────────────────────────────────────────────────
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(SZ.name);
        setColor(BLUE);
        doc.text(header.name, MARGIN_LEFT, y);
        y += 7;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(SZ.tagline);
        setColor(GREY);
        doc.text(header.title, MARGIN_LEFT, y);
        y += 5;

        doc.setFontSize(SZ.contact);
        setColor(GREY);
        const contacts = [
            header.email,
            header.phone,
            header.location,
            stripUrl(header.linkedin),
            stripUrl(header.github),
        ].filter(Boolean);
        doc.text(contacts.join('  |  '), MARGIN_LEFT, y);
        y += 2;

        drawRule(BLUE, 0.6, 2);

        // ── PROFESSIONAL SUMMARY ─────────────────────────────────────────────────
        drawH2('Professional Summary');
        drawParagraph(summary, MARGIN_LEFT, SZ.body);

        // ── SKILLS ───────────────────────────────────────────────────────────────
        drawH2('Core Strengths And Skills');
        drawSkillRow('Core Skills', coreSkills.join(', '));
        drawSkillRow('Supporting Skills', supportingSkills.join(', '));

        // ── KEY ACHIEVEMENTS ─────────────────────────────────────────────────────
        drawH2('Key Achievements');
        for (const a of keyAchievements) drawBullet(a, 5);

        // ── PROFESSIONAL EXPERIENCE ──────────────────────────────────────────────
        drawH2('Professional Experience');
        for (const job of experience) {
            y += 2;
            const dateLabel = job.note ? `${job.dates} (${job.note})` : job.dates;
            drawJobHeader(job.role, job.company, dateLabel);
            for (const project of job.projects) {
                drawProjectHeader(project.name, project.stack || null);
                for (const bullet of project.bullets) drawBullet(bullet);
            }
        }

        // ── EDUCATION ────────────────────────────────────────────────────────────
        drawH2('Education');
        for (const edu of education) {
            checkY(10);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(SZ.h3);
            setColor(BLACK);
            doc.text(edu.degree, MARGIN_LEFT, y);
            y += 5;

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(SZ.body);
            setColor(GREY);
            doc.text(`${edu.institution}  |  ${edu.period}`, MARGIN_LEFT, y);
            y += 5;

            if (edu.description) drawParagraph(edu.description, MARGIN_LEFT, SZ.body);
            if (edu.skills.length > 0) drawSkillRow('Relevant Skills', edu.skills.join(', '));
            if (edu.project) drawBullet(`Final Year Project: ${edu.project}`);
            y += 2;
        }

        // ── CERTIFICATIONS ───────────────────────────────────────────────────────
        drawH2('Certifications And Achievements');
        for (const cert of certifications) {
            drawBullet(`${cert.title} — ${cert.institution} (${cert.platform})`);
        }
        for (const ach of achievements) {
            drawBullet(`${ach.title}${ach.event ? ` — ${ach.event}` : ''}`);
        }

        // ── ADDITIONAL ───────────────────────────────────────────────────────────
        drawH2('Additional Information');
        drawSkillRow('Languages', additionalInfo.languages);
        drawSkillRow('Interests', additionalInfo.interests.join(', '));

        // ── PAGE NUMBERS ─────────────────────────────────────────────────────────
        stampPageNumbers(doc.getNumberOfPages());

        return doc;
    }

    // ── Public API ─────────────────────────────────────────────────────────────
    const generatePdf = async (data) => {
        try {
            const pdfDoc = await buildPdf(data);
            pdfDoc.save('Hamza_Butt_Resume.pdf');
        } catch (err) {
            console.error('PDF generation error:', err);
        }
    };

    return { generatePdf };
}
