<template>
  <div id="resumeEditor">
    <nav>
      <ol>
        <li v-for="(item,index) in resume.config" :class="{active: item.field === selected}" @click="selected = item.field">
          <svg class="icon">
            <use :xlink:href="`#icon-${item.icon}`"></use>
          </svg>
        </li>
      </ol>
    </nav>
    <ol class="panels">                                                     <!-- 面板   -->
      <li v-for="item in resume.config" v-show="item.field === selected">   <!-- 遍历内容，item为field中对象，确认该面板内容是否显示  -->
        <div v-if="resume[item.field] instanceof Array">                    <!-- 遍历内容，[item.field] 就是 'profile'、'work history'等，确认遍历到的内容为数组  -->
          <div class="subitem" v-for="subitem in resume[item.field]">       <!-- 遍历内容，[item.field] 就是 'profile'、'work history'等，subitem 是相关对象 profile: {name: '',city: '',title: ''}, -->
            <div class="resumeField" v-for="(value,key) in subitem">
              <label> {{key}} </label>
              <input type="text" :value="value">
            </div>
            <hr>
          </div>
        </div>
        <div v-else class="resumeField" v-for="(value,key) in resume[item.field]"> <!-- 遍历内容，[item.field] 就是 'profile'、'work history'等，如果不是数组  -->
          <label> {{key}} </label>
          <input type="text" v-model="resume[item.field][key]">
        </div>
      </li>
    </ol>
  </div>
</template>

<script>
  export default {
    name: 'ResumeEditor',
    data() {
      return {
        selected: 'profile',
        resume: {
          config: [
            { field: 'profile', icon: 'id' },
            { field: 'work history', icon: 'work' },
            { field: 'education', icon: 'book' },
            { field: 'projects', icon: 'heart' },
            { field: 'awards', icon: 'cup' },
            { field: 'contacts', icon: 'phone' },
          ],
          profile: {
            name: '',
            city: '',
            title: ''
          },
          'work history': [
            { company: 'AL', content: '我的第二份工作是' },
            { company: 'TX', content: '我的第一份工作是' },
          ],
          education: [
            { school: 'AL', content: '文字' },
            { school: 'TX', content: '文字' },
          ],
          projects: [
            { name: 'project A', content: '文字' },
            { name: 'project B', content: '文字' },
          ],
          awards: [
            { name: 'awards A', content: '文字' },
            { name: 'awards B', content: '文字' },
          ],
          contacts: [
            { contact: 'phone', content: '13812345678' },
            { contact: 'qq', content: '12345678' },
          ],
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  #resumeEditor{
    background:#ffffff;
    box-shadow:0 1px 3px 0 rgba(0,0,0,0.25);
    display: flex;
    flex-direction: row;
    overflow: auto;
    > nav{
      width: 80px;
      background: black;
      color: white;
      > ol {
        > li{
          height: 48px;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 16px;
          margin-bottom: 16px;
          &.active{
            background: white;
            color: black;
          }
        }
      }
    }
    > .panels{
      flex-grow: 1;
      > li {
        padding: 24px;
      }
    }
    svg.icon{
      width: 24px; // 原设计稿 32px 不好看，改成 24px
      height: 24px;
    }
  }
  ol{
    list-style: none;
  }
  .resumeField{
    > label{
      display: block;
    }
    input[type=text]{
      margin: 16px 0;
      border: 1px solid #ddd;
      box-shadow:inset 0 1px 3px 0 rgba(0,0,0,0.25);
      width: 100%;
      height: 40px;
      padding: 0 8px;
    }
  }
  hr{
    border: none;
    border-top: 1px solid #ddd;
    margin: 24px 0;
  }
</style>