// components/TicketPDF.jsx

import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: "Helvetica",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  userBlock: {
    marginBottom: 10,
    padding: 10,
    border: "1px solid #ccc",
    borderRadius: 4,
  },
});

export const TicketGenerator = ({ ticketData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Event Ticket Summary</Text>

      <View style={styles.section}>
        <Text>Event Name: {ticketData.event?.eName}</Text>
        <Text>Event ID: {ticketData.eventId}</Text>
        <Text>Transaction ID: {ticketData.transactionId}</Text>
        <Text>
          Price per ticket: {ticketData.currency} {ticketData.ticketPrice}
        </Text>
      </View>

      <Text style={styles.heading}>Attendees</Text>

      {(ticketData.userJson || []).map((user, index) => (
        <View key={index} style={styles.userBlock}>
          <Text>Name: {user.name}</Text>
          <Text>Email: {user.email}</Text>
          <Text>Ticket Type: {user.ticketType}</Text>
        </View>
      ))}

      <Text style={{ marginTop: 20, textAlign: "center", color: "green" }}>
        Thank you for your purchase!
      </Text>
    </Page>
  </Document>
);
