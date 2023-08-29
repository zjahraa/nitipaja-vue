<template>
  <div class="home-screen">
    <div class="form">
      <table class="form-table">
        <tbody>
          <tr>
            <td>Recipient:</td>
            <td><input v-model="recipient" placeholder="Recipient" /></td>
          </tr>
          <tr>
            <td>Subject:</td>
            <td><input v-model="subject" placeholder="Subject" /></td>
          </tr>
          <tr>
            <td>Body:</td>
            <td><input v-model="body" placeholder="Body" /></td>
          </tr>
        </tbody>
      </table>
      <button @click="sendEmail" class="send-button">Send</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recipient: "",
      subject: "",
      body: ""
    };
  },
  methods: {
    async sendEmail() {
      const recipient = this.recipient;
      const subject = this.subject;
      const body = this.body;

      const email = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      try {
        if (await this.canLaunchUrl(email)) {
          await this.launchUrl(email);
        } else {
          console.error("Error launching URL");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    async canLaunchUrl(url) {
      return window.open(url, "_blank");
    },
    async launchUrl(url) {
      return window.open(url, "_blank");
    }
  }
};
</script>

<style scoped>
/* Existing styles for the table-container, .table, .table th, .table td, .home-screen, .form, .send-button */

.home-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.form-table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: separate;
  border-spacing: 0;
}

.form-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

.form-table input {
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.send-button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

</style>
