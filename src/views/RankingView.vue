<template>
  <div class="ranking-page">
    <div class="ranking-frame">
      <!-- Display of top 3 -->
      <div class="top3-frame">
        <!-- First Place -->
        <div id="champion" class="top3-details" v-if="leaderboard.length > 0">
          <img src="../assets/gold.svg">
          <p class="username">{{ leaderboard[0].userName }}</p>
          <p class="scores">{{ leaderboard[0].scores }} pts</p>
          <p class="accuracy">{{ leaderboard[0].accuracy }}%</p>
        </div>

        <!-- Second and Third Place -->
        <div id="rank-2-3">
          <div id="silver-prize" class="top3-details" v-if="leaderboard.length > 1">
            <img src="../assets/silver.svg">
            <p class="username">{{ leaderboard[1].userName }}</p>
            <p class="scores">{{ leaderboard[1].scores }} pts</p>
            <p class="accuracy">{{ leaderboard[1].accuracy }}%</p>
          </div>

          <div id="bronzer-prize" class="top3-details" v-if="leaderboard.length > 2">
            <img src="../assets/bronze.svg">
            <p class="username">{{ leaderboard[2].userName }}</p>
            <p class="scores">{{ leaderboard[2].scores }} pts</p>
            <p class="accuracy">{{ leaderboard[2].accuracy }}%</p>
          </div>
        </div>
      </div>

      <!-- Display of other rankings -->
      <div class="other-ranking-frame" ref="scrollContainer">
        <div v-for="(user, index) in leaderboard.slice(3, 30)" :key="index" class="other-ranking-details">
          <p class="ranking">{{ index + 4 }}</p>
          <p class="username">{{ user.userName }}</p>
          <p class="scores">{{ user.scores }} pts</p>
          <p class="accuracy">{{ user.accuracy }}%</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import request from "@/utils/request";

export default {
  data() {
    return {
      leaderboard: [], // Stores leaderboard data
      scrollInterval: null, // Reference for the scrolling interval
      currentScroll: 0, // Current scroll position
      refreshInterval: null, // Reference for the data refresh interval
    };
  },
  methods: {
    // Fetch leaderboard data from the backend
    fetchLeaderboard() {
      request.get("/ranking/getRanking").then((res) => {
        // Get the data processed by the backend
        this.leaderboard = res.data;

        // Ensure scroll position is maintained after updating data to avoid jumps
        this.$nextTick(() => {
          if (this.$refs.scrollContainer) {
            this.$refs.scrollContainer.scrollTop = this.currentScroll; // Restore scroll position
          }
          this.startAutoScroll(); // Ensure continuous scrolling after data update
        });
      });
    },
    // Automatic scrolling method
    startAutoScroll() {
      const container = this.$refs.scrollContainer;

      if (this.scrollInterval) {
        clearInterval(this.scrollInterval); // Prevent creation of duplicate intervals
      }

      let scrollHeight = container.scrollHeight;
      let scrollStep = 1;  // Scroll 1px each time

      const scroll = () => {
        scrollHeight = container.scrollHeight; // Ensure up-to-date scroll height

        // When reaching the bottom, start from the top
        if (this.currentScroll >= scrollHeight - container.clientHeight) {
          container.style.transition = "none"; // Disable transition effect
          this.currentScroll = 0; // Reset scroll position
          container.scrollTop = this.currentScroll;
        }

        // Enable smooth scrolling
        setTimeout(() => {
          container.style.transition = "scroll-top 0.5s ease"; // Enable smooth transition
          this.currentScroll += scrollStep; // Continue scrolling down
          container.scrollTop = this.currentScroll;
        }, 20); // Short delay to avoid flickering
      };

      // Set the scroll interval
      this.scrollInterval = setInterval(scroll, 50); // Scroll 1px every 50ms
    },
  },
  mounted() {
    // Fetch leaderboard data when the component loads
    this.fetchLeaderboard();

    // Periodically refresh leaderboard data
    this.refreshInterval = setInterval(() => {
      this.fetchLeaderboard();
    }, 5000); // Refresh data every 5 seconds
  },
  beforeDestroy() {
    // Clear intervals for scrolling and data refresh to avoid memory leaks
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
    }
  }
};

</script>

<style>
.ranking-page {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("@/assets/BackgroundImage 3.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.ranking-frame {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1244px;
  border-radius: 21px;
  background: rgba(255, 255, 255, 0.45);
  flex-direction: column;
  padding: 24px;
}

.top3-frame {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}

#rank-2-3 {
  display: flex;
  justify-content: space-between;
}

.top3-details {
  position: relative;
  margin: 0 20px;
}

.top3-details p {
  position: absolute;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 36px;
  font-style: normal;
  font-weight: 1000;
  line-height: normal;
  margin: 0;
}

.top3-details .username {
  position: absolute;
  top: 24px;
  left: 185px;
}

.top3-details .scores {
  position: absolute;
  top: 75px;
  left: 185px;
}

.top3-details .accuracy {
  position: absolute;
  top: 75px;
  left: 350px;
}

#champion {
  color: #fd822b;
}

#silver-prize {
  color: #7e8b8d;
}

#bronzer-prize {
  color: #ae6c48;
}

.other-ranking-frame {
  width: 100%;
  max-height: 450px; /* Limit the max height for scrolling after 10 users */
  overflow-y: scroll;
  scrollbar-width: none; /* Hide scrollbar for Firefox */
}

.other-ranking-frame::-webkit-scrollbar {
  display: none; /* Hide scrollbar for Chrome, Safari */
}

.other-ranking-details {
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 100px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.15);
  margin-top: 8px;
}

.other-ranking-details p {
  color: #000;
  margin: 8px 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 36px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
}

/* Ensure padding for the first and last items */
.other-ranking-details .ranking {
  flex: 1;
  text-align: left;
  padding-left: 36px; /* Left padding */
}

.other-ranking-details .username {
  flex: 2;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.other-ranking-details .scores {
  color: #79b5b5;
  flex: 1;
  text-align: center;
}

.other-ranking-details .accuracy {
  color: #79b5b5;
  flex: 1;
  text-align: right;
  padding-right: 36px; /* Right padding */
}

@media (orientation: portrait) {
  .ranking-frame{
    transform: scale(0.6);
  }
}
</style>
