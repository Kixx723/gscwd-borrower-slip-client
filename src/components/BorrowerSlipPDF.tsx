
import { formatDate } from '@/utils/function';
import { Page, Text, View, Document, StyleSheet, Font, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#FFF',
    padding: '40px',
  },
  logo: {
    width: '80px',
    height: '80px',
    position: 'absolute',
    top: '45px',
    left: '50px',
  },
  line: {
    marginTop: '10px', 
    marginBottom: '5px',
    borderBottomWidth: 3,
    borderBottomColor: '#000',
    borderBottomStyle: 'solid',
  },
  title: {
    fontSize: '15px',
    color: 'black',
    marginTop: '5px',
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  tableContainer: {
    marginTop: '5px',
  },
  itemContainer: {
    width: '50%',
    textAlign: 'center',
    border: '3px solid black',
    fontSize: '14px',
    padding: '19px'
  },
  statusContainer: {
    width: '50%',
    textAlign: 'center',
    border: '3px solid black',
    borderLeft: 'none',
    fontSize: '14px',
  },
  borrowed: {
    padding: '5px',
    width: '50%',
    borderTop: '3px solid black',
    borderRight: '1.5px solid black'
  },
  returned: {
    padding: '5px',
    width: '50%',
    borderTop: '3px solid black',
    borderLeft: '1.5px solid black'
  },
  itemDataContainer: {
    width: '50%',
    textAlign: 'center',
    border: '3px solid black',
    borderTop: 'none',
    fontSize: '14px',
    padding: '40px', 
  },
  borrowedContainer: {
    width: '25%',
    textAlign: 'center',
    border: '3px solid black',
    borderLeft: 'none',
    borderTop: 'none',
    fontSize: '10px',
    paddingRight: '3px',
    paddingLeft: '3px',
    paddingTop: '40px',
    paddingBottom: '40px',
  },
  returnedContainer: {
    width: '25%',
    textAlign: 'center',
    border: '3px solid black',
    borderLeft: 'none',
    borderTop: 'none',
    fontSize: '10px',
    paddingRight: '3px',
    paddingLeft: '3px',
    paddingTop: '40px',
    paddingBottom: '40px',
  },         
  signatureContainer: {
    marginTop: '18px',
    fontSize: '14px',
    fontWeight: 'bold',
  }, 

});

const BorrowerSlipPDF = ({ borrower }: any) => (
  <Document>
    <Page size="A4" style={styles.page}>

      <View style={{ textAlign: 'center', position: 'relative' }}>
        <Text style={{ fontSize: '12px'}}>Republic of the Philippines</Text>
        <Text style={{ color: 'blue', fontSize: '15px'}}>GENERAL SANTOS CITY WATER DISTRICT</Text>
        <Text style={{ fontSize: '12px'}}>E. Fernandez St., Brgy. Lagao, General Santos City</Text>
        <Text style={{ fontSize: '12px'}}>Telephone No.: (083)552-3824</Text>
        <Text style={{ fontSize: '12px'}}>E-mail Address: gscwaterdistrict@yahoo.com</Text>
        <Text style={{ color: 'blue', fontSize: '12px', textDecoration: 'underline',}}>www.gensanwater.gov.ph</Text>
      </View>
      <Image style={styles.logo} src="/water.png"/>

      <View style={styles.line}></View>
      <Text style={styles.title}>ICTD - BORROWER&apos;S SLIP</Text>
      
      <View style={styles.tableContainer}>
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.itemContainer}>
            <Text>Item/Equipment Description</Text>
          </View>
            <View style={styles.statusContainer}>
              <Text style={{ padding: '8px', }}>Status</Text>
              <View style={{ flexDirection: 'row', }}>
                <View style={styles.borrowed}>
                  <Text>Borrowed</Text>
                </View>
                <View style={styles.returned}>
                  <Text>Returned</Text> 
                </View>
              </View>
          </View>
        </View>
        
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.itemDataContainer}>
            <Text>{borrower.itemDescription}</Text>
          </View>
          <View style={styles.borrowedContainer}>
            <Text>{formatDate(borrower.createdAt)}</Text>
          </View>
          <View style={styles.returnedContainer}>
            <Text>{borrower?.status === "BORROWED"
                    ? "NOT YET RETURNED"
                    : borrower?.status === "RETURNED"
                    ? formatDate(borrower.updatedAt || "")
                    : ""}</Text>
          </View>
        </View>
      </View>

      <View style={styles.signatureContainer}>
        <Text style={{ position: 'relative' }}>Borrowed by: __________________________</Text>
        <Text style={{ position: 'absolute', marginLeft: '100px' }}>{borrower.name.toUpperCase()}</Text>
        <Text style={{ marginLeft: '100px', marginTop: '2px', fontSize: '13px' }}>Signature over Printed Name</Text>
      </View>

    </Page>
  </Document>
);

export default BorrowerSlipPDF;
