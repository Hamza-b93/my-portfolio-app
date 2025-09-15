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
    doc.text("Software Engineer", 20, 35);
    
    // Add contact information in a cleaner format
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'normal');
    
    // Contact info section
    let yPos = 50;
    doc.text("Email: hamza.b93@protonmail.com", 20, yPos);
    doc.text("Phone: +92-319-5040505", pageWidth/2, yPos);
    yPos += 7;
    doc.text("Date of Birth: 19-06-1993", 20, yPos);
    doc.text("Location: Pakistan", pageWidth/2, yPos);
    
    // Add a line separator
    doc.setDrawColor(210, 210, 210);
    doc.line(20, 65, pageWidth - 20, 65);
    
    // Add Work Experience section
    yPos = 75;
    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210);
    doc.setFont(undefined, 'bold');
    doc.text("Work Experience", 20, yPos);
    
    // Add experience details
    yPos += 10;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text("Senior Software Engineer - OnStak", 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text("April 2022 – Present", 20, yPos);
    
    // Add responsibilities with better formatting
    yPos += 8;
    doc.setFontSize(11);
    const experiencePoints = [
      "Worked on the migration of client's AI based chatbot application to a new server instance (Military Mutual Project)",
      "Migrated the database (SupaBase) while retaining all authentication and authorization functionality and data",
      "Created deployment pipeline using GitHub for automated deployment",
      "Worked on the design and development aspect of Pakistan Cricket Board's custom player analytics solution (PCB-Cloud)",
      "Created entire Backend structure in Node.js using Fastify, MYSQL, Prisma ORM",
      "Implemented authentication, user registration and role based access using JWTs",
      "Implemented in-app notifications using MQTT PubSub methodologies",
      "Guided junior development resources in functionality enhancement",
      "Assigned tasks to junior resources and helped them accomplish tasks in a timely manner",
      "Developed CI/CD Pipelines for code deployment using GitHub Actions, GitHub Runners and Podman",
      "Acted as de facto tech lead on multiple client projects"
    ];
    
    experiencePoints.forEach(point => {
      // Split long lines
      const lines = doc.splitTextToSize(point, pageWidth - 35);
      lines.forEach(line => {
        doc.text("• " + line, 25, yPos);
        yPos += 6;
      });
    });
    
    // Add next position
    yPos += 5;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text("Junior Software Engineer - OnStak", 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text("April 2022 – January 2025", 20, yPos);
    
    // Add responsibilities
    yPos += 8;
    doc.setFontSize(11);
    const juniorExperiencePoints = [
      "Worked on the development aspect of KFC Pakistan's Drive-Thru management and analytics application",
      "Created entire Backend structure in Node.js using Express.js, MYSQL, Sequelize ORM",
      "Implemented authentication, user registration and role based access using JWTs",
      "Briefly worked on integration of third-party Point-Of-Sale terminal APIs",
      "Developed solution to store data regarding drive-thru customers based on ML model events",
      "Implemented features to generate reports based on this data",
      "Worked on the company's primary product (ML and computer vision based analytics platform)",
      "Integrated role based and tenant based authorization in the software solution",
      "Made use of deployment strategies like Podman and Docker"
    ];
    
    juniorExperiencePoints.forEach(point => {
      const lines = doc.splitTextToSize(point, pageWidth - 35);
      lines.forEach(line => {
        doc.text("• " + line, 25, yPos);
        yPos += 6;
      });
    });
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Add next position
    yPos += 5;
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text("Associate Software Engineer - Wi-Metrix", 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text("July 2021 – April 2022", 20, yPos);
    
    // Add responsibilities
    yPos += 8;
    doc.setFontSize(11);
    const associateExperiencePoints = [
      "Worked on the development aspect of the company's production line management system for textile industry",
      "Helped in maintaining the backend codebase for this software solution",
      "Added new features in the codebase based on various client requirements",
      "Worked on developing and integrating basic level caching mechanisms using node cache",
      "Worked on integrating backend REST APIs with frontend engineers and Android applications"
    ];
    
    associateExperiencePoints.forEach(point => {
      const lines = doc.splitTextToSize(point, pageWidth - 35);
      lines.forEach(line => {
        doc.text("• " + line, 25, yPos);
        yPos += 6;
      });
    });
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Add Skills section with proper spacing
    yPos += 10; // Add extra space before section
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
    doc.text("Core Skills:", 20, yPos);
    yPos += 7;
    doc.setFont(undefined, 'normal');
    const coreSkills = "Node.js, JavaScript, Git, Docker, Podman, Vue.js, SQL, NOSQL, Linux, POSTGRESQL, " +
      "SupaBase, Alibaba Cloud, Web Sockets";
    const coreSkillsLines = doc.splitTextToSize(coreSkills, pageWidth - 35);
    coreSkillsLines.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 6;
    });
    
    yPos += 8; // Add extra space between skill sections
    
    // Supporting Skills
    doc.setFont(undefined, 'bold');
    doc.text("Supporting Skills:", 20, yPos);
    yPos += 7;
    doc.setFont(undefined, 'normal');
    const supportingSkills = "Nuxt.js, Linux, HTML, Bootstrap, CSS, Tailwind CSS, POSTGRESQL, SupaBase, " +
      "MySQL, MongoDB, Firebase, AWS, Fastify, Express.js, MQTT, Prisma, Sequelize, Socket.IO";
    const supportingSkillsLines = doc.splitTextToSize(supportingSkills, pageWidth - 35);
    supportingSkillsLines.forEach(line => {
      doc.text(line, 25, yPos);
      yPos += 6;
    });
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Add Education section with proper spacing
    yPos += 15; // Add extra space before section
    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210);
    doc.setFont(undefined, 'bold');
    doc.text("Education", 20, yPos);
    yPos += 12; // Add extra space after section title
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text("Bachelors Of Computer Science (BCS) - Forman Christian College", 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text("2016-2020", 20, yPos);
    
    // Key Skills
    yPos += 7;
    doc.setFont(undefined, 'bold');
    doc.text("Key Skills:", 25, yPos);
    yPos += 6;
    doc.setFont(undefined, 'normal');
    doc.text("Linux, Bootstrap", 30, yPos);
    
    // Final Year Project
    yPos += 7;
    doc.setFont(undefined, 'bold');
    doc.text("Final Year Project:", 25, yPos);
    yPos += 6;
    doc.setFont(undefined, 'normal');
    const projectText = "Social Media Predictive Analytics System. Used Machine Learning and " +
      "Predictive Analytics models to predict social media post reach.";
    const projectLines = doc.splitTextToSize(projectText, pageWidth - 35);
    projectLines.forEach(line => {
      doc.text(line, 30, yPos);
      yPos += 6;
    });
    
    yPos += 10; // Add extra space before next education entry
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text("A'Levels - Beaconhouse Defence Campus Lahore", 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text("2012-2014", 20, yPos);
    
    yPos += 10; // Add extra space before next education entry
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.setFont(undefined, 'bold');
    doc.text("O'Levels - DHA Senior School For Boys Lahore", 20, yPos);
    yPos += 7;
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    doc.text("2008-2012", 20, yPos);
    
    // Add new page for Certifications and Achievements
    doc.addPage();
    yPos = 20;
    
    // Add Certifications section with proper spacing
    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210);
    doc.setFont(undefined, 'bold');
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
      doc.text("• " + line, 20, yPos);
      yPos += 6;
    });
    
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Add Interests section
    yPos += 15; // Add extra space before section
    doc.setFontSize(20);
    doc.setTextColor(25, 118, 210);
    doc.setFont(undefined, 'bold');
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
      doc.text("• " + interests[i], 20, interestsY);
      interestsY += 7;
    }
    
    // Second column
    interestsY = yPos;
    for (let i = midPoint; i < interests.length; i++) {
      doc.text("• " + interests[i], pageWidth/2, interestsY);
      interestsY += 7;
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
    doc.save("Hamza_Butt_Professional_Portfolio.pdf");
  };
  
  return {
    generatePdf
  };
}