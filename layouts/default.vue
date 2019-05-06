<template>
  <div class="container-fluid pd2">
    <no-ssr>
    <notifications group="alerts"
                   position="bottom right">
      <template slot="body" slot-scope="props">
        <b-alert :show="props.item.duration || 3000"
                 dismissible
                 :variant="props.item.type || 'info'"
                 @dismissed="props.item.timer=0">
          <p>{{props.item.text}}</p>
          <b-progress :variant="props.item.type"
                      striped
                      :animated="true"
                      :max="props.item.duration"
                      :value="props.item.timer"
                      height="4px">
          </b-progress>
        </b-alert>
      </template>
    </notifications>
    </no-ssr>
    <nuxt/>
  </div>
</template>

<style>
html {
  font-family: "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>

