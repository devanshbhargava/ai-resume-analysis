import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadInterviewReport = () => {

    const downloadPDF = async () => {

        const report =
            document.getElementById(
                "interview-report"
            );

        if (!report) return;

        const canvas =
            await html2canvas(report, {
                scale: 2,
            });

        const imgData =
            canvas.toDataURL("image/png");

        const pdf = new jsPDF(
            "p",
            "mm",
            "a4"
        );

        const pdfWidth =
            pdf.internal.pageSize.getWidth();

        const imgWidth = pdfWidth;

        const imgHeight =
            (canvas.height * imgWidth) /
            canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            imgWidth,
            imgHeight
        );

        pdf.save(
            "AI_Interview_Report.pdf"
        );
    };

    return (

        <button
            className="download-btn"
            onClick={downloadPDF}
        >
            Download PDF Report
        </button>

    );

};

export default DownloadInterviewReport;