import jsPDF from 'jspdf';

/**
 * Resume PDF generator — draws text directly via jsPDF text API.
 * Avoids doc.html() which causes font/character/color rendering bugs.
 */
export function usePdfGenerator() {

    // ── Constants ──────────────────────────────────────────────────────────────
    const PAGE_W = 210;   // A4 mm
    const PAGE_H = 297;
    const MARGIN_LEFT = 15;
    const MARGIN_RIGHT = 15;
    const MARGIN_TOP = 18;
    const MARGIN_BOTTOM = 18;
    const CONTENT_W = PAGE_W - MARGIN_LEFT - MARGIN_RIGHT;

    const BLUE = [25, 118, 210];   // #1976d2
    const BLACK = [30, 30, 30];
    const GREY = [100, 100, 100];
    const LGREY = [200, 200, 200];

    // Font sizes (pt)
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
    let doc, y, pageNum, totalPages;

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

    /** Word-wrap text to fit within maxWidth, return array of lines. */
    function wrapText(text, maxWidth, fontSize) {
        doc.setFontSize(fontSize);
        return doc.splitTextToSize(text, maxWidth);
    }

    /** Draw left-aligned text, advance y. Returns new y. */
    function drawText(text, x, fontSize, color = BLACK, style = 'normal') {
        checkY(fontSize * 0.4 + 1);
        doc.setFont('helvetica', style);
        doc.setFontSize(fontSize);
        setColor(color);
        doc.text(text, x, y);
        y += fontSize * 0.38 + 1.2;
        return y;
    }

    /** Draw wrapped paragraph, return new y. */
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

    /** Draw a horizontal rule. */
    function drawRule(color = BLUE, lw = 0.5, marginY = 1.5) {
        y += marginY;
        line(MARGIN_LEFT, y, PAGE_W - MARGIN_RIGHT, y, color, lw);
        y += marginY + 1;
    }

    /** Section heading (H2) with underline. */
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

    /** Job title + company row. */
    function drawJobHeader(role, company, dates) {
        checkY(8);
        // Role | Company
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(SZ.h3);
        setColor(BLACK);
        doc.text(role, MARGIN_LEFT, y);

        // Dates right-aligned
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(SZ.small);
        setColor(GREY);
        const dw = doc.getTextWidth(dates);
        doc.text(dates, PAGE_W - MARGIN_RIGHT - dw, y);

        y += 4.5;

        // Company name
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(SZ.body);
        setColor(BLUE);
        doc.text(company, MARGIN_LEFT, y);
        y += 5;
    }

    /** Sub-project header (H4). */
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

    /** Bullet point. */
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
                // bullet dot
                doc.setFillColor(...BLUE);
                doc.circle(x - 2.5, y - 1.8, 0.7, 'F');
            }
            doc.text(lines[i], x, y);
            y += 4.2;
        }
    }

    /** Skill row: "Label: value value value" */
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

    /** Achievement row with bold metric. */
    function drawAchievement(text) {
        // Bold numbers/percentages inline is hard in jsPDF without splitting.
        // Draw as bullet for simplicity — looks clean.
        drawBullet(text, 5);
    }

    // ── Stamp page numbers (post-render) ──────────────────────────────────────
    function stampPageNumbers(total) {
        for (let i = 1; i <= total; i++) {
            doc.setPage(i);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(SZ.small);
            setColor(GREY);

            const dateStr = `Generated ${new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}`;
            doc.text(dateStr, MARGIN_LEFT, PAGE_H - 10);

            const pgStr = `Page ${i} of ${total}`;
            const pw = doc.getTextWidth(pgStr);
            doc.text(pgStr, PAGE_W - MARGIN_RIGHT - pw, PAGE_H - 10);

            // footer line
            line(MARGIN_LEFT, PAGE_H - 13, PAGE_W - MARGIN_RIGHT, PAGE_H - 13, LGREY, 0.3);
        }
    }

    // ── Main build ─────────────────────────────────────────────────────────────
    function buildPdf() {
        doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });
        y = MARGIN_TOP;
        pageNum = 1;

        // ── HEADER ──────────────────────────────────────────────────────────────
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(SZ.name);
        setColor(BLUE);
        doc.text('HAMZA BUTT', MARGIN_LEFT, y);
        y += 7;

        doc.setFont('helvetica', 'normal');
        doc.setFontSize(SZ.tagline);
        setColor(GREY);
        doc.text('Senior Backend / Platform Engineer', MARGIN_LEFT, y);
        y += 5;

        // Contact row
        doc.setFontSize(SZ.contact);
        setColor(GREY);
        const contacts = [
            'hamza.b93@protonmail.com',
            '+92-319-5040505',
            'Pakistan',
            'linkedin.com/in/hamzabutt96',
            'github.com/Hamza-b93',
        ];
        doc.text(contacts.join('  |  '), MARGIN_LEFT, y);
        y += 2;

        drawRule(BLUE, 0.6, 2);

        // ── PROFESSIONAL SUMMARY ─────────────────────────────────────────────────
        drawH2('Professional Summary');
        drawParagraph(
            'Backend / Platform Engineer with 4+ years of experience building scalable Node.js systems across IoT, SaaS, and compliance-driven platforms. Specialized in high-throughput data pipelines, multi-tenant architectures, and privacy frameworks (GDPR/CCPA). Proven ability to design and deliver production systems handling 10K+ daily transactions, optimize performance, and lead backend development in fast-paced environments.',
            MARGIN_LEFT, SZ.body
        );

        // ── CORE SKILLS ──────────────────────────────────────────────────────────
        drawH2('Core Technical Skills');
        const skills = [
            ['Backend', 'Node.js, Express.js, Fastify, TypeScript, REST APIs, JWT'],
            ['Databases', 'PostgreSQL, MySQL, MongoDB, ClickHouse, Prisma, Sequelize'],
            ['Cloud & DevOps', 'AWS (S3, EC2), Docker, Podman, GitHub Actions, Self-hosted GitHub Runners, CI/CD, Linux'],
            ['Frontend', 'Vue.js, Nuxt.js, Tailwind CSS'],
            ['Other', 'MQTT, WebSockets, Kafka, Multi-tenant Architecture, System Design, Event-driven Systems'],
        ];
        for (const [label, value] of skills) drawSkillRow(label, value);

        // ── KEY ACHIEVEMENTS ─────────────────────────────────────────────────────
        drawH2('Key Achievements');
        const achievements = [
            'Reduced deployment time by 87% (2 hours to 15 minutes) through CI/CD automation',
            'Designed IoT pipeline processing 10,000+ events/minute for predictive maintenance',
            'Built backend systems handling 50,000+ daily transactions',
            'Architected GDPR/CCPA compliance framework across multiple product lines',
            'Led and mentored junior engineers to production readiness',
        ];
        for (const a of achievements) drawAchievement(a);

        // ── PROFESSIONAL EXPERIENCE ──────────────────────────────────────────────
        drawH2('Professional Experience');

        // --- OnStak Senior ---
        drawJobHeader('Senior Software Engineer', 'OnStak Inc.', 'April 2025 – Present');
        drawProjectHeader('Video AI Platform (Next-Gen Revamp)', 'Node.js, Express, PostgreSQL, Kafka, ClickHouse');
        const videoAI = [
            'Led backend development of next-generation Video AI platform with advanced AI-driven capabilities',
            'Designed and implemented high-throughput, event-driven ingestion pipeline using Kafka and ClickHouse for real-time video analytics',
            'Built intelligent investigation engine enabling automated case analysis from video events and behavioural patterns',
            'Integrated AI-powered chatbot assistant supporting natural language querying and investigation workflows',
            'Migrated and optimized core services to PostgreSQL, improving data consistency and query performance',
            'Architected scalable, distributed backend services using Node.js (Express) for high-throughput video event processing',
        ];
        for (const b of videoAI) drawBullet(b);

        drawProjectHeader('Regulatory Compliance & Privacy Framework', null);
        const compliance = [
            'Architected GDPR/CCPA compliance framework across 3 product lines, implementing encryption, automated data retention, and right-to-deletion workflows',
            'Designed audit trail system tracking 100% of data access events, reducing audit preparation time by 60%',
            'Led cross-functional implementation of cookie consent and privacy systems',
        ];
        for (const b of compliance) drawBullet(b);

        drawProjectHeader('AI Predictive Maintenance Platform', 'Node.js, PostgreSQL, AWS S3, Docker');
        const maintenance = [
            'Designed and scaled IoT data pipeline processing 10,000+ events/minute for real-time failure prediction',
            'Architected secure multi-tenant system with row-level isolation and RBAC for enterprise clients',
            'Automated CI/CD pipelines using GitHub Actions, reducing deployment time from 2 hours to 15 minutes',
        ];
        for (const b of maintenance) drawBullet(b);

        drawProjectHeader('Player Analytics Platform (Cricket Board)', 'Node.js, Fastify, MySQL, Prisma, MQTT');
        const cricket = [
            'Served as technical lead for backend team of 3 engineers',
            'Implemented real-time notifications using MQTT for 500+ concurrent users',
            'Built containerized CI/CD pipeline using Podman',
            'Mentored junior developers to production readiness',
        ];
        for (const b of cricket) drawBullet(b);

        drawProjectHeader('AI Chatbot Platform Migration', 'Supabase, Vercel, GitHub');
        const chatbot = [
            'Executed zero-downtime database migration preserving authentication and user sessions',
            'Automated deployment workflows, reducing manual release effort by 80%',
        ];
        for (const b of chatbot) drawBullet(b);

        // --- OnStak Junior ---
        y += 2;
        drawJobHeader('Junior Software Engineer', 'OnStak Inc.', 'April 2022 – April 2025');
        drawProjectHeader('Drive-Thru Analytics Platform', 'Node.js, Express, MySQL, Sequelize');
        const driveThru = [
            'Developed backend handling 50,000+ daily transactions across 30+ POS integrations',
            'Built real-time analytics and reporting system for operational insights',
        ];
        for (const b of driveThru) drawBullet(b);

        drawProjectHeader('Video Analytics Platform', 'Node.js, Express, MySQL, AWS S3');
        const videoAnalytics = [
            'Integrated multiple computer vision models into production backend',
            'Designed tenant-based authorization system supporting 15+ enterprise clients',
        ];
        for (const b of videoAnalytics) drawBullet(b);

        // --- Wi-Metrix ---
        y += 2;
        drawJobHeader('Associate Software Engineer', 'Wi-Metrix', 'July 2021 – April 2022');
        drawProjectHeader('Production Line Management System', 'Node.js, Express, SQL Server, Sequelize');
        const wimetrix = [
            'Improved query performance by 40% through indexing and query optimization',
            'Implemented caching layer reducing database load by 25%',
            'Delivered APIs supporting multiple frontend and mobile applications',
        ];
        for (const b of wimetrix) drawBullet(b);

        // ── EDUCATION ────────────────────────────────────────────────────────────
        drawH2('Education');
        checkY(10);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(SZ.h3);
        setColor(BLACK);
        doc.text('Bachelor of Science in Computer Science (BSCS)', MARGIN_LEFT, y);
        y += 5;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(SZ.body);
        setColor(GREY);
        doc.text('Forman Christian College, Lahore  |  2016 – 2020', MARGIN_LEFT, y);
        y += 5;
        drawBullet('Final Year Project: Social Media Predictive Analytics System (ML-based, 85% accuracy)');
        drawBullet('Relevant Coursework: Data Structures, Algorithms, Database Systems, Software Engineering');

        // ── CERTIFICATIONS ───────────────────────────────────────────────────────
        drawH2('Certifications');
        drawBullet('Introduction to Data Analytics for Business — University of Colorado Boulder (2024)');

        // ── ADDITIONAL ───────────────────────────────────────────────────────────
        drawH2('Additional Information');
        drawSkillRow('Languages', 'English (Professional), Urdu (Native)');
        drawSkillRow('Interests', 'Technical content creation, photography, competitive gaming');

        // ── PAGE NUMBERS ─────────────────────────────────────────────────────────
        stampPageNumbers(doc.getNumberOfPages());

        return doc;
    }

    // ── Public API ─────────────────────────────────────────────────────────────
    const generatePdf = () => {
        try {
            const pdfDoc = buildPdf();
            pdfDoc.save('Hamza_Butt_Resume.pdf');
        } catch (err) {
            console.error('PDF generation error:', err);
        }
    };

    return { generatePdf };
}