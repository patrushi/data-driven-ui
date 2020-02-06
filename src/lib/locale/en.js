if (!window.data_driven_ui) window.data_driven_ui = {}
if (!window.data_driven_ui.locales) window.data_driven_ui.locales = {}
window.data_driven_ui.locales['en'] = {
    paging: {
        labelRowsPerPage: "Page size: ",
        labelDisplayedRows: ({ from, to, count }) => `${from}-${to} from ${count}`
    },
    errorPanel: {
        title: 'Something went wrong ...'
    },
    dateField: {
        wrongDateFormat: 'Wrong date format'
    },
    longSelectField: {
        notFoundByText: 'No values found for specified text ...'
    }
}