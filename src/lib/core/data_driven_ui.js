
import moment from "moment";

export default class data_driven_ui {
    constructor(props) {
        this.setLocale(props && props.locale ? props.locale : "en")
    }

    setLocale = (locale) => {
        this.locale = locale
        moment.locale(locale)
    }

    getCurrentLocale = () => {
        return this.locales[this.locale] ? this.locales[this.locale] : this.locales["en"]
    }

    getCurrentLocaleCode = () => {
        return this.locale
    }
}

window.data_driven_ui = new data_driven_ui()
require('../locale/en')