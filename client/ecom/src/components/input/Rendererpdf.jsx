import { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 50 },
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 24,
  },
  container: {
    flexDirection: 'row',
    color: '#000',
    fontSize: '10',
    alignItems: 'center',
    height: 20,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1
  },
  title: {
    width: '100%',
    fontSize: '16',
    textAlign: 'start',
    marginTop: 6,
    marginBottom: 12,
    paddingBottom: 6,
    borderBottomWidth: 3
  },
  header: {
    fontSize: '14',
    marginBottom: 12,
    width: '50%',
    textAlign: 'center'
  },
  description: {
    textAlign: 'center',
    width: '50%',
    borderRightWidth: 1
  },
  box: {
    width: '8%',
    alignItems: 'center',
    alignSelf: 'center',
  },
  rect: {
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 3,
    width: '60%',
    height: '60%'
  },
  amount: {
    width: '10%',
    borderRightWidth: 1
  },
  price: {
    fontWeight: 600,
    width: '50%',
  }
})

const Doc = (props) => (
  <Document>
    <Page style={styles.page} size="A4">
      <View style={styles.tableContainer}>
        <Text style={styles.title}>Ostokori</Text>
        {Object.entries(props.data).map(([key, items]) => (
          <View key={key}>
            {/* Category */}
            <Text style={styles.header}>{key}</Text>
            {/* Items */}
            <DocItems items={items} />
          </View>
        ))}
      </View>
    </Page>
  </Document>
)

const DocItems = (props) => {
  return (
    <View>
      {
        props.items.map((item) => (
          <View key={item.id.ean} style={styles.container}>
            <View style={styles.box}>
              <View style={styles.rect}>
              </View>
            </View>
            <Text style={styles.description}>{item.id.name}</Text>
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        ))
      }
    </View>
  )
}

function RendererPdf(props) {
  return (
    <PDFDownloadLink document={<Doc data={props.data} />} fileName="Ostoslista.pdf">
      {({ blob, url, loading, error }) =>
        <div onClick={props.handleHideLink()}>
          {loading ? 'Ladataan ostoslistaa...' : 'Ostoslista!'}
        </div>
      }
    </PDFDownloadLink>
  )
}

export default RendererPdf