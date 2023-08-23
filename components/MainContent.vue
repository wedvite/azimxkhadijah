<template>
  <div v-if="i.override_main">
    <!-- floating logged in button -->
    <div v-if="user" class="container floating-container">
      <router-link
        to="/user"
        tag="button"
        class="floating-button no-select container no-select"
      >
        <div class="has-text-link">User Dashboard</div>
      </router-link>
    </div>
    <img src="~assets/frames/custom/custom.png" alt="" />
  </div>
  <section
    v-else
    id="main-content"
    class="hero is-fullheight"
    :class="[
      'bg-' + i.theme,
      'bg-image-' + i.theme,
      i.main_section && i.main_section.text_transform
        ? i.main_section.text_transform
        : '',
    ]"
  >
    <!-- floating logged in button -->
    <div v-if="user" class="container floating-container">
      <router-link
        to="/user"
        tag="button"
        class="floating-button no-select container no-select"
      >
        <div class="has-text-link">User Dashboard</div>
      </router-link>
    </div>
    <div class="hero-body">
      <div class="container has-text-centered">
        <!-- <img
					data-aos="zoom-in"
					data-aos-duration="1000"
					data-aos-delay="500"
					src="~/assets/images/bismillah.png"
					alt="bismillahirrahmanirrahim"
					style="width: 35%; margin-bottom: 0.5rem"
				/> -->
        <div
          data-aos="zoom-in"
          data-aos-offset="0"
          data-aos-duration="1000"
          data-aos-delay="500"
          class="main-content-title"
          :class="'title-' + i.theme"
        >
          {{ i.main_section.title }}
        </div>

        <div
          class="couples"
          :class="[
            'couples-' + i.theme,
            i.groom_or_bride_first === 'bride' ? 'reverse' : '',
            i.main_section && i.main_section.couples_text_transform
              ? i.main_section.couples_text_transform
              : '',
          ]"
        >
          <div
            :data-aos="
              i.groom_or_bride_first === 'bride' ? 'fade-left' : 'fade-right'
            "
            data-aos-offset="0"
            data-aos-duration="2000"
            data-aos-delay="500"
            class="groom"
          >
            {{ i.groom[i.main_section.name_type] }}
          </div>
          <div
            data-aos="zoom-in"
            data-aos-duration="1000"
            data-aos-delay="500"
            class="amp"
          >
            &amp;
          </div>
          <div
            :data-aos="
              i.groom_or_bride_first === 'groom' ? 'fade-left' : 'fade-right'
            "
            data-aos-offset="0"
            data-aos-duration="2000"
            data-aos-delay="500"
            class="bride"
          >
            {{ i.bride[i.main_section.name_type] }}
          </div>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-offset="0"
          data-aos-duration="1000"
          data-aos-delay="500"
          class="dates"
          :class="'dates-' + i.theme"
          style="margin-top: 1rem"
        >
          <div v-if="!i.date.gregObj" class="date-gregorian">{{ i.date.greg }}</div>
          <div v-else class="date-gregorian">
            <span class="month">{{ i.date.gregObj.month }}</span>
            <span>
              <span class="day">{{ i.date.gregObj.day }}</span>
              <span class="day-number">{{ i.date.gregObj.date }}</span>
              <span class="time">{{ i.date.gregObj.time}}</span>
            </span>
            <span class="year">{{ i.date.gregObj.year }}</span>
          </div>
          <div v-if="i.date.hijri" class="date-hijri">
            {{ i.date.hijri }}
          </div>
        </div>

        <div
          data-aos="zoom-in"
          data-aos-offset="0"
          data-aos-duration="1000"
          data-aos-delay="500"
          class="venue"
          :class="'venue-' + i.theme"
          v-html="i.address.general"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      i: (state) => state.info,
      theme: (state) => state.info.theme,
      user: (state) => state.auth.user,
    }),
  },
};
</script>


<style lang="scss" scoped>
@import "~assets/scss/var.scss";

#main-content {
  -webkit-background-size: 100% 100%;
  -moz-background-size: 100% 100%;
  -o-background-size: 100% 100%;
  background-size: 100% 100%;
}

@media (min-width: 320px) and (max-width: 1024px) and (orientation: landscape) {
  #main-content {
    height: 720px;
  }
}

// .hero-body {
//   margin-bottom: 3rem;
// }

.main-content-title {
  margin-bottom: 0.5rem;
  font-size: 1rem;
}

.couples {
  display: flex;
  flex-direction: column;
  font-family: $cover-font;
  font-size: 4rem;
  // margin-bottom: 1rem;
  line-height: 0.9;

  &.reverse {
    flex-direction: column-reverse;
  }

  & > .amp {
    line-height: 1;
    font-size: 2rem;
  }
}

.date-gregorian,
.venue {
  font-family: $primary-font;
}

.date-gregorian {
  margin-top: 2rem;
  margin-bottom: 1rem;
  .month,
  .year {
    display: block;
    letter-spacing: 2px;
    font-size: 1rem;
  }

  .day,
  .time {
    display: inline-block;
    padding: 0px 5px;
    text-align: center;
    vertical-align: middle;
    border-top: 1px solid;
    border-bottom: 1px solid;
    font-size: 1rem;
    width: 70px;
  }

  .day-number {
    display: inline-block;
    padding: 0px 5px;
    text-align: center;
    vertical-align: middle;
    font-size: 3.5rem;
    line-height: 1;
  }
}

.floating-container {
  position: fixed;
  width: 100%;
  padding: 0 10px;
  top: 10px;
  z-index: 99;
  background: white;
  // text-align: right;
  -webkit-transform: translateZ(1);
  background: transparent;
  .floating-button {
    cursor: pointer;
    z-index: 99;
    border-radius: 50px;
    text-align: center;
    float: none;
    width: 100%;
    height: 40px;
  }
}
</style>

