import React from 'react';
import ReactPDF, { Page, Text, View, Document, StyleSheet, Rect, Svg, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReactDOM from 'react-dom';

  const styles = StyleSheet.create({
    page: { padding: 60 },
  });

  const Doc = ()=> (
      <Document>
        <Page style={styles.page} size="A4">
          <Svg viewBox="0 0 220 100">
            <Rect
              x="120"
              rx="25"
              ry="25"
              width="100"
              height="100"
              stroke="black"
              strokeWidth="2"
            />
          </Svg>
        </Page>
      </Document>
  )
function RendererPdf() {


  return (
    <PDFDownloadLink document={<Doc />} fileName="Ostoslista.pdf">
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : 'Download now!'
      }
    </PDFDownloadLink>
  )
}

export default RendererPdf