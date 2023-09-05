export default {
  // filters: {
  //   idRuleFilter (keyname, btn) {

  //     return `${keyname}-${btn.name}`
  //   }
  // }
  methods: {
    idRuleFormat (keyName, btn) {
      const { name, label, icon } = btn
      const itemName = name || (label
        ? encodeURIComponent(label) : icon || Math.random() * 100)
      return `${keyName}-${itemName}`
    }
  }
}
