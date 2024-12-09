<template>
  <div id="" class="">
    <span id="" class=""> Hello {{ name }} </span>
    <br />
    <span id="" class="">
      The Date For You Right Now Is: {{ date }}/{{ month }}/{{ year }}</span
    >
    <br />
    The Time For You Right Now Is <span id="" class="" v-text="time"></span>
    <br />
    Anything That Is Bold In This Sentence is So Because We Have Used The v-html
    Directive To Inject HTML Directly Into The Template.
    <span id="" class="" v-html="bold"></span>
    <br />
    <span v-bind:id="blueText">
      The Reason This Text Is Pink Is Because We Have Used The v-bind:id
      Directive To Bind An ID Of 'pinkText To This Span.
    </span>
    <br />
    <span v-bind:class="pinkText">
      The Reason This Text Is Blue Is Because We Have Used The v-bind:class
      Directive To Bind A Class Of 'blueText To This Span.
    </span>
    <br />
    <span
      v-bind:style="{
        color: highlightColor,
      }"
    >
      The Reason This Text Is Orange Is Because We Have Used The v-bind:style
      Directive To Bind A Style Of 'highLightColor To This Span That Gives Its
      Text An Orange Color.
    </span>
    <br />
    <h4>Code So Far:</h4>
    <br />
    <pre><code>&lt;template&gt;
  &lt;div id=&quot;&quot; class=&quot;&quot;&gt;
    &lt;span id=&quot;&quot; class=&quot;&quot;&gt; Hello {{ name }} &lt;/span&gt;
    &lt;br /&gt;
    &lt;span id=&quot;&quot; class=&quot;&quot;&gt;
      The Date For You Right Now Is: {{ date }}/{{ month }}/{{ year }}
    &lt;/span&gt;
    &lt;br /&gt;
    The Time For You Right Now Is &lt;span id=&quot;&quot; class=&quot;&quot; v-text=&quot;time&quot;&gt;&lt;/span&gt;
    &lt;br /&gt;
    Anything That Is Bold In This Sentence is So Because We Have Used The v-html
    Directive To Inject HTML Directly Into The Template.
    &lt;span id=&quot;&quot; class=&quot;&quot; v-html=&quot;bold&quot;&gt;&lt;/span&gt;
    &lt;br /&gt;
    &lt;span v-bind:id=&quot;blueText&quot;&gt;
      The Reason This Text Is Pink Is Because We Have Used The v-bind:class
      Directive To Bind An ID Of &#39;pinkText To This Span.
    &lt;/span&gt;
    &lt;br /&gt;
    &lt;span v-bind:class=&quot;pinkText&quot;&gt;
      The Reason This Text Is Blue Is Because We Have Used The v-bind:id
      Directive To Bind A Class Of &#39;blueText To This Span.
    &lt;/span&gt;
    &lt;br /&gt;
    &lt;span
      v-bind:style=&quot;{
        color: highlightColor,
      }&quot;
    &gt;
      The Reason This Text Is Orange Is Because We Have Used The v-bind:style
      Directive To Bind A Style Of &#39;highLightColor To This Span That Gives Its
      Text An Orange Color.
    &lt;/span&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: &quot;Welcome&quot;,
  data() {
    return {
      name: &quot;Hamza&quot;,
      date: new Date().getDate(),
      month: new Date().getMonth(),
      time: new Date().toTimeString(),
      day: new Date().getDay(),
      year: new Date().getFullYear(),
      bold: &quot;&lt;b&gt; Bold Text &lt;/b&gt;&quot;,
      blueText: &quot;blueText&quot;,
      pinkText: &quot;pinkText&quot;,
      highlightColor: &quot;orange&quot;,
    };
  },
};
&lt;/script&gt;

&lt;style scoped&gt;
#blueText {
  color: blue;
}
.pinkText {
  color: pink;
}
&lt;/style&gt;
</code></pre>
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      name: "Hamza",
      date: new Date().getDate(),
      month: new Date().getMonth(),
      time: new Date().toTimeString(),
      day: new Date().getDay(),
      year: new Date().getFullYear(),
      bold: "<b> Bold Text </b>",
      blueText: "blueText",
      pinkText: "pinkText",
      highlightColor: "orange",
    };
  },
};
</script>

<style scoped>
#blueText {
  color: blue;
}
.pinkText {
  color: pink;
}
pre {
  background-color: #f4f4f4;
  padding: 10px;
  border-radius: 5px;
  overflow-x: auto; /* Allows horizontal scrolling for long lines */
}
code {
  font-family: "Courier New", Courier, monospace;
  color: #d63384;
}
</style>
