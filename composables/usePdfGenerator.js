import jsPDF from 'jspdf';
import 'jspdf-autotable';

export function usePdfGenerator() {
    const generatePdf = () => {
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
        // Define safe margins
        const marginTop = 20;
        const marginBottom = 20; // Increased from default to accommodate footer
        const marginLeft = 20;
        const marginRight = 20;
        // Define content boundaries
        const contentHeight = pageHeight - marginTop - marginBottom;

        // Add header with name
        doc.setFillColor(25, 118, 210); // Blue background
        doc.rect(0, 0, pageWidth, 40, 'F'); // Draw rectangle

        doc.setFontSize(28);
        doc.setTextColor(255, 255, 255); // White text
        doc.setFont(undefined, 'bold');
        doc.text("Hamza Butt", 20, 25);

        doc.setFontSize(16);
        doc.setTextColor(255, 255, 255);
        doc.setFont(undefined, 'normal');
        doc.text("Senior Software Engineer", 20, 35);

        // Add contact information in a cleaner format
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');

        // Contact info section
        let yPos = 50;
        doc.text("Email: hamza.b93@protonmail.com", 20, yPos);
        doc.text("Phone: +92-319-5040505", pageWidth / 2, yPos);
        yPos += 7;
        doc.text("Date of Birth: 19-06-1993", 20, yPos);
        doc.text("Location: Pakistan", pageWidth / 2, yPos);
        yPos += 7;
        doc.text("LinkedIn: https://www.linkedin.com/in/hamzabutt96/", 20, yPos);
        doc.text("GitHub: https://github.com/Hamza-b93", pageWidth / 2, yPos);

        // Add a line separator
        yPos += 10;
        doc.setDrawColor(200, 200, 200); // Light gray
        doc.line(10, yPos, pageWidth - 10, yPos);
        yPos += 10;

        // Add Bio section with proper spacing
        doc.setFontSize(20);
        doc.setTextColor(25, 118, 210); // Blue color
        doc.setFont(undefined, 'bold');
        doc.text("Professional Summary", 20, yPos);
        yPos += 12; // Add extra space after section title

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');
        const bioText = "I am a Software Engineer with 3+ years of development experience in the industry. " +
            "Having worked on a wide variety of projects, my knowledge and experience makes me a great addition to any development team.";
        const bioLines = doc.splitTextToSize(bioText, pageWidth - 40);
        bioLines.forEach(line => {
            // Check if we need a new page
            if (yPos > pageHeight - marginBottom - 10) {
                doc.addPage();
                yPos = marginTop;
            }
            doc.text(line, 20, yPos);
            yPos += 7;
        });

        // Add Experience section with proper spacing
        yPos += 15; // Add extra space before section
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }

        doc.setFontSize(20);
        doc.setTextColor(25, 118, 210);
        doc.setFont(undefined, 'bold');
        doc.text("Work Experience", 20, yPos);
        yPos += 12; // Add extra space after section title

        // Add positions
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Senior Software Engineer - OnStak", 20, yPos);
        yPos += 7;
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text("April 2025 – Present", 20, yPos);

        // Add responsibilities
        yPos += 8;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Privacy And Regulatory Compliance Framework (OnStak inc.)", 20, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');

        const privacyCompliancePoints = [
            "Worked on designing and developing a regulatory compliance framework for OnStak Inc. so that our products and solutions would be more regulatory compliant with GDPR and CCPA",
            "Aligned database design and data processing workflows with GDPR and CCPA requirements, including implementing data encryption at rest and in transit, data minimization practices, and right to deletion functionalities",
            "Collaborated closely with frontend and backend development teams to implement necessary changes for compliance, including cookie consent management, data access request handling, and privacy policy integration",
            "Established audit trails and logging mechanisms to track data access and processing activities for compliance verification purposes",
            "Conducted privacy impact assessments and worked with legal team to ensure all data handling procedures met regulatory standards"
        ];

        privacyCompliancePoints.forEach(point => {
            const lines = doc.splitTextToSize(point, pageWidth - 30);
            lines.forEach(line => {
                // Check if we need a new page
                if (yPos > pageHeight - marginBottom - 10) {
                    doc.addPage();
                    yPos = marginTop;
                }
                doc.text("• " + line, 25, yPos);
                yPos += 6;
            });
        });

        // Add next project
        yPos += 5;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Predictive Maintenance (Express.js + (Node.js) + POSTGRESQL + AWS S3 Bucket Service + JWT)", 20, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');

        const predictiveMaintenancePoints = [
            "Worked on the design and development of an AI based Predictive Maintenance system that is designed to observe and measure various sensor parameters of a Vehicle Assembly Line and make predictions about hardware failure and overall efficiency",
            "Setup complete database with authentication and tenant based access control in POSTGRESQL",
            "Setup Docker based deployment pipeline using GitHub Actions and Github Runners",
            "Implemented AWS S3 Bucket based storage solution for file uploads"
        ];

        predictiveMaintenancePoints.forEach(point => {
            const lines = doc.splitTextToSize(point, pageWidth - 30);
            lines.forEach(line => {
                // Check if we need a new page
                if (yPos > pageHeight - marginBottom - 10) {
                    doc.addPage();
                    yPos = marginTop;
                }
                doc.text("• " + line, 25, yPos);
                yPos += 6;
            });
        });

        // Add Military Mutual project
        yPos += 5;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Military Mutual (SupaBase + Vercel + GitHub)", 20, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');

        const militaryMutualPoints = [
            "Worked on the migration of client's AI based chatbot application to a new server instance",
            "Migrated the database (SupaBase) while retaining all authentication and authorization functionality and data",
            "Created deployment pipeline using GitHub for automated deployment"
        ];

        militaryMutualPoints.forEach(point => {
            const lines = doc.splitTextToSize(point, pageWidth - 30);
            lines.forEach(line => {
                // Check if we need a new page
                if (yPos > pageHeight - marginBottom - 10) {
                    doc.addPage();
                    yPos = marginTop;
                }
                doc.text("• " + line, 25, yPos);
                yPos += 6;
            });
        });

        // Add PCB-Cloud project
        yPos += 5;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("PCB-Cloud (Node.js + Fastify + MYSQL + Prisma + JWT + MQTT)", 20, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');

        const pcbCloudPoints = [
            "Worked on the design and development aspect of Pakistan Cricket Board's custom player analytics solution (Backend)",
            "Created entire Backend structure in Node.js using Fastify as the Backend framework, MYSQL as the database and Prisma as the ORM",
            "Implemented authentication, user registration and role based access using JSON Web Tokens (JWTs)",
            "Implemented in-app notifications using MQTT PubSub methodologies",
            "Guided junior development resources in-terms of functionality enhancement for the project",
            "Assigned tasks to junior resources working on this project and helped these resources accomplish tasks in a timely manner",
            "Developed CI/CD Pipelines for code deployment inside containerized environments using GitHub Actions, GitHub Runners and Podman",
            "Acted as de facto tech lead on multiple client projects, managing task allocation, code reviews, and architectural decisions",
            "Basic familiarity with TypeScript and AWS services like EC2, S3 (used for small-scale deployment or testing environments)"
        ];

        pcbCloudPoints.forEach(point => {
            const lines = doc.splitTextToSize(point, pageWidth - 30);
            lines.forEach(line => {
                // Check if we need a new page
                if (yPos > pageHeight - marginBottom - 10) {
                    doc.addPage();
                    yPos = marginTop;
                }
                doc.text("• " + line, 25, yPos);
                yPos += 6;
            });
        });

        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }

        // Add next position
        yPos += 5;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Junior Software Engineer - OnStak", 20, yPos);
        yPos += 7;
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text("April 2022 – January 2025", 20, yPos);

        // Add responsibilities
        yPos += 8;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("KFC Drive-Thru Analytics (Node.js + Express + MYSQL + Sequelize + JWT)", 20, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');

        const kfcPoints = [
            "Worked on the development aspect of KFC Pakistan's Drive-Thru management and analytics application (backend)",
            "Created entire Backend structure in Node.js using Express.js as the Backend framework, MYSQL as the database and Sequelize as the ORM",
            "Implemented authentication, user registration and role based access using JSON Web Tokens (JWTs)",
            "Briefly worked on the integration of third-party Point-Of-Sale terminal APIs with the application's backend for data synchronization",
            "Developed solution to store data regarding day to day drive-thru customers based on events generated by machine learning models",
            "Also implemented features to generate reports based on this data"
        ];

        kfcPoints.forEach(point => {
            const lines = doc.splitTextToSize(point, pageWidth - 30);
            lines.forEach(line => {
                // Check if we need a new page
                if (yPos > pageHeight - marginBottom - 10) {
                    doc.addPage();
                    yPos = marginTop;
                }
                doc.text("• " + line, 25, yPos);
                yPos += 6;
            });
        });

        // Add Video Analytics Platform project
        yPos += 5;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Video Analytics Platform (Node.js + Express + MYSQL + Sequelize + JWT + AWS Storage)", 20, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');

        const videoAnalyticsPoints = [
            "Worked on the company's primary product (machine learning and computer vision based analytics platform) as a backend engineer",
            "Worked on integrating various machine learning models into the software solution",
            "Integrated role based and tenant based authorization in the software solution",
            "Made use of deployment strategies like Podman and Docker to deploy instances of the platform based on client requirements"
        ];

        videoAnalyticsPoints.forEach(point => {
            const lines = doc.splitTextToSize(point, pageWidth - 30);
            lines.forEach(line => {
                // Check if we need a new page
                if (yPos > pageHeight - marginBottom - 10) {
                    doc.addPage();
                    yPos = marginTop;
                }
                doc.text("• " + line, 25, yPos);
                yPos += 6;
            });
        });

        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }

        // Add next position
        yPos += 5;
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Associate Software Engineer - Wi-Metrix", 20, yPos);
        yPos += 7;
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text("July 2021 – April 2022", 20, yPos);

        // Add responsibilities
        yPos += 8;
        doc.setFontSize(11);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Production Line Management System (Node.js + Express + Microsoft SQL + Sequelize + JWT + Node Cache)", 20, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');

        const productionLinePoints = [
            "Worked on the development aspect of the company's production line management system geared towards the textile industry",
            "Helped in maintaining the backend codebase for this software solution",
            "Added new features in the codebase based on various client requirements",
            "Worked on developing and integrating basic level caching mechanisms using node cache",
            "Worked on integrating backend REST APIs with frontend engineers and Android applications"
        ];

        productionLinePoints.forEach(point => {
            const lines = doc.splitTextToSize(point, pageWidth - 30);
            lines.forEach(line => {
                // Check if we need a new page
                if (yPos > pageHeight - marginBottom - 10) {
                    doc.addPage();
                    yPos = marginTop;
                }
                doc.text("• " + line, 25, yPos);
                yPos += 6;
            });
        });

        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }

        // Add Skills section with proper spacing
        yPos += 10; // Add extra space before section
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.setFontSize(20);
        doc.setTextColor(25, 118, 210);
        doc.setFont(undefined, 'bold');
        doc.text("Skills", 20, yPos);
        yPos += 12; // Add extra space after section title

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');

        // Core Skills
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Core Skills:", 20, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        const coreSkills = "Node.js, JavaScript, Git, Docker, Podman, Vue.js, SQL, NOSQL, Linux, POSTGRESQL, " +
            "SupaBase, Alibaba Cloud, Web Sockets";
        const coreSkillsLines = doc.splitTextToSize(coreSkills, pageWidth - 35);
        coreSkillsLines.forEach(line => {
            // Check if we need a new page
            if (yPos > pageHeight - marginBottom - 10) {
                doc.addPage();
                yPos = marginTop;
            }
            doc.text(line, 25, yPos);
            yPos += 6;
        });

        yPos += 8; // Add extra space between skill sections

        // Supporting Skills
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Supporting Skills:", 20, yPos);
        yPos += 7;
        doc.setFont(undefined, 'normal');
        const supportingSkills = "Nuxt.js, Linux, HTML, Bootstrap, CSS, Tailwind CSS, POSTGRESQL, SupaBase, " +
            "MySQL, MongoDB, Firebase, AWS, Fastify, Express.js, MQTT, Prisma, Sequelize, Socket.IO";
        const supportingSkillsLines = doc.splitTextToSize(supportingSkills, pageWidth - 35);
        supportingSkillsLines.forEach(line => {
            // Check if we need a new page
            if (yPos > pageHeight - marginBottom - 10) {
                doc.addPage();
                yPos = marginTop;
            }
            doc.text(line, 25, yPos);
            yPos += 6;
        });

        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }

        // Add Education section with proper spacing
        yPos += 15; // Add extra space before section
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.setFontSize(20);
        doc.setTextColor(25, 118, 210);
        doc.setFont(undefined, 'bold');
        doc.text("Education", 20, yPos);
        yPos += 12; // Add extra space after section title

        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Bachelors Of Computer Science (BCS) - Forman Christian College", 20, yPos);
        yPos += 7;
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text("2016-2020", 20, yPos);

        // Key Skills
        yPos += 7;
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Key Skills:", 25, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');
        doc.text("Linux, Bootstrap", 30, yPos);

        // Final Year Project
        yPos += 7;
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Final Year Project:", 25, yPos);
        yPos += 6;
        doc.setFont(undefined, 'normal');
        const projectText = "Social Media Predictive Analytics System. Used Machine Learning and " +
            "Predictive Analytics models to predict social media post reach.";
        const projectLines = doc.splitTextToSize(projectText, pageWidth - 35);
        projectLines.forEach(line => {
            // Check if we need a new page
            if (yPos > pageHeight - marginBottom - 10) {
                doc.addPage();
                yPos = marginTop;
            }
            doc.text(line, 30, yPos);
            yPos += 6;
        });

        yPos += 10; // Add extra space before next education entry
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("A'Levels - Beaconhouse Defence Campus Lahore", 20, yPos);
        yPos += 7;
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text("2012-2014", 20, yPos);

        yPos += 10; // Add extra space before next education entry
        doc.setFontSize(14);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("O'Levels - DHA Senior School For Boys Lahore", 20, yPos);
        yPos += 7;
        doc.setFontSize(12);
        doc.setFont(undefined, 'normal');
        doc.text("2008-2012", 20, yPos);

        // Check if we need a new page for the next section
        // Only add a new page if we're close to the bottom
        if (yPos > pageHeight - marginBottom - 50) {
            doc.addPage();
            yPos = marginTop;
        } else {
            // Add some space before the next section
            yPos += 15;
        }

        // Add Certifications section with proper spacing
        doc.setFontSize(20);
        doc.setTextColor(25, 118, 210);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Certifications & Achievements", 20, yPos);
        yPos += 12; // Add extra space after section title

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');

        const certifications = [
            "Introduction to Data Analytics for Business - University Of Colorado Boulder (Coursera)",
            "UX Design Fundamentals - California Institute Of Arts (Coursera)",
            "Visual Elements Of User Interface Design - California Institute Of Arts (Coursera)",
            "Front-End Web UI Frameworks And Tools: Bootstrap 4 - The Hong Kong University Of Science And Technology (Coursera)"
        ];

        certifications.forEach(cert => {
            const lines = doc.splitTextToSize(cert, pageWidth - 30);
            lines.forEach(line => {
                // Check if we need a new page
                if (yPos > pageHeight - marginBottom - 10) {
                    doc.addPage();
                    yPos = marginTop;
                }
                doc.text("• " + line, 20, yPos);
                yPos += 6;
            });
            yPos += 2; // Add small space between items
        });

        // Add Achievement
        yPos += 5;
        const achievement = "Winner Of Forman Computing Society's Freshmen Gaming Competition (Counter Strike) - FCCU FCS 2016";
        const achievementLines = doc.splitTextToSize(achievement, pageWidth - 30);
        achievementLines.forEach(line => {
            // Check if we need a new page
            if (yPos > pageHeight - marginBottom - 10) {
                doc.addPage();
                yPos = marginTop;
            }
            doc.text("• " + line, 20, yPos);
            yPos += 6;
        });

        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }

        // Add Interests section
        yPos += 15; // Add extra space before section
        doc.setFontSize(20);
        doc.setTextColor(25, 118, 210);
        doc.setFont(undefined, 'bold');
        // Check if we need a new page
        if (yPos > pageHeight - marginBottom - 20) {
            doc.addPage();
            yPos = marginTop;
        }
        doc.text("Interests And Hobbies", 20, yPos);
        yPos += 12; // Add extra space after section title

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.setFont(undefined, 'normal');

        const interests = [
            "Photography and videography",
            "Graphics Design (2D and 3D)",
            "Videogames and e-sports",
            "Tennis, Football, Swimming and Hiking",
            "Bilingual (English and Urdu)",
            "Content creation"
        ];

        let interestsY = yPos;
        const midPoint = Math.ceil(interests.length / 2);

        // First column
        for (let i = 0; i < midPoint; i++) {
            // Check if we need a new page
            if (interestsY > pageHeight - marginBottom - 10) {
                doc.addPage();
                interestsY = marginTop;
            }
            doc.text("• " + interests[i], 20, interestsY);
            interestsY += 7;
        }

        // Second column
        interestsY = yPos;
        for (let i = midPoint; i < interests.length; i++) {
            // Check if we need a new page
            if (interestsY > pageHeight - marginBottom - 10) {
                doc.addPage();
                interestsY = marginTop;
            }
            doc.text("• " + interests[i], pageWidth / 2, interestsY);
            interestsY += 7;
        }

        // Add footer with correct page numbering
        const totalPages = doc.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i++) {
            doc.setPage(i);
            const footerY = pageHeight - 10;
            doc.setFontSize(10);
            doc.setTextColor(150, 150, 150);
            doc.text(`Page ${i} of ${totalPages}`, pageWidth - 40, footerY);
        }

        // Save the PDF
        doc.save("Hamza_Butt_Professional_Portfolio.pdf");
    };

    return {
        generatePdf
    };
}