<template>
  <div v-if="showModal" class="modal-overlay">
    <div class="modal-content">
      <button class="close-btn" @click="closeModal">✖</button>
      <h2>Terms of Use</h2>

      <!-- You can Customize this cookies to fit your requirements      -->
      <p>We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our Cookie Policy.</p>

      <div class="modal-actions">
        <button class="accept-btn" @click="acceptTerms">Accept</button>
        <button class="preferences-btn" @click="openPreferences">Preferences</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.modal-actions {
  margin-top: 20px;
}

.accept-btn {
  background-color: #1a1a2c;
  color: white;
  border: none;
  padding: 10px 20px;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
}

.preferences-btn {
  background-color: #e0e0e0;
  color: #1a1a2c;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 5px;
}

.accept-btn:hover,
.preferences-btn:hover {
  opacity: 0.9;
}
</style>

<script>
export default {
  data() {
    return {
      showModal: true, // Controls the visibility of the modal
    };
  },
  methods: {
    acceptTerms() {
      // Logic to handle acceptance, e.g., setting a localStorage flag
      localStorage.setItem('termsAccepted', true);
      this.showModal = false;
    },
    closeModal() {
      // Optional: Allow the user to close the modal without accepting
      this.showModal = false;
    },
    openPreferences() {
      // Placeholder for preferences functionality
      alert('Preferences clicked');
    },
  },
  mounted() {
    // Check if the terms have already been accepted
    if (localStorage.getItem('termsAccepted')) {
      this.showModal = false;
    }
  },
};
</script>
