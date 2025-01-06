<template>
  <div id="" class="px-0 container-fluid">
    <div id="row" class="grid-rows-1">
      <div id="content" class="bg-slate-950">
        <div
          id=""
          class="grid-cols-2 2xl:columns-2 xl:columns-2 lg:columns-2 md:columns-1 sm:columns-1 xs:columns-1"
        >
          <div id="introSection" class="align-middle text-center">
            <span id="brandText" class="">
              Hi! I Am Hamza. Welcome To My Personal Portfolio Website!
            </span>
            <br />
            <!-- <p id="moto" class="">The Ultimate Streaming Experience!</p> -->
            <br />
            <!-- <form id="" class="">
              <input id="" class="formInput" placeholder="email" type="email" />
              <input
                id=""
                class="formInput"
                placeholder="password"
                type="password"
              />
            </form> -->
            <p id="" class="shortDescription">
              I am a <b>Software Engineer</b> with 3+ years of development
              experience in the industry. Having worked on a wide variety of
              projects, my knowledge and experience makes me a great addition to
              any development team.
            </p>
            <br />
            <div class="grid grid-cols-2 gap-4 px-4 mx-auto max-w-screen-lg">
              <span id="" class="">
                <Icon
                  name="material-symbols:android-contacts"
                  style="color: whitesmoke"
                  id=""
                  class="icons"
                />
                <p id="" class="introDetails">Muhammad Hamza Butt</p>
              </span>
              <span id="" class="">
                <Icon
                  name="material-symbols:calendar-month"
                  style="color: whitesmoke"
                  id=""
                  class="icons"
                />
                <p id="" class="introDetails">19-06-1993</p>
              </span>
              <span id="" class="">
                <Icon
                  name="material-symbols:alternate-email"
                  style="color: whitesmoke"
                  id=""
                  class="icons"
                />
                <p id="" class="introDetails">hamza.b93@protonmail.com</p>
              </span>
              <span id="" class="">
                <Icon
                  name="material-symbols:smartphone"
                  style="color: whitesmoke"
                  id=""
                  class="icons"
                />
                <p id="" class="introDetails">+92-319-5040505</p>
              </span>
              <span id="" class="">
                <a href="https://bit.ly/4fdsGz0">
                  <Icon name="devicon:linkedin" width="128" height="128" />
                </a>
                <!-- <p id="" class=""></p> -->
              </span>
              <span id="" class="">
                <a href="https://bit.ly/4goh1P1">
                  <Icon name="devicon:github" width="128" height="128" />
                </a>
                <!-- <p id="" class=""></p> -->
              </span>
              <span id="" class="">
                <a href="https://bit.ly/3ZtN8pB"
                  ><Icon name="devicon:gitlab" width="128" height="128" /></a>
                <!-- <p id="" class=""></p> -->
              </span>
              <span id="" class="">
                <a href="https://bit.ly/4gtaPW4">
                  <Icon
                    name="bi:sourceforge"
                    style="color: whitesmoke"
                    id=""
                    class="icons"
                  />
                </a>
                <!-- <p id="" class=""></p> -->
              </span>
              <span id="" class="">
                <a href="https://bit.ly/4gtaPW4">
                  <Icon
                    name="simple-icons:indeed"
                    style="color: whitesmoke"
                    id=""
                    class="icons"
                  />
                </a>
                <!-- <p id="" class=""></p> -->
              </span>
              <span id="" class="">
                <a href="https://bit.ly/4gtaPW4">
                  <Icon
                    name="mdi:glassdoor"
                    style="color: whitesmoke"
                    id=""
                    class="icons"
                  />
                </a>
                <!-- <p id="" class=""></p> -->
              </span>
            </div>
          </div>
          <div
            id=""
            class="pentagon h-full md:w-auto 2xl:w-11/12 xl:w-11/12 lg:w-11/12"
          >
            <img
              alt=""
              id=""
              class="images md:w-auto w-full"
              src="../public/favicon.ico"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
export default {
  // components: { humanVerification },
  name: "Bio",
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

  #introSection {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 20%;
  }
  #brandText {
    font-family: "Rubik Mono One", serif;
    font-size: 25px;
    text-align: center;
  }
  .formInput {
    border: 1px solid;
    border-radius: 15px;
    background: transparent;
    border-style: solid;
    border-color: #1858e2;
    font-family: "Rubik", serif;
    font-size: 20px;
    margin: 5px;
    padding: 4px;
  }
  .icons {
    font-size: 25px;
  }
  .icons:hover {
    opacity: 50%;
  }
  .images {
    height: 300px;
    box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
    -webkit-box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
  }
  .introDetails {
    font-size: 16px;
  }
  #moto {
    font-family: "Rubik", serif;
    font-size: 25px;
    text-align: center;
  }
  .shortDescription {
    font-family: "Rubik", serif;
    font-size: 2px;
  }
}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 641px) and (max-width: 767px) {
  body {
    margin: 0;
  }

  #introSection {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 20%;
  }
  #brandText {
    font-family: "Rubik Mono One", serif;
    font-size: 35px;
    text-align: center;
  }
  .formInput {
    border: 1px solid;
    border-radius: 15px;
    background: transparent;
    border-style: solid;
    border-color: #1858e2;
    font-family: "Rubik", serif;
    font-size: 20px;
    margin: 5px;
    overflow-x: scroll;
    padding: 4px;
  }
  .icons {
    font-size: 25px;
  }
  .icons:hover {
    opacity: 50%;
  }
  .images {
    height: 300px;
    box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
    -webkit-box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
  }
  .introDetails {
    font-size: 16px;
  }
  #moto {
    font-family: "Rubik", serif;
    font-size: 25px;
    text-align: center;
  }
  .shortDescription {
    font-family: "Rubik", serif;
    font-size: 2px;
  }
}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) and (max-width: 1023px) {
  body {
    margin: 0;
  }

  #introSection {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 20%;
  }
  #brandText {
    font-family: "Rubik Mono One", serif;
    font-size: 45px;
    text-align: center;
  }
  .formInput {
    border: 1px solid;
    border-radius: 15px;
    background: transparent;
    border-style: solid;
    border-color: #1858e2;
    font-family: "Rubik", serif;
    font-size: 20px;
    margin: 5px;
    overflow-x: scroll;
    padding: 4px;
  }
  .icons {
    font-size: 25px;
  }
  .icons:hover {
    opacity: 50%;
  }
  .images {
    height: 700px;
    width: 100%; /* Set image width to 100% */
    box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
    -webkit-box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
    -moz-box-shadow: 10px 10px 5px 0px rgba(255, 0, 0, 0.75);
  }
  .introDetails {
    font-size: 16px;
  }
  #moto {
    font-family: "Rubik", serif;
    font-size: 25px;
    text-align: center;
  }
  .shortDescription {
    font-family: "Rubik", serif;
    font-size: 2px;
  }
}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 1024px) and (max-width: 1279px) {
  body {
    margin: 0;
  }

  #introSection {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 20%;
  }
  #brandText {
    font-family: "Rubik Mono One", serif;
    font-size: 35px;
    text-align: center;
  }
  .formInput {
    border: 1px solid;
    border-radius: 15px;
    background: transparent;
    border-style: solid;
    border-color: #1858e2;
    font-family: "Rubik", serif;
    font-size: 20px;
    margin: 5px;
    overflow-x: scroll;
    padding: 4px;
  }
  .icons {
    font-size: 25px;
  }
  .icons:hover {
    opacity: 50%;
  }
  .images {
    height: 750px;
    width: 100%; /* Set image width to 100% */
    box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
    -webkit-box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
    -moz-box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
  }
  .introDetails {
    font-size: 16px;
  }
  #moto {
    font-family: "Rubik", serif;
    font-size: 25px;
    text-align: center;
  }
  .pentagon {
    clip-path: polygon(100% 0, 100% 100%, 31% 100%, 25% 51%, 36% 0);
    width: 100%; /* Set the width of the pentagon container to 100% */
  }
  .shortDescription {
    font-family: "Rubik", serif;
    font-size: 2px;
  }
}

/* Large devices (laptops/desktops, 1280px and up) */
@media only screen and (min-width: 1280px) and (max-width: 1535px) {
  #introSection {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 20%;
  }
  #brandText {
    font-family: "Rubik Mono One", serif;
    font-size: 35px;
    text-align: center;
  }
  .formInput {
    border: 1px solid;
    border-radius: 15px;
    background: transparent;
    border-style: solid;
    border-color: #1858e2;
    font-family: "Rubik", serif;
    font-size: 20px;
    margin: 5px;
    overflow-x: scroll;
    padding: 4px;
  }
  .icons {
    font-size: 25px;
  }
  .icons:hover {
    opacity: 50%;
  }
  .images {
    height: 750px;
    width: 100%; /* Set image width to 100% */
    box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
    -webkit-box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
    -moz-box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
  }
  .introDetails {
    font-size: 16px;
  }
  #moto {
    font-family: "Rubik", serif;
    font-size: 25px;
    text-align: center;
  }
  .pentagon {
    clip-path: polygon(100% 0, 100% 100%, 31% 100%, 25% 51%, 36% 0);
    width: 100%; /* Set the width of the pentagon container to 100% */
  }
  .shortDescription {
    font-family: "Rubik", serif;
    font-size: 2px;
  }
}

/* Extra large devices (large laptops and desktops, 1536px and up) */
@media only screen and (min-width: 1536px) {
  #introSection {
    background: #1858e2;
    background: linear-gradient(to bottom right, #1858e2 0%, #b316e7 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 20%;
  }
  #brandText {
    font-family: "Rubik Mono One", serif;
    font-size: 35px;
    text-align: center;
  }
  .formInput {
    border: 1px solid;
    border-radius: 15px;
    background: transparent;
    border-style: solid;
    border-color: #1858e2;
    font-family: "Rubik", serif;
    font-size: 20px;
    margin: 5px;
    overflow-x: scroll;
    padding: 4px;
  }
  .icons {
    font-size: 25px;
  }
  .icons:hover {
    opacity: 50%;
  }
  .images {
    margin-top: 50px;
    height: 750px;
    width: 100%; /* Set image width to 100% */
    box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
    -webkit-box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
    -moz-box-shadow: -4px 5px 5px 0px rgba(255, 0, 0, 0.75);
  }
  .introDetails {
    font-size: 16px;
  }
  #moto {
    font-family: "Rubik", serif;
    font-size: 25px;
    text-align: center;
  }
  .pentagon {
    margin-top: 50px;
    clip-path: polygon(100% 0, 100% 100%, 31% 100%, 25% 51%, 36% 0);
    width: 100%; /* Set the width of the pentagon container to 100% */
  }
  .shortDescription {
    font-family: "Rubik", serif;
    font-size: 20px;
  }
}
</style>
