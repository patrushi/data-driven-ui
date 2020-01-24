export var locale = {
    paging: {
        labelRowsPerPage: "Показывать по: ",
        labelDisplayedRows: ({ from, to, count }) => `${from}-${to} из ${count}`
    },
    errorPanel: {
        title: 'Что-то пошло не так ...'
    },
    dateField: {
        wrongDateFormat: 'Неверный формат даты'
    },
    longSelectField: {
        notFoundByText: 'По заданному тексту не найдено значений ...'
    }
}