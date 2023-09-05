<script>
import AnsoDataformUpload from './AnsoDataformUpload'
// import AnsoDataformIcon from './AnsoDataformIcon'
import AnsoDataformSelect from './AnsoDataformSelect'
import AnsoDataformInput from './AnsoDataformInput'
import AnsoDataformTextRange from './AnsoDataformTextRange'
import AnsoDataformNumber from './AnsoDataformNumber'
import AnsoDataformNumRange from './AnsoDataformNumRange'
import AnsoDataformRadio from './AnsoDataformRadio'
import AnsoDataformCascader from './AnsoDataformCascader'
import AnsoDataformCheckbox from './AnsoDataformCheckbox'
import AnsoDataformSwitch from './AnsoDataformSwitch'
import AnsoDataformTime from './AnsoDataformDateTime/AnsoDataformTime'
import AnsoDataformDate from './AnsoDataformDateTime/AnsoDataformDate'
import AnsoDataformTimeRange from './AnsoDataformDateTime/AnsoDataformTimeRange'
import AnsoButtonGroup from '../AnsoButtonGroup'
import AnsoDataformSlider from './AnsoDataformSlider'
import AnsoDataformText from './AnsoDataformText'
import AnsoDataformTransfer from './AnsoDataformTransfer/index'
import AnsoDataformTree from './AnsoDataformTree/index'

const dataFormItem = {
  text: 'AnsoDataformText',
  input: 'AnsoDataformInput',
  textRange: 'AnsoDataformTextRange',
  number: 'AnsoDataformNumber',
  numberRange: 'AnsoDataformNumRange',
  select: 'AnsoDataformSelect',
  switch: 'AnsoDataformSwitch',
  slider: 'AnsoDataformSlider',
  checkbox: 'AnsoDataformCheckbox',
  radio: 'AnsoDataformRadio',
  cascader: 'AnsoDataformCascader',
  time: 'AnsoDataformTime',
  timeRange: 'AnsoDataformTimeRange',
  date: 'AnsoDataformDate',
  file: 'AnsoDataformUpload',
  // icon: 'AnsoDataformIcon',
  render: 'InfoRender',
  button: 'AnsoButtonGroup',
  link: 'AnsoLink',
  transfer: 'AnsoDataformTransfer',
  tree: 'AnsoDataformTree'
}

export default {
  components: {
    AnsoDataformUpload,
    // AnsoDataformIcon,
    AnsoDataformSelect,
    AnsoDataformInput,
    AnsoDataformNumber,
    AnsoDataformNumRange,
    AnsoDataformRadio,
    AnsoDataformCascader,
    AnsoDataformCheckbox,
    AnsoDataformSwitch,
    AnsoDataformTime,
    AnsoDataformTimeRange,
    AnsoDataformDate,
    AnsoButtonGroup,
    AnsoDataformSlider,
    AnsoDataformText,
    AnsoDataformTransfer,
    AnsoDataformTree,
    AnsoDataformTextRange
  },
  data () {
    return {
      dataFormItem
    }
  }
}
</script>
