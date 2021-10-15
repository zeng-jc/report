import Vue from 'vue'

import { Button, NavBar, Form, Field, Uploader, Picker, Popup, Toast, Cascader, Icon, Divider, Tag, Dialog } from 'vant'

Vue.use(Button)
Vue.use(NavBar)
Vue.use(Form)
Vue.use(Field)
Vue.use(Uploader)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(Cascader)
Vue.use(Icon)
Vue.use(Divider)
Vue.use(Tag)

Vue.prototype.$toast = Toast
Vue.prototype.$dialog = Dialog
