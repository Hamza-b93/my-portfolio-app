<template>
  <div id="" class="px-0 container-fluid">
    <div id="row" class="grid grid-rows-1">
      <div id="content" class="bg-slate-950">
        <div
          id=""
          class="grid grid-cols-1 2xl:columns-1 xl:columns-1 lg:columns-1 md:columns-1 sm:columns-1 xs:columns-1"
        >
          <span id="sectionHeading" class="">
            <h1>Core Strengths And Skills</h1>
          </span>
        </div>
        <div
          id=""
          class="grid grid-cols-3 2xl:columns-3 xl:columns-3 lg:columns-3 md:columns-3 sm:columns-3 xs:columns-3"
        >
          <div id="" class="align-middle text-center">
            <span id = 'skill' class = "">
              <Icon name="devicon:nodejs" width="128" height="128" />
              Node.js
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:javascript" width="128" height="128" />
              JavaScript
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:git" width="128" height="128" />
              Git
            </span>
          </div>
        </div>
        <div
          id=""
          class="grid grid-cols-3 2xl:columns-3 xl:columns-3 lg:columns-3 md:columns-3 sm:columns-3 xs:columns-3"
        >
          <div id="" class="align-middle text-center">
            <span id = 'skill' class = "">
              <Icon name="devicon:docker" width="128" height="128" />
              Docker
            </span>
          </div>
          <div id="" class="align-middle text-center">
            <span id = 'skill' class = "">
              <Icon name="devicon:podman" width="128" height="128" />
              Podman
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:express" width="128" height="128" />
              Express.js
            </span>
          </div>
        </div>
        <div
          id=""
          class="grid grid-cols-3 2xl:columns-3 xl:columns-3 lg:columns-3 md:columns-3 sm:columns-3 xs:columns-3"
        >
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:fastify" width="128" height="128" />
              Fastify
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:mongodb" width="128" height="128" />
              MongoDB
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:mysql" width="128" height="128" />
              MySQL
            </span>
          </div>
        </div>
        <div
          id=""
          class="grid grid-cols-3 2xl:columns-3 xl:columns-3 lg:columns-3 md:columns-3 sm:columns-3 xs:columns-3"
        >
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:microsoftsqlserver" width="128" height="128" />
              MSSQL
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:mongoose" width="128" height="128" />
              <!-- <Icon name="devicon:mongoose" width="128" height="128" /> -->
              Mongoose
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="devicon:sequelize" width="128" height="128" />
              Sequelize
            </span>
          </div>
        </div>
        <div
          id=""
          class="grid grid-cols-3 2xl:columns-3 xl:columns-3 lg:columns-3 md:columns-3 sm:columns-3 xs:columns-3"
        >
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="skill-icons:prisma" width="256" height="256" />
              Prisma
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="logos:jwt-icon" width="256" height="257" />
              JWT
            </span>
          </div>
          <div id="skill" class="align-middle text-center">
            <span id = '' class = "">
              <Icon name="simple-icons:zigbee2mqtt" width="24" height="24" />
              MQTT
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  // components: { humanVerification },
  name: "CoreStrengthsAndSkills",
  data() {
    return {
      // name: "Hamza",
      // date: new Date().getDate(),
      // month: new Date().getMonth(),
      // time: new Date().toTimeString(),
      // day: new Date().getDay(),
      // year: new Date().getFullYear(),
      // bold: "<b> Bold Text </b>",
      // blueText: "blueText",
      // pinkText: "pinkText",
      // highlightColor: "orange",
    };
  },
};
</script>

<style lang="css" scoped>
.tracking-in-expand {
  -webkit-animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1)
    1s both;
  animation: tracking-in-expand 0.7s cubic-bezier(0.215, 0.61, 0.355, 1) 1s both;
}

/* ----------------------------------------------
 * Generated by Animista on 2024-4-17 13:25:39
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation tracking-in-expand
 * ----------------------------------------
 */
@-webkit-keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}
@keyframes tracking-in-expand {
  0% {
    letter-spacing: -0.5em;
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
}

/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 640px) {
  body {
    margin: 0;
  }

  #sectionHeading {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Rubik Mono One", serif;
    font-size: 25px;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }

  #skill {
    font-family: "Rubik", serif;
    font-size: 16px;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    color: whitesmoke;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 641px) and (max-width: 767px) {
  body {
    margin: 0;
  }

  #sectionHeading {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Rubik Mono One", serif;
    font-size: 25px;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }

  #skill {
    font-family: "Rubik", serif;
    font-size: 16px;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    color: whitesmoke;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  body {
    margin: 0;
  }

  #sectionHeading {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Rubik Mono One", serif;
    font-size: 25px;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }

  #skill {
    font-family: "Rubik", serif;
    font-size: 16px;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    color: whitesmoke;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 1024px) and (max-width: 1279px) {
  body {
    margin: 0;
  }

  #sectionHeading {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Rubik Mono One", serif;
    font-size: 25px;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }

  #skill {
    font-family: "Rubik", serif;
    font-size: 16px;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    color: whitesmoke;
  }
}

/* Large devices (laptops/desktops, 1280px and up) */
@media only screen and (min-width: 1280px) and (max-width: 1535px) {

  #sectionHeading {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Rubik Mono One", serif;
    font-size: 25px;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }

  #skill {
    font-family: "Rubik", serif;
    font-size: 16px;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    color: whitesmoke;
  }
}

/* Extra large devices (large laptops and desktops, 1536px and up) */
@media only screen and (min-width: 1536px) {

  #sectionHeading {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-family: "Rubik Mono One", serif;
    font-size: 25px;
    font-weight: 400;
    font-style: normal;
    text-align: center;
  }

  #skill {
    font-family: "Rubik", serif;
    font-size: 16px;
    font-optical-sizing: auto;
    font-weight: 300;
    font-style: normal;
    color: whitesmoke;
  }
}
</style>
