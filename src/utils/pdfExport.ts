import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import type { Big5Scores, MBTIScores, TestType } from "./types";

type JsPdfInstance = InstanceType<typeof jsPDF>;
type JsPdfWithAutoTable = JsPdfInstance & {
  lastAutoTable?: { finalY: number };
};

export const exportToPDF = (
  testType: TestType,
  scores: Big5Scores | MBTIScores,
  authorName: string,
  isChildMode: boolean
) => {
  const doc: JsPdfWithAutoTable = new jsPDF();
  const timestamp = new Date().toLocaleString();

  // Header
  doc.setFontSize(22);
  doc.setTextColor(46, 64, 82); // Charcoal Blue
  doc.text("Personality Test Report", 105, 20, { align: "center" });

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`Generated on: ${timestamp}`, 105, 30, { align: "center" });

  if (authorName) {
    doc.setFontSize(14);
    doc.setTextColor(46, 64, 82);
    doc.text(`Prepared for: ${authorName}`, 105, 40, { align: "center" });
  }

  doc.setDrawColor(189, 217, 191); // Tea Green
  doc.line(20, 45, 190, 45);

  // Test Info
  doc.setFontSize(16);
  doc.text("Test Information", 20, 60);

  const testInfo = [
    [
      "Test Type",
      testType === "big5" ? "Big Five (OCEAN)" : "Myers-Briggs (MBTI)",
    ],
    ["Mode", isChildMode ? "Child-Friendly" : "Standard"],
  ];

  autoTable(doc, {
    startY: 65,
    head: [["Category", "Details"]],
    body: testInfo,
    theme: "striped",
    headStyles: { fillColor: [46, 64, 82] },
  });

  // Results
  doc.setFontSize(16);
  const afterTestInfoY = (doc.lastAutoTable?.finalY ?? 65) + 15;
  doc.text("Results Summary", 20, afterTestInfoY);

  if (testType === "big5") {
    const s = scores as Big5Scores;
    const big5Data = [
      ["Openness", `${s.Openness}%`],
      ["Conscientiousness", `${s.Conscientiousness}%`],
      ["Extraversion", `${s.Extraversion}%`],
      ["Agreeableness", `${s.Agreeableness}%`],
      ["Neuroticism", `${s.Neuroticism}%`],
    ];

    const startY = (doc.lastAutoTable?.finalY ?? 65) + 20;
    autoTable(doc, {
      startY,
      head: [["Trait", "Score"]],
      body: big5Data,
      theme: "grid",
      headStyles: { fillColor: [65, 34, 52] }, // Midnight Violet
    });
  } else {
    const s = scores as MBTIScores;
    doc.setFontSize(24);
    doc.setTextColor(65, 34, 52);
    const typeY = (doc.lastAutoTable?.finalY ?? 65) + 25;
    doc.text(`Type: ${s.type}`, 105, typeY, { align: "center" });

    const mbtiData = [
      ["Extraversion (E) vs Introversion (I)", `${s.E}% / ${s.I}%`],
      ["Sensing (S) vs Intuition (N)", `${s.S}% / ${s.N}%`],
      ["Thinking (T) vs Feeling (F)", `${s.T}% / ${s.F}%`],
      ["Judging (J) vs Perceiving (P)", `${s.J}% / ${s.P}%`],
    ];

    autoTable(doc, {
      startY: (doc.lastAutoTable?.finalY ?? 65) + 35,
      head: [["Dichotomy", "Breakdown"]],
      body: mbtiData,
      theme: "grid",
      headStyles: { fillColor: [65, 34, 52] },
    });
  }

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Personality Test Tool - Confidential Report",
      105,
      doc.internal.pageSize.getHeight() - 10,
      { align: "center" }
    );
  }

  doc.save(`personality-report-${testType}-${new Date().getTime()}.pdf`);
};
