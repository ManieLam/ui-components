const required = { required: true, message: '必填' }
const emptyField = {
  name: 'x',
  label: '',
  form: { tag: '' },
  render: () => { return '' }
}
export const discount = {
  x: emptyField,
  attachments: {
    name: 'attachments',
    label: '附件',
    form: {
      tag: 'file',
      uploadType: 'button',
      colSpan: 3,
      rules: [required]
    },
    width: 50
  },
  // 优惠方案（表单）
  lowIncomeDiscountPolicyType: {
    name: 'lowIncomeDiscountPolicyType',
    label: '优惠方案',
    // relation: 'lowIncomeDiscountPolicyType',
    // form: { tag: 'link', rules: [required] }
    form: { tag: 'select', rules: [required], multiple: true }
    // options: [
    //   {
    //     value: 34,
    //     label: '特困减免（场景42）',
    //     parentId: null
    //   },
    //   {
    //     value: 73,
    //     label: '低保每月优惠18元',
    //     parentId: null
    //   }
    // ]
  },
  startTime: {
    name: 'startTime',
    label: '生效日期',
    form: {
      tag: 'date',
      rules: [required],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() <= Date.now() - 8.64e7
        }
      },
      chains: ({ chains, values, value }) => {
        chains.setState('endTime', (state) => {
          state.form.pickerOptions.disabledDate = (time) => {
            // 存在到期日期,则起始日期不可选: 到期日期>=生效日期 || 今日
            if (value) {
              return time.getTime() <= Date.now() - 8.64e7 || time.getTime() <= value
            } else {
              return time.getTime() <= Date.now() - 8.64e7
            }
          }
        })
      }
    },
    render: { type: 'time', timeType: 'YYYY-MM-DD' }
  },
  endTime: {
    name: 'endTime',
    label: '失效日期',
    form: {
      tag: 'date',
      rules: [required],
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() <= Date.now() - 8.64e7
        }
      },
      chains: ({ chains, values, value }) => {
        chains.setState('startTime', (state) => {
          state.form.pickerOptions.disabledDate = (time) => {
            // 存在到期日期,则起始日期不可选: 到期日期>=生效日期 || 今日
            if (value) {
              return time.getTime() <= Date.now() - 8.64e7 || time.getTime() >= value
            } else {
              return time.getTime() <= Date.now() - 8.64e7
            }
          }
        })
      }
    },
    render: { type: 'time', timeType: 'YYYY-MM-DD' }
  }
}
